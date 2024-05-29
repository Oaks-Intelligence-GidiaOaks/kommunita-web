import {
  GETUSER,
  LOGIN,
  REGISTER,
  ALL_ORGANIZATIONS,
  GET_CODE,
  RESET_PASSWORD,
} from "./constants";
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
          const accessToken = data.data.data.accessToken;
          const user = data.data.data.user;

          // console.log(data.data.data, "data");
          dispatch(
            updateUser({
              token: accessToken,
              user,
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
    getUserProfiile: builder.query({
      query: () => ({
        url: GETUSER,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Get other user route
    getOtherUserProfile: builder.mutation({
      query: (id) => ({
        url: `user/profile/${id}`,
        method: "GET",
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

    getOrganization: builder.query({
      query: () => ({
        url: ALL_ORGANIZATIONS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    getCode: builder.mutation({
      query: (data) => ({
        url: GET_CODE,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserProfiileQuery,
  useGetOtherUserProfileMutation,
  useGetOrganizationQuery,
  useGetCodeMutation,
  useUpdatePasswordMutation,
} = userApiSlice;
