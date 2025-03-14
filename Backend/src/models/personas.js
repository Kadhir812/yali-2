const db = require('./index');

const getPersonas = async () => {
  const res = await db.query('SELECT * FROM personas');
  return res.rows;
};

const createPersona = async (persona) => {
  const res = await db.query(
    'INSERT INTO personas (name, email, phone, state, pin_code, message, type, is_favorite) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [persona.name, persona.email, persona.phone, persona.state, persona.pin_code, persona.message, persona.type, persona.isFavorite]
  );
  return res.rows[0];
};

module.exports = { getPersonas, createPersona };