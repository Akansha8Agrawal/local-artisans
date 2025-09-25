import os
import uuid
import logging
from typing import List, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Header, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from google.cloud import storage, firestore
import google.cloud.aiplatform as aiplatform

# --------- Basic config & auth ----------
PROJECT_ID = os.getenv("PROJECT_ID")
LOCATION = os.getenv("LOCATION", "us-central1")
MODEL_ID = os.getenv("MODEL_ID", "text-bison@001")
BUCKET_NAME = os.getenv("BUCKET_NAME")
API_KEY = os.getenv("API_KEY", "dev-key")

if PROJECT_ID is None or BUCKET_NAME is None:
    logging.warning("PROJECT_ID or BUCKET_NAME env var not set. Make sure to set them before running in prod.")

# initialize clients
firestore_client = firestore.Client()
storage_client = storage.Client()

# Initialize Vertex AI SDK
# This uses the google-cloud-aiplatform library
aiplatform.init(project=PROJECT_ID, location=LOCATION)
text_model = aiplatform.TextGenerationModel.from_pretrained(MODEL_ID)

app = FastAPI(title="Artisan AI Marketplace Backend")

# Simple API key dependency
async def require_api_key(x_api_key: Optional[str] = Header(None)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

# ---------- Pydantic models ----------
class ArtisanIn(BaseModel):
    name: str
    village: Optional[str] = None
    craft: str
    languages: Optional[List[str]] = ["English"]
    bio: Optional[str] = None
    contact: Optional[str] = None

class ProductIn(BaseModel):
    artisan_id: str
    brief: str = Field(..., description="Short description of the product in artisan's words")
    materials: Optional[str] = None
    size: Optional[str] = None
    color: Optional[str] = None
    price: Optional[float] = None
    target_audience: Optional[str] = "urban buyers, gift shoppers"

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    artisan_id: Optional[str] = None
    role: Optional[str] = "customer"  # or "artisan"
    message: str

# ---------- Helpers ----------

def upload_file_to_gcs(file: UploadFile, dest_filename: str) -> str:
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(dest_filename)
    blob.upload_from_file(file.file, content_type=file.content_type)
    # Make the file publicly readable (optional / choose according to needs)
    blob.make_public()
    return blob.public_url


def save_artisan_to_firestore(artisan: ArtisanIn) -> str:
    doc_ref = firestore_client.collection("artisans").document()
    data = artisan.dict()
    data.update({"created_at": firestore.SERVER_TIMESTAMP})
    doc_ref.set(data)
    return doc_ref.id


def save_product_to_firestore(product: dict) -> str:
    doc_ref = firestore_client.collection("products").document()
    product.update({"created_at": firestore.SERVER_TIMESTAMP})
    doc_ref.set(product)
    return doc_ref.id


def fetch_product(product_id: str) -> dict:
    doc = firestore_client.collection("products").document(product_id).get()
    if not doc.exists:
        raise HTTPException(404, "Product not found")
    return doc.to_dict()

# Build a robust prompt for generating listing

def build_listing_prompt(product: ProductIn, artisan_profile: Optional[dict]) -> str:
    artisan_snippet = ""
    if artisan_profile:
        artisan_snippet = (
            f"Artisan: {artisan_profile.get('name')} from {artisan_profile.get('village','unknown')}, craft: {artisan_profile.get('craft')}.")
    prompt = f"You are an expert e-commerce copywriter who writes authentic, culturally sensitive product listings for traditional artisans.\n"
    prompt += f"{artisan_snippet}\n"
    prompt += "Given the product details below, produce:\n1) a short title (max 60 chars)\n2) a concise punchy subtitle (max 100 chars)\n3) a long product description (3 short paragraphs) highlighting story, materials, care, and uniqueness\n4) 8 SEO keywords separated by commas\5) 3 suggested price points: local market, online retail, gift premium\n\n"
    prompt += "Product details:\n"
    prompt += f"Brief: {product.brief}\n"
    if product.materials:
        prompt += f"Materials: {product.materials}\n"
    if product.size:
        prompt += f"Size: {product.size}\n"
    if product.color:
        prompt += f"Color: {product.color}\n"
    prompt += f"Target audience: {product.target_audience}\n"
    prompt += "Make the language warm and human, avoid clichés, and include a one-line storytelling hook at the start. Return output in JSON format with keys: title, subtitle, description, seo_tags, price_suggestions."
    return prompt

# Chat prompt builder

def build_chat_prompt(session_history: List[dict], incoming: ChatRequest, artisan_profile: Optional[dict]) -> str:
    system = "You are 'BazaarBuddy', an assistant that helps customers and artisans. Be polite, concise, and promote the artisan's work authentically. If user asks about customizations, ask for specifics like size, color, timeline. Always suggest how this purchase supports artisans."
    if artisan_profile:
        system += f" Artisan details: {artisan_profile.get('name')}, craft: {artisan_profile.get('craft')}.\n"
    conversation = system + "\nConversation:\n"
    for msg in session_history:
        conversation += f"{msg.get('role')}: {msg.get('text')}\n"
    conversation += f"{incoming.role}: {incoming.message}\n"
    conversation += "Assistant:"
    return conversation

# ---------- Routes ----------

@app.post("/api/onboard", dependencies=[Depends(require_api_key)])
async def onboard(artisan: ArtisanIn):
    artisan_id = save_artisan_to_firestore(artisan)
    return {"artisan_id": artisan_id}


@app.post("/api/upload_image", dependencies=[Depends(require_api_key)])
async def upload_image(file: UploadFile = File(...), artisan_id: Optional[str] = None):
    # generate unique filename
    ext = os.path.splitext(file.filename)[1] or ""
    dest = f"artisans/{artisan_id or 'unknown'}/{uuid.uuid4().hex}{ext}"
    try:
        public_url = upload_file_to_gcs(file, dest)
    except Exception as e:
        logging.exception("GCS upload failed")
        raise HTTPException(500, "Upload failed")
    # optionally attach to artisan doc
    if artisan_id:
        doc_ref = firestore_client.collection("artisans").document(artisan_id)
        doc_ref.update({"images": firestore.ArrayUnion([public_url])})
    return {"url": public_url}


@app.post("/api/generate_listing", dependencies=[Depends(require_api_key)])
async def generate_listing(product: ProductIn):
    # fetch artisan
    artisan_doc = None
    try:
        if product.artisan_id:
            artisan_snap = firestore_client.collection("artisans").document(product.artisan_id).get()
            if artisan_snap.exists:
                artisan_doc = artisan_snap.to_dict()
    except Exception:
        artisan_doc = None

    prompt = build_listing_prompt(product, artisan_doc)

    # Call Vertex AI text model - synchronous generation
    try:
        response = text_model.predict(
            prompt,
            max_output_tokens=512,
            temperature=0.7,
        )
        # The SDK returns a TextGenerationResponse-like object with "text"
        generated_text = response.text
    except Exception as e:
        logging.exception("Vertex AI generation failed")
        raise HTTPException(500, "AI generation failed")

    # Try to parse JSON from generated_text; if fails, return raw as fallback
    import json
    output = None
    try:
        output = json.loads(generated_text)
    except Exception:
        # Fallback: wrap generated text
        output = {"raw": generated_text}

    # Save product record
    product_record = product.dict()
    product_record.update({"ai_listing": output})
    prod_id = save_product_to_firestore(product_record)

    return {"product_id": prod_id, "ai_listing": output}


@app.post("/api/chat", dependencies=[Depends(require_api_key)])
async def chat(req: ChatRequest):
    # session management: store last N messages in firestore under sessions/{session_id}
    session_id = req.session_id or uuid.uuid4().hex
    session_ref = firestore_client.collection("sessions").document(session_id)
    session_doc = session_ref.get()
    history = []
    if session_doc.exists:
        data = session_doc.to_dict()
        history = data.get("messages", [])

    # fetch artisan profile if provided
    artisan_profile = None
    if req.artisan_id:
        snap = firestore_client.collection("artisans").document(req.artisan_id).get()
        if snap.exists:
            artisan_profile = snap.to_dict()

    # Build prompt
    incoming = req
    prompt = build_chat_prompt(history, incoming, artisan_profile)

    try:
        response = text_model.predict(prompt, max_output_tokens=512, temperature=0.6)
        assistant_text = response.text
    except Exception as e:
        logging.exception("Vertex AI chat generation failed")
        raise HTTPException(500, "AI chat failed")

    # append to history and save
    history.append({"role": incoming.role, "text": incoming.message})
    history.append({"role": "assistant", "text": assistant_text})
    session_ref.set({"messages": history, "updated_at": firestore.SERVER_TIMESTAMP})

    return {"session_id": session_id, "reply": assistant_text}


@app.get("/api/product/{product_id}", dependencies=[Depends(require_api_key)])
async def get_product(product_id: str):
    prod = fetch_product(product_id)
    return prod


# ---------- Run ----------
# Use: uvicorn backend_fastapi_vertexai:app --reload --port 8000

if _name_ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)