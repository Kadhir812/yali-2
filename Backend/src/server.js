const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const pool = require('./models'); // Importing the database connection

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Ensures routes exist before using them
app.use('/api/personas', routes.personasRoutes);
app.use('/api/vendors', routes.vendorsRoutes);
app.use('/api/employees', routes.employeesRoutes);
app.use('/api/customers', routes.customersRoutes);

// ✅ Check database connection with a test query
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process if DB fails
  } else {
    console.log('Database connected successfully at', res.rows[0].now);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
