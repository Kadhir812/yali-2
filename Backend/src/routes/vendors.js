const express = require('express');
const router = express.Router();
const { getVendors, createVendor } = require('../models/vendors');

router.get('/', async (req, res) => {
  try {
    const vendors = await getVendors();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { persona_id, address, pan_number, gst_number, bank_name, account_number, ifsc_code } = req.body;

  if (!persona_id || !address || !pan_number || !gst_number) {
    return res.status(400).json({ error: 'Missing required fields: persona_id, address, pan_number, gst_number' });
  }

  try {
    const newVendor = await createVendor(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
