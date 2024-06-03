import { POST, DIARY } from "./constants";
import apiSlice from "./api/apiSlice";

export const exploreOrganizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all post route
    getExplorePost: builder.query({
      query: () => ({
        url: `${POST}/organization`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getExplorePostImages: builder.query({
      query: () => ({
        url: `${POST}/organization/images`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getExplorePostVideos: builder.query({
      query: () => ({
        url: `${POST}/organization/videos`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getExploreDiary: builder.query({
      query: () => ({
        url: `${DIARY}/organization`,
        method: "GET",
      }),
      providesTags: ["Diary"],
    }),
    getExploreDiaryCategory: builder.mutation({
      query: (cat) => ({
        url: `${DIARY}/organization?category=${cat}`,
        method: "GET",
      }),
      providesTags: ["Diary"],
    }),
    getExplorePostCategory: builder.mutation({
      query: (cat) => ({
        url: `${POST}/organization?category=${cat}`,
        method: "GET",
      }),
      providesTags: ["Diary"],
    }),
    // getOtherUserPost: builder.mutation({
    //   query: (id) => ({
    //     url: `user/post/user/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Post"],
    // }),
  }),
});

export const {
  useGetExplorePostQuery,
  useGetExploreDiaryQuery,
  useGetExplorePostImagesQuery,
  useGetExplorePostVideosQuery,
  useGetExploreDiaryCategoryMutation,
  useGetExplorePostCategoryMutation,
} = exploreOrganizationApiSlice;
