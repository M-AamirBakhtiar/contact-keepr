const dotenv = require('dotenv');
const colors = require('colors');

// Loading Enviroment Variables
dotenv.config({ path: './config/config.env' });

const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB Atlas
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
