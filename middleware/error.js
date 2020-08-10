const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to the console for the dev
  console.log(err.stack.red);

  // MongoDB Bad ObjectID
  if (err.name === 'CastError') {
    const message = `Resource not found with and ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate Field
  if (err.code === 11000) {
    const message = 'Duplicate Field Value Entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Invalid JWT Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token, please login again';
    error = new ErrorResponse(message, 401);
  }

  // Expired JWT Error
  if (err.name === 'TokenExpiredError') {
    const message = 'Expired token, please login again';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    status: 'fail',
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
