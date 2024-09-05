import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check if user data exists in localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name); // Retrieve user's name from localStorage
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Extract the first letter of the user's name for the profile icon
  const profileIcon = userName ? userName[0].toUpperCase() : "?";

  return (
    <nav className="bg-fuchsia-950 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        SocialApp
      </Link>
      <div>
        {isLoggedIn ? (
          // Display the first letter of the user's name and Add Post link when logged in
          <div className="flex items-center ml-10">
            <Link to="/add-post" className="text-white hover:underline">
              <button className="p-2 rounded-md active:scale-95 hover:bg-fuchsia-600 bg-fuchsia-800">
                Add Post
              </button>
            </Link>

            <Link to="/profile" className="ml-4 flex items-center justify-center w-10 h-10 bg-fuchsia-800 text-white rounded-full text-xl font-bold">
              {profileIcon}
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
