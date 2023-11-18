import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) return <Loading />;

  if (user?.email && isAdmin) return children;

  return (
    <Navigate to="/credentials/login" state={{ from: location }} replace />
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
