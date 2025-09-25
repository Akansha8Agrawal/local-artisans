 ## IndianRoots.ai 
Empowering Local Artisans with Generative AI

---

## Click here for a demonstration video 
 [Watch the Demo on YouTube](https://youtu.be/JtdvRQnOKx8)  

---

##  Problem & Solution  

**Problem:**  
Indian artisans and craftsmen, rich in traditional skills and cultural heritage, often face significant challenges in the modern digital marketplace. A lack of digital marketing skills, limited resources, and the difficulty of bridging traditional craftsmanship with contemporary consumer trends severely restrict their market reach and profitability. This creates a disconnect between valuable, traditional art forms and a wider, digitally-native audience, threatening the sustainability of these crafts .

**Solution:**  
 IndianRoots.ai is a creative solution leveraging Google Cloud's generative AI to empower local artisans by enhancing their digital presence,improve their marketing and sales strategies, and help them effectively tell the story of their craft.

---

##  Key Features  

- 🎙️ **Voice-to-Story Generation** With the Gemini API, artisans can narrate their stories verbally, and it will be converted into a written story.
- 📸 **AI Photo Enhancement** With Vertex AI Vision, product photos become more enhanced and attractive
- 🌍 **Multilingual Voice Narration** With Translation and Text to speech, stories can be narrated in different languages .
- 📈 **AI Marketing & Pricing Assistant** Gemini + MCP Toolbox help artisans in predicting price 
- 🔑 **Secure Login with Firebase** Email/Password + Google login support  
- 🛍️ **Products Listing** Easy add/view interface  
- 📖 **Artisan Stories** Storytelling feature for global audience

---

##  Tech Stack  

| Layer       | Technologies |
|-------------|--------------|
| **Frontend** | React, Tailwind CSS |
| **Backend**  | Node.js, Express.js |
| **AI/ML**    | Google Gemini, Vertex AI, MCP Toolbox |
| **Database & Auth** | Firebase Firestore, Firebase Authentication |
| **Deployment** | Google Cloud Run, Firebase Hosting |

---

##  How to Run Locally  

1. **Clone Repository**  
   git clone https://github.com/Akansha8Agrawal/local-artisans.git
cd local-artisans


## IndianRoots.ai – Frontend

This folder contains the React + Tailwind CSS frontend for IndianRoots.ai, the platform empowering Indian artisans with Generative AI.

## Features

 Modern UI built with React + Tailwind CSS

 Firebase Authentication (Email/Password + Google login)

 Product listing interface (Add/View products)

 Artisan storytelling feature (display written + narrated stories)

 Multilingual support (integrated with backend services)

 ## Tech Stack

React (UI framework)

Tailwind CSS (styling)

Firebase Auth (login & signup)

Axios (API calls to backend)

React Router (navigation)

## Setup Instructions

Navigate to frontend folder

cd frontend


Install dependencies

npm install


Create .env file
Add Firebase + API config values:

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


Run development server

npm start


Frontend will run on http://localhost:3000
 by default.


## IndianRoots.ai – Backend

This folder contains the Node.js + Express.js backend for IndianRoots.ai, handling APIs, authentication, and AI integrations.

## Features

 RESTful APIs for frontend

 Authentication with Firebase Admin SDK

 Voice-to-Story (Gemini API)

 Photo enhancement (Vertex AI Vision)

Translation + Text-to-Speech (Google Cloud APIs)

 AI-powered pricing suggestions (Gemini + MCP Toolbox)

## Tech Stack

Node.js (runtime)

Express.js (backend framework)

Firebase Admin SDK (user management)

Google Cloud APIs (Gemini, Vertex AI, Translation, TTS)

MCP Toolbox (AI pricing & marketing assistant)

## Setup Instructions

Navigate to backend folder

cd backend


Install dependencies

npm install


Create .env file
Add credentials:

PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

GOOGLE_API_KEY=your_google_api_key
GEMINI_API_KEY=your_gemini_api_key


Run backend server

npm run dev


Backend will run on http://localhost:5000
.

This is a final test.



                
