import { FAVORITE } from "./constants";
import apiSlice from "./api/apiSlice";

export const favoritesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Favorite route
    getFavorites: builder.query({
      query: () => ({
        url: FAVORITE,
        method: "GET",
      }),
      providesTags: ["Favorite"],
    }),
  }),
});

export const { useGetFavoritesQuery } = favoritesApiSlice;
