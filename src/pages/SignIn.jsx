import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaLock } from "react-icons/fa";

import logo from "../assets/home-screen.png";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-red-700 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-2">
        <div className="bg-white/10 rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-28 h-28 mb-8 mx-auto bg-white rounded-2xl p-4 shadow-2xl">
              <img
                src={logo}
                alt="Royal British"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="uppercase tracking-[0.4em] text-sm text-white/70 mb-4 text-center">
              Welcome Back
            </p>
            <h2 className="text-3xl font-bold leading-tight text-center mb-6">
              Log in to continue your culinary journey
            </h2>
            <ul className="space-y-4">
              {[
                "Track your course applications",
                "Access premium learning resources",
                "Stay connected with mentors",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/80">
                  <FaCheckCircle className="mt-0.5 text-yellow-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3 text-white/70 text-sm mt-8">
            <FaLock />
            Secure login powered by Royal British
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-blue-900 uppercase tracking-[0.3em]">
              Sign In
            </p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">
              Welcome back
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Please enter your credentials to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 text-red-600 text-sm bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
              {error?.data?.message || "Invalid credentials"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-blue-900/30 hover:translate-y-0.5 transition disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-900 font-semibold">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
