// feedsApiSlice.js
import { FEEDS, POST } from "./constants";
import apiSlice from "./api/apiSlice";

export const feedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeeds: builder.query({
      query: ({ page = 1, page_size = 10 } = {}) => ({
        url: `${FEEDS}?page=${page}&page_size=${page_size}`,
        method: "GET"
      }),
      providesTags: ["Feeds"]
    }),

    getMyFeeds: builder.query({
      query: ({ page = 1, page_size = 10 } = {}) => ({
        url: `${FEEDS}/following?page=${page}&page_size=${page_size}`,
        method: "GET"
      }),
      providesTags: ["Feeds"]
    }),

    getOtherFeeds: builder.mutation({
      query: (id) => ({
        url: `${FEEDS}/${id}`,
        method: "GET"
      }),
      providesTags: ["Feeds"]
    }),
    deleteFeed: builder.mutation({
      query: (id) => ({
        url: `${POST}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Feeds"]
    })
  })
});

export const {
  useGetFeedsQuery,
  useDeleteFeedMutation,
  useGetOtherFeedsMutation,
  useLazyGetFeedsQuery,
  useGetMyFeedsQuery,
  useLazyGetMyFeedsQuery
} = feedsApiSlice;
