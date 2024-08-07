import { WHOTOFOLLOW } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all diary route
    getWhoToFollow: builder.query({
      query: () => ({
        url: WHOTOFOLLOW,
        method: "GET",
      }),
      providesTags: ["WhoToFollow"],
    }),
    getMyFollowers: builder.query({
      query: () => ({
        url: '/user/me/followers',
        method: "GET",
      }),
      providesTags: ["WhoToFollow"],
    }),
    getMyFollowings: builder.query({
      query: () => ({
        url: 'user/me/followings',
        method: "GET",
      }),
      providesTags: ["WhoToFollow"],
    }),
    followUser: builder.mutation({
      query: (postData) => ({
        url: "/user/follow",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["WhoToFollow"],
    }),
    unfollowUser: builder.mutation({
      query: (postData) => ({
        url: "/user/unfollow",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["WhoToFollow"],
    }),
  }),
});

export const {
  useGetWhoToFollowQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetMyFollowersQuery,
  useGetMyFollowingsQuery,
} = organizationApiSlice;
