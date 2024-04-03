import {
  SUPER_ADMIN_USER_STATISTICS,
  USER_OVERALL_ACTIVITY,
} from "../constants";
import apiSlice from "../api/apiSlice";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get stats route
    getUserStats: builder.query({
      query: () => ({
        url: SUPER_ADMIN_USER_STATISTICS,
        method: "GET",
      }),
      providesTags: ["SuperAdmin"],
    }),

    // Get user overall activity
    getUserOverallActivity: builder.query({
      query: () => ({
        url: USER_OVERALL_ACTIVITY,
        method: "GET",
      }),
      providesTags: ["SuperAdmin"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetUserOverallActivityQuery } =
  statsApiSlice;
