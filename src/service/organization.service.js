import { ALL_ORGANIZATIONS, ALL_uSER_ORGANIZATIONS } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all organization route
    getAllOrganization: builder.query({
      query: () => ({
        url: ALL_ORGANIZATIONS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
    getUserOrganisation: builder.query({
      query: () => ({
        url: ALL_uSER_ORGANIZATIONS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
  }),
});

export const { useGetAllOrganizationQuery, useGetUserOrganisationQuery } = organizationApiSlice;
