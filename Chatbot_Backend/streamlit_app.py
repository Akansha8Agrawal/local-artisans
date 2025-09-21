import streamlit as st
import random
import time
import google.generativeai as genai

# --- Gemini API Configuration ---
if "GEMINI_API_KEY" in st.secrets:
    genai.configure(api_key=st.secrets["GEMINI_API_KEY"])
else:
    st.error("Gemini API key not found in Streamlit secrets. Please add it to .streamlit/secrets.toml")
    st.stop()

# --- Initialize the Gemini Model Dynamically ---
model_name = None
try:
    for m in genai.list_models():
        if "generateContent" in m.supported_generation_methods:
            if m.name == "models/gemini-1.5-flash":
                model_name = m.name
                break
            if not model_name:
                model_name = m.name

    if model_name:
        # st.success(f"Using Gemini model: {model_name}") # Keep this for debugging if needed
        model = genai.GenerativeModel(model_name)
    else:
        st.error("No suitable Gemini model found that supports 'generateContent'.")
        st.stop()
except Exception as e:
    st.error(f"Error initializing Gemini model: {e}")
    st.stop()

# --- Page Configuration ---
st.set_page_config(
    page_title="ARTISAN.AI Assistant",
    page_icon="✨", # A fancier icon
    layout="wide", # Use wide layout for more space
    initial_sidebar_state="collapsed"
)

