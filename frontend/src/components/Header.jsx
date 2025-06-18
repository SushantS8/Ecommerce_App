import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login'); // or home page
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl font-bold">MyShop</h1>
      <nav>
        {userInfo ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {userInfo.name}</span>
            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
            <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
