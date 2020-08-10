const express = require('express');
const morgan = require('morgan');
const app = express();

// Error Handling
const ErrorResponse = require('./utils/errorResponse');
const errorHandler = require('./middleware/error');

// Route Files
const contacts = require('./routes/contactRoutes');
const users = require('./routes/userRoutes');
const authentication = require('./routes/authRoutes');

// Body parser
app.use(express.json());

// Development Enviroment Loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routes
app.use('/api/v1/contacts', contacts);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', authentication);

app.use('*', (req, res, next) => {
  return next(new ErrorResponse(`Cant find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
