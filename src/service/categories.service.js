import { CATEGORY } from "./constants";
import apiSlice from "./api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all category route
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getCategoriesWithStat: builder.query({
      query: () => ({
        url: `${CATEGORY}/stats`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoriesWithStatQuery } =
  categoryApiSlice;
