// src/models/vendors.js
const db = require('./index');

const getVendors = async () => {
  const result = await db.query('SELECT * FROM vendors');
  return result.rows;
};

const createVendor = async (vendorData) => {
  const result = await db.query(
    'INSERT INTO vendors (address, pan_number, gst_number, bank_name, account_number, ifsc_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      vendorData.address,
      vendorData.pan_number,
      vendorData.gst_number,
      vendorData.bank_name,
      vendorData.account_number,
      vendorData.ifsc_code,
    ],
  );
  return result.rows[0];
};

module.exports = { getVendors, createVendor };