import { rootApiSlice } from "../../store/rootApiSlice";

export const authApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApiSlice;
