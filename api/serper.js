/**
 * Vercel serverless function: Serper.dev proxy (2,500 free queries/month)
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return res.status(200).json({ ok: false, fallback: true, error: 'SERPER_API_KEY not configured' });

  const { mode = 'search', q, keyword } = req.body || {};
  const endpoint = mode === 'keywords' ? 'https://google.serper.dev/keywords' : 'https://google.serper.dev/search';
  const requestBody = mode === 'keywords'
    ? { q: keyword || q, location: 'United States', gl: 'us', hl: 'en' }
    : { q: q || keyword, gl: 'us', hl: 'en', num: 20 };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    if (!response.ok) return res.status(response.status).json({ ok: false, fallback: true, error: (await response.text()).slice(0, 500) });

    return res.status(200).json({ ok: true, data: await response.json() });
  } catch (err) {
    return res.status(200).json({ ok: false, fallback: true, error: err?.name === 'AbortError' ? 'Request timed out' : String(err?.message || err) });
  }
};