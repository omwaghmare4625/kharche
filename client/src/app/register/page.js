"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const data = await register(name, email, password);
      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-olive">Kharche</h1>
          <p className="text-text-secondary text-sm mt-1">
            – by simone
          </p>
          <p className="text-text-secondary text-xs mt-3">
            Smart Student Expense Tracker
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
          <h2 className="text-xl font-semibold text-text mb-6">
            Create account
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-alert text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                placeholder="Min 6 characters"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-olive text-white py-2.5 rounded-lg font-medium text-sm hover:bg-olive-dark transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-olive font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
