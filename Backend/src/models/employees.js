// src/models/employees.js
const db = require('./index');

const getEmployees = async () => {
  const result = await db.query('SELECT * FROM employees');
  return result.rows;
};

const createEmployee = async (employeeData) => {
  const result = await db.query(
    'INSERT INTO employees (date_of_birth, father_name, blood_group, emergency_contact, aadhar_number, joining_date, probation_end_date, previous_employer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      employeeData.date_of_birth,
      employeeData.father_name,
      employeeData.blood_group,
      employeeData.emergency_contact,
      employeeData.aadhar_number,
      employeeData.joining_date,
      employeeData.probation_end_date,
      employeeData.previous_employer,
    ],
  );
  return result.rows[0];
};

module.exports = { getEmployees, createEmployee };