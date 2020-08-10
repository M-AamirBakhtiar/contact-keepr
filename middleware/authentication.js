const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsync = require('./catchAsync');
const ErrorResponse = require('../utils/errorResponse');

// Protect Routes Middleware to Check if the User is Logged In
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Check if the Request has JWT, if yes Extract it
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if there is no token user is not logged in return with Error
  if (!token) {
    return next(
      new ErrorResponse(
        'You are not logged in, please log in to continue.',
        401
      )
    );
  }

  // Verify the JWT
  const decoded = await promisify(jwt.verify)(token, process.env.SUPER_SECRET);

  // Check if the user still Exists in DataBase
  const currentUser = await User.findById(decoded.id);

  // If there is no User Retrun with Error
  if (!currentUser) {
    return next(new ErrorResponse('This user no longer Exists', 401));
  }

  // If no errors were Triggered Grant Access to the user
  req.user = currentUser;

  next();
});
