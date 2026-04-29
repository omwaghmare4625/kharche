const Expense = require('../models/Expense');
const User = require('../models/User');

// @desc    Get monthly summary
// @route   GET /api/summary
const getSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get all expenses for current month
    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Total spent
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Remaining budget
    const remainingBudget = Math.max(0, user.monthlyBudget - totalSpent);

    // Remaining days in month
    const totalDaysInMonth = endOfMonth.getDate();
    const currentDay = now.getDate();
    const remainingDays = Math.max(1, totalDaysInMonth - currentDay + 1);

    // Daily safe limit
    const dailySafeLimit = remainingBudget / remainingDays;

    // Category breakdown
    const categoryBreakdown = {};
    expenses.forEach((exp) => {
      if (categoryBreakdown[exp.category]) {
        categoryBreakdown[exp.category] += exp.amount;
      } else {
        categoryBreakdown[exp.category] = exp.amount;
      }
    });

    res.json({
      success: true,
      data: {
        totalSpent: Math.round(totalSpent * 100) / 100,
        remainingBudget: Math.round(remainingBudget * 100) / 100,
        dailySafeLimit: Math.round(dailySafeLimit * 100) / 100,
        monthlyBudget: user.monthlyBudget,
        categoryBreakdown,
        totalExpenses: expenses.length,
      },
      message: 'Summary fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = { getSummary };
