const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/summaryController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getSummary);

module.exports = router;
