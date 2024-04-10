import { POST, MEDIA } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all media route
    getMedia: builder.query({
      query: () => ({
        url: MEDIA,
        method: "GET",
      }),
      providesTags: ["Media"],
    }),
  }),
});

export const { useGetMediaQuery } = organizationApiSlice;
