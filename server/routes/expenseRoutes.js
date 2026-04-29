const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addExpense).get(protect, getExpenses);
router.route('/:id').delete(protect, deleteExpense).put(protect, updateExpense);

module.exports = router;
