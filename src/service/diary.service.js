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

    createDiary: builder.mutation({
      query: (data) => ({
        url: DIARY,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Diary"],
    }),
  }),
});

export const { useGetDiaryQuery, useCreateDiaryMutation } =
  organizationApiSlice;
