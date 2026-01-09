import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.auth.register({ name, email, password });
      navigate("/");
    } catch (err) {
      setError(err.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          />
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
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">
            Create Account
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-900 font-semibold">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
