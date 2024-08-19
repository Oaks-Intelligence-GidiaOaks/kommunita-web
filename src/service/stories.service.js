import { STORIES, STORYFEEDS } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all STORIES route
    getStories: builder.query({
      query: () => ({
        url: STORIES,
        method: "GET",
      }),
      providesTags: ["Story"],
    }),
    viewAStory: builder.mutation({
      query: (data) => ({
        url:`user/stories/view` ,
        method: "POST",
        body: data,
      }),
      providesTags: ["Story"],
    }),
    getStoriesFeed: builder.query({
      query: () => ({
        url: STORYFEEDS,
        method: "GET",
      }),
      providesTags: ["Story"],
    }),
    addStories: builder.mutation({
      query: (data) => ({
        url: STORIES,
        method: "POST",
        body: data,
      }),
      providesTags: ["Story"],
    }),
    addStoriesComment: builder.mutation({
      query: (data) => ({
        url:"user/comment/stories",
        method: "POST",
        body: data,
      }),
      providesTags: ["Story"],
    }),
  }),
});

export const { useGetStoriesQuery, useGetStoriesFeedQuery, useAddStoriesMutation, useViewAStoryMutation, useAddStoriesCommentMutation } = organizationApiSlice;
