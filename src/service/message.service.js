import { CONVERSATIONS, CHAT_MESSAGES } from "./constants";
import apiSlice from "./api/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all Conversations route
    getConversations: builder.query({
      query: () => ({
        url: CONVERSATIONS,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    getChatMessages: builder.query({
      query: (id) => ({
        url: `${CHAT_MESSAGES}/${id}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),

    sendMessage: builder.mutation({
      query: (message) => ({
        url: CHAT_MESSAGES,
        method: "POST",
        body: message,
      }),
    }),

    sendInitialMessage: builder.mutation({
      query: (message) => ({
        url: CHAT_MESSAGES,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Message"],
    }),

    readMessage: builder.mutation({
      query: (id) => ({
        url: `${CHAT_MESSAGES}/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${CHAT_MESSAGES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useSendInitialMessageMutation,
  useReadMessageMutation,
  useDeleteMessageMutation,
} = messageApiSlice;
