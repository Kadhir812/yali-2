// src/models/personas.js
const pgp = require('pg-promise')();
require('dotenv').config();
const db = require('./index');

// Create Persona and related type-specific records
const createPersona = async (persona) => {
  try {
    console.log('Received persona data:', persona);

    // Insert into the main personas table
    const personaResult = await db.one(
      'INSERT INTO personas (name, email, phone, state, pin_code, message, type, is_favorite, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        persona.name,
        persona.email,
        persona.phone,
        persona.state,
        persona.pin_code,
        persona.message,
        persona.type,
        persona.is_favorite,
        new Date().toISOString(),
        new Date().toISOString()
      ]
    );

    console.log('Inserted persona:', personaResult);

    // Insert into the specific table based on persona type
    switch (persona.type) {
      case 'Customers':
        await db.none(
          'INSERT INTO customers (persona_id, age, location, job, income_range, family_members, weight, wheelchair_type, daily_commute_range_km, commute_mode, pains_daily, pains_commute, solutions_needed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
          [
            personaResult.id,
            persona.age,
            persona.location,
            persona.job,
            persona.income_range,
            persona.family_members,
            persona.weight,
            persona.wheelchair_type,
            persona.daily_commute_range_km,
            persona.commute_mode,
            persona.pains_daily,
            persona.pains_commute,
            persona.solutions_needed,
          ]
        );
        break;

      case 'Employees':
        await db.none(
          'INSERT INTO employees (persona_id, date_of_birth, father_name, blood_group, emergency_contact, aadhar_number, joining_date, probation_end_date, previous_employer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [
            personaResult.id,
            persona.date_of_birth,
            persona.father_name,
            persona.blood_group,
            persona.emergency_contact,
            persona.aadhar_number,
            persona.joining_date,
            persona.probation_end_date,
            persona.previous_employer,
          ]
        );
        break;

      case 'Vendors':
        await db.none(
          'INSERT INTO vendors (persona_id, address, pan_number, gst_number, bank_name, account_number, ifsc_code) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [
            personaResult.id,
            persona.address,
            persona.pan_number,
            persona.gst_number,
            persona.bank_name,
            persona.account_number,
            persona.ifsc_code,
          ]
        );
        break;

      default:
        throw new Error(`Unknown persona type: ${persona.type}`);
    }

    return personaResult;
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
};

// Fetch all personas
const getPersonas = async () => {
  try {
    const result = await db.query('SELECT * FROM personas');
    return result.rows;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};

// Fetch all customers
const getCustomers = async () => {
  try {
    const result = await db.query('SELECT * FROM customers');
    return result.rows;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Fetch all employees
const getEmployees = async () => {
  try {
    const result = await db.query('SELECT * FROM employees');
    return result.rows;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Fetch all vendors
const getVendors = async () => {
  try {
    const result = await db.query('SELECT * FROM vendors');
    return result.rows;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

module.exports = { createPersona, getPersonas, getCustomers, getEmployees, getVendors };