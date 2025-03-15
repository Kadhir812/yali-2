// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { personasRoutes, vendorsRoutes, employeesRoutes, customersRoutes } = require('./routes');
const pool = require('./models');

const app = express();
const port = 5000;

// Check database connection
pool.connect().then(() => {
  console.log('Database connected successfully');
}).catch(error => {
  console.error('Database connection error:', error);
  process.exit(1); // Exit the process if the database connection fails
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define API routes
app.use('/api/personas', personasRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/customers', customersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  console.error(err.stack); // Log the stack trace for detailed debugging

  // Send a generic error message to the client
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong. Please try again later.'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});