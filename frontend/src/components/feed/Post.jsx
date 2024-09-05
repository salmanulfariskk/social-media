import React, { useState } from "react";
import LikeButton from "../common/LikeButton";
import OptionDots from "../common/OptionDots";

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };

  return (
    <div className="flex justify-center p-2">
      <div className="bg-white p-4 rounded shadow-md w-[500px] h-auto max-h-[700px]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img
              src={post.imageUrl}
              alt="Profile"
              className="w-10 h-10 object-cover rounded-full mr-2"
            />
            <div className="font-semibold">{post.username}</div>
          </div>
          <OptionDots />
        </div>
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-[350px] object-cover rounded"
        />
        <div className="mt-2 flex items-center">
          <LikeButton liked={liked} onLike={handleLike} />
          <span className="ml-2">{likeCount} likes</span>
        </div>
        <div className="mt-2">
          <p className="font-semibold">{post.username}</p>
          <p className="text-sm break-words">{post.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
