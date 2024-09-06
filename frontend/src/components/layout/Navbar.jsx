import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import Button from "../ui/button";

function Navbar() {
  const { isLoggedIn, user } = useSelector((state) => state.session);

  return (
    <nav className="bg-white drop-shadow-sm px-4 h-14 flex justify-between items-center">
      <Link to="/" className="text-xl text-fuchsia-800 font-bold tracking-wide uppercase select-none">
        Social Book
      </Link>
      <div className="space-x-4 flex">
        {isLoggedIn ? (
          <div className="flex items-center ml-10">
            <Link
              to="/add-post"
              className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-800/90"
            >
              Create post
            </Link>
            {/* <Button asChild>
            </Button> */}

            <Link
              to="/profile"
              className="ml-4 flex items-center justify-center w-10 h-10 bg-slate-100 text-black select-none rounded-full text-xl font-bold"
            >
              {user.name.charAt(0).toUpperCase()}
            </Link>
          </div>
        ) : (
          // Login and Register links when not logged in
          <>
            <Link to="/login" className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-black border border-solid border-[#ddd] hover:bg-black/10">Login</Link>
            <Link to="/register" className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-800/90">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
