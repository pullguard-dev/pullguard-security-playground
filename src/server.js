// Acme Widgets — API server (demo). Deliberately vulnerable; see README.
const express = require('express');
const { productRouter } = require('./routes/products');
const { reportRouter } = require('./routes/reports');

const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/reports', reportRouter);

// WHY (demo): a health endpoint is public by design.
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(3000, () => console.log('listening on :3000'));
module.exports = app;
