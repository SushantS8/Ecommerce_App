import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });

      if (role === 'admin' && !data.isAdmin) {
        setError('You are not authorized as an admin.');
        return;
      }

      if (role === 'user' && data.isAdmin) {
        setError('Admins must select Admin role to login.');
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(role === 'admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto mt-20 p-8 shadow rounded">
      <h1 className="text-xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-600">{error}</p>}

      <label className="block mb-2">Login as:</label>
      <select
        className="border p-2 mb-4 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-4 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
