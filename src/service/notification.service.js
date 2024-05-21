import { NOTIFICATIONS } from "./constants";
import apiSlice from "./api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all notification route
    getNotifications: builder.query({
      query: () => ({
        url: NOTIFICATIONS,
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApiSlice;
