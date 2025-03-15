// src/server.js
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
  throw error;
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/personas', personasRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/customers', customersRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});