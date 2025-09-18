import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Products API error:", err));

    axios.get("http://localhost:5000/api/stories")
      .then(res => setStories(res.data))
      .catch(err => console.error("Stories API error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎨 AI-Powered Artisan Marketplace</h1>

      <h2>🛍️ Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – ₹{p.price} (By {p.artisan})
          </li>
        ))}
      </ul>

      <h2>📖 Stories</h2>
      <ul>
        {stories.map((s) => (
          <li key={s.id}>
            <b>{s.artisan}:</b> {s.story}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
