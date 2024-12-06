const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const signToken = require('../../utils/signToken');

// @desc      Login user
// @route     POST /api/auth/
// @access    Public
const login = asyncWrapper(async (req, res, next) => {
  const { password, duration } = req.body;

  const isMatch = String(process.env.ADMIN_PASSWORD) === String(password);
  if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

  const token = signToken(duration);

  res.status(200).json({
    success: true,
    data: { token },
  });
});

module.exports = login;
