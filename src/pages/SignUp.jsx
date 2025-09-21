import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ProductData/useAuth.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup({ isLight }) {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ prevent multiple clicks
    try {
      await signup(email, fullName, password);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false); // ✅ reset after API call
    }
  };

  return (
    <div
      className={
        isLight
          ? "flex min-h-screen items-center justify-center bg-gray-100"
          : "flex min-h-screen items-center justify-center bg-[#1f2937]"
      }
    >
      <div
        className={
          isLight
            ? "w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
            : "w-full max-w-md rounded-2x bg-gray-600 p-8 shadow-lg text-white"
        }
      >
        {/* Header */}
        <h1
          className={
            isLight
              ? "text-3xl font-bold text-blue-600 text-center"
              : "text-3xl font-bold text-sky-300 text-center"
          }
        >
          SignUp
        </h1>
        <p
          className={
            isLight
              ? "mt-2 text-center text-gray-500"
              : "mt-2 text-center text-white"
          }
        >
          Welcome to Kartly!!
        </p>

        {/* Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSignup}>
          {/* Email */}
          <div>
            <label
              className={
                isLight
                  ? "block text-sm font-medium text-black"
                  : "block text-sm font-medium text-gray-300"
              }
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Name */}
          <div>
            <label
              className={
                isLight
                  ? "block text-sm font-medium text-black"
                  : "block text-sm font-medium text-gray-300"
              }
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name "
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={
                isLight
                  ? "block text-sm font-medium text-black"
                  : "block text-sm font-medium text-gray-300"
              }
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={
                  isLight
                    ? "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    : "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                }
                onClick={() => setShowPassword(!showPassword)}
                role="button"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-semibold transition-colors ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        {/* Already have account */}
        <p
          className={
            isLight
              ? "mt-6 text-center text-sm text-gray-600"
              : "mt-6 text-center text-sm text-white"
          }
        >
          Already have an account?{" "}
          <Link to={`/login`}>
            <button
              className={
                isLight
                  ? "text-blue-600 font-semibold hover:underline"
                  : "text-sky-300 font-semibold hover:underline"
              }
            >
              Login
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
