import { LIKEDPOST } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all post route
    getLikedPost: builder.query({
      query: () => ({
        url: LIKEDPOST,
        method: "GET",
      }),
      providesTags: ["LikedPost"],
    }),
    getOtherUserLikedPost: builder.mutation({
      query: (id) => ({
        url: `user/post/liked/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetLikedPostQuery, useGetOtherUserLikedPostMutation } =
  organizationApiSlice;
