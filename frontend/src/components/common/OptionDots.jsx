import { memo, useState } from "react";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import axiosInstance from "../../utils/axiosInstance";

function OptionDots({ user }) {
  const [isFollowing, setIsFollowing] = useState(user.following === 1)

  const handleFollow = async () => {
    try {
      await axiosInstance.post(`/friendships/${user.id}`)
      setIsFollowing(prev => !prev)
    } catch (error) {
      console.log(error?.response.data?.message)
    }
  };

  const handleUnFollow = async () => {
    try {
      await axiosInstance.delete(`/friendships/${user.id}`)
      setIsFollowing(prev => !prev)
    } catch (error) {
      console.log(error?.response.data?.message)
    }
  };

  return (
    <button
      onClick={() => {
        !isFollowing ? handleFollow() : handleUnFollow();
      }}
      className="flex items-center text-gray-600"
    >
      {isFollowing ? (
        <div className="flex items-center">
          <RiUserUnfollowLine className="text-xl mr-2 font-semibold" />
          <span className="text-xs font-semibold">Unfollow</span>
        </div>
      ) : (
        <div className="flex items-center">
          <RiUserFollowLine className="text-2xl mr-2 font-semibold" />
          <span className="text-xs font-semibold">Follow</span>
        </div>
      )}
      {/* <FaEllipsisV /> */}
    </button>
  );
}

export default memo(OptionDots);
