import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.user?.token);

  const isAuthenticated = token !== null && token !== undefined;

  return <>{isAuthenticated ? <Navigate to="/" /> : <Component />}</>;
  // return <>{isAuthenticated ? <Component /> : <Component />}</>;
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;
