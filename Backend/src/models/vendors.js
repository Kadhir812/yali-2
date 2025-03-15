const db = require('./index');

const getVendors = async () => {
  try {
    const result = await db.query('SELECT * FROM vendors');
    return result.rows;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

const createVendor = async (vendorData) => {
  try {
    const result = await db.query(
      `INSERT INTO vendors (persona_id, address, pan_number, gst_number, bank_name, account_number, ifsc_code) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        vendorData.persona_id,
        vendorData.address,
        vendorData.pan_number,
        vendorData.gst_number,
        vendorData.bank_name,
        vendorData.account_number,
        vendorData.ifsc_code,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating vendor:', error);
    throw error;
  }
};

module.exports = { getVendors, createVendor };
