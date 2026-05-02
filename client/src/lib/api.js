const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Expenses
export const addExpense = async (token, expense) => {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const getExpenses = async (token) => {
  const res = await fetch(`${API_URL}/expenses`, {
    headers: getHeaders(token),
  });
  return res.json();
};

export const deleteExpense = async (token, id) => {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return res.json();
};

export const updateExpense = async (token, id, expense) => {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(expense),
  });
  return res.json();
};

// Budget
export const updateBudget = async (token, monthlyBudget) => {
  const res = await fetch(`${API_URL}/users/budget`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({ monthlyBudget }),
  });
  return res.json();
};

// Summary
export const getSummary = async (token) => {
  const res = await fetch(`${API_URL}/summary`, {
    headers: getHeaders(token),
  });
  return res.json();
};
