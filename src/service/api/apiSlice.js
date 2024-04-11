import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../query-builder/customQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
<<<<<<< HEAD
  tagTypes: ["User", "Organization", "Feeds", "Post", "Diary"],
=======
  tagTypes: ["User", "Organization", "Feeds", "Category"],
>>>>>>> 51884412508fe273a12e7e2890ce7f24cffae654
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 50000,
});

export default apiSlice;
