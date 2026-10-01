/**
 * Client-side helpers for the serverless AI proxies.
 *
 * Every function is designed to degrade gracefully: if the API key is missing or
 * the upstream call fails, the proxy returns `{ ok: false, fallback: true }` and
 * the tools fall back to their local (free, offline) logic. Nothing ever breaks.
 */

const TIMEOUT_MS = 35000;

async function postJSON<T>(path: string, body: unknown, timeoutMs = TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export interface OpenAIResponse {
  ok: boolean;
  fallback?: boolean;
  content?: string;
  error?: string;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number } | null;
}

/**
 * Ask OpenAI to complete a chat conversation.
 * Uses `gpt-4o-mini` via the proxy. Returns `ok:false` when unavailable.
 */
export async function askOpenAI(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  opts: { maxTokens?: number; temperature?: number } = {},
): Promise<OpenAIResponse> {
  try {
    return await postJSON<OpenAIResponse>('/.netlify/functions/openai-proxy', {
      messages,
      maxTokens: opts.maxTokens ?? 800,
      temperature: opts.temperature ?? 0.7,
    });
  } catch (err) {
    return { ok: false, fallback: true, error: err instanceof Error ? err.message : String(err) };
  }
}

export interface SerperResponse {
  ok: boolean;
  fallback?: boolean;
  error?: string;
  data?: any;
}

/** Real Google results via Serper (2,500 free queries/month). */
export async function serperSearch(q: string): Promise<SerperResponse> {
  try {
    return await postJSON<SerperResponse>('/.netlify/functions/serper-proxy', { mode: 'search', q });
  } catch (err) {
    return { ok: false, fallback: true, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Real keyword volume/CPC data via Serper. */
export async function serperKeywords(q: string): Promise<SerperResponse> {
  try {
    return await postJSON<SerperResponse>('/.netlify/functions/serper-proxy', { mode: 'keywords', keyword: q });
  } catch (err) {
    return { ok: false, fallback: true, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Real Core Web Vitals via Google PageSpeed Insights (no key required). */
export async function runPageSpeed(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<SerperResponse> {
  try {
    return await postJSON<SerperResponse>('/.netlify/functions/pagespeed-proxy', { url, strategy }, 95000);
  } catch (err) {
    return { ok: false, fallback: true, error: err instanceof Error ? err.message : String(err) };
  }
}