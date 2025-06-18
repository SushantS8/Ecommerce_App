import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border p-4 rounded shadow m-2 w-60">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
      <button
        className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
