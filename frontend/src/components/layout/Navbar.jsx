import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-fuchsia-950 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        SocialApp
      </Link>
      <div>
        {isLoggedIn ? (
          // Profile icon and Add Post link when logged in
          <div className="flex items-center ml-10">
            <Link to="/add-post" className="text-white hover:underline">
              <button className="p-2 rounded-md active:scale-95 hover:bg-fuchsia-600 bg-fuchsia-800">Add Post</button>
            </Link>

            <Link to="/profile" className="ml-4">
              <FaUserCircle className="text-3xl" />
            </Link>
          </div>
        ) : (
          // Login and Register links when not logged in
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
