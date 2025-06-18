import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter(item => item._id !== id);
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (cartItems.length === 0) return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right font-semibold text-xl">
        Total: ${totalPrice.toFixed(2)}
      </div>
      <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
