const catchAsync = require('../middleware/catchAsync');

const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// @description     Register A new User
// @route           POST /api/v1/auth/register
// @access          Public
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorResponse('User already exists', 400));
  }

  user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = user.getSignedJwtToken();

  res.status(201).json({
    status: 'success',
    token,
  });
});

// @description     Login an Existing User
// @route           POST /api/v1/auth/login
// @access          Public
exports.login = catchAsync(async (req, res, next) => {
  // Extract Email and Password from the Request
  const { email, password } = req.body;

  // Return an Error if the Email and Password Fields are Empty
  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and a password.', 400)
    );
  }

  // Check to See if the User exists on DataBase
  const user = await User.findOne({ email }).select('+password');

  // Return an Error if there is no user or Email / Password is invalid
  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse(`Invalid Email or Password.`, 401));
  }

  // No Errors then Login the User by sending a JWT
  const token = user.getSignedJwtToken();

  res.status(200).json({
    status: 'success',
    token,
  });
});

// @description     Get Currently Logged In User
// @route           GET /api/v1/auth/me
// @access          Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
