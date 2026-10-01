/**
 * Netlify serverless function: Google PageSpeed Insights proxy
 * Gives REAL Core Web Vitals data (LCP, CLS, INP/FCP, TBT, Speed Index).
 * Works WITHOUT an API key (lower rate limit) - key is optional.
 * Docs: https://developers.google.com/speed/docs/insights/v5/get-started
 */

const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  let url = (payload.url || '').trim();
  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'url is required' }) };
  }

  // Normalise URL - PageSpeed requires a full URL with protocol
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

  // Strip everything after the domain so we audit the homepage
  try {
    const parsed = new URL(url);
    url = parsed.origin + '/';
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid URL format' }) };
  }

  const strategy = payload.strategy === 'desktop' ? 'desktop' : 'mobile';
  const params = new URLSearchParams({ url, strategy });
  if (process.env.PAGESPEED_API_KEY) {
    params.append('key', process.env.PAGESPEED_API_KEY);
  }

  try {
    const controller = new AbortController();
    // PageSpeed takes 30-60s - give it room
    const timeout = setTimeout(() => controller.abort(), 90000);

    const response = await fetch(`${PAGESPEED_URL}?${params.toString()}`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      let msg = text.slice(0, 500);
      try {
        const parsedErr = JSON.parse(text);
        msg = parsedErr?.error?.message || msg;
      } catch { /* keep raw */ }
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, fallback: true, error: msg }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=1800',
      },
      body: JSON.stringify({ ok: true, data }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        ok: false,
        fallback: true,
        error: err?.name === 'AbortError' ? 'PageSpeed timed out (site may be very slow)' : String(err?.message || err),
      }),
    };
  }
};