# --- Custom CSS for a Fancier Look ---
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Playfair+Display:wght@700&display=swap');

    html, body, [class*="st-emotion"] {
        font-family: 'Poppins', sans-serif;
        color: #333;
    }

    /* Main container background and padding */
    .st-emotion-cache-z5fcl4 { /* Target the main block-container */
        background: linear-gradient(135deg, #f0f2f6 0%, #e9ecf2 100%);
        padding-top: 3rem;
        padding-bottom: 3rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    /* Header Styling */
    h1, h2, h3, .st-emotion-cache-10q7q25 { /* Target Streamlit's default header classes */
        font-family: 'Playfair Display', serif;
        color: #4A4A6A; /* Darker, elegant color */
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        font-weight: 700;
        letter-spacing: 0.05em;
    }

    h2 {
        font-size: 2.2em;
    }
    h3 {
        font-size: 1.6em;
        text-align: left;
        color: #5A5A7A;
        border-bottom: none;
    }

    /* Button Styling */
    .stButton>button {
        width: 100%;
        font-size: 1.05em;
        padding: 0.9rem 1.2rem;
        border-radius: 12px; /* More rounded */
        border: none;
        background-color: #6C63FF; /* A vibrant purple/blue */
        color: white;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        font-weight: 600;
        letter-spacing: 0.03em;
        box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
        margin-bottom: 10px; /* Space between buttons */
    }
    .stButton>button:hover {
        background-color: #554DCC; /* Darker on hover */
        transform: translateY(-3px); /* Lift effect */
        box-shadow: 0 8px 20px rgba(108, 99, 255, 0.4);
    }
    .stButton>button:active {
        transform: translateY(0);
        box-shadow: 0 4px 10px rgba(108, 99, 255, 0.2);
    }

    /* Chat Container */
    .chat-container {
        display: flex;
        flex-direction: column;
        height: 65vh; /* Slightly taller */
        overflow-y: auto;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        margin-bottom: 1.5rem;
        background-color: #ffffff;
        box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
    }

    /* Chat Messages */
    .chat-message {
        padding: 12px 18px; /* More padding */
        margin-bottom: 12px;
        border-radius: 20px; /* More rounded corners */
        max-width: 80%; /* Slightly wider messages */
        display: flex;
        align-items: flex-start; /* Align content to top of message */
        line-height: 1.6;
        font-size: 0.95em;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .user-message {
        background-color: #e0f7fa; /* Light blue/cyan for user */
        align-self: flex-end;
        margin-left: auto;
        color: #263238;
        border-bottom-right-radius: 5px; /* Tail effect */
    }
    .bot-message {
        background-color: #ffffff; /* White for bot */
        border: 1px solid #cfd8dc; /* Subtle border */
        align-self: flex-start;
        color: #37474f;
        border-bottom-left-radius: 5px; /* Tail effect */
    }

    /* Avatars */
    .avatar {
        width: 35px; /* Slightly larger avatar */
        height: 35px;
        border-radius: 50%;
        margin-right: 12px;
        object-fit: cover;
        border: 2px solid #6C63FF; /* Accent border */
        flex-shrink: 0; /* Prevent shrinking */
    }
    .bot-message .avatar {
        border-color: #FFC107; /* Different accent for bot */
    }

    /* Text Area */
    .stTextArea textarea {
        border-radius: 12px;
        padding: 15px;
        border: 1px solid #DCDCDC;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        font-size: 1.0em;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .stTextArea textarea:focus {
        border-color: #6C63FF;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 0.1rem rgba(108, 99, 255, 0.25);
        outline: none;
    }

    /* Send Button */
    .st-emotion-cache-vk33gh.e10mrjm61 { /* Target the specific div around the send button */
        margin-top: 15px;
    }
    .st-emotion-cache-vk33gh.e10mrjm61 .stButton>button {
        background-color: #28a745; /* Green for send */
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    }
    .st-emotion-cache-vk33gh.e10mrjm61 .stButton>button:hover {
        background-color: #218838;
        box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4);
    }

    /* Divider */
    hr {
        margin: 2rem 0;
        border-top: 1px dashed rgba(0,0,0,0.1);
    }
    
    /* Logo adjustments */
    .st-emotion-cache-1r6dmym img { /* Target image in the header column */
        margin-top: -10px;
    }
    
</style>
""", unsafe_allow_html=True)

# --- Helper Functions using Gemini LLM ---
def gemini_generate_text(prompt, max_tokens=500):
    """
    Generates text using the Gemini LLM.
    """
    try:
        response = model.generate_content(prompt)
        # Check if response has parts and return text
        if response.parts:
            # Join multiple parts if they exist, often relevant for some multimodal outputs
            generated_text = "".join([part.text for part in response.parts if hasattr(part, 'text')])
            return generated_text
        else:
            return "Sorry, the AI response was empty or malformed."
    except Exception as e:
        st.error(f"Error calling Gemini API: {e}")
        return "Sorry, I couldn't generate a response at this moment."

def generate_product_story(product_details):
    """
    Generates a product story using the Gemini LLM.
    """
    st.session_state.messages.append({"role": "assistant", "content": "Generating a unique story for your craft..."})
    time.sleep(1) # Small delay for better UX

    prompt = f"""
    You are an AI assistant specialized in crafting compelling stories and descriptions for handmade products.
    Based on the following product details, generate a heartwarming and engaging product story and a concise product description.

    Product Details:
    {product_details}

    Please provide:
    1. A 'Product Story' (around 150-250 words) that highlights its uniqueness, materials, creation process, and any personal touch.
    2. A 'Product Description' (around 50-100 words) suitable for an e-commerce listing, focusing on features and benefits.
    """
    return gemini_generate_text(prompt)

def create_marketing_content(product_info):
    """
    Generates marketing content using the Gemini LLM.
    """
    st.session_state.messages.append({"role": "assistant", "content": "Crafting engaging marketing content for you..."})
    time.sleep(1)

    prompt = f"""
    You are an AI marketing specialist. Based on the following information, generate marketing content.

    Product Information:
    {product_info}

    Please provide:
    1. An Instagram caption with relevant hashtags.
    2. A short Facebook post.
    3. A compelling website blurb.
    """
    return gemini_generate_text(prompt)

def get_market_trend_insights(craft_details):
    """
    Generates market trend insights using the Gemini LLM.
    """
    st.session_state.messages.append({"role": "assistant", "content": "Analyzing market trends for your craft..."})
    time.sleep(1)

    prompt = f"""
    You are an AI market analyst for handmade goods. Based on the following craft details, provide insights into current market trends, popular styles, and potential customer demographics.

    Craft Details:
    {craft_details}

    Please provide:
    1. Key current trends.
    2. Suggested popular styles/designs.
    3. Target audience insights.
    4. Advice for standing out in the market.
    """
    return gemini_generate_text(prompt)

def calculate_pricing(pricing_details):
    """
    Helps calculate pricing using the Gemini LLM.
    """
    st.session_state.messages.append({"role": "assistant", "content": "Assisting with pricing calculations..."})
    time.sleep(1)

    prompt = f"""
    You are an AI business consultant for artisans. Based on the following pricing details, suggest a pricing strategy and a recommended retail price range. Also, explain the factors considered.

    Pricing Details:
    {pricing_details}

    Please consider:
    - Material costs
    - Labor hours and desired hourly wage
    - Overhead (if any, assume a small percentage if not specified)
    - Market value (based on similar products)

    Provide:
    1. A recommended retail price range.
    2. A breakdown of how this price is derived (materials + labor + overhead + profit margin).
    3. A brief explanation of pricing strategies.
    """
    return gemini_generate_text(prompt)

def general_chat_response(user_message):
    """
    Handles general chat responses using the Gemini LLM.
    """
    prompt = f"The user says: '{user_message}'. Respond as a helpful AI assistant for artisans."
    return gemini_generate_text(prompt)

# --- Session State Initialization ---
if "messages" not in st.session_state:
    st.session_state.messages = []
    st.session_state.messages.append({"role": "assistant", "content": "Hello! I'm your **ARTISAN.AI Assistant**! I can help you with product descriptions, marketing ideas, and more. What would you like to do today?"})
if "current_action" not in st.session_state:
    st.session_state.current_action = None

# --- Title and Logo ---
col1, col2 = st.columns([1, 6])
with col1:
    st.image("https://www.flaticon.com/svg/vstatic/svg/2972/2972418.svg?token=1708892403", width=50) # Assuming this is a local path or a stable URL
with col2:
    st.markdown("<h1>ARTISAN.AI Assistant</h1>", unsafe_allow_html=True) # Use h1 for main title

# --- Chat Display ---
st.markdown("<h3>Conversation History</h3>", unsafe_allow_html=True)
chat_container = st.container(height=400, border=True) # Use st.container with fixed height and border
with chat_container:
    for message in st.session_state.messages:
        if message["role"] == "user":
            st.markdown(f'<div class="chat-message user-message"><img class="avatar" src="https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=b6e3f4,c0aede" alt="User Avatar">{message["content"]}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="chat-message bot-message"><img class="avatar" src="https://api.dicebear.com/7.x/bottts/svg?seed=ArtisanAI&backgroundColor=ffe0b2,c8e6c9" alt="Bot Avatar">{message["content"]}</div>', unsafe_allow_html=True)

# --- Main Action Buttons ---
st.markdown("---")
st.markdown("### Choose an action:", unsafe_allow_html=True)
col_buttons = st.columns(2)

with col_buttons[0]:
    if st.button("✍️ Generate Product Story & Description", key="btn_story"):
        st.session_state.current_action = "generate_story"
        st.session_state.messages.append({"role": "assistant", "content": "Great choice! Tell me more about your product. What is it? What materials are used? What's unique about it or its creation process? What's your personal story behind it?"})
        st.experimental_rerun()

with col_buttons[1]:
    if st.button("📣 Create Marketing Content", key="btn_marketing"):
        st.session_state.current_action = "marketing_content"
        st.session_state.messages.append({"role": "assistant", "content": "Fantastic! To create marketing content, please tell me: \n1. What is the product?\n2. Who is your target audience?\n3. What platforms (Instagram, Facebook, website) are you targeting?\n4. What's the main message you want to convey?"})
        st.experimental_rerun()

col_buttons2 = st.columns(2)
with col_buttons2[0]:
    if st.button("📈 Get Market Trend Insights", key="btn_trends"):
        st.session_state.current_action = "market_trends"
        st.session_state.messages.append({"role": "assistant", "content": "Okay, let's explore market trends. What type of craft do you specialize in (e.g., pottery, textiles, jewelry)? What are you hoping to learn?"})
        st.experimental_rerun()

with col_buttons2[1]:
    if st.button("💰 Calculate Pricing", key="btn_pricing"):
        st.session_state.current_action = "calculate_pricing"
        st.session_state.messages.append({"role": "assistant", "content": "Let's help with pricing! Please tell me:\n1. What are your material costs?\n2. How many hours did you spend on this product?\n3. What's your desired hourly wage?\n4. Are there similar products online you've seen?"})
        st.experimental_rerun()

# --- User Input Text Area ---
st.markdown("---")
st.markdown("### Your Input:", unsafe_allow_html=True)
user_input = st.text_area("Type your message or question here...", key="user_input_area", height=100, label_visibility="collapsed") # Hide default label

if st.button("Send Message", use_container_width=True, key="btn_send") and user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})

    with st.spinner("ARTISAN.AI is thinking..."):
        if st.session_state.get("current_action") == "generate_story":
            response = generate_product_story(user_input)
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.session_state.current_action = None
        elif st.session_state.get("current_action") == "marketing_content":
            response = create_marketing_content(user_input)
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.session_state.current_action = None
        elif st.session_state.get("current_action") == "market_trends":
            response = get_market_trend_insights(user_input)
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.session_state.current_action = None
        elif st.session_state.get("current_action") == "calculate_pricing":
            response = calculate_pricing(user_input)
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.session_state.current_action = None
        else:
            response = general_chat_response(user_input)
            st.session_state.messages.append({"role": "assistant", "content": response})

    st.experimental_rerun()