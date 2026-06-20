import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATM1oVH-Weo8Qx0257-94xDqB7Zu2_8hM",
  authDomain: "next-gen-seo-agency.firebaseapp.com",
  projectId: "next-gen-seo-agency",
  storageBucket: "next-gen-seo-agency.firebasestorage.app",
  messagingSenderId: "65904043530",
  appId: "1:65904043530:web:9ce0789f7bf1ff645921f3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize anonymous auth
signInAnonymously(auth).catch(err => console.error('Auth error:', err));

// LocalStorage fallback
const getLocalData = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const saveLocalData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage error:', e);
  }
};

// Blog functions
export const saveBlogToFirebase = async (blog: any) => {
  try {
    const ref = await addDoc(collection(db, "blogPosts"), { ...blog, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return ref.id;
  } catch (e) {
    const blogs = getLocalData("customBlogs");
    const newBlog = { ...blog, id: Date.now().toString(), createdAt: new Date().toISOString() };
    blogs.push(newBlog);
    saveLocalData("customBlogs", blogs);
    return newBlog.id;
  }
};

export const getBlogsFromFirebase = async () => {
  try {
    const snapshot = await getDocs(collection(db, "blogPosts"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return getLocalData("customBlogs");
  }
};

export const updateBlogInFirebase = async (blogId: string, updates: any) => {
  try {
    await updateDoc(doc(db, "blogPosts", blogId), { ...updates, updatedAt: serverTimestamp() });
  } catch (e) {
    const blogs = getLocalData("customBlogs");
    const idx = blogs.findIndex((b: any) => b.id === blogId);
    if (idx > -1) {
      blogs[idx] = { ...blogs[idx], ...updates, updatedAt: new Date().toISOString() };
      saveLocalData("customBlogs", blogs);
    }
  }
};

export const deleteBlogFromFirebase = async (blogId: string) => {
  try {
    await deleteDoc(doc(db, "blogPosts", blogId));
  } catch (e) {
    const blogs = getLocalData("customBlogs").filter((b: any) => b.id !== blogId);
    saveLocalData("customBlogs", blogs);
  }
};

// Case functions
export const saveCaseToFirebase = async (caseStudy: any) => {
  try {
    const ref = await addDoc(collection(db, "caseStudies"), { ...caseStudy, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return ref.id;
  } catch (e) {
    const cases = getLocalData("customCases");
    const newCase = { ...caseStudy, id: Date.now().toString(), createdAt: new Date().toISOString() };
    cases.push(newCase);
    saveLocalData("customCases", cases);
    return newCase.id;
  }
};

export const getCasesFromFirebase = async () => {
  try {
    const snapshot = await getDocs(collection(db, "caseStudies"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return getLocalData("customCases");
  }
};

export const updateCaseInFirebase = async (caseId: string, updates: any) => {
  try {
    await updateDoc(doc(db, "caseStudies", caseId), { ...updates, updatedAt: serverTimestamp() });
  } catch (e) {
    const cases = getLocalData("customCases");
    const idx = cases.findIndex((c: any) => c.id === caseId);
    if (idx > -1) {
      cases[idx] = { ...cases[idx], ...updates, updatedAt: new Date().toISOString() };
      saveLocalData("customCases", cases);
    }
  }
};

export const deleteCaseFromFirebase = async (caseId: string) => {
  try {
    await deleteDoc(doc(db, "caseStudies", caseId));
  } catch (e) {
    const cases = getLocalData("customCases").filter((c: any) => c.id !== caseId);
    saveLocalData("customCases", cases);
  }
};

// Team functions
export const saveTeamToFirebase = async (member: any) => {
  try {
    const ref = await addDoc(collection(db, "teamMembers"), { ...member, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return ref.id;
  } catch (e) {
    const team = getLocalData("customTeam");
    const newMember = { ...member, id: Date.now().toString(), createdAt: new Date().toISOString() };
    team.push(newMember);
    saveLocalData("customTeam", team);
    return newMember.id;
  }
};

export const getTeamFromFirebase = async () => {
  try {
    const snapshot = await getDocs(collection(db, "teamMembers"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return getLocalData("customTeam");
  }
};

export const updateTeamInFirebase = async (memberId: string, updates: any) => {
  try {
    await updateDoc(doc(db, "teamMembers", memberId), { ...updates, updatedAt: serverTimestamp() });
  } catch (e) {
    const team = getLocalData("customTeam");
    const idx = team.findIndex((m: any) => m.id === memberId);
    if (idx > -1) {
      team[idx] = { ...team[idx], ...updates, updatedAt: new Date().toISOString() };
      saveLocalData("customTeam", team);
    }
  }
};

export const deleteTeamFromFirebase = async (memberId: string) => {
  try {
    await deleteDoc(doc(db, "teamMembers", memberId));
  } catch (e) {
    const team = getLocalData("customTeam").filter((m: any) => m.id !== memberId);
    saveLocalData("customTeam", team);
  }
};

// Chat functions
export const saveChatMessageToFirebase = async (message: any) => {
  try {
    const ref = await addDoc(collection(db, "chatMessages"), { ...message, timestamp: serverTimestamp() });
    return ref.id;
  } catch (e) {
    const messages = getLocalData("chatMessages");
    const newMessage = { ...message, id: Date.now().toString(), timestamp: new Date().toISOString() };
    messages.push(newMessage);
    saveLocalData("chatMessages", messages);
    return newMessage.id;
  }
};

export const getChatMessagesFromFirebase = async () => {
  try {
    const snapshot = await getDocs(collection(db, "chatMessages"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return getLocalData("chatMessages");
  }
};

export const deleteChatMessageFromFirebase = async (messageId: string) => {
  try {
    await deleteDoc(doc(db, "chatMessages", messageId));
  } catch (e) {
    const messages = getLocalData("chatMessages").filter((m: any) => m.id !== messageId);
    saveLocalData("chatMessages", messages);
  }
};

// Backlinks functions
export const saveBacklinkToFirebase = async (backlink: any) => {
  try {
    const ref = await addDoc(collection(db, "backlinks"), { ...backlink, createdAt: serverTimestamp() });
    return ref.id;
  } catch (e) {
    const backlinks = getLocalData("backlinks");
    const newBacklink = { ...backlink, id: Date.now().toString(), createdAt: new Date().toISOString() };
    backlinks.push(newBacklink);
    saveLocalData("backlinks", backlinks);
    return newBacklink.id;
  }
};

export const getBacklinksFromFirebase = async () => {
  try {
    const snapshot = await getDocs(collection(db, "backlinks"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return getLocalData("backlinks");
  }
};

export const deleteBacklinkFromFirebase = async (backlinkId: string) => {
  try {
    await deleteDoc(doc(db, "backlinks", backlinkId));
  } catch (e) {
    const backlinks = getLocalData("backlinks").filter((b: any) => b.id !== backlinkId);
    saveLocalData("backlinks", backlinks);
  }
};

export const uploadBlogImage = async (imageData: string) => imageData;
