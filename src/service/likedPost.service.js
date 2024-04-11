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
  }),
});

export const { useGetLikedPostQuery } = organizationApiSlice;
