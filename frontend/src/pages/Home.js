import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
