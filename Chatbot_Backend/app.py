from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import os
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# --- Configure Gemini API key from environment variable ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("Please set GEMINI_API_KEY as an environment variable!")

genai.configure(api_key=GEMINI_API_KEY)

# --- Initialize Gemini model ---
MODEL_NAME = "models/gemini-1.5-flash"
model = genai.GenerativeModel(MODEL_NAME)

# --- FastAPI app ---
app = FastAPI(title="Artisan AI Chatbot API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Request/Response schemas ---
class MessageRequest(BaseModel):
    message: str
    action: Optional[str] = "general_chat"
    language: Optional[str] = "en"  # default English


class MessageResponse(BaseModel):
    reply: str


# --- Language mapping (only the ones in ChatInterface.tsx) ---
LANGUAGE_MAP = {
    "en": "Respond in English.",
    "hi": "Respond in Hindi.",
    "bn": "Respond in Bengali.",
    "ta": "Respond in Tamil.",
    "te": "Respond in Telugu.",
    "mr": "Respond in Marathi.",
    "gu": "Respond in Gujarati.",
}


# --- Helper to call Gemini ---
def gemini_generate_text(prompt: str, max_tokens: int = 500) -> str:
    try:
        response = model.generate_content(prompt)
        if response.parts:
            return "".join([part.text for part in response.parts if hasattr(part, "text")])
        return "Sorry, I couldn't generate a response."
    except Exception as e:
        return f"Error contacting Gemini API: {e}"


# --- Chat endpoint ---
@app.post("/chat", response_model=MessageResponse)
def chat(req: MessageRequest):
    user_message = req.message
    action = req.action
    language = req.language or "en"

    # Pick language instruction (default English if not found)
    lang_text = LANGUAGE_MAP.get(language, LANGUAGE_MAP["en"])

    if action == "generate_story":
        prompt = f"""
        You are an AI assistant specialized in crafting compelling stories for handmade products.
        {lang_text}
        Product details: {user_message}
        Generate a product story (150-250 words) and a concise description (50-100 words).
        """
    elif action == "marketing_content":
        prompt = f"""
        You are an AI marketing specialist.
        {lang_text}
        Product info: {user_message}
        Generate:
        1. Instagram caption with hashtags
        2. Short Facebook post
        3. Website blurb
        """
    elif action == "market_trends":
        prompt = f"""
        You are an AI market analyst for handmade goods.
        {lang_text}
        Craft details: {user_message}
        Provide:
        - Key trends
        - Popular styles/designs
        - Target audience insights
        - Advice for standing out
        """
    elif action == "calculate_pricing":
        prompt = f"""
        You are an AI business consultant for artisans.
        {lang_text}
        Pricing details: {user_message}
        Suggest a pricing strategy and recommended retail price range with breakdown.
        """
    else:  # general chat
        prompt = f"{lang_text} The user says: '{user_message}'. Respond as a helpful AI assistant for artisans."

    reply = gemini_generate_text(prompt)
    return {"reply": reply}
