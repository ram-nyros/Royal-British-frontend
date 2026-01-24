import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApiSlice = createApi({
  reducerPath: "api",

  tagTypes: ["Auth", "User"],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: () => ({}),
});
