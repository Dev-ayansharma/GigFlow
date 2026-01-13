import { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { AuthContext } from "./AuthContext";
import socketService from "../services/socket";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.checkAuth();
        setUser(res?.data);
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (user?._id) {
      socketService.connect(user._id);
    }
  }, [user?._id]);

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      if (res.data?.user) {
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: res.message };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.register(name, email, password);
      if (res?.data) {
        setUser(res.data);
        return { success: true };
      }
      return { success: false, error: res.message };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = async () => {
    await api.logout();
    socketService.disconnect();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
