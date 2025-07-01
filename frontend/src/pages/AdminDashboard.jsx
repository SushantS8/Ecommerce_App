import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminProductForm from '../components/AdminProductForm';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  const fetchProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = userInfo ? { headers: { Authorization: `Bearer ${userInfo.accessToken}` } } : {};
      const { data } = await axios.get('/api/products', config);
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      });
      setReload(r => !r);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleCreateSubmit = async (formData) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const payload = new FormData();

      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      await axios.post('/api/products', payload, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setReload(r => !r);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const payload = new FormData();

      for (const key in formData) {
        if (formData[key] !== undefined && formData[key] !== null) {
          payload.append(key, formData[key]);
        }
      }

      await axios.put(`/api/products/${editingProduct}`, payload, {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditingProduct(null);
      setReload(r => !r);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!editingProduct && (
        <AdminProductForm
          onSubmit={handleCreateSubmit}
          submitLabel="Add Product"
          allowImageUpload={true}
        />
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map(product => (
          <div key={product._id} className="border rounded p-4 mb-4">
            {editingProduct === product._id ? (
              <AdminProductForm
                initialValues={product}
                onSubmit={handleEditSubmit}
                submitLabel="Update Product"
                allowImageUpload={true}
              />
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>${product.price}</p>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover mt-2 rounded border"
                    />
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingProduct(product._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
