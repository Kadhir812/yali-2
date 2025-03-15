const express = require('express');
const router = express.Router();
const { getCustomers, createCustomer } = require('../models/customers');

router.get('/', async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { persona_id, age, location, job, income_range, family_members, weight, interests, user_type, 
    wheelchair_type, commute_range, commute_mode, pains_daily, pains_commute, solutions_needed } = req.body;

  if (!persona_id || !age || !location || !job) {
    return res.status(400).json({ error: 'Missing required fields: persona_id, age, location, job' });
  }

  try {
    const newCustomer = await createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
