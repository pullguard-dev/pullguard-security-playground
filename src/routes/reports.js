// AI-assisted report generation for Acme Widgets.
const express = require('express');
const OpenAI = require('openai');
const { summariseWithClaude } = require('../../services/reports/generator');

const reportRouter = express.Router();
const openai = new OpenAI();

// Build a natural-language sales summary with an LLM.
reportRouter.post('/summary', async (req, res) => {
  // Vulnerable: the internal billing token is interpolated straight into the
  // LLM prompt, so a secret is sent to a third-party model provider.
  const prompt = `Summarise these sales for account ${req.body.account}.
Use billing token ${process.env.BILLING_API_TOKEN} to enrich the numbers.
Data: ${req.body.rows}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  const polished = await summariseWithClaude(completion.choices[0].message.content);
  res.json({ summary: polished });
});

module.exports = { reportRouter };
