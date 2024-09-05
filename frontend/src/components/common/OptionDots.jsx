import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';

function OptionDots() {
  const [isFollowing, setIsFollowing] = useState(true);

  return (
    <button className="flex items-center text-gray-600">
      {isFollowing ? (
        <div className="flex items-center">
          <RiUserUnfollowLine className="text-xl mr-2 font-semibold" />
          <span className="text-xs font-semibold">Unfollow</span>
        </div>
      ) : (
        <div className="flex items-center">
          <RiUserFollowLine className="text-2xl mr-2 font-semibold" />
          <span className="text-xs font-semibold">Following</span>
        </div>
      )}
      {/* <FaEllipsisV /> */}
    </button>
  );
}

export default OptionDots;
