/**
 * Vercel serverless function: Google PageSpeed Insights proxy (optional key)
 * Returns REAL Core Web Vitals: LCP, CLS, INP/FCP, TBT, Speed Index.
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let url = (req.body?.url || '').trim();
  if (!url) return res.status(400).json({ error: 'url is required' });

  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  try {
    const parsed = new URL(url);
    url = parsed.origin + '/';
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const strategy = req.body?.strategy === 'desktop' ? 'desktop' : 'mobile';
  const params = new URLSearchParams({ url, strategy });
  if (process.env.PAGESPEED_API_KEY) params.append('key', process.env.PAGESPEED_API_KEY);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90000);

    const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      let msg = (await response.text()).slice(0, 500);
      try { msg = JSON.parse(msg)?.error?.message || msg; } catch { /* raw */ }
      return res.status(response.status).json({ ok: false, fallback: true, error: msg });
    }

    res.setHeader('Cache-Control', 'public, max-age=1800');
    return res.status(200).json({ ok: true, data: await response.json() });
  } catch (err) {
    return res.status(200).json({ ok: false, fallback: true, error: err?.name === 'AbortError' ? 'PageSpeed timed out (site may be very slow)' : String(err?.message || err) });
  }
};