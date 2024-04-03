import { SUPER_ADMIN_SUBSCRIPTION } from "../constants";
import apiSlice from "../api/apiSlice";

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get subscription route
    getSubscription: builder.query({
      query: () => ({
        url: SUPER_ADMIN_SUBSCRIPTION,
        method: "GET",
      }),
      providesTags: ["SuperAdmin"],
    }),
  }),
});

export const { useGetSubscriptionQuery } = subscriptionApiSlice;
