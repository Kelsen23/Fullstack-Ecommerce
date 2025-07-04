import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    children
  ) : (
    <Navigate to={`${!userInfo ? "/login" : "/"}`} replace />
  );
};

export default AdminRoute;
