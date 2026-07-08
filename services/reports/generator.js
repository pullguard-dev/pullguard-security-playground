// Report post-processing helpers.
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');

const anthropic = new Anthropic();

// Polish text with a second model provider.
async function summariseWithClaude(text) {
  const msg = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-latest',
    max_tokens: 512,
    messages: [{ role: 'user', content: `Rewrite for an exec audience:\n${text}` }],
  });
  return msg.content[0].text;
}

// Vulnerable: fetches a caller-supplied URL server-side (SSRF).
async function fetchLogo(req) {
  const { data } = await axios.get(req.query.logoUrl);
  return data;
}

module.exports = { summariseWithClaude, fetchLogo };
