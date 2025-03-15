const express = require('express');
const pool = require('../models');
const { getPersonas, createPersona } = require('../models/personas');

const router = express.Router();

// Get all personas
router.get('/', async (req, res) => {
  try {
    const personas = await getPersonas();
    res.json(personas);
  } catch (error) {
    console.error("Error fetching personas:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new persona
router.post('/', async (req, res) => {
  const { name, email, phone, state, pin_code, message, type, is_favorite } = req.body;

  if (!name || !email || !phone || !type) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone, type' });
  }

  try {
    const newPersona = await createPersona(req.body);
    res.status(201).json(newPersona);
  } catch (error) {
    console.error("Error creating persona:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update the favorite status of a persona
router.patch('/:persona_id', async (req, res) => {
  try {
    const { persona_id } = req.params;
    const { is_favorite } = req.body;

    // ✅ Ensure `is_favorite` is not undefined
    if (is_favorite === undefined) {
      return res.status(400).json({ error: "Missing field: is_favorite" });
    }

    // ✅ Update the database
    const result = await pool.query(
      'UPDATE personas SET is_favorite = $1 WHERE id = $2 RETURNING *',
      [is_favorite, persona_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Persona not found' });
    }

    res.json(result.rows[0]); // ✅ Send updated persona back
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
