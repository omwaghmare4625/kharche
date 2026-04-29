const express = require('express');
const router = express.Router();
const { updateBudget } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/budget', protect, updateBudget);

module.exports = router;
