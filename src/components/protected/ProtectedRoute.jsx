import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LOGIN } from "../../routes/routes";

const ProtectedRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.user.token);

  const isAuthenticated = token !== null && token !== undefined;
  // const isAuthenticated = true;

  return <>{isAuthenticated ? <Component /> : <Navigate to={LOGIN} />}</>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
