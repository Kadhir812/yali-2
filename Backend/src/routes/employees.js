const express = require('express');
const router = express.Router();
const { getEmployees, createEmployee } = require('../models/employees');

router.get('/', async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { persona_id, date_of_birth, father_name, blood_group, emergency_contact, aadhar_number, 
    joining_date, probation_end_date, previous_employer } = req.body;

  if (!persona_id || !date_of_birth || !joining_date) {
    return res.status(400).json({ error: 'Missing required fields: persona_id, date_of_birth, joining_date' });
  }

  try {
    const newEmployee = await createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
