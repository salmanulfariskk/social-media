import React from "react";

function UserProfile({ user }) {
  return (
    <div className="flex justify-center items-center min-h-[600px]">
      <div className="bg-white p-6 rounded shadow-md w-[400px] h-[400px] flex flex-col justify-between items-center">
        <img className="w-36 h-36 rounded-full object-cover"
          src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSS1nO0q_mHLaAa2IgxX7yABEgX9CgOeB-5j0RaoMDwnwAP-6Mv9ZpA3Wrh-PNfbO5p6RsaoA2SxHRNK5s"
          alt=""
        />
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <div className="flex space-x-4">
          <span className="font-semibold">{user.followers} Followers</span>
          <span className="font-semibold">{user.following} Following</span>
        </div>
        <button className="bg-fuchsia-800 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
