import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await registerUser({ name, email, password }).unwrap();
      dispatch(setCredentials(data));
      navigate("/");
    } catch (err) {
      setError(err?.data?.message || err?.message);
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
          <button
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-900 font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
