import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const data = require('./database.json');

const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "nextgenseo-707d0.firebaseapp.com",
  projectId: "nextgenseo-707d0",
  storageBucket: "nextgenseo-707d0.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function upload() {
  await signInAnonymously(auth);
  console.log('Auth OK');

  const blogs = Object.values(data.blogPosts);
  console.log(`Uploading ${blogs.length} blogs...`);

  for (const blog of blogs) {
    const clean = {
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || '',
      author: blog.author || '',
      date: blog.date || '',
      image: '',  // strip base64
    };
    const ref = await addDoc(collection(db, 'blogPosts'), {
      ...clean,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Uploaded:', ref.id, '|', blog.title?.substring(0, 40));
  }
  console.log('Done!');
  process.exit(0);
}

upload().catch(e => { console.error(e); process.exit(1); });
