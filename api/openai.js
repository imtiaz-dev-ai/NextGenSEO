/**
 * Vercel serverless function: OpenAI proxy
 * Same behaviour as netlify/functions/openai-proxy.js — keeps the key server-side.
 */
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(200).json({ ok: false, fallback: true, error: 'OPENAI_API_KEY not configured' });

  const { messages, maxTokens = 800, temperature = 0.7 } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: MODEL, messages, max_tokens: maxTokens, temperature }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    if (!response.ok) return res.status(response.status).json({ ok: false, fallback: true, error: (await response.text()).slice(0, 500) });

    const data = await response.json();
    return res.status(200).json({ ok: true, content: data?.choices?.[0]?.message?.content || '', usage: data?.usage || null });
  } catch (err) {
    return res.status(200).json({ ok: false, fallback: true, error: err?.name === 'AbortError' ? 'Request timed out' : String(err?.message || err) });
  }
};