import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createClient } from '@supabase/supabase-js';

const collections = [
  'blogPosts',
  'teamMembers',
  'caseStudies',
  'marketplaceListings',
  'communityPosts',
  'chatMessages',
  'backlinks',
];
const batchSize = 100;

const requiredEnv = name => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const toJsonValue = value => {
  if (value && typeof value.toDate === 'function') return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(toJsonValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, toJsonValue(item)]));
  }
  return value;
};

const run = async () => {
  const credentialPath = resolve(requiredEnv('GOOGLE_APPLICATION_CREDENTIALS'));
  const serviceAccount = JSON.parse(await readFile(credentialPath, 'utf8'));
  const firebaseApp = initializeApp({ credential: cert(serviceAccount) });
  const firestore = getFirestore(firebaseApp);

  const supabase = createClient(
    requiredEnv('SUPABASE_URL'),
    requiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  for (const collectionName of collections) {
    const snapshot = await firestore.collection(collectionName).get();
    let migrated = 0;

    for (let offset = 0; offset < snapshot.docs.length; offset += batchSize) {
      const rows = snapshot.docs.slice(offset, offset + batchSize).map(document => ({
        collection_name: collectionName,
        id: document.id,
        data: toJsonValue(document.data()),
      }));

      const { error } = await supabase.from('app_records').upsert(rows, {
        onConflict: 'collection_name,id',
      });
      if (error) throw new Error(`Migration failed for ${collectionName}: ${error.message}`);
      migrated += rows.length;
    }

    console.log(`${collectionName}: ${migrated} records migrated`);
  }

  console.log('Migration complete. Existing Supabase records with matching IDs were updated.');
};

run().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
