import {
  USER_POST_STATS,
  ADMIN_USER_STATS,
  ADMIN_USER_ACTIVITY_STATS,
  ADMIN_USER_ANALYTICS_STATS,
} from "../constants";
import apiSlice from "../api/apiSlice";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get post stats route
    getPostStats: builder.query({
      query: () => ({
        url: USER_POST_STATS,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // get user stats
    getAminUserStats: builder.query({
      query: () => ({
        url: ADMIN_USER_STATS,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    getAminUserActivityStats: builder.query({
      query: () => ({
        url: ADMIN_USER_ACTIVITY_STATS,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    getAminUserAnalyticsStats: builder.query({
      query: () => ({
        url: ADMIN_USER_ANALYTICS_STATS,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetPostStatsQuery,
  useGetAminUserStatsQuery,
  useGetAminUserActivityStatsQuery,
  useGetAminUserAnalyticsStatsQuery,
} = statsApiSlice;
