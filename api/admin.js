import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const cookieName = 'ng_admin_session';
const sessionLifetime = 4 * 60 * 60;
const collections = new Set([
  'blogPosts',
  'caseStudies',
  'teamMembers',
  'chatMessages',
  'backlinks',
  'marketplaceListings',
  'communityPosts',
]);

const secureEqual = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
};

const getSessionSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('ADMIN_SESSION_SECRET must contain at least 32 bytes.');
  }
  return secret;
};

const sign = value => createHmac('sha256', getSessionSecret()).update(value).digest('base64url');

const createSession = () => {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + sessionLifetime })).toString('base64url');
  return `${payload}.${sign(payload)}`;
};

const isValidSession = req => {
  const cookieHeader = req.headers.cookie || '';
  const token = cookieHeader.split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature || !secureEqual(sign(payload), signature)) return false;

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

const setSessionCookie = (res, token, maxAge) => {
  const secure = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', `${cookieName}=${token}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${maxAge}${secure ? '; Secure' : ''}`);
};

const isSameOrigin = req => {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const requestHost = req.headers['x-forwarded-host'] || req.headers.host;
    return new URL(origin).host === requestHost;
  } catch {
    return false;
  }
};

const getSupabaseAdmin = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the Vercel server environment.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
};

const sendError = (res, status, message) => res.status(status).json({ error: message });

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const action = req.method === 'GET' ? req.query?.action : req.body?.action;

  if (req.method === 'POST' && !isSameOrigin(req)) {
    return sendError(res, 403, 'Request origin is not allowed.');
  }

  if (action === 'login' && req.method === 'POST') {
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    const { username, password } = req.body || {};
    if (!expectedUsername || !expectedPassword) {
      return sendError(res, 500, 'Admin login is not configured on the server.');
    }
    if (!process.env.ADMIN_SESSION_SECRET || Buffer.byteLength(process.env.ADMIN_SESSION_SECRET) < 32) {
      return sendError(res, 500, 'Admin session signing is not configured on the server.');
    }
    if (!secureEqual(username || '', expectedUsername) || !secureEqual(password || '', expectedPassword)) {
      return sendError(res, 401, 'Invalid username or password.');
    }
    try {
      setSessionCookie(res, createSession(), sessionLifetime);
    } catch (error) {
      console.error('Could not create admin session:', error);
      return sendError(res, 500, 'Admin session could not be created.');
    }
    return res.status(200).json({ ok: true });
  }

  if (action === 'session' && req.method === 'GET') {
    return res.status(200).json({ authenticated: isValidSession(req) });
  }

  if (action === 'logout' && req.method === 'POST') {
    setSessionCookie(res, '', 0);
    return res.status(200).json({ ok: true });
  }

  if (!isValidSession(req)) return sendError(res, 401, 'Please log in to the admin panel.');

  try {
    const supabase = getSupabaseAdmin();
    const collection = req.method === 'GET' ? req.query?.collection : req.body?.collection;
    const id = req.method === 'GET' ? req.query?.id : req.body?.id;

    if (action === 'list' && req.method === 'GET') {
      if (!collections.has(collection)) return sendError(res, 400, 'Invalid collection.');
      const { data, error } = await supabase.from('app_records')
        .select('id,data')
        .eq('collection_name', collection)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json({ records: (data || []).map(row => ({ ...row.data, id: row.id })) });
    }

    if (action === 'save' && req.method === 'POST') {
      if (!collections.has(collection)) return sendError(res, 400, 'Invalid collection.');
      const record = req.body?.record;
      if (!record || typeof record !== 'object' || Array.isArray(record)) return sendError(res, 400, 'Invalid record.');
      const recordId = record.id || randomUUID();
      const { id: _recordId, ...data } = record;
      const { error } = await supabase.from('app_records').insert({
        collection_name: collection,
        id: recordId,
        data,
      });
      if (error) throw error;
      return res.status(200).json({ id: recordId });
    }

    if (action === 'update' && req.method === 'POST') {
      if (!collections.has(collection) || typeof id !== 'string') return sendError(res, 400, 'Invalid collection or record ID.');
      const updates = req.body?.updates;
      if (!updates || typeof updates !== 'object' || Array.isArray(updates)) return sendError(res, 400, 'Invalid record updates.');
      const { id: _recordId, ...data } = updates;
      const { data: updated, error } = await supabase.from('app_records')
        .update({ data, updated_at: new Date().toISOString() })
        .eq('collection_name', collection)
        .eq('id', id)
        .select('id')
        .maybeSingle();
      if (error) throw error;
      if (!updated) return sendError(res, 404, 'Record not found.');
      return res.status(200).json({ ok: true });
    }

    if (action === 'delete' && req.method === 'POST') {
      if (!collections.has(collection) || typeof id !== 'string') return sendError(res, 400, 'Invalid collection or record ID.');
      const { data: deleted, error } = await supabase.from('app_records')
        .delete()
        .eq('collection_name', collection)
        .eq('id', id)
        .select('id')
        .maybeSingle();
      if (error) throw error;
      if (!deleted) return sendError(res, 404, 'Record not found.');
      return res.status(200).json({ ok: true });
    }

    if (action === 'signed-upload' && req.method === 'POST') {
      const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'images';
      const folder = String(req.body?.folder || 'misc').replace(/[^a-zA-Z0-9/_-]/g, '') || 'misc';
      const contentType = String(req.body?.contentType || '');
      const extension = String(req.body?.extension || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
      if (!contentType.startsWith('image/') || !extension) return sendError(res, 400, 'Invalid image details.');
      const path = `${folder}/${Date.now().toString(36)}-${randomUUID()}.${extension}`;
      const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);
      if (error) throw error;
      const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);
      return res.status(200).json({ path: data.path, token: data.token, publicUrl: publicUrl.publicUrl });
    }

    return sendError(res, 405, 'Unsupported admin action.');
  } catch (error) {
    console.error('Admin API error:', error);
    return sendError(res, 500, 'Admin request failed. Check server configuration and Supabase logs.');
  }
}
