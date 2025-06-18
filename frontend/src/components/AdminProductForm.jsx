import React, { useState } from 'react';

function AdminProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    brand: '',
    category: '',
    countInStock: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!response.ok) throw new Error('Failed to add product');

      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        description: '',
        image: null,
        brand: '',
        category: '',
        countInStock: '',
      });

      if (onProductAdded) onProductAdded();
    } catch (err) {
      setError(err.message || 'Failed to submit');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {['name', 'price', 'description', 'image', 'brand', 'category', 'countInStock'].map((field) => (
        <div key={field}>
          <label className="block capitalize">{field}</label>
          {field === 'image' ? (
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          ) : (
            <input
              type={field === 'price' || field === 'countInStock' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          )}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Product
      </button>
    </form>
  );
}

export default AdminProductForm;
