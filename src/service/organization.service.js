import {
  ORGANIZATIONS,
  TOP_ORGANIZATION,
  SUPER_ADMIN_GET_ALL_USERS,
  ADMIN_GET_ALL_USERS,
  INDIVIDUAL_ORG_STATS,
  INDIVIDUAL_ADMIN_ORG_STATS,
} from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all organization route
    getOrganization: builder.query({
      query: () => ({
        url: ORGANIZATIONS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    // get top organization
    getTopOrganization: builder.query({
      query: () => ({
        url: TOP_ORGANIZATION,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    getSuperadminOrgUserStats: builder.query({
      query: () => ({
        url: SUPER_ADMIN_GET_ALL_USERS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    getAadminUserStats: builder.query({
      query: () => ({
        url: ADMIN_GET_ALL_USERS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    getIndividualSuperAdminOrgStats: builder.query({
      query: (id) => ({
        url: `${INDIVIDUAL_ORG_STATS}/${id}`,
        method: "GET",
      }),
      providesTags: ["SuperAdmin"],
    }),

    getIndividualAdminOrgStats: builder.query({
      query: (id) => ({
        url: `${INDIVIDUAL_ADMIN_ORG_STATS}/${id}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useGetTopOrganizationQuery,
  useGetSuperadminOrgUserStatsQuery,
  useGetAadminUserStatsQuery,
  useGetIndividualSuperAdminOrgStatsQuery,
  useGetIndividualAdminOrgStatsQuery,
} = organizationApiSlice;
