import { ALL_ORGANIZATIONS } from "./constants";
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
  }),
});

export const { useGetAllOrganizationQuery } = organizationApiSlice;
