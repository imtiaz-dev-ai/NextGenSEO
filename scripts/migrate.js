import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const oldKey = require('../next-gen-seo-agency-firebase-adminsdk-fbsvc-9cb1cbfaf6.json');
const newKey = require('../nextgenseo-707d0-firebase-adminsdk-fbsvc-fd51b69e50.json');

const oldApp = initializeApp({ credential: cert(oldKey) }, 'old');
const newApp = initializeApp({ credential: cert(newKey) }, 'new');

const oldDb = getFirestore(oldApp);
const newDb = getFirestore(newApp);

const collections = ['blogPosts', 'teamMembers', 'caseStudies', 'marketplaceListings', 'communityPosts', 'chatMessages', 'backlinks'];

async function migrate() {
  for (const col of collections) {
    const snapshot = await oldDb.collection(col).get();
    if (snapshot.empty) { console.log(`${col}: empty, skipping`); continue; }
    let count = 0;
    for (const docSnap of snapshot.docs) {
      await newDb.collection(col).doc(docSnap.id).set(docSnap.data());
      count++;
    }
    console.log(`✅ ${col}: ${count} docs migrated`);
  }
  console.log('\n🎉 Migration complete!');
}

migrate().catch(console.error);
