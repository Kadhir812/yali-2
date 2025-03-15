const db = require('./index');

const getPersonas = async () => {
  try {
    const result = await db.query('SELECT * FROM personas');
    return result.rows;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};

const createPersona = async (persona) => {
  try {
    const result = await db.query(
      `INSERT INTO personas (name, email, phone, state, pin_code, message, type, is_favorite) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        persona.name,
        persona.email,
        persona.phone,
        persona.state,
        persona.pin_code,
        persona.message,
        persona.type,
        persona.is_favorite,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
};

module.exports = { getPersonas, createPersona };
