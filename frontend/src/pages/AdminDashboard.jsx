// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import AdminProductForm from '../components/AdminProductForm'; 

// function AdminDashboard() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const [reload, setReload] = useState(false);

//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     // Redirect non-admin users
//     if (!userInfo || !userInfo.isAdmin) {
//       navigate('/');
//     }

//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:5001/api/products');
//         setProducts(data);
//       } catch (err) {
//         setError('Failed to load products');
//       }
//     };

//     fetchProducts();
//   }, [reload, userInfo, navigate]);

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/products/${id}`, {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       });
//       setReload(!reload); // refresh product list
//     } catch (err) {
//       alert(err.response?.data?.message || 'Delete failed');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       {error && <p className="text-red-500">{error}</p>}

//       {products.map((product) => (
//         <div
//           key={product._id}
//           className="border p-4 mb-4 flex justify-between items-center"
//         >
//           <div>
//             <h2 className="font-semibold">{product.name}</h2>
//             <p>${product.price}</p>
//           </div>
//           <button
//             onClick={() => deleteProduct(product._id)}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import AdminProductForm from '../components/AdminProductForm';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); // adjust API URL if needed
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setReload(!reload);
    } catch (err) {
      setError(err.message || 'An error occurred while deleting');
    }
  };

  const handleProductAdded = () => {
    setReload(!reload);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Product creation form */}
      <AdminProductForm onProductAdded={handleProductAdded} />

      <h2 className="text-xl font-semibold mt-8 mb-4">Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p>${product.price}</p>
            </div>
            <button
              onClick={() => deleteProduct(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
