import { SEARCH } from "./constants";
import apiSlice from "./api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Search route route
    searchGeneral: builder.mutation({
      query: (postData) => ({
        url: SEARCH,
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSearchGeneralMutation } = searchApiSlice;
