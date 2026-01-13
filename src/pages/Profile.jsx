import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SiteNavbar from "../pages/Home";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
          <p className="text-center">You are not signed in.</p>
        </div>
      </div>
    );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNavbar />
      <div className="pt-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="mt-2 w-full bg-gray-800 text-white py-3 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
