import { POST } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all post route
    getPost: builder.query({
      query: () => ({
        url: POST,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetPostQuery } = organizationApiSlice;
