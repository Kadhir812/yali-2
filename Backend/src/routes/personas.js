const express = require('express');
const { getPersonas, createPersona } = require('../models/personas');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const personas = await getPersonas();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newPersona = await createPersona(req.body);
    res.status(201).json(newPersona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;