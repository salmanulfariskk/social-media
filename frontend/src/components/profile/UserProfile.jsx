import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }
  const profileIcon = user.name ? user.name[0].toUpperCase() : "?";

  return (
    <div className="flex justify-center items-center min-h-[600px]">
      <div className="bg-white p-6 rounded shadow-md w-[400px] h-[400px] flex flex-col justify-between items-center">
        <div className="w-36 h-36 rounded-full bg-fuchsia-800 text-white flex justify-center items-center text-4xl font-bold">
          {profileIcon}
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <div className="flex space-x-4">
          <span className="font-semibold">{user.followers || 0} Followers</span>
          <span className="font-semibold">{user.following || 0} Following</span>
        </div>
        <button className="bg-fuchsia-800 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
