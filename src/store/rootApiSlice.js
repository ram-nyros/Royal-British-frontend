import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/apiBaseUrl";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log("[RTK Query] Request:", args);
  const result = await baseQuery(args, api, extraOptions);
  console.log("[RTK Query] Response:", result);

  if (result.error?.status === 401) {
    console.log("[RTK Query] 401 detected, logging out...");
    api.dispatch(logout());
  }

  return result;
};

export const rootApiSlice = createApi({
  reducerPath: "api",

  tagTypes: ["Auth", "User", "Certificates"],

  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
});
