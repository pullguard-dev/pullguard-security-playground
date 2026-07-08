// Ad-hoc report export for Acme Widgets admins. Deliberately vulnerable; see README.
const express = require('express');
const { exec } = require('child_process');

const adminRouter = express.Router();

// Vulnerable: a caller-supplied filename is passed straight into a shell
// command (command injection), and the endpoint has no authentication guard.
adminRouter.post('/export', (req, res) => {
  exec(`weasyprint /tmp/report.html /exports/${req.body.filename}.pdf`, (err) => {
    if (err) return res.status(500).json({ error: 'export failed' });
    res.json({ ok: true });
  });
});

module.exports = { adminRouter };
