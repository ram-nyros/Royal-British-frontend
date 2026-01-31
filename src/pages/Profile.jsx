import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaArrowLeft,
  FaCamera,
  FaUpload,
  FaTrash,
  FaEye,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaCity,
  FaGlobe,
} from "react-icons/fa";
import { setUser } from "../features/auth/authSlice";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useUploadCertificateMutation,
  useDeleteFileMutation,
} from "../features/auth/authApiSlice";

const CERTIFICATE_TYPES = [
  {
    key: "tenthMarksheet",
    label: "10th Marksheet",
    description: "SSC/10th class certificate",
    icon: FaGraduationCap,
    color: "blue",
  },
  {
    key: "interCertificate",
    label: "Intermediate Certificate",
    description: "12th/Inter certificate",
    icon: FaFileAlt,
    color: "green",
  },
  {
    key: "degreeCertificate",
    label: "Degree Certificate",
    description: "Graduation certificate",
    icon: FaGraduationCap,
    color: "purple",
  },
];

const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
  const [activeTab, setActiveTab] = useState("profile");
  const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });
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

  const handleProfileImageUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploading((prev) => ({ ...prev, profileImage: true }));
        await uploadProfileImage(file).unwrap();
        refetch();
        setSaveMessage({ type: "success", text: "Profile image updated!" });
        setTimeout(() => setSaveMessage({ type: "", text: "" }), 3000);
      } catch (error) {
        console.error("Error uploading profile image:", error);
        setSaveMessage({
          type: "error",
          text: error?.data?.message || "Failed to upload image",
        });
      } finally {
        setUploading((prev) => ({ ...prev, profileImage: false }));
      }
    },
    [uploadProfileImage, refetch],
  );

  const handleCertificateUpload = useCallback(
    async (type, e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploading((prev) => ({ ...prev, [type]: true }));
        await uploadCertificate({ type, file }).unwrap();
        refetch();
        setSaveMessage({
          type: "success",
          text: "Document uploaded successfully!",
        });
        setTimeout(() => setSaveMessage({ type: "", text: "" }), 3000);
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
        setSaveMessage({
          type: "error",
          text: error?.data?.message || `Failed to upload document`,
        });
      } finally {
        setUploading((prev) => ({ ...prev, [type]: false }));
      }
    },
    [uploadCertificate, refetch],
  );

  const handleDeleteFile = useCallback(
    async (type, fileId = null) => {
      if (!confirm("Are you sure you want to delete this file?")) return;

      try {
        await deleteFile({ type, fileId }).unwrap();
        refetch();
        setSaveMessage({ type: "success", text: "File deleted successfully!" });
        setTimeout(() => setSaveMessage({ type: "", text: "" }), 3000);
      } catch (error) {
        console.error("Error deleting file:", error);
        setSaveMessage({
          type: "error",
          text: error?.data?.message || "Failed to delete file",
        });
      }
    },
    [deleteFile, refetch],
  );

  const viewFile = useCallback(
    (type, fileId = null) => {
      let dataUrl = null;
      if (type === "profileImage") {
        dataUrl = profile?.profileImage?.dataUrl;
      } else if (type === "other" && fileId) {
        const doc = profile?.certificates?.otherDocuments?.find(
          (d) => d._id === fileId,
        );
        dataUrl = doc?.dataUrl;
      } else {
        dataUrl = profile?.certificates?.[type]?.dataUrl;
      }

      if (dataUrl) {
        window.open(dataUrl, "_blank");
      } else {
        alert("File not available");
      }
    },
    [profile],
  );

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData).unwrap();
      setEditMode(false);
      refetch();
      setSaveMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
      setTimeout(() => setSaveMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage({
        type: "error",
        text: error?.data?.message || "Failed to update profile",
      });
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const completionPercentage = () => {
    let completed = 0;
    let total = 7;
    if (profile?.name) completed++;
    if (profile?.email) completed++;
    if (profile?.phone) completed++;
    if (profile?.profileImage) completed++;
    if (profile?.certificates?.tenthMarksheet) completed++;
    if (profile?.certificates?.interCertificate) completed++;
    if (profile?.certificates?.degreeCertificate) completed++;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaArrowLeft />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
            </div>
            {saveMessage.text && (
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                  saveMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {saveMessage.type === "success" ? (
                  <FaCheckCircle />
                ) : (
                  <FaTimes />
                )}
                {saveMessage.text}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Profile Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative">
                  {/* Profile Image */}
                  <div className="relative inline-block">
                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      {profile?.profileImage?.dataUrl ? (
                        <img
                          src={profile.profileImage.dataUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <FaUser className="text-4xl text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => profileImageRef.current?.click()}
                      disabled={uploading.profileImage}
                      className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                    >
                      {uploading.profileImage ? (
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

                  <h2 className="text-xl font-bold text-white mt-4">
                    {profile?.name || "Your Name"}
                  </h2>
                  <p className="text-blue-100 text-sm">{profile?.email}</p>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Profile Completion
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {completionPercentage()}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage()}%` }}
                  />
                </div>
              </div>

              {/* Quick Info */}
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FaEnvelope className="text-blue-500" />
                  <span className="text-sm truncate">
                    {profile?.email || "Not set"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FaPhone className="text-green-500" />
                  <span className="text-sm">{profile?.phone || "Not set"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="text-sm">
                    {profile?.address?.city && profile?.address?.state
                      ? `${profile.address.city}, ${profile.address.state}`
                      : "Not set"}
                  </span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="px-4 py-3 bg-gray-50">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "profile"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "documents"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Documents
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "profile" ? (
              /* Profile Information Tab */
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Personal Information
                    </h3>
                    <p className="text-sm text-gray-500">
                      Update your personal details
                    </p>
                  </div>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                      <FaEdit />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateProfile}
                        disabled={isUpdatingProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                      >
                        {isUpdatingProfile ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaSave />
                        )}
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="text-gray-400" />
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                          {profile?.name || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="text-gray-400" />
                        Email Address
                      </label>
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                        {profile?.email || "Not set"}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="text-gray-400" />
                        Phone Number
                      </label>
                      {editMode ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                          {profile?.phone || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FaGlobe className="text-gray-400" />
                        Country
                      </label>
                      {editMode ? (
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter country"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                          {profile?.address?.country || "Not set"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="mt-8">
                    <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      Address Details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Street */}
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <FaHome className="text-gray-400" />
                          Street Address
                        </label>
                        {editMode ? (
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter street address"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                            {profile?.address?.street || "Not set"}
                          </div>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <FaCity className="text-gray-400" />
                          City
                        </label>
                        {editMode ? (
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter city"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                            {profile?.address?.city || "Not set"}
                          </div>
                        )}
                      </div>

                      {/* State */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          State
                        </label>
                        {editMode ? (
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter state"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                            {profile?.address?.state || "Not set"}
                          </div>
                        )}
                      </div>

                      {/* Zip Code */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          ZIP Code
                        </label>
                        {editMode ? (
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter ZIP code"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                            {profile?.address?.zipCode || "Not set"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Documents Tab */
              <div className="space-y-6">
                {/* Certificates Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">
                      Educational Documents
                    </h3>
                    <p className="text-sm text-gray-500">
                      Upload your certificates and marksheets
                    </p>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CERTIFICATE_TYPES.map((cert) => {
                      const certData = profile?.certificates?.[cert.key];
                      const isUploading = uploading[cert.key];
                      const IconComponent = cert.icon;
                      const isImage = certData?.mimeType?.startsWith("image/");

                      return (
                        <div
                          key={cert.key}
                          className={`relative border-2 rounded-xl overflow-hidden transition-all ${
                            certData
                              ? "border-green-200 bg-green-50"
                              : "border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                          }`}
                        >
                          {certData ? (
                            /* Uploaded Certificate Card */
                            <div>
                              {/* Certificate Preview */}
                              <div className="relative h-40 bg-gray-100">
                                {isImage ? (
                                  <img
                                    src={certData.dataUrl}
                                    alt={cert.label}
                                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => viewFile(cert.key)}
                                  />
                                ) : (
                                  <div
                                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                                    onClick={() => viewFile(cert.key)}
                                  >
                                    <FaFileAlt className="text-4xl text-red-500 mb-2" />
                                    <span className="text-xs text-gray-500 uppercase font-medium">
                                      {certData.mimeType?.split("/")[1] ||
                                        "PDF"}
                                    </span>
                                  </div>
                                )}
                                {/* Status Badge */}
                                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                  <FaCheckCircle className="text-[10px]" />
                                  Uploaded
                                </div>
                              </div>

                              {/* Certificate Info */}
                              <div className="p-4">
                                <h4 className="font-semibold text-gray-800 text-sm truncate">
                                  {cert.label}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1 truncate">
                                  {certData.originalName}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatFileSize(certData.size)}
                                </p>

                                {/* Actions */}
                                <div className="mt-3 flex items-center gap-2">
                                  <button
                                    onClick={() => handleDeleteFile(cert.key)}
                                    className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                  >
                                    <FaTrash />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Empty Upload Card */
                            <div className="p-4 text-center">
                              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-gray-100">
                                <IconComponent className="text-2xl text-gray-400" />
                              </div>
                              <h4 className="font-semibold text-gray-800 text-sm">
                                {cert.label}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {cert.description}
                              </p>
                              <input
                                ref={(el) =>
                                  (certificateRefs.current[cert.key] = el)
                                }
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={(e) =>
                                  handleCertificateUpload(cert.key, e)
                                }
                                className="hidden"
                              />
                              <button
                                onClick={() =>
                                  certificateRefs.current[cert.key]?.click()
                                }
                                disabled={isUploading}
                                className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {isUploading ? (
                                  <>
                                    <FaSpinner className="animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <FaUpload />
                                    Upload Document
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Other Documents Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Other Documents
                      </h3>
                      <p className="text-sm text-gray-500">
                        Additional certificates or documents
                      </p>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                      {profile?.certificates?.otherDocuments?.length || 0} files
                    </span>
                  </div>

                  <div className="p-6">
                    {profile?.certificates?.otherDocuments?.length > 0 && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {profile.certificates.otherDocuments.map((doc) => (
                          <div
                            key={doc._id}
                            className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                          >
                            {/* Document Preview */}
                            <div
                              className="h-32 bg-gray-100 cursor-pointer relative"
                              onClick={() => viewFile("other", doc._id)}
                            >
                              {doc.mimeType?.startsWith("image/") ? (
                                <img
                                  src={doc.dataUrl}
                                  alt={doc.originalName}
                                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center hover:bg-gray-200 transition-colors">
                                  <FaFileAlt className="text-3xl text-red-500 mb-1" />
                                  <span className="text-xs text-gray-500 uppercase font-medium">
                                    {doc.mimeType?.split("/")[1] || "File"}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Document Info */}
                            <div className="p-3">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {doc.originalName}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatFileSize(doc.size)}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <button
                                  onClick={() => viewFile("other", doc._id)}
                                  className="flex-1 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                >
                                  <FaEye className="text-[10px]" />
                                  View
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteFile("other", doc._id)
                                  }
                                  className="flex-1 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                >
                                  <FaTrash className="text-[10px]" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

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
                      className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
