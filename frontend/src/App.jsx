import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfilePage from './pages/UserProfilePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import AddPost from './pages/AddPost';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-fuchsia-800">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/profile/:userId" element={<UserProfilePage />} /> */}
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
