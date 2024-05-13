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
    createPoll: builder.mutation({
      query: (postData) => ({
        url: "/user/poll",
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetPollsQuery, useCreatePollMutation } = organizationApiSlice;
