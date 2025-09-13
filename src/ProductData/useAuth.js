// useAuth.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({ baseURL: API_URL });

export function useAuth() {
  // Login function
  const login = async ( email , password ) => {
    const res = await api.post("/auth/login", { email , password });
    return res.data; // returns { token, user }
  };

  // Signup function (optional: can also return token)
  const signup = async (email, fullname, password) => {
    const res = await api.post("/auth/signup", { email, fullname, password });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => !!localStorage.getItem("token");

  return { login, signup, logout, isLoggedIn };
}
