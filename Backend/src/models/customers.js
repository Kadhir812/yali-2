// src/models/customers.js
const db = require('./index');

const getCustomers = async () => {
  const result = await db.query('SELECT * FROM customers');
  return result.rows;
};

const createCustomer = async (customerData) => {
  const result = await db.query(
    'INSERT INTO customers (age, location, job, income_range, family_members, weight, interests, user_type, wheelchair_type, commute_range, commute_mode, speed, common_place, pains_daily, pains_commute, solutions_needed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
    [
      customerData.age,
      customerData.location,
      customerData.job,
      customerData.income_range,
      customerData.family_members,
      customerData.weight,
      customerData.interests,
      customerData.user_type,
      customerData.wheelchair_type,
      customerData.commute_range,
      customerData.commute_mode,
      customerData.speed,
      customerData.common_place,
      customerData.pains_daily,
      customerData.pains_commute,
      customerData.solutions_needed,
    ],
  );
  return result.rows[0];
};

module.exports = { getCustomers, createCustomer };