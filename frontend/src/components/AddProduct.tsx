import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { postProductWithAuth } from "../apiHelpers";

interface AddProductProps {
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddProduct: React.FC<AddProductProps> = ({ setProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 👤 Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!name.trim() || !price) {
      alert("⚠️ Please fill in all fields");
      return;
    }
    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    setLoading(true);
    try {
      const newProduct = {
        name,
        price: Number(price),
        artisan: user.displayName || user.email, // auto use user identity
        userId: user.uid,
      };

      // ✅ Post product with token
      const res = await postProductWithAuth(newProduct);

      // ✅ Update UI instantly
      setProducts((prev) => [...prev, { id: res.id, ...newProduct }]);

      // Reset form
      setName("");
      setPrice("");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 flex flex-col sm:flex-row gap-3">
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded w-32"
      />
      <button
        onClick={handleAdd}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
