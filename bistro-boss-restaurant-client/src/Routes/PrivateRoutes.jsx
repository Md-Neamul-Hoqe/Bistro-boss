import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (user?.email) return children;

  return (
    <Navigate to="/credentials/login" state={{ from: location }} replace />
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
