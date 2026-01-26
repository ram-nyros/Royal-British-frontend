import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/apiBaseUrl";

export const rootApiSlice = createApi({
  reducerPath: "api",

  tagTypes: ["Auth", "User"],

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
