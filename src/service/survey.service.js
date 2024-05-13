import { SUBMIT_SURVEY_RESPONSE, SURVEY_FEEDS } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // submit survey route
    submitSurvey: builder.mutation({
      query: (data) => ({
        url: SUBMIT_SURVEY_RESPONSE,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Survey"],
    }),
    getSurveyFeeds: builder.query({
      query: () => ({
        url: SURVEY_FEEDS,
        method: "GET",
      }),
    }),
  }),
});

export const { useSubmitSurveyMutation, useGetSurveyFeedsQuery } =
  organizationApiSlice;
