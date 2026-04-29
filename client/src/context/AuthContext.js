"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("kharche_token");
    const storedUser = localStorage.getItem("kharche_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.data);
      setToken(data.data.token);
      localStorage.setItem("kharche_token", data.data.token);
      localStorage.setItem("kharche_user", JSON.stringify(data.data));
    }
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.data);
      setToken(data.data.token);
      localStorage.setItem("kharche_token", data.data.token);
      localStorage.setItem("kharche_user", JSON.stringify(data.data));
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("kharche_token");
    localStorage.removeItem("kharche_user");
  };

  const updateUserBudget = (newBudget) => {
    const updatedUser = { ...user, monthlyBudget: newBudget };
    setUser(updatedUser);
    localStorage.setItem("kharche_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, updateUserBudget }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
