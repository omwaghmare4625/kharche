"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getSummary, updateBudget as updateBudgetAPI } from "@/lib/api";
import Link from "next/link";
import PieChart from "@/components/PieChart";

const CATEGORY_COLORS = {
  Food: "#6B8E23",
  Travel: "#556B2F",
  Rent: "#8FBC8F",
  Shopping: "#3F4F1C",
  Misc: "#9CAF88",
};

export default function DashboardPage() {
  const { user, token, loading, logout, updateUserBudget } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getSummary(token);
      if (data.success) {
        setSummary(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch summary", err);
    }
  }, [token]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (token) fetchSummary();
  }, [token, fetchSummary]);

  const handleBudgetUpdate = async () => {
    const budget = parseFloat(budgetInput);
    if (isNaN(budget) || budget < 0) return;
    setIsUpdating(true);
    try {
      const data = await updateBudgetAPI(token, budget);
      if (data.success) {
        updateUserBudget(budget);
        setShowBudgetModal(false);
        setBudgetInput("");
        fetchSummary();
      }
    } catch (err) {
      console.error("Failed to update budget", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-pulse text-olive text-lg">Loading...</div>
      </div>
    );
  }

  const budgetProgress =
    summary && summary.monthlyBudget > 0
      ? Math.min(100, (summary.totalSpent / summary.monthlyBudget) * 100)
      : 0;

  const isOverBudget = summary && summary.totalSpent > summary.monthlyBudget && summary.monthlyBudget > 0;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-olive">Kharche</h1>
            <p className="text-xs text-text-secondary">– by simone</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-secondary hidden sm:block">
              Hi, {user.name}
            </span>
            <button
              onClick={logout}
              className="text-sm text-text-secondary hover:text-alert transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-5">
        {/* Budget Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wide">
              Monthly Budget
            </h2>
            <button
              onClick={() => {
                setBudgetInput(user.monthlyBudget?.toString() || "");
                setShowBudgetModal(true);
              }}
              className="text-xs text-olive font-medium hover:underline cursor-pointer"
            >
              {user.monthlyBudget > 0 ? "Edit" : "Set Budget"}
            </button>
          </div>

          {summary ? (
            <>
              <div className="text-center mb-4">
                <p className="text-xs text-text-secondary mb-1">
                  Remaining Balance
                </p>
                <p
                  className={`text-4xl font-bold ${
                    isOverBudget ? "text-alert" : "text-olive"
                  }`}
                >
                  ₹{summary.remainingBudget.toLocaleString()}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  of ₹{summary.monthlyBudget.toLocaleString()} budget
                </p>
              </div>

              {/* Progress Bar */}
              {summary.monthlyBudget > 0 && (
                <div className="mb-4">
                  <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOverBudget ? "bg-alert" : "bg-olive"
                      }`}
                      style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-1.5">
                    <span>₹{summary.totalSpent.toLocaleString()} spent</span>
                    <span>{budgetProgress.toFixed(0)}%</span>
                  </div>
                </div>
              )}

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg rounded-xl p-3 text-center">
                  <p className="text-xs text-text-secondary mb-0.5">
                    Total Spent
                  </p>
                  <p className="text-lg font-semibold text-text">
                    ₹{summary.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="bg-bg rounded-xl p-3 text-center">
                  <p className="text-xs text-text-secondary mb-0.5">
                    Daily Safe Spend
                  </p>
                  <p className="text-lg font-semibold text-olive">
                    ₹{summary.dailySafeLimit.toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-text-secondary text-sm">
              Loading summary...
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        {summary &&
          Object.keys(summary.categoryBreakdown).length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-4">
                Category Breakdown
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-40 h-40">
                  <PieChart
                    data={summary.categoryBreakdown}
                    colors={CATEGORY_COLORS}
                  />
                </div>
                <div className="flex-1 space-y-2 w-full">
                  {Object.entries(summary.categoryBreakdown).map(
                    ([cat, amount]) => (
                      <div
                        key={cat}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                CATEGORY_COLORS[cat] || "#9CAF88",
                            }}
                          ></span>
                          <span className="text-sm text-text">{cat}</span>
                        </div>
                        <span className="text-sm font-medium text-text">
                          ₹{amount.toLocaleString()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/expenses"
            className="bg-card rounded-2xl border border-border p-5 shadow-sm text-center hover:border-olive/30 transition-colors"
          >
            <div className="text-2xl mb-1">📋</div>
            <p className="text-sm font-medium text-text">View Expenses</p>
            <p className="text-xs text-text-secondary mt-0.5">
              {summary?.totalExpenses || 0} this month
            </p>
          </Link>
          <Link
            href="/add"
            className="bg-card rounded-2xl border border-border p-5 shadow-sm text-center hover:border-olive/30 transition-colors"
          >
            <div className="text-2xl mb-1">➕</div>
            <p className="text-sm font-medium text-text">Add Expense</p>
            <p className="text-xs text-text-secondary mt-0.5">Quick add</p>
          </Link>
        </div>
      </main>

      {/* Floating Add Button */}
      <Link
        href="/add"
        className="fixed bottom-6 right-6 w-14 h-14 bg-olive text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-olive-dark transition-colors z-20"
      >
        +
      </Link>

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-lg border border-border">
            <h3 className="text-lg font-semibold text-text mb-4">
              Set Monthly Budget
            </h3>
            <p className="text-sm text-text-secondary mb-3">
              Enter your monthly pocket money / budget amount.
            </p>
            <input
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive mb-4"
              placeholder="e.g. 5000"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm text-text-secondary hover:bg-bg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBudgetUpdate}
                disabled={isUpdating}
                className="flex-1 py-2.5 rounded-lg bg-olive text-white text-sm font-medium hover:bg-olive-dark transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
