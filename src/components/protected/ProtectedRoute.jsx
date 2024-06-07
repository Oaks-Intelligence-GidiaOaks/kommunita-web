import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LOGIN } from "../../routes/routes";
import { useSearchParams } from "react-router-dom";
import { updateUser } from "../../redux/slices/user.slice";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ component: Component }) => {
  const [searchParams] = useSearchParams();
  const external_token = searchParams.get("token");
  const authtoken = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  var isAuthenticated;

  if (authtoken) {
    isAuthenticated = authtoken !== null && authtoken !== undefined;
    console.log(authtoken);
  } else if (external_token) {
    dispatch(
      updateUser({
        token: external_token,
        // user,
      })
    );
    isAuthenticated = authtoken !== null && authtoken !== undefined;
    console.log(external_token);
  }

  return <>{isAuthenticated ? <Component /> : <Navigate to={LOGIN} />}</>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
