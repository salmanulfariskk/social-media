import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute(props) {
  const { isLoggedIn } = useSelector(state => state.session);

  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return props.children;
}

export default PublicRoute;
