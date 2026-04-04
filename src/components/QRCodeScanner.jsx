import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import {
  FaCamera,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

const QRCodeScanner = ({ onScanSuccess, onClose }) => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      async (result) => {
        setScanning(false);
        setResult(result.data);

        // Verify the certificate
        try {
          setLoading(true);
          const response = await fetch("/api/admin/certificates/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              verificationToken: result.data,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            setError(data.message || "Certificate verification failed");
            return;
          }

          // Success
          onScanSuccess(data.certificate);
        } catch (err) {
          setError("Error verifying certificate: " + err.message);
        } finally {
          setLoading(false);
        }
      },
      {
        onDecodeError: () => {
          // Silently ignore decode errors
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScans: 1,
      },
    );

    qrScannerRef.current = qrScanner;

    return () => {
      qrScanner.destroy();
    };
  }, [onScanSuccess]);

  const handleRetry = () => {
    setResult(null);
    setError(null);
    setScanning(true);
    if (qrScannerRef.current) {
      qrScannerRef.current.start();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCamera className="text-white text-2xl" />
            <h2 className="text-white text-xl font-bold">
              Scan Certificate QR
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Scanner Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 font-semibold">
                Verifying certificate...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
              <FaExclamationCircle className="text-4xl text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-red-800 mb-2">
                Verification Failed
              </h3>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Scan Again
              </button>
            </div>
          ) : result ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">
                Certificate Verified!
              </h3>
              <p className="text-green-700 text-sm mb-2">
                QR code scanned successfully. Processing verification...
              </p>
              <div className="text-gray-600 text-xs mt-4 p-3 bg-gray-100 rounded break-all">
                Token: {result}
              </div>
            </div>
          ) : (
            <>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6 aspect-square">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                />
                <div className="absolute inset-0 border-2 border-green-400 rounded-lg pointer-events-none">
                  <div className="absolute inset-2 border-2 border-dashed border-green-300 rounded-lg"></div>
                </div>
              </div>
              <p className="text-center text-gray-600 text-sm">
                Point your camera at the QR code to scan the certificate
              </p>
              <button
                onClick={onClose}
                className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
