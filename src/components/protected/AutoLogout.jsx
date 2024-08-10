import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/user.slice";
import { showAlert } from "../../static/alert";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const user = useSelector((state) => state.user?.user);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const handleUserActivity = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        const inactivityThreshold = 15 * 60 * 1000; // 15 minutes in milliseconds
        const timePerInterval = Date.now();
        const inactiveTime = timePerInterval - lastActivityTime;

        if (inactiveTime > inactivityThreshold) {
          clearInterval(interval); // Clear the interval before logging out
          dispatch(logoutUser());
          showAlert(
            "You were logged out",
            "because you were inactive for too long",
            "error"
          );

          // Redirect to login page or reload the page
          window.location.href = "/signin";
          // Or reload the page
          // window.location.reload();
        }
      }, 1000);

      setLogoutTimer(interval);

      window.addEventListener("click", handleUserActivity);

      return () => {
        clearInterval(interval);
        window.removeEventListener("click", handleUserActivity);
      };
    } else if (logoutTimer) {
      clearInterval(logoutTimer);
    }
  }, [lastActivityTime, dispatch, user]);

  return null; // The component doesn't render anything, it just handles the logic
};

export default AutoLogout;
