import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const requiredEnv = name => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const normalizePayload = value => {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value;
  return Object.entries(value).map(([id, record]) => ({
    ...(record && typeof record === 'object' ? record : {}),
    id: record && typeof record === 'object' && record.id ? record.id : id,
  }));
};

const cleanJson = value => {
  if (value && typeof value.toDate === 'function') return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(cleanJson);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cleanJson(item)]));
  }
  return value;
};

const run = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootDir = resolve(__dirname, '..');
  const filePath = resolve(rootDir, 'database.json');
  const payload = JSON.parse(await readFile(filePath, 'utf8'));

  const supabase = createClient(
    requiredEnv('SUPABASE_URL'),
    requiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const collections = Object.entries(payload || {}).filter(([_, value]) => value && typeof value === 'object');
  if (!collections.length) {
    throw new Error('No collection data found in database.json.');
  }

  let imported = 0;
  for (const [collectionName, rawValue] of collections) {
    const rows = normalizePayload(rawValue).map(item => {
      const record = cleanJson(item);
      const id = String(record.id || record.slug || cryptoRandomId());
      const { id: _id, ...data } = record;
      return {
        collection_name: collectionName,
        id,
        data,
      };
    });

    if (!rows.length) continue;

    const { error } = await supabase.from('app_records').upsert(rows, { onConflict: 'collection_name,id' });
    if (error) throw new Error(`Import failed for ${collectionName}: ${error.message}`);

    imported += rows.length;
    console.log(`${collectionName}: ${rows.length} records upserted`);
  }

  console.log(`Import complete. ${imported} records inserted/updated in Supabase.`);
};

const cryptoRandomId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `legacy-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

run().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
