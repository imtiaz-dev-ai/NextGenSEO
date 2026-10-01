/**
 * Netlify serverless function: Serper.dev proxy
 * Free tier: 2,500 queries/month - get key at https://serper.dev/api-key
 * Returns real Google search results, keyword volume and CPC data.
 */

const SERPER_SEARCH = 'https://google.serper.dev/search';
const SERPER_KEYWORDS = 'https://google.serper.dev/keywords';

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

  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, fallback: true, error: 'SERPER_API_KEY not configured' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { mode = 'search', q, keyword } = payload;

  const endpoint = mode === 'keywords' ? SERPER_KEYWORDS : SERPER_SEARCH;
  const requestBody = mode === 'keywords'
    ? { q: keyword || q, location: 'United States', gl: 'us', hl: 'en' }
    : { q: q || keyword, gl: 'us', hl: 'en', num: 20 };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, fallback: true, error: text.slice(0, 500) }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true, data }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        ok: false,
        fallback: true,
        error: err?.name === 'AbortError' ? 'Request timed out' : String(err?.message || err),
      }),
    };
  }
};