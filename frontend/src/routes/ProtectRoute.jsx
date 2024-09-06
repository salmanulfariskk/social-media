import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectRoute(props) {
  const { isLoggedIn } = useSelector((state) => state.session);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  console.log("pass");
  return props.children;
}

export default ProtectRoute;
