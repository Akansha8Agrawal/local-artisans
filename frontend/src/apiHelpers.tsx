// frontend/src/apiHelpers.tsx
import axios from "axios";
import { getAuth } from "firebase/auth";

const API_URL = "http://localhost:5000/api";

// --- Translation ---
export async function translateText(text: string, targetLang: string) {
  const res = await axios.post(`${API_URL}/translate`, { text, targetLang });
  return res.data.translatedText;
}

export async function fetchTranslateLangs() {
  const res = await axios.get(`${API_URL}/translate/langs`);
  return res.data; // array of { code, name }
}

// --- Auth helper ---
async function getAuthHeaders() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  // always refresh token
  const idToken = await user.getIdToken(true);

  return {
    Authorization: `Bearer ${idToken}`,
    "Content-Type": "application/json",
  };
}

// --- Products ---
export async function postProductWithAuth(product: {
  name: string;
  price: number;
  artisan: string;
}) {
  try {
    const headers = await getAuthHeaders();
    const res = await axios.post(`${API_URL}/products`, product, { headers });
    return res.data; // { success, id }
  } catch (err: any) {
    console.error("postProductWithAuth error:", err.response?.data || err.message);
    throw err;
  }
}

export async function fetchProducts() {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
}

// --- Stories ---
export async function postStoryWithAuth(story: {
  artisan: string;
  story: string;
}) {
  try {
    const headers = await getAuthHeaders();
    const res = await axios.post(`${API_URL}/stories`, story, { headers });
    return res.data; // { success, id }
  } catch (err: any) {
    console.error("postStoryWithAuth error:", err.response?.data || err.message);
    throw err;
  }
}

export async function fetchStories() {
  const res = await axios.get(`${API_URL}/stories`);
  return res.data;
}
