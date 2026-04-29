const Expense = require('../models/Expense');

// @desc    Add new expense
// @route   POST /api/expenses
const addExpense = async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;

    if (!amount || !category) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Amount and category are required',
      });
    }

    const expense = await Expense.create({
      userId: req.user._id,
      amount,
      category,
      note: note || '',
      date: date || Date.now(),
    });

    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense added successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

// @desc    Get all expenses for logged-in user
// @route   GET /api/expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });

    res.json({
      success: true,
      data: expenses,
      message: 'Expenses fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Expense not found',
      });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Not authorized',
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: null,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Expense not found',
      });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Not authorized',
      });
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: updated,
      message: 'Expense updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = { addExpense, getExpenses, deleteExpense, updateExpense };
