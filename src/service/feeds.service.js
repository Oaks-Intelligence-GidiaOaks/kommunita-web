import { FEEDS, POST } from "./constants";
import apiSlice from "./api/apiSlice";

export const feedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all feeds route
    getFeeds: builder.query({
      query: ({ page = 1, page_size = 10 } = {}) => ({
        url: `${FEEDS}?page=${page}&page_size=${page_size}`,
        method: "GET"
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs;
      },
      merge: (currentCache, newItems) => {
        console.log(newItems.data.data, "rtk");
        const d = newItems.data.data;
        currentCache.push(...d);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
  useLazyGetFeedsQuery
} = feedsApiSlice;
