import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <h2 className="text-2xl font-bold">Profile</h2>
        </div>

        {/* Content */}
        {user ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
