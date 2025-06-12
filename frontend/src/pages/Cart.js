import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item._id} style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
          <h2>{item.name}</h2>
          <p>${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
          />
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
