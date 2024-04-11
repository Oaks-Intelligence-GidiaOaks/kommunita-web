import { ADVERT } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all diary route
    getAdvert: builder.query({
      query: () => ({
        url: ADVERT,
        method: "GET",
      }),
      providesTags: ["Advert"],
    }),
  }),
});

export const { useGetAdvertQuery } = organizationApiSlice;
