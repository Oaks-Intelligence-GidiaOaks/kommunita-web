import { DIARY } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all diary route
    getDiary: builder.query({
      query: () => ({
        url: DIARY,
        method: "GET",
      }),
      providesTags: ["Diary"],
    }),
  }),
});

export const { useGetDiaryQuery } = organizationApiSlice;
