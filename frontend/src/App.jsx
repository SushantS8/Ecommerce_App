// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Cart from './pages/Cart';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import Header from './components/Header';


// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function NotFound() {
  return <div>404 - Page Not Found</div>;
}

// Example placeholder for admin route protection
function RequireAdmin({ children }) {
  const isAdmin = true; // Replace with your real admin check logic
  if (!isAdmin) {
    return <div>Access Denied</div>;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
