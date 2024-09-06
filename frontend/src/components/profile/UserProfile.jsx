import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { destroySession } from "../../features/session/sessionReducer";

function UserProfile() {
  const { user } = useSelector(state => state.session)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await axiosInstance.delete('/sessions')
      dispatch(destroySession())
    } catch (error) {
      console.log(error?.response.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[600px]">
      <div className="bg-white p-6 rounded shadow-md w-[400px] h-[400px] flex flex-col justify-between items-center">
        <div className="w-36 h-36 rounded-full bg-fuchsia-800 text-white flex justify-center items-center text-4xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <div className="flex space-x-4">
          <span className="font-semibold">{user.followers} Followers</span>
          <span className="font-semibold">{user.following} Following</span>
        </div>
        <button className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-800/90" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
