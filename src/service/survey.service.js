import { SUBMIT_SURVEY_RESPONSE } from "./constants";
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
  }),
});

export const { useSubmitSurveyMutation } = organizationApiSlice;
