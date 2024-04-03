import { GETUSER, LOGIN, REGISTER, DEACTIVATE_USER } from "./constants";
import apiSlice from "./api/apiSlice";
import { updateUser } from "../redux/slices/user.slice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login users route
    loginUser: builder.mutation({
      query: (userData) => ({
        url: LOGIN,
        body: userData,
        method: "POST",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          // const { accessToken, user } = data;
          const accessToken = data.data.accessToken;
          const user = data.data.user;
          const refreshToken = data.data.user.refreshToken;

          // console.log(refreshToken, "refreshToken");
          dispatch(
            updateUser({
              token: accessToken,
              user,
              refreshToken: refreshToken,
            })
          );
        } catch (error) {
          console.log(error);
          return;
        }
      },
      transformResponse: (response) => {
        // console.log(response, "rtk");
        return response;
      },
      invalidatesTags: ["User"],
    }),

    // Register users route
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // Get user route
    getUser: builder.query({
      query: () => ({
        url: GETUSER,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deActivateUser: builder.mutation({
      query: ({ id }) => ({
        url: `${DEACTIVATE_USER}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // // update user route
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: GETUSER,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // // Update user password
    // updatePassword: builder.mutation({
    //   query: (data) => ({
    //     url: UPDATE_USER_PASSWORD,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useDeActivateUserMutation,
} = userApiSlice;
