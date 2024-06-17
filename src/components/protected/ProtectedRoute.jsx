import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LOGIN } from "../../routes/routes";
import { useSearchParams } from "react-router-dom";
import { updateUser } from "../../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { showAlert } from "../../static/alert";
import axios from "axios";
import { handleLogout } from "../../static/logout";

const ProtectedRoute = ({ component: Component }) => {
  const [searchParams] = useSearchParams();
  const external_token = searchParams.get("token");
  const authtoken = useSelector((state) => state.user.token);

  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const dispatch = useDispatch();
  var isAuthenticated;

  // const dispatch = useDispatch();

  // if (authtoken) {
  //   isAuthenticated = authtoken !== null && authtoken !== undefined;
  //   console.log(authtoken);
  // } else if (external_token) {
  //   dispatch(
  //     updateUser({
  //       token: external_token,
  //       // user,
  //     })
  //   );
  //   isAuthenticated = authtoken !== null && authtoken !== undefined;
  //   console.log(external_token);
  // }

  const getNewUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/me`, {
        headers: {
          // "Content-Type": "multipart/form-data",
          ...(external_token && { Authorization: `Bearer ${external_token}` }),
        },
      });

      console.log("User gotten successfully:", response.data);
      dispatch(
        updateUser({
          token: external_token,
          user: response?.data?.data,
        })
      );

      isAuthenticated = external_token !== null && external_token !== undefined;
      console.log("external_token is available");

      showAlert("Great!", "User retrieved successfully", "success");
    } catch (error) {
      console.error("Error fetching user:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
      handleLogout(dispatch);
    }
  };

  if (external_token) {
    getNewUser();
    console.log("External token: ", external_token);
  } else if (authtoken) {
    isAuthenticated = authtoken !== null && authtoken !== undefined;
    console.log("authtoken: ", authtoken);
  }

  return <>{isAuthenticated ? <Component /> : <Navigate to={LOGIN} />}</>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
