import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function LikeButton({ liked, onLike }) {
  return (
    <button onClick={onLike} className="text-red-500">
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default LikeButton;
