import { FEEDS } from "./constants";
import apiSlice from "./api/apiSlice";

export const feedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all feeds route
    getFeeds: builder.query({
      query: () => ({
        url: FEEDS,
        method: "GET",
      }),
      providesTags: ["Feeds"],
    }),
    getOtherFeeds: builder.mutation({
      query: (id) => ({
        url: `${FEEDS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Feeds"],
    }),
  }),
});

export const { useGetFeedsQuery, useGetOtherFeedsMutation } = feedsApiSlice;
