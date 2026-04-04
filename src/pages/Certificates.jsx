import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaQrcode,
  FaCamera,
  FaCertificate,
  FaCheck,
  FaExclamationCircle,
  FaDownload,
  FaCalendar,
  FaUser,
  FaFileAlt,
} from "react-icons/fa";
import { useGetProfileQuery } from "../features/auth/authApiSlice";
import QRCodeScanner from "../components/QRCodeScanner";

const Certificates = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCertificate, setScannedCertificate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const certificates = profileData?.issuedCertificates || [];

  const handleScanSuccess = (certificate) => {
    setScannedCertificate(certificate);
    setShowDetails(true);
    setShowScanner(false);
  };

  const isCertificateExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date() > new Date(expiryDate);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <FaArrowLeft className="text-xl text-gray-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <FaCertificate className="text-blue-600" />
              My Certificates
            </h1>
            <p className="text-gray-600 mt-1">
              View and scan your issued certificates
            </p>
          </div>
        </div>

        {/* Scan Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition shadow-lg font-semibold text-lg"
          >
            <FaCamera className="text-2xl" />
            Scan Certificate QR Code
          </button>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-pulse">
              <FaCertificate className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Loading certificates...</p>
            </div>
          </div>
        ) : certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Certificate Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <FaCertificate className="text-3xl" />
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                        cert.status === "active"
                          ? "bg-green-100 text-green-800"
                          : cert.status === "revoked"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {cert.status === "active" && <FaCheck />}
                      {cert.status.charAt(0).toUpperCase() +
                        cert.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{cert.certificateName}</h3>
                  {cert.description && (
                    <p className="text-blue-100 text-sm mt-2">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Certificate Details */}
                <div className="p-6 space-y-4">
                  {/* Certificate Number */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Certificate Number
                    </p>
                    <p className="font-mono text-sm text-gray-900 break-all">
                      {cert.certificateNumber}
                    </p>
                  </div>

                  {/* Issued By */}
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Issued By</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {cert.issuedBy}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-gray-400 text-sm" />
                      <div>
                        <p className="text-xs text-gray-500">Issued Date</p>
                        <p className="text-sm text-gray-900">
                          {formatDate(cert.issuedDate)}
                        </p>
                      </div>
                    </div>

                    {cert.expiryDate && (
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-gray-400 text-sm" />
                        <div>
                          <p className="text-xs text-gray-500">Expiry Date</p>
                          <p
                            className={`text-sm font-semibold ${
                              isCertificateExpired(cert.expiryDate)
                                ? "text-red-600"
                                : "text-gray-900"
                            }`}
                          >
                            {formatDate(cert.expiryDate)}
                            {isCertificateExpired(cert.expiryDate) && (
                              <span className="text-xs ml-2">(Expired)</span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QR Code Preview */}
                  {cert.qrCodeData && (
                    <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-3 font-semibold">
                        QR Code
                      </p>
                      <img
                        src={cert.qrCodeData}
                        alt="Certificate QR Code"
                        className="w-24 h-24 mx-auto"
                      />
                      <a
                        href={cert.qrCodeData}
                        download={`${cert.certificateName}-qr.png`}
                        className="flex items-center justify-center gap-2 mt-3 text-blue-600 hover:text-blue-800 transition font-semibold text-sm"
                      >
                        <FaDownload /> Download QR Code
                      </a>
                    </div>
                  )}

                  {/* Status Warning */}
                  {cert.status === "revoked" && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <FaExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">
                        This certificate has been revoked and is no longer
                        valid.
                      </p>
                    </div>
                  )}

                  {isCertificateExpired(cert.expiryDate) && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                      <FaExclamationCircle className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">
                        This certificate has expired.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaCertificate className="text-6xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Certificates Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't received any certificates yet. When an admin issues
              you a certificate, it will appear here.
            </p>
            <button
              onClick={() => setShowScanner(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              <FaCamera /> Scan QR Code
            </button>
          </div>
        )}

        {/* Scanned Certificate Details Modal */}
        {showDetails && scannedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCheck className="text-3xl" />
                  <h2 className="text-2xl font-bold">Certificate Verified</h2>
                </div>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setScannedCertificate(null);
                  }}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
                >
                  ✕
                </button>
              </div>

              {/* Details */}
              <div className="p-8 space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-green-800 font-semibold">
                    ✓ This certificate is valid and authentic
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Certificate Name
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {scannedCertificate.certificateName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Certificate #
                    </p>
                    <p className="text-lg font-mono text-gray-900">
                      {scannedCertificate.certificateNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Issued By
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {scannedCertificate.issuedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Issued Date
                    </p>
                    <p className="text-lg text-gray-900">
                      {formatDate(scannedCertificate.issuedDate)}
                    </p>
                  </div>

                  {scannedCertificate.expiryDate && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Expiry Date
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          isCertificateExpired(scannedCertificate.expiryDate)
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {formatDate(scannedCertificate.expiryDate)}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        scannedCertificate.status === "active"
                          ? "bg-green-100 text-green-800"
                          : scannedCertificate.status === "revoked"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <FaCheck />
                      {scannedCertificate.status.charAt(0).toUpperCase() +
                        scannedCertificate.status.slice(1)}
                    </span>
                  </div>
                </div>

                {scannedCertificate.description && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                      Description
                    </p>
                    <p className="text-gray-900">
                      {scannedCertificate.description}
                    </p>
                  </div>
                )}

                {/* Recipient Info */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Recipient
                  </p>
                  <p className="font-bold text-gray-900">
                    {scannedCertificate.userName}
                  </p>
                  <p className="text-sm text-gray-700">
                    {scannedCertificate.userEmail}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setScannedCertificate(null);
                  }}
                  className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Scanner Modal */}
        {showScanner && (
          <QRCodeScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Certificates;
