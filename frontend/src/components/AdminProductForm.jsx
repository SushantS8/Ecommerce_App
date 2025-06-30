import React, { useState } from 'react';

function AdminProductForm({
  initialValues = {
    name: '',
    price: '',
    description: '',
    image: null,
    brand: '',
    category: '',
    countInStock: '',
  },
  onSubmit,
  submitLabel = 'Create Product',
  allowImageUpload = true,
}) {
  const [formData, setFormData] = useState(() => ({
    name: initialValues.name || '',
    price: initialValues.price || '',
    description: initialValues.description || '',
    image: initialValues.image || null,
    brand: initialValues.brand || '',
    category: initialValues.category || '',
    countInStock: initialValues.countInStock || '',
  }));

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
      await onSubmit(formData);
      setSuccess(submitLabel === 'Create Product' ? 'Product added successfully!' : 'Product updated successfully!');

      if (submitLabel === 'Create Product') {
        setFormData({
          name: '',
          price: '',
          description: '',
          image: null,
          brand: '',
          category: '',
          countInStock: '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to submit');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{submitLabel}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {['name', 'price', 'description', 'brand', 'category', 'countInStock'].map((field) => (
        <div key={field}>
          <label className="block capitalize">{field}</label>
          <input
            type={field === 'price' || field === 'countInStock' ? 'number' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
      ))}

      {allowImageUpload && (
        <div>
          <label className="block capitalize">Image</label>

          {/* Show current image if editing */}
          {formData.image && typeof formData.image === 'string' && (
            <img src={formData.image} alt="Current" className="w-32 h-32 object-cover mb-2 rounded border" />
          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-2 py-1 rounded"
            required={submitLabel === 'Create Product'}
          />
        </div>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {submitLabel}
      </button>
    </form>
  );
}

export default AdminProductForm;
