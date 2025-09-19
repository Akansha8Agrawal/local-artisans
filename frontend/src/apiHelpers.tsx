// frontend/src/apiHelpers.tsx
import axios from "axios";
import { getAuth } from "firebase/auth";

const API_URL = "http://localhost:5000/api";

// append to your existing apiHelpers.tsx
export async function translateText(text: string, targetLang: string) {
  const res = await axios.post(`${API_URL}/translate`, { text, targetLang });
  return res.data.translatedText;
}

export async function fetchTranslateLangs() {
  const res = await axios.get(`${API_URL}/translate/langs`);
  return res.data; // array of { code, name }
}


// 🔑 Helper to get current token
async function getAuthHeaders() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const idToken = await user.getIdToken(/* forceRefresh */ false);

  return {
    Authorization: `Bearer ${idToken}`,
    "Content-Type": "application/json",
  };
}

// ✅ Post a new product
export async function postProductWithAuth(product: {
  name: string;
  price: number;
  artisan: string;
}) {
  const headers = await getAuthHeaders();
  const res = await axios.post(`${API_URL}/products`, product, { headers });
  return res.data;
}

// ✅ Post a new story
export async function postStoryWithAuth(story: {
  artisan: string;
  story: string;
}) {
  const headers = await getAuthHeaders();
  const res = await axios.post(`${API_URL}/stories`, story, { headers });
  return res.data;
}

// ✅ Get all products
export async function fetchProducts() {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
}

// ✅ Get all stories
export async function fetchStories() {
  const res = await axios.get(`${API_URL}/stories`);
  return res.data;
}
