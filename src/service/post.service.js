import { ADMIN_POST, POST } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all post route
    getPost: builder.query({
      query: () => ({
        url: POST,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getAdminPost: builder.query({
      query: () => ({
        url: ADMIN_POST,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/user/post/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/user/post",
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    lovePost: builder.mutation({
      query: (postData) => ({
        url: "/user/reaction/post",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),
    loveRepost: builder.mutation({
      query: (postData) => ({
        url: "/user/reaction/repost",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),

    favoritePost: builder.mutation({
      query: ({ postData, typ }) => ({
        url: `/user/${typ}/favourite`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),

    favoritePosts: builder.mutation({
      query: ( postData ) => ({
        url: `/user/post/favourite`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),
    favoriteReposts: builder.mutation({
      query: ( postData ) => ({
        url: `/user/repost/favourite`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),

    repostPost: builder.mutation({
      query: (postData) => ({
        url: "/user/post/repost",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),
    postCommentOnRepost: builder.mutation({
      query: (postData) => ({
        url: "/user/comment/repost",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Feeds"],
    }),

    postComment: builder.mutation({
      query: ({ content, id, reply }) => {
        const url = reply ? `/user/reply` : `/user/comment/post`;
        const body = reply
          ? { content, comment_id: id }
          : { content, post_id: id };
        return {
          url,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Feeds"],
    }),
    getOtherUserPost: builder.mutation({
      query: (id) => ({
        url: `user/post/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useCreatePostMutation,
  useLovePostMutation,
  useFavoritePostMutation,
  useFavoritePostsMutation,
  useRepostPostMutation,
  usePostCommentMutation,
  useGetOtherUserPostMutation,
  useGetSinglePostQuery,
  useLoveRepostMutation,
  useFavoriteRepostsMutation,
  usePostCommentOnRepostMutation,
  useGetAdminPostQuery,
} = organizationApiSlice;
