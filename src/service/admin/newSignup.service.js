import { ADMIN_NEW_SIGNUP } from "../constants";
import apiSlice from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all new signup route
    getNewSignup: builder.query({
      query: () => ({
        url: ADMIN_NEW_SIGNUP,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetNewSignupQuery } = adminApiSlice;
