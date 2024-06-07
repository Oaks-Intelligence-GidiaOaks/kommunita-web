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
      providesTags: ["Favourite"],
    }),

    getFilteredFavorites: builder.query({
      query: (type) => ({
        url: `${FAVORITE}?filter_by=${type}`,
        method: "GET",
      }),
      providesTags: ["Favourite"],
    }),
  }),
});

export const { useGetFavoritesQuery, useGetFilteredFavoritesQuery } =
  favoritesApiSlice;
