const db = require('./index');

const getCustomers = async () => {
  try {
    const result = await db.query('SELECT * FROM customers');
    return result.rows;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

const createCustomer = async (customerData) => {
  try {
    const result = await db.query(
      `INSERT INTO customers (persona_id, age, location, job, income_range, family_members, weight, interests, user_type, wheelchair_type, 
      commute_range, commute_mode, pains_daily, pains_commute, solutions_needed) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        customerData.persona_id,
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
        customerData.pains_daily,
        customerData.pains_commute,
        customerData.solutions_needed,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

module.exports = { getCustomers, createCustomer };
