import React, { useState, useEffect } from 'react';
import { saveBlogToFirebase, getBlogsFromFirebase, updateBlogInFirebase, deleteBlogFromFirebase, saveCaseToFirebase, getCasesFromFirebase, updateCaseInFirebase, deleteCaseFromFirebase, saveTeamToFirebase, getTeamFromFirebase, updateTeamInFirebase, deleteTeamFromFirebase, getChatMessagesFromFirebase, deleteChatMessageFromFirebase } from '../utils/firebase';

interface ChatMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  trafficGrowth: string;
  keywordsRanked: string;
  revenueIncrease: string;
  duration: string;
  image: string;
  color: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

const compressImage = async (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxW = 800;
      const ratio = Math.min(1, maxW / img.width);
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Keep reducing quality until under 500KB
      let quality = 0.85;
      let result = canvas.toDataURL('image/jpeg', quality);
      while (result.length > 500000 && quality > 0.3) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality);
      }
      resolve(result);
    };
    img.onerror = () => resolve(base64);
  });
};

const ImageUploadField = ({ image, onImageChange, onImageRemove, label, aspect = 'landscape' }: { image: string; onImageChange: (img: string) => void; onImageRemove: () => void; label: string; aspect?: string }) => {
  const [urlInput, setUrlInput] = React.useState('');
  const [mode, setMode] = React.useState<'upload' | 'url'>('upload');

  const handleUrl = () => {
    if (urlInput.trim()) { onImageChange(urlInput.trim()); setUrlInput(''); }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-slate-300 mb-2">{label}</label>
      <div className="flex gap-2 mb-3">
        <button type="button" onClick={() => setMode('upload')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${mode === 'upload' ? 'bg-purple-500 text-white' : 'glass text-slate-400'}`}>Upload File</button>
        <button type="button" onClick={() => setMode('url')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${mode === 'url' ? 'bg-purple-500 text-white' : 'glass text-slate-400'}`}>Image URL</button>
      </div>
      {image ? (
        <div className="relative">
          <img src={image} alt="preview" className={`w-full ${aspect === 'square' ? 'h-48' : 'h-40'} object-contain bg-slate-900 rounded-lg`} />
          <button type="button" onClick={onImageRemove} className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 px-3 py-1 rounded-lg text-xs font-bold text-white transition-all">Remove</button>
        </div>
      ) : mode === 'url' ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUrl()}
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none text-sm"
          />
          <button type="button" onClick={handleUrl} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-bold text-sm transition-all">Add</button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-purple-500/50 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all group">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-10 h-10 text-purple-400/60 group-hover:text-purple-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-slate-300 font-bold">Click to upload image</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG (max 5MB) — will be compressed</p>
          </div>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => onImageChange(reader.result as string);
              reader.readAsDataURL(file);
            }
          }} className="hidden" />
        </label>
      )}
    </div>
  );
};

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const BlogIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TeamIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM15 20h.01" />
  </svg>
);

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'blogs' | 'cases' | 'team'>('dashboard');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const inactivityTimeout = 5 * 60 * 1000;
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogImage, setBlogImage] = useState<string>('');
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    image: ''
  });
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [caseImage, setCaseImage] = useState<string>('');
  const [caseForm, setCaseForm] = useState({
    client: '',
    industry: '',
    challenge: '',
    trafficGrowth: '',
    keywordsRanked: '',
    revenueIncrease: '',
    duration: '',
    image: '',
    color: 'purple'
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [teamImage, setTeamImage] = useState<string>('');
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    linkedin: '',
    twitter: ''
  });

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'nextgenadmin';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'NextGen@2025';

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      loadChatMessages();
      loadBlogs();
      loadCases();
      loadTeam();
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > inactivityTimeout) {
        handleLogout();
        alert('Session expired due to inactivity. Please login again.');
      }
    }, 30000);
    return () => clearInterval(checkInactivity);
  }, [isLoggedIn, lastActivity]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousedown', updateActivity);
    window.addEventListener('keydown', updateActivity);
    return () => {
      window.removeEventListener('mousedown', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [isLoggedIn]);

  const loadChatMessages = async () => {
    try {
      const messages = await getChatMessagesFromFirebase();
      setChatMessages(messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadBlogs = async () => {
    try {
      const savedBlogs = await getBlogsFromFirebase();
      setBlogs(savedBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const loadCases = async () => {
    try {
      const savedCases = await getCasesFromFirebase();
      setCases(savedCases);
    } catch (error) {
      console.error('Error loading cases:', error);
    }
  };

  const loadTeam = async () => {
    try {
      const savedTeam = await getTeamFromFirebase();
      setTeamMembers(savedTeam);
    } catch (error) {
      console.error('Error loading team:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      loadChatMessages();
      loadBlogs();
      loadCases();
      loadTeam();
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setUsername('');
    setPassword('');
  };

  const deleteMessage = async (id: string) => {
    try {
      await deleteChatMessageFromFirebase(id);
      setChatMessages(chatMessages.filter(m => m.id !== id));
    } catch (error) {
      alert('Error deleting message');
    }
  };

  const saveBlog = async () => {
    if (!blogForm.title || !blogForm.content) {
      alert('Title and content required!');
      return;
    }
    try {
      let imageData = blogForm.image;
      if (blogForm.image && blogForm.image.startsWith('data:image')) {
        imageData = await compressImage(blogForm.image);
      }
      const blogData = { ...blogForm, image: imageData, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) };
      if (editingBlog) {
        await updateBlogInFirebase(editingBlog.id, blogData);
        setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...blogData, id: editingBlog.id } : b));
      } else {
        const docId = await saveBlogToFirebase(blogData);
        setBlogs([...blogs, { ...blogData, id: docId }]);
      }
      setBlogForm({ title: '', excerpt: '', content: '', category: '', author: '', image: '' });
      setBlogImage('');
      setShowBlogForm(false);
      setEditingBlog(null);
      alert('Blog saved!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const editBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm(blog);
    setBlogImage(blog.image);
    setShowBlogForm(true);
  };

  const deleteBlog = async (id: string) => {
    if (confirm('Delete this blog?')) {
      try {
        await deleteBlogFromFirebase(id);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        alert('Error');
      }
    }
  };

  const saveCase = async () => {
    if (!caseForm.client || !caseForm.industry) {
      alert('Client and industry required!');
      return;
    }
    try {
      let imageData = caseForm.image;
      if (caseForm.image && caseForm.image.startsWith('data:image')) {
        imageData = await compressImage(caseForm.image);
      }
      const caseData = { ...caseForm, image: imageData };
      if (editingCase) {
        await updateCaseInFirebase(editingCase.id, caseData);
        setCases(cases.map(c => c.id === editingCase.id ? { ...caseData, id: editingCase.id } : c));
      } else {
        const docId = await saveCaseToFirebase(caseData);
        setCases([...cases, { ...caseData, id: docId }]);
      }
      setCaseForm({ client: '', industry: '', challenge: '', trafficGrowth: '', keywordsRanked: '', revenueIncrease: '', duration: '', image: '', color: 'purple' });
      setCaseImage('');
      setShowCaseForm(false);
      setEditingCase(null);
      alert('Case saved!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const editCase = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
    setCaseForm(caseStudy);
    setCaseImage(caseStudy.image);
    setShowCaseForm(true);
  };

  const deleteCase = async (id: string) => {
    if (confirm('Delete this case?')) {
      try {
        await deleteCaseFromFirebase(id);
        setCases(cases.filter(c => c.id !== id));
      } catch (error) {
        alert('Error');
      }
    }
  };

  const saveTeam = async () => {
    if (!teamForm.name || !teamForm.role) {
      alert('Name and role required!');
      return;
    }
    try {
      let imageData = teamForm.image;
      if (teamForm.image && teamForm.image.startsWith('data:image')) {
        imageData = await compressImage(teamForm.image);
      }
      const teamData = { ...teamForm, image: imageData };
      if (editingTeam) {
        await updateTeamInFirebase(editingTeam.id, teamData);
        setTeamMembers(teamMembers.map(t => t.id === editingTeam.id ? { ...teamData, id: editingTeam.id } : t));
      } else {
        const docId = await saveTeamToFirebase(teamData);
        setTeamMembers([...teamMembers, { ...teamData, id: docId }]);
      }
      setTeamForm({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '' });
      setTeamImage('');
      setShowTeamForm(false);
      setEditingTeam(null);
      alert('Member saved!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const editTeam = (member: TeamMember) => {
    setEditingTeam(member);
    setTeamForm(member);
    setTeamImage(member.image);
    setShowTeamForm(true);
  };

  const deleteTeam = async (id: string) => {
    if (confirm('Delete this member?')) {
      try {
        await deleteTeamFromFirebase(id);
        setTeamMembers(teamMembers.filter(t => t.id !== id));
      } catch (error) {
        alert('Error');
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="glass p-10 rounded-3xl max-w-md w-full border border-purple-500/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-2">Admin <span className="gradient-text">Panel</span></h1>
            <p className="text-slate-400">Secure Access</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-3 mb-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none text-white placeholder-slate-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-3 mb-6 focus:ring-2 focus:ring-purple-500/50 focus:outline-none text-white placeholder-slate-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-xl font-black text-lg shadow-lg shadow-purple-500/40 transition-all hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-6 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-slate-400 text-sm mt-1">Manage your SEO business</p>
          </div>
          <button
            onClick={handleLogout}
            className="glass px-6 py-3 rounded-xl font-bold hover:bg-red-500/10 transition-all border border-red-500/30 text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 flex-wrap">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
            { id: 'messages', label: 'Messages', icon: MessageIcon },
            { id: 'blogs', label: 'Blogs', icon: BlogIcon },
            { id: 'cases', label: 'Cases', icon: CaseIcon },
            { id: 'team', label: 'Team', icon: TeamIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap border ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-transparent'
                    : 'glass text-slate-400 hover:text-white border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <MessageIcon />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold">Messages</p>
                  <p className="text-3xl font-black text-purple-400">{chatMessages.length}</p>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <BlogIcon />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold">Blogs</p>
                  <p className="text-3xl font-black text-blue-400">{blogs.length}</p>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CaseIcon />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold">Cases</p>
                  <p className="text-3xl font-black text-emerald-400">{cases.length}</p>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl border border-pink-500/30 hover:border-pink-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <TeamIcon />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold">Team</p>
                  <p className="text-3xl font-black text-pink-400">{teamMembers.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-3xl font-black mb-6">Messages</h2>
            {chatMessages.length === 0 ? (
              <p className="text-slate-400 text-center py-12">No messages yet</p>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-6 bg-slate-900/30 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-lg">{msg.name}</p>
                        <p className="text-sm text-slate-400">{msg.email}</p>
                      </div>
                      <button onClick={() => deleteMessage(msg.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded-lg text-sm font-bold transition-all">Delete</button>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-black">Blogs</h2>
              <button
                onClick={() => {
                  setShowBlogForm(true);
                  setEditingBlog(null);
                  setBlogForm({ title: '', excerpt: '', content: '', category: '', author: '', image: '' });
                  setBlogImage('');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Blog
              </button>
            </div>

            {showBlogForm && (
              <div className="bg-slate-900/50 p-8 rounded-xl mb-8 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-6">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Title</label>
                    <input type="text" placeholder="Blog title" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Excerpt</label>
                    <textarea placeholder="Short description" value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} rows={2} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Content (HTML)</label>
                    <textarea placeholder="Detailed content" value={blogForm.content} onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} rows={5} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Category</label>
                      <input type="text" placeholder="e.g., AI & Trends" value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Author</label>
                      <input type="text" placeholder="Author name" value={blogForm.author} onChange={(e) => setBlogForm({...blogForm, author: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                  </div>
                  <ImageUploadField 
                    image={blogImage}
                    onImageChange={(img) => {setBlogImage(img); setBlogForm({...blogForm, image: img});}}
                    onImageRemove={() => {setBlogImage(''); setBlogForm({...blogForm, image: ''});}}
                    label="Featured Image"
                  />
                  <div className="flex gap-3 pt-4">
                    <button onClick={saveBlog} className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold transition-all">Save Blog</button>
                    <button onClick={() => {setShowBlogForm(false); setBlogImage('');}} className="glass px-8 py-3 rounded-lg font-bold">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="p-6 bg-slate-900/30 rounded-lg border border-white/5 hover:border-white/10 transition-all flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{blog.title}</h3>
                    <p className="text-sm text-purple-400 mt-1">{blog.category}</p>
                    <p className="text-sm text-slate-400 mt-2">{blog.author}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editBlog(blog)} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-all">Edit</button>
                    <button onClick={() => deleteBlog(blog.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-black">Case Studies</h2>
              <button
                onClick={() => {
                  setShowCaseForm(true);
                  setEditingCase(null);
                  setCaseForm({ client: '', industry: '', challenge: '', trafficGrowth: '', keywordsRanked: '', revenueIncrease: '', duration: '', image: '', color: 'purple' });
                  setCaseImage('');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Case
              </button>
            </div>

            {showCaseForm && (
              <div className="bg-slate-900/50 p-8 rounded-xl mb-8 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-6">{editingCase ? 'Edit Case' : 'Create New Case'}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Client</label>
                      <input type="text" placeholder="Client name" value={caseForm.client} onChange={(e) => setCaseForm({...caseForm, client: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Industry</label>
                      <input type="text" placeholder="Industry" value={caseForm.industry} onChange={(e) => setCaseForm({...caseForm, industry: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Challenge</label>
                    <textarea placeholder="Describe the challenge" value={caseForm.challenge} onChange={(e) => setCaseForm({...caseForm, challenge: e.target.value})} rows={2} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Traffic Growth</label>
                      <input type="text" placeholder="+300%" value={caseForm.trafficGrowth} onChange={(e) => setCaseForm({...caseForm, trafficGrowth: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Keywords Ranked</label>
                      <input type="text" placeholder="+150" value={caseForm.keywordsRanked} onChange={(e) => setCaseForm({...caseForm, keywordsRanked: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Revenue Increase</label>
                      <input type="text" placeholder="+250%" value={caseForm.revenueIncrease} onChange={(e) => setCaseForm({...caseForm, revenueIncrease: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Duration</label>
                      <input type="text" placeholder="6 months" value={caseForm.duration} onChange={(e) => setCaseForm({...caseForm, duration: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                  </div>
                  <ImageUploadField 
                    image={caseImage}
                    onImageChange={(img) => {setCaseImage(img); setCaseForm({...caseForm, image: img});}}
                    onImageRemove={() => {setCaseImage(''); setCaseForm({...caseForm, image: ''});}}
                    label="Case Image"
                  />
                  <div className="flex gap-3 pt-4">
                    <button onClick={saveCase} className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold transition-all">Save Case</button>
                    <button onClick={() => {setShowCaseForm(false); setCaseImage('');}} className="glass px-8 py-3 rounded-lg font-bold">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {cases.map((c) => (
                <div key={c.id} className="p-6 bg-slate-900/30 rounded-lg border border-white/5 hover:border-white/10 transition-all flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{c.client} - {c.industry}</h3>
                    <p className="text-sm text-slate-400 mt-2">{c.challenge}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="text-emerald-400 font-bold">{c.trafficGrowth} traffic</span>
                      <span className="text-blue-400 font-bold">{c.keywordsRanked} keywords</span>
                      <span className="text-pink-400 font-bold">{c.duration}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editCase(c)} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-all">Edit</button>
                    <button onClick={() => deleteCase(c.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="glass p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-black">Team Members</h2>
              <button
                onClick={() => {
                  setShowTeamForm(true);
                  setEditingTeam(null);
                  setTeamForm({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '' });
                  setTeamImage('');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Member
              </button>
            </div>

            {showTeamForm && (
              <div className="bg-slate-900/50 p-8 rounded-xl mb-8 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-6">{editingTeam ? 'Edit Member' : 'Add Team Member'}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Name</label>
                      <input type="text" placeholder="Full name" value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Role</label>
                      <input type="text" placeholder="Job title" value={teamForm.role} onChange={(e) => setTeamForm({...teamForm, role: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Bio</label>
                    <textarea placeholder="Team member bio" value={teamForm.bio} onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})} rows={3} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                  </div>
                  <ImageUploadField 
                    image={teamImage}
                    onImageChange={(img) => {setTeamImage(img); setTeamForm({...teamForm, image: img});}}
                    onImageRemove={() => {setTeamImage(''); setTeamForm({...teamForm, image: ''});}}
                    label="Profile Image"
                    aspect="square"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">LinkedIn</label>
                      <input type="text" placeholder="LinkedIn URL" value={teamForm.linkedin} onChange={(e) => setTeamForm({...teamForm, linkedin: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Twitter</label>
                      <input type="text" placeholder="Twitter URL" value={teamForm.twitter} onChange={(e) => setTeamForm({...teamForm, twitter: e.target.value})} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={saveTeam} className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold transition-all">Save Member</button>
                    <button onClick={() => {setShowTeamForm(false); setTeamImage('');}} className="glass px-8 py-3 rounded-lg font-bold">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((m) => (
                <div key={m.id} className="p-6 bg-slate-900/30 rounded-lg border border-white/5 hover:border-white/10 transition-all text-center">
                  {m.image && <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple-500/30" />}
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <p className="text-sm text-purple-400 font-bold mt-1">{m.role}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{m.bio}</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <button onClick={() => editTeam(m)} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1 rounded-lg text-xs font-bold transition-all">Edit</button>
                    <button onClick={() => deleteTeam(m.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1 rounded-lg text-xs font-bold transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
