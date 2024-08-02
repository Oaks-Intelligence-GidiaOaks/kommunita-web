import { POST } from "./constants";
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

    repostPost: builder.mutation({
      query: (postData) => ({
        url: "/user/post/repost",
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
} = organizationApiSlice;
