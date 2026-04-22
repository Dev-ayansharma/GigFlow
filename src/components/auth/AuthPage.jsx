"use client";

import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
const AuthPage = ({ onGetStarted }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "owner",
  });
  const [error, setError] = useState("");
  const { login,register } = useAuth();

  const handleSubmit = async () => {
    setError("");
    const result = isLogin
      ? await login(formData.email, formData.password)
        
      : await register(
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );

    if(result.success){
      toast.success("the operation is done")
    }
    if (!result.success) {
      setError(result.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* LOGO / TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">GigFlow</h1>
          <p className="text-gray-500 text-sm mt-1">
            Freelance Marketplace
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              isLogin
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              !isLogin
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* ✅ ROLE SELECTOR (ONLY SIGNUP) */}
          {!isLogin && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Select Role</p>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() =>
                    setFormData({ ...formData, role: "owner" })
                  }
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                    formData.role === "owner"
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Owner
                </button>
                <button
                  onClick={() =>
                    setFormData({ ...formData, role: "client" })
                  }
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                    formData.role === "client"
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Client
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

             <button
            onClick={onGetStarted}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Go back
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer font-medium"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;