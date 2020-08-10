const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Error Handling
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

//Serve Static Assets in Production
if (process.env.NODE_ENV === 'production') {
  //Set Static Folder
  app.use(express.static('client/build'));

  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(errorHandler);

module.exports = app;
