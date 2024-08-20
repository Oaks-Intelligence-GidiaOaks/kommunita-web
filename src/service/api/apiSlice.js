import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../query-builder/customQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,

  tagTypes: [
    "User",
    "Organization",
    "Feeds",
    "Category",
    "Post",
    "Diary",
    "LikedPost",
    "Story",
    "Polls",
    "WhoToFollow",
    "Survey",
    "Notification",
    "Favourite",
    "Message"
  ],

  endpoints: (builder) => ({}),
  keepUnusedDataFor: 60
});

export default apiSlice;
