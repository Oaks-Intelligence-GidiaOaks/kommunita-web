import { ALL_ORGANIZATIONS, ALL_uSER_ORGANIZATIONS, SWITCH_ORGANIZATIONS } from "./constants";
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
    switchOrganisation: builder.mutation({
      query: (postData) => ({
        url: SWITCH_ORGANIZATIONS,
        body: postData,
        method: "POST",
      }),
      providesTags: ["Organization"],
    }),
  }),
});

export const { useGetAllOrganizationQuery, useGetUserOrganisationQuery, useSwitchOrganisationMutation } = organizationApiSlice;
