import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [login, { isLoading, error }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ email, password }).unwrap();

      dispatch(setCredentials(data));

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error?.data?.message || "Invalid credentials"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          />

          <button
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-900 font-semibold">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
