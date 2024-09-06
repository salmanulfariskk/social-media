import { FaHeart, FaRegHeart } from 'react-icons/fa';

function LikeButton({ liked, onToggleLike }) {
  return (
    <button onClick={onToggleLike} className="text-red-500">
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default LikeButton;
