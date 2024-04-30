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
  }),
});

export const { useGetStoriesQuery } = organizationApiSlice;
