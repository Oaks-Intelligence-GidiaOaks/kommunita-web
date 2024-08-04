import apiSlice from "../../service/api/apiSlice";
import { logoutUser } from "../slices/user.slice";

const logoutMiddleware = (store) => (next) => (action) => {
  if (action.type === logoutUser.type) {
    store.dispatch(apiSlice.util.resetApiState());
  }
  return next(action);
};

export default logoutMiddleware;
