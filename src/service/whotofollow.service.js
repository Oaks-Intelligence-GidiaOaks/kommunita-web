import { WHOTOFOLLOW } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all diary route
    getWhoToFollow: builder.query({
      query: () => ({
        url: WHOTOFOLLOW,
        method: "GET",
      }),
      providesTags: ["WhoToFollow"],
    }),
  }),
});

export const { useGetWhoToFollowQuery } = organizationApiSlice;
