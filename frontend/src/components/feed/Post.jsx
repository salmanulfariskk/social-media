import { useState } from "react";
import LikeButton from "../common/LikeButton";
import OptionDots from "../common/OptionDots";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

function Post({ post }) {
  const [liked, setLiked] = useState(post.liked === 1);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const { user } = useSelector(state => state.session)

  const handleLike = async () => {
    try {
      await axiosInstance.post(`/likes/${post.id}`);
      setLiked(!liked);
      setLikeCount(likeCount + (liked ? -1 : 1));
    } catch (error) {
      console.log(error?.response.data?.message);
    }
  };

  return (
    <div className="flex justify-center p-2">
      <div className="bg-white p-4 rounded shadow-md w-[500px] h-auto max-h-[700px]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-fuchsia-800 text-white rounded-full font-bold">
              {post.author.name[0].toUpperCase()}
            </div>
            <div className="ml-2 font-semibold">{post.author.name}</div>
          </div>
          {post.author.id !== user.id && (
            <OptionDots
              user={post.author}
            />
          )}
        </div>
        <img
          src={post.photo}
          alt="Post"
          className="w-full h-[350px] object-contain rounded"
        />
        <div className="mt-2 flex items-center">
          <LikeButton liked={liked} onToggleLike={handleLike} />
          <span className="ml-2">{likeCount} likes</span>
        </div>
        <div className="mt-2">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm break-words">{post.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
