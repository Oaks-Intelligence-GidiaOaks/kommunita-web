import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "../../configs/environment.config";
import { logoutUser } from "../../redux/slices/user.slice";
import { showAlert } from "../../static/alert";

const baseQuery = fetchBaseQuery({
  baseUrl: enviroment.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().user.token;
    // console.log(`Token: ${token}`);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check if result is null or undefined
  if (!result) {
    // Handle the case when result is null or undefined
    console.error("Result is null or undefined:", result);
    return null; // Or handle it according to your logic
  }

  // Check if there's an error in the result
  if (result.error) {
    if (result.error.status === 406) {
      api.dispatch(logoutUser());
      showAlert(
        "Inactive for too long",
        "Please login again to continue",
        "error"
      );
    } else if (result.error.status === 401) {
      api.dispatch(logoutUser());
      showAlert(
        "Access Token Expired",
        "Please login again to continue",
        "error"
      );
    }

    return null; // Or handle it according to your logic
  }

  // If result is not null and there's no error, return the result
  // console.log(result);
  return result;
};

export default customBaseQuery;
