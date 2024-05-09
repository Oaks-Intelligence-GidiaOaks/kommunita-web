import { POLLS } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all POLLS route
    getPolls: builder.query({
      query: () => ({
        url: POLLS,
        method: "GET",
      }),
      providesTags: ["Polls"],
    }),
  }),
});

export const { useGetPollsQuery } = organizationApiSlice;
