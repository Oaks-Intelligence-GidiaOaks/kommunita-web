import { DIARY } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all diary route
    getDiary: builder.query({
      query: () => ({
        url: DIARY,
        method: "GET",
      }),
      providesTags: ["Diary"],
    }),

    createDiary: builder.mutation({
      query: (data) => ({
        url: DIARY,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feeds"],
    }),

    diaryComment: builder.mutation({
      query: ({ content, id, reply }) => {
        const url = reply ? `/user/reply` : `/user/comment/diary`;
        const body = reply
          ? { content, comment_id: id }
          : { content, diary_id: id };
        return {
          url,
          method: "POST",
          body,
        };
      },
      // invalidatesTags: ["Feeds", "Diary", "Post"],
    }),
  }),
});

export const {
  useGetDiaryQuery,
  useCreateDiaryMutation,
  useDiaryCommentMutation,
} = organizationApiSlice;
