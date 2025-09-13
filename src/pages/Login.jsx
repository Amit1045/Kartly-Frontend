import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../ProductData/useAuth.js";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      if (data?.token) {
        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); 
      }

      alert("✅ Login successful");
      navigate("/home"); // redirect
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "❌ Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-purple-600 text-center">Login</h1>
        <p className="mt-2 text-center text-gray-500">
          Welcome back! Please login to continue.
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-2 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
