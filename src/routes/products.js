// Product lookup routes.
const express = require('express');
const { Pool } = require('pg');

const productRouter = express.Router();
const pool = new Pool();

// Parameterized query (safe) — user input is bound as $1, never concatenated.
productRouter.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
  res.json(result.rows);
});

module.exports = { productRouter };
