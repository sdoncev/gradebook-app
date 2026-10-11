require('dotenv').config();
const { Pool } = require('pg');

// create connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const CURRENT_TERM_ID = process.env.CURRENT_TERM;

const getCoursesByTermId = async function(termId) {
  const text = `
    SELECT * FROM grade_groups
    WHERE term_id = $1;
  `;

  const params = [termId];

  try {
    const res = await pool.query(text, params);
    console.log(res.rows);
  
  } catch (err) {
    console.error('Error executing query: ', err.stack);
  }
}

const getAllTerms = async () => {
  const text = 'SELECT term_id, term_name FROM terms;';

  try {
    const res = await pool.query(text, []);
    console.log(res.rows);
    return res.rows;
  
  } catch (err) {
    console.error('Error executing query: ', err.stack);
  }
}

module.exports = { getCoursesByTermId, getAllTerms }