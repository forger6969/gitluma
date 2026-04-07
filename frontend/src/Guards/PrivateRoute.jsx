import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;