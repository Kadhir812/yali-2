const express = require('express');
const router = express.Router();
const { getCustomers, createCustomer } = require('../models/customers');

router.get('/', async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCustomer = await createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;