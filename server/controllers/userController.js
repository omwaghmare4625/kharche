const User = require('../models/User');

// @desc    Update monthly budget
// @route   PUT /api/users/budget
const updateBudget = async (req, res) => {
  try {
    const { monthlyBudget } = req.body;

    if (monthlyBudget === undefined || monthlyBudget < 0) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Please provide a valid monthly budget',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { monthlyBudget },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      data: user,
      message: 'Budget updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = { updateBudget };
