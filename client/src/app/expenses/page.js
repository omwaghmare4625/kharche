"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getExpenses, deleteExpense } from "@/lib/api";
import Link from "next/link";

const CATEGORY_ICONS = {
  Food: "🍔",
  Travel: "🚌",
  Rent: "🏠",
  Shopping: "🛍️",
  Misc: "📦",
};

export default function ExpensesPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchExpenses = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getExpenses(token);
      if (data.success) {
        setExpenses(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    } finally {
      setFetching(false);
    }
  }, [token]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token, fetchExpenses]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;
    setDeletingId(id);
    try {
      const data = await deleteExpense(token, id);
      if (data.success) {
        setExpenses((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete expense", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-text-secondary hover:text-olive transition-colors text-sm"
            >
              ← Back
            </Link>
            <h1 className="text-lg font-semibold text-text">All Expenses</h1>
          </div>
          <span className="text-sm text-text-secondary">
            {expenses.length} total
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-3">
        {fetching ? (
          <div className="text-center py-12 text-text-secondary text-sm">
            Loading expenses...
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">💸</p>
            <p className="text-text-secondary text-sm">
              No expenses yet. Start tracking!
            </p>
            <Link
              href="/add"
              className="inline-block mt-4 px-6 py-2.5 bg-olive text-white text-sm rounded-lg font-medium hover:bg-olive-dark transition-colors"
            >
              Add First Expense
            </Link>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-card rounded-xl border border-border p-4 shadow-sm flex items-center gap-4"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-bg rounded-lg flex items-center justify-center text-lg shrink-0">
                {CATEGORY_ICONS[expense.category] || "📦"}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text">
                    {expense.category}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {formatDate(expense.date)}
                  </span>
                </div>
                {expense.note && (
                  <p className="text-xs text-text-secondary mt-0.5 truncate">
                    {expense.note}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-text">
                  ₹{expense.amount.toLocaleString()}
                </p>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(expense._id)}
                disabled={deletingId === expense._id}
                className="text-text-secondary hover:text-alert transition-colors text-sm shrink-0 cursor-pointer disabled:opacity-50"
                title="Delete"
              >
                {deletingId === expense._id ? "..." : "✕"}
              </button>
            </div>
          ))
        )}
      </main>

      {/* Floating Add Button */}
      <Link
        href="/add"
        className="fixed bottom-6 right-6 w-14 h-14 bg-olive text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-olive-dark transition-colors z-20"
      >
        +
      </Link>
    </div>
  );
}
