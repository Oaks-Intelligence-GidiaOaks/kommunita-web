import { STORIES } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all STORIES route
    getStories: builder.query({
      query: () => ({
        url: STORIES,
        method: "GET",
      }),
      providesTags: ["Story"],
    }),
    addStories: builder.mutation({
      query: (data) => ({
        url: STORIES,
        method: "POST",
        body: data,
      }),
      providesTags: ["Story"],
    }),
  }),
});

export const { useGetStoriesQuery, useAddStoriesMutation } = organizationApiSlice;
