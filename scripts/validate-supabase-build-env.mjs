import fs from 'node:fs';
import path from 'node:path';

function loadLocalEnv() {
  const envPath = path.resolve('.env.local');
  if (!fs.existsSync(envPath)) return {};

  const env = {};
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.replace(/^\uFEFF/, '').match(/^\s*(?:export\s+)?([^#=\s]+)\s*=\s*(.*?)\s*$/);
    if (match) env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return env;
}

const localEnv = loadLocalEnv();
const projectUrl = process.env.VITE_SUPABASE_URL || localEnv.VITE_SUPABASE_URL || '';
const publicKey = process.env.VITE_SUPABASE_ANON_KEY || localEnv.VITE_SUPABASE_ANON_KEY || '';

if (!projectUrl || !publicKey) {
  throw new Error(
    'Production build requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Configure both in the deployment build environment.',
  );
}

let parsedUrl;
try {
  parsedUrl = new URL(projectUrl);
} catch {
  throw new Error('VITE_SUPABASE_URL must be a valid Supabase project URL.');
}
const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(parsedUrl.hostname);
if (parsedUrl.protocol !== 'https:' && !(isLoopback && parsedUrl.protocol === 'http:')) {
  throw new Error('VITE_SUPABASE_URL must use HTTPS outside localhost.');
}

if (publicKey.startsWith('sb_secret_')) {
  throw new Error('VITE_SUPABASE_ANON_KEY contains a Supabase secret key. Use only a publishable key or anon-role key in VITE_ variables.');
}

if (publicKey.startsWith('sb_publishable_')) {
  console.log('✓ Supabase publishable key configured for public blog reads.');
} else {
  const parts = publicKey.split('.');
  let role;
  if (parts.length === 3) {
    try {
      role = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')).role;
    } catch {
      role = undefined;
    }
  }
  if (role !== 'anon') {
    throw new Error(
      'VITE_SUPABASE_ANON_KEY must be a valid Supabase publishable key or an anon-role API JWT. Do not use a service-role/secret key.',
    );
  }
  console.log('✓ Supabase anon-role key configured for public blog reads.');
}
