import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import StoriesList from "./components/StoriesList";
import AddStory from "./components/AddStory";
import Auth from "./components/Auth";
import { fetchProducts, fetchStories } from "./apiHelpers";
import { getAuth } from "firebase/auth"; // 🔑 for token test

// 🔹 Types
interface Product {
  id: string;
  name: string;
  price: number;
  artisan: string;
}

interface Story {
  id: string;
  artisan: string;
  story: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch products + stories on load
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, storiesData] = await Promise.all([
          fetchProducts(),
          fetchStories(),
        ]);
        setProducts(productsData);
        setStories(storiesData);
      } catch (err: any) {
        console.error("API error:", err);
        setError("Failed to load data. Please check backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔑 Quick Firebase ID token tester
  const handleGetToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    const token = await user.getIdToken();
    console.log("🔥 Firebase ID Token:", token);
    alert("Token copied in console. Use it in Postman header!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Header */}
      <header className="bg-indigo-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold text-center">
          🎨 AI-Powered Artisan Marketplace
        </h1>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {/* ✅ Show error or loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {/* 🔑 Authentication */}
        <section className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">🔑 Login / Register</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <Auth />
          </div>
          {/* 🧪 Debug: Get Firebase Token */}
          <button
            onClick={handleGetToken}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            🔑 Get My Firebase ID Token
          </button>
        </section>

        {/* 🛍️ Products Section */}
        <section className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">🛍️ Products</h2>
          <ProductList products={products} />
          <div className="mt-6">
            <AddProduct setProducts={setProducts} />
          </div>
        </section>

        {/* 📖 Stories Section */}
        <section className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">📖 Artisan Stories</h2>
          <StoriesList stories={stories} />
          <div className="mt-6">
            <AddStory setStories={setStories} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
