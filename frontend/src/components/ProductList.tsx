import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  artisan: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products yet. Add one above 👆</p>;
  }

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {products.map((p) => (
        <li
          key={p.id}
          style={{
            marginBottom: "8px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <strong>{p.name}</strong> – ₹{p.price.toFixed(2)} <br />
          <small>By {p.artisan}</small>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
