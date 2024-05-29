import { FEEDS, POST } from "./constants";
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
    deleteFeed: builder.mutation({
      query: (id) => ({
        url: `${POST}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feeds"],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useDeleteFeedMutation,
  useGetOtherFeedsMutation,
} = feedsApiSlice;
