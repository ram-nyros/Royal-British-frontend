import { rootApiSlice } from "../../store/rootApiSlice";

export const authApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    submitApplication: builder.mutation({
      query: (data) => ({
        url: "/api/applications",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/api/upload/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/upload/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    uploadProfileImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: "/api/upload/profile-image",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    uploadCertificate: builder.mutation({
      query: ({ type, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/api/upload/certificate/${type}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteFile: builder.mutation({
      query: ({ type, fileId }) => ({
        url: fileId
          ? `/api/upload/file/${type}/${fileId}`
          : `/api/upload/file/${type}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    verifyCertificate: builder.mutation({
      query: (verificationToken) => ({
        url: "/api/admin/certificates/verify",
        method: "POST",
        body: { verificationToken },
      }),
      invalidatesTags: ["Certificates"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSubmitApplicationMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useUploadCertificateMutation,
  useDeleteFileMutation,
  useVerifyCertificateMutation,
} = authApiSlice;

// Helper to build file URLs
export const getFileUrl = (baseUrl, type, fileId) => {
  const path = fileId
    ? `/api/upload/file/${type}/${fileId}`
    : `/api/upload/file/${type}`;
  return `${baseUrl}${path}`;
};
