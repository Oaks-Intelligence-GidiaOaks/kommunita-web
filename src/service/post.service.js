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
  }),
});

export const {
  useGetPostQuery,
  useCreatePostMutation,
  useLovePostMutation,
  usePostCommentMutation,
} = organizationApiSlice;
