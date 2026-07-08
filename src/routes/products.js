// Product lookup routes.
const express = require('express');
const { Pool } = require('pg');

const productRouter = express.Router();
const pool = new Pool();

// Vulnerable: the caller-supplied id is concatenated straight into the SQL
// string (SQL injection). The fix is a parameterized query ($1 binding).
productRouter.get('/:id', async (req, res) => {
  const result = await pool.query(`SELECT * FROM products WHERE id = ${req.params.id}`);
  res.json(result.rows);
});

module.exports = { productRouter };
