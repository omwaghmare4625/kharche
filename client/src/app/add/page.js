"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addExpense } from "@/lib/api";
import Link from "next/link";

const CATEGORIES = ["Food", "Travel", "Rent", "Shopping", "Misc"];

export default function AddExpensePage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await addExpense(token, {
        amount: amt,
        category,
        note,
      });
      if (data.success) {
        setSuccess(true);
        setAmount("");
        setNote("");
        setCategory("Food");
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } else {
        setError(data.message || "Failed to add expense");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-pulse text-olive text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-text-secondary hover:text-olive transition-colors text-sm"
          >
            ← Back
          </Link>
          <h1 className="text-lg font-semibold text-text">Add Expense</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          {success && (
            <div className="bg-green-50 border border-green-200 text-olive text-sm rounded-lg p-3 mb-4">
              ✓ Expense added successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-alert text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Amount (₹)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-text text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                placeholder="0.00"
                autoFocus
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      category === cat
                        ? "bg-olive text-white"
                        : "bg-bg border border-border text-text-secondary hover:border-olive/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                Note{" "}
                <span className="text-xs text-text-secondary/60">
                  (optional)
                </span>
              </label>
              <input
                id="note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                placeholder="e.g. Lunch at canteen"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-olive text-white py-3 rounded-lg font-medium text-sm hover:bg-olive-dark transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Adding..." : "Add Expense"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
