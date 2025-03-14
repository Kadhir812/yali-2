const express = require('express');
const router = express.Router();
const { getVendors, createVendor } = require('../models/vendors');

router.get('/', async (req, res) => {
  try {
    const vendors = await getVendors();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newVendor = await createVendor(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;