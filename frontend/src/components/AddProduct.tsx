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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!name || !price) {
      alert("Please fill in all fields");
      return;
    }
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      const newProduct = {
        name,
        price: Number(price),
        artisan: user.displayName || user.email, // auto use user
        userId: user.uid, // save userId for ownership
      };

      const res = await postProductWithAuth(newProduct);

      setProducts((prev) => [...prev, { id: res.id, ...newProduct }]);

      setName("");
      setPrice("");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="my-4">
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
