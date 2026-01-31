import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaArrowLeft,
  FaCamera,
  FaUpload,
  FaTrash,
  FaEye,
  FaSpinner,
} from "react-icons/fa";
import { setUser } from "../features/auth/authSlice";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useUploadCertificateMutation,
  useDeleteFileMutation,
  getFileUrl,
} from "../features/auth/authApiSlice";
import { API_BASE_URL } from "../config/apiBaseUrl";

const CERTIFICATE_TYPES = [
  {
    key: "tenthMarksheet",
    label: "10th Marksheet",
    description: "SSC/10th class certificate",
  },
  {
    key: "interCertificate",
    label: "Intermediate Certificate",
    description: "12th/Inter certificate",
  },
  {
    key: "degreeCertificate",
    label: "Degree Certificate",
    description: "Graduation certificate",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // RTK Query hooks
  const {
    data: profileData,
    isLoading: loading,
    refetch,
  } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [uploadProfileImage, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();
  const [uploadCertificate] = useUploadCertificateMutation();
  const [deleteFile] = useDeleteFileMutation();

  const profile = profileData?.user;

  const [uploading, setUploading] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const profileImageRef = useRef(null);
  const certificateRefs = useRef({});

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      });
    }
  }, [profile]);

  // Handle profile image upload
  const handleProfileImageUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploading((prev) => ({ ...prev, profileImage: true }));
        await uploadProfileImage(file).unwrap();
        refetch();
      } catch (error) {
        console.error("Error uploading profile image:", error);
        alert(
          error?.data?.message || error.message || "Failed to upload image",
        );
      } finally {
        setUploading((prev) => ({ ...prev, profileImage: false }));
      }
    },
    [uploadProfileImage, refetch],
  );

  // Handle certificate upload
  const handleCertificateUpload = useCallback(
    async (type, e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploading((prev) => ({ ...prev, [type]: true }));
        await uploadCertificate({ type, file }).unwrap();
        refetch();
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
        alert(
          error?.data?.message || error.message || `Failed to upload ${type}`,
        );
      } finally {
        setUploading((prev) => ({ ...prev, [type]: false }));
      }
    },
    [uploadCertificate, refetch],
  );

  // Handle file deletion
  const handleDeleteFile = useCallback(
    async (type, fileId) => {
      if (!confirm("Are you sure you want to delete this file?")) return;

      try {
        setUploading((prev) => ({ ...prev, [type]: true }));
        await deleteFile({ type, fileId }).unwrap();
        refetch();
      } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        alert(
          error?.data?.message || error.message || `Failed to delete ${type}`,
        );
      } finally {
        setUploading((prev) => ({ ...prev, [type]: false }));
      }
    },
    [deleteFile, refetch],
  );

  // Handle profile update
  const handleProfileUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const data = await updateProfile(formData).unwrap();
        dispatch(setUser(data.user));
        setEditMode(false);
        refetch();
      } catch (error) {
        console.error("Error updating profile:", error);
        alert(
          error?.data?.message || error.message || "Failed to update profile",
        );
      }
    },
    [updateProfile, formData, dispatch, refetch],
  );

  // View file in new tab
  const viewFile = useCallback((type, fileId) => {
    const url = getFileUrl(API_BASE_URL, type, fileId);
    window.open(url, "_blank");
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            {/* Profile Image */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  {profile?.profileImage ? (
                    <img
                      src={getFileUrl(API_BASE_URL, "profileImage")}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                      {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => profileImageRef.current?.click()}
                  disabled={uploading.profileImage || isUploadingImage}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading.profileImage || isUploadingImage ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCamera />
                  )}
                </button>
                <input
                  ref={profileImageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {profile?.name}
                </h2>
                <p className="text-gray-500">{profile?.email}</p>
              </div>
            </div>

            {/* Profile Form */}
            {editMode ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street
                    </label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            street: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            city: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            state: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            zipCode: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          country: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUpdatingProfile ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">
                      {profile?.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {profile?.address?.city
                        ? `${profile.address.street || ""}, ${profile.address.city}, ${profile.address.state || ""} ${profile.address.zipCode || ""}`
                        : "Not provided"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Certificates & Documents
            </h3>

            <div className="space-y-4">
              {CERTIFICATE_TYPES.map((cert) => {
                const certificate = profile?.certificates?.[cert.key];
                const isUploading = uploading[cert.key];

                return (
                  <div key={cert.key} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {cert.label}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {cert.description}
                        </p>
                      </div>
                      {certificate && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Uploaded
                        </span>
                      )}
                    </div>

                    {certificate ? (
                      <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-semibold">
                              {certificate.mimeType?.includes("pdf")
                                ? "PDF"
                                : "IMG"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">
                              {certificate.originalName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(certificate.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewFile(cert.key)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDeleteFile(cert.key)}
                            disabled={isUploading}
                            className="p-2 text-red-600 hover:bg-red-100 rounded disabled:opacity-50"
                            title="Delete"
                          >
                            {isUploading ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <input
                          ref={(el) => (certificateRefs.current[cert.key] = el)}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => handleCertificateUpload(cert.key, e)}
                          className="hidden"
                        />
                        <button
                          onClick={() =>
                            certificateRefs.current[cert.key]?.click()
                          }
                          disabled={isUploading}
                          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isUploading ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <FaUpload />
                              Upload {cert.label}
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Other Documents Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Other Documents
                    </h4>
                    <p className="text-sm text-gray-500">
                      Additional certificates or documents
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {profile?.certificates?.otherDocuments?.length || 0} files
                  </span>
                </div>

                {/* List of other documents */}
                {profile?.certificates?.otherDocuments?.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {profile.certificates.otherDocuments.map((doc) => (
                      <div
                        key={doc._id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-semibold">
                              {doc.mimeType?.includes("pdf") ? "PDF" : "IMG"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px]">
                              {doc.originalName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewFile("other", doc._id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDeleteFile("other", doc._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload button for other documents */}
                <input
                  ref={(el) => (certificateRefs.current.other = el)}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => handleCertificateUpload("other", e)}
                  className="hidden"
                />
                <button
                  onClick={() => certificateRefs.current.other?.click()}
                  disabled={uploading.other}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploading.other ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      Add Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
