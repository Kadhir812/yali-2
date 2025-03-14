// src/models/index.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // Ensure that you have a .env file with DB_PORT defined, or use the default port for PostgreSQL which is 5432
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;