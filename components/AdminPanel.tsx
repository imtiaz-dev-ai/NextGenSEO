import React, { useState, useEffect } from 'react';

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
  readTime: string;
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

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'blogs' | 'pricing' | 'messages' | 'cases' | 'team' | 'backlinks'>('messages');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const inactivityTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    readTime: '',
    image: ''
  });
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
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
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    linkedin: '',
    twitter: ''
  });
  const [backlinks, setBacklinks] = useState<any[]>([]);
  const [showBacklinkForm, setShowBacklinkForm] = useState(false);
  const [backlinkForm, setBacklinkForm] = useState({
    title: '',
    url: '',
    location: 'footer' as 'footer' | 'blog',
    description: ''
  });

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'nextgenadmin';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'NextGen@2025';

  // Security: Sanitize input to prevent log injection
  const sanitizeInput = (input: string) => {
    return input.replace(/[\n\r]/g, '').trim();
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      loadChatMessages();
      loadBlogs();
      loadCases();
      loadTeam();
      loadBacklinks();
    }
  }, []);

  // Auto logout after 5 minutes of inactivity
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkInactivity = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > inactivityTimeout) {
        handleLogout();
        alert('Session expired due to inactivity. Please login again.');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInactivity);
  }, [isLoggedIn, lastActivity]);

  // Track user activity
  useEffect(() => {
    if (!isLoggedIn) return;

    const updateActivity = () => setLastActivity(Date.now());
    
    window.addEventListener('mousedown', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    return () => {
      window.removeEventListener('mousedown', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
    };
  }, [isLoggedIn]);

  const loadChatMessages = () => {
    const messages = localStorage.getItem('chatMessages');
    if (messages) setChatMessages(JSON.parse(messages));
  };

  const loadBlogs = () => {
    const savedBlogs = localStorage.getItem('blogPosts');
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
  };

  const loadCases = () => {
    const savedCases = localStorage.getItem('caseStudies');
    if (savedCases) setCases(JSON.parse(savedCases));
  };

  const loadTeam = () => {
    const savedTeam = localStorage.getItem('teamMembers');
    if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
  };

  const loadBacklinks = () => {
    const savedBacklinks = localStorage.getItem('siteBacklinks');
    if (savedBacklinks) setBacklinks(JSON.parse(savedBacklinks));
  };

  const saveBacklink = () => {
    if (!backlinkForm.title || !backlinkForm.url) {
      alert('Title and URL are required!');
      return;
    }
    const newBacklink = { ...backlinkForm, id: Date.now().toString() };
    const updated = [...backlinks, newBacklink];
    setBacklinks(updated);
    localStorage.setItem('siteBacklinks', JSON.stringify(updated));
    setBacklinkForm({ title: '', url: '', location: 'footer', description: '' });
    setShowBacklinkForm(false);
  };

  const deleteBacklink = (id: string) => {
    if (confirm('Delete this backlink?')) {
      const updated = backlinks.filter(b => b.id !== id);
      setBacklinks(updated);
      localStorage.setItem('siteBacklinks', JSON.stringify(updated));
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

  const deleteMessage = (id: string) => {
    const updated = chatMessages.filter(m => m.id !== id);
    setChatMessages(updated);
    localStorage.setItem('chatMessages', JSON.stringify(updated));
  };

  const saveBlog = () => {
    if (!blogForm.title || !blogForm.content) {
      alert('Title and content are required!');
      return;
    }

    if (editingBlog) {
      const updated = blogs.map(b => b.id === editingBlog.id ? { ...blogForm, id: editingBlog.id } : b);
      setBlogs(updated);
      localStorage.setItem('blogPosts', JSON.stringify(updated));
    } else {
      const newBlog: BlogPost = {
        ...blogForm,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      const updated = [...blogs, newBlog];
      setBlogs(updated);
      localStorage.setItem('blogPosts', JSON.stringify(updated));
    }

    setBlogForm({ title: '', excerpt: '', content: '', category: '', author: '', readTime: '', image: '' });
    setShowBlogForm(false);
    setEditingBlog(null);
  };

  const editBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm(blog);
    setShowBlogForm(true);
  };

  const deleteBlog = (id: string) => {
    if (confirm('Delete this blog?')) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('blogPosts', JSON.stringify(updated));
    }
  };

  const saveCase = () => {
    if (!caseForm.client || !caseForm.industry) {
      alert('Client and industry are required!');
      return;
    }

    if (editingCase) {
      const updated = cases.map(c => c.id === editingCase.id ? { ...caseForm, id: editingCase.id } : c);
      setCases(updated);
      localStorage.setItem('caseStudies', JSON.stringify(updated));
    } else {
      const newCase: CaseStudy = { ...caseForm, id: Date.now().toString() };
      const updated = [...cases, newCase];
      setCases(updated);
      localStorage.setItem('caseStudies', JSON.stringify(updated));
    }

    setCaseForm({ client: '', industry: '', challenge: '', trafficGrowth: '', keywordsRanked: '', revenueIncrease: '', duration: '', image: '', color: 'purple' });
    setShowCaseForm(false);
    setEditingCase(null);
  };

  const editCase = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
    setCaseForm(caseStudy);
    setShowCaseForm(true);
  };

  const deleteCase = (id: string) => {
    if (confirm('Delete this case study?')) {
      const updated = cases.filter(c => c.id !== id);
      setCases(updated);
      localStorage.setItem('caseStudies', JSON.stringify(updated));
    }
  };

  const saveTeam = () => {
    if (!teamForm.name || !teamForm.role) {
      alert('Name and role are required!');
      return;
    }

    if (editingTeam) {
      const updated = teamMembers.map(t => t.id === editingTeam.id ? { ...teamForm, id: editingTeam.id } : t);
      setTeamMembers(updated);
      localStorage.setItem('teamMembers', JSON.stringify(updated));
    } else {
      const newMember: TeamMember = { ...teamForm, id: Date.now().toString() };
      const updated = [...teamMembers, newMember];
      setTeamMembers(updated);
      localStorage.setItem('teamMembers', JSON.stringify(updated));
    }

    setTeamForm({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '' });
    setShowTeamForm(false);
    setEditingTeam(null);
  };

  const editTeam = (member: TeamMember) => {
    setEditingTeam(member);
    setTeamForm(member);
    setShowTeamForm(true);
  };

  const deleteTeam = (id: string) => {
    if (confirm('Delete this team member?')) {
      const updated = teamMembers.filter(t => t.id !== id);
      setTeamMembers(updated);
      localStorage.setItem('teamMembers', JSON.stringify(updated));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass p-10 rounded-3xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-2">Admin <span className="gradient-text">Panel</span></h1>
            <p className="text-slate-400">Login to access dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 mb-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 mb-6 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 rounded-2xl font-black text-lg shadow-xl shadow-purple-500/40 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-black">Admin <span className="gradient-text">Dashboard</span></h1>
        <button
          onClick={handleLogout}
          className="glass px-6 py-3 rounded-xl font-bold hover:bg-red-500/20 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'messages'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          Chat Messages
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'blogs'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          Manage Blogs
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'cases'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          Case Studies
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'team'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          Our Team
        </button>
        <button
          onClick={() => setActiveTab('backlinks')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'backlinks'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          Backlinks
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'pricing'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          Manage Pricing
        </button>
      </div>

      {/* Content */}
      {activeTab === 'messages' && (
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-black mb-6">Chatbot Messages</h2>
          {chatMessages.length === 0 ? (
            <p className="text-slate-400 text-center py-12">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="glass p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{msg.name}</h3>
                      <p className="text-sm text-slate-400">{msg.email}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-slate-500">{msg.timestamp}</span>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'blogs' && (
        <div className="glass p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black">Manage Blogs</h2>
            <button 
              onClick={() => { setShowBlogForm(true); setEditingBlog(null); setBlogForm({ title: '', excerpt: '', content: '', category: '', author: '', readTime: '', image: '' }); }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-bold shadow-xl shadow-purple-500/20 transition-all"
            >
              + Add New Blog
            </button>
          </div>

          {showBlogForm && (
            <div className="glass p-6 rounded-2xl mb-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Excerpt (Short description)"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <textarea
                  placeholder="Blog Content (HTML supported for backlinks: <a href='url'>text</a>)"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  rows={8}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Category"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Author Name"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Read Time (e.g., 5 min)"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (or upload below)"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                </div>
                <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                          alert('File size must be less than 10MB');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setBlogForm({...blogForm, image: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="blogImageUpload"
                  />
                  <label htmlFor="blogImageUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-purple-400 font-bold">Click to upload image or use URL above</span>
                      <span className="text-slate-500 text-xs">PNG, JPG, GIF up to 10MB</span>
                    </div>
                  </label>
                  {blogForm.image && (
                    <div className="mt-4 relative">
                      <img src={blogForm.image} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
                      <button
                        onClick={() => setBlogForm({...blogForm, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={saveBlog} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold transition-all">Save Blog</button>
                  <button onClick={() => { setShowBlogForm(false); setEditingBlog(null); }} className="glass px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-slate-400 text-center py-12">No blogs yet. Create your first blog!</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} className="glass p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{blog.excerpt}</p>
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span>{blog.category}</span>
                        <span>{blog.author}</span>
                        <span>{blog.readTime}</span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => editBlog(blog)} className="text-blue-400 hover:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/10 transition-all">Edit</button>
                      <button onClick={() => deleteBlog(blog.id)} className="text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'cases' && (
        <div className="glass p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black">Manage Case Studies</h2>
            <button 
              onClick={() => { setShowCaseForm(true); setEditingCase(null); setCaseForm({ client: '', industry: '', challenge: '', trafficGrowth: '', keywordsRanked: '', revenueIncrease: '', duration: '', image: '', color: 'purple' }); }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-bold shadow-xl shadow-purple-500/20 transition-all"
            >
              + Add Case Study
            </button>
          </div>

          {showCaseForm && (
            <div className="glass p-6 rounded-2xl mb-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4">{editingCase ? 'Edit Case Study' : 'Create New Case Study'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={caseForm.client}
                    onChange={(e) => setCaseForm({...caseForm, client: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    value={caseForm.industry}
                    onChange={(e) => setCaseForm({...caseForm, industry: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                </div>
                <textarea
                  placeholder="Challenge Description"
                  value={caseForm.challenge}
                  onChange={(e) => setCaseForm({...caseForm, challenge: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Traffic Growth (e.g., +450%)"
                    value={caseForm.trafficGrowth}
                    onChange={(e) => setCaseForm({...caseForm, trafficGrowth: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Keywords Ranked (e.g., +280)"
                    value={caseForm.keywordsRanked}
                    onChange={(e) => setCaseForm({...caseForm, keywordsRanked: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Revenue Increase (e.g., +320%)"
                    value={caseForm.revenueIncrease}
                    onChange={(e) => setCaseForm({...caseForm, revenueIncrease: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 6 months)"
                    value={caseForm.duration}
                    onChange={(e) => setCaseForm({...caseForm, duration: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Image URL (or upload below)"
                    value={caseForm.image}
                    onChange={(e) => setCaseForm({...caseForm, image: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <select
                    value={caseForm.color}
                    onChange={(e) => setCaseForm({...caseForm, color: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  >
                    <option value="purple">Purple</option>
                    <option value="emerald">Emerald</option>
                    <option value="cyan">Cyan</option>
                    <option value="pink">Pink</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                          alert('File size must be less than 10MB');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCaseForm({...caseForm, image: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="caseImageUpload"
                  />
                  <label htmlFor="caseImageUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-purple-400 font-bold text-sm">Upload Case Image</span>
                      <span className="text-slate-500 text-xs">PNG, JPG up to 10MB</span>
                    </div>
                  </label>
                  {caseForm.image && (
                    <div className="mt-4 relative">
                      <img src={caseForm.image} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
                      <button
                        onClick={() => setCaseForm({...caseForm, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={saveCase} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold transition-all">Save Case</button>
                  <button onClick={() => { setShowCaseForm(false); setEditingCase(null); }} className="glass px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {cases.length === 0 ? (
              <p className="text-slate-400 text-center py-12">No case studies yet. Create your first case!</p>
            ) : (
              cases.map((caseStudy) => (
                <div key={caseStudy.id} className="glass p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{caseStudy.client} - {caseStudy.industry}</h3>
                      <p className="text-slate-400 text-sm mb-3">{caseStudy.challenge}</p>
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span>Traffic: {caseStudy.trafficGrowth}</span>
                        <span>Keywords: {caseStudy.keywordsRanked}</span>
                        <span>Revenue: {caseStudy.revenueIncrease}</span>
                        <span>Duration: {caseStudy.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => editCase(caseStudy)} className="text-blue-400 hover:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/10 transition-all">Edit</button>
                      <button onClick={() => deleteCase(caseStudy.id)} className="text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="glass p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black">Manage Team Members</h2>
            <button 
              onClick={() => { setShowTeamForm(true); setEditingTeam(null); setTeamForm({ name: '', role: '', bio: '', image: '', linkedin: '', twitter: '' }); }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-bold shadow-xl shadow-purple-500/20 transition-all"
            >
              + Add Team Member
            </button>
          </div>

          {showTeamForm && (
            <div className="glass p-6 rounded-2xl mb-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4">{editingTeam ? 'Edit Team Member' : 'Add New Team Member'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Role/Position"
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({...teamForm, role: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                </div>
                <textarea
                  placeholder="Bio/Description"
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Image URL (or upload below)"
                  value={teamForm.image}
                  onChange={(e) => setTeamForm({...teamForm, image: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                          alert('File size must be less than 10MB');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTeamForm({...teamForm, image: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="teamImageUpload"
                  />
                  <label htmlFor="teamImageUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-purple-400 font-bold text-sm">Upload Team Photo</span>
                      <span className="text-slate-500 text-xs">PNG, JPG up to 10MB</span>
                    </div>
                  </label>
                  {teamForm.image && (
                    <div className="mt-4 relative">
                      <img src={teamForm.image} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
                      <button
                        onClick={() => setTeamForm({...teamForm, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="LinkedIn URL (optional)"
                    value={teamForm.linkedin}
                    onChange={(e) => setTeamForm({...teamForm, linkedin: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Twitter URL (optional)"
                    value={teamForm.twitter}
                    onChange={(e) => setTeamForm({...teamForm, twitter: e.target.value})}
                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={saveTeam} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold transition-all">Save Member</button>
                  <button onClick={() => { setShowTeamForm(false); setEditingTeam(null); }} className="glass px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.length === 0 ? (
              <p className="text-slate-400 text-center py-12 col-span-full">No team members yet. Add your first team member!</p>
            ) : (
              teamMembers.map((member) => (
                <div key={member.id} className="glass p-6 rounded-2xl border border-white/5 text-center">
                  {member.image && (
                    <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  )}
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-400 text-sm font-bold mb-3">{member.role}</p>
                  <p className="text-slate-400 text-xs mb-4">{member.bio}</p>
                  <div className="flex gap-2 justify-center mb-4">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => editTeam(member)} className="text-blue-400 hover:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500/10 transition-all text-xs">Edit</button>
                    <button onClick={() => deleteTeam(member.id)} className="text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all text-xs">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'backlinks' && (
        <div className="glass p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black">Manage Backlinks</h2>
            <button 
              onClick={() => { setShowBacklinkForm(true); setBacklinkForm({ title: '', url: '', location: 'footer', description: '' }); }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-bold shadow-xl shadow-purple-500/20 transition-all"
            >
              + Add Backlink
            </button>
          </div>

          {showBacklinkForm && (
            <div className="glass p-6 rounded-2xl mb-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4">Add External Backlink</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Link Title (e.g., Google SEO Guide)"
                  value={backlinkForm.title}
                  onChange={(e) => setBacklinkForm({...backlinkForm, title: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <input
                  type="url"
                  placeholder="Full URL (e.g., https://developers.google.com/search)"
                  value={backlinkForm.url}
                  onChange={(e) => setBacklinkForm({...backlinkForm, url: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={backlinkForm.description}
                  onChange={(e) => setBacklinkForm({...backlinkForm, description: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                />
                <select
                  value={backlinkForm.location}
                  onChange={(e) => setBacklinkForm({...backlinkForm, location: e.target.value as 'footer' | 'blog'})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                >
                  <option value="footer">Footer - Resources Section</option>
                  <option value="blog">Blog Posts</option>
                </select>
                <div className="flex gap-3 mt-6">
                  <button onClick={saveBacklink} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold transition-all">Add Backlink</button>
                  <button onClick={() => setShowBacklinkForm(false)} className="glass px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {backlinks.length === 0 ? (
              <p className="text-slate-400 text-center py-12">No backlinks added yet. Add your first backlink!</p>
            ) : (
              backlinks.map((link) => (
                <div key={link.id} className="glass p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{link.title}</h3>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm mb-2 block break-all">{link.url}</a>
                      {link.description && <p className="text-slate-400 text-sm mb-2">{link.description}</p>}
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span className="bg-purple-500/20 px-3 py-1 rounded-full">{link.location === 'footer' ? '📍 Footer' : '📝 Blog'}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteBacklink(link.id)} className="text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-all">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-black mb-6">Manage Pricing</h2>
          <p className="text-slate-400 mb-6">Update pricing packages and features</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4">Starter Package</h3>
              <input
                type="number"
                placeholder="Price"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
              />
              <button className="w-full bg-purple-500/20 hover:bg-purple-500/30 py-2 rounded-xl font-bold transition-all">
                Update
              </button>
            </div>
            <div className="glass p-6 rounded-2xl border border-pink-500/20">
              <h3 className="text-xl font-bold mb-4">Professional Package</h3>
              <input
                type="number"
                placeholder="Price"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
              />
              <button className="w-full bg-pink-500/20 hover:bg-pink-500/30 py-2 rounded-xl font-bold transition-all">
                Update
              </button>
            </div>
            <div className="glass p-6 rounded-2xl border border-cyan-500/20">
              <h3 className="text-xl font-bold mb-4">Enterprise Package</h3>
              <input
                type="number"
                placeholder="Price"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
              />
              <button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 py-2 rounded-xl font-bold transition-all">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Info Box */}
      <div className="mt-8 glass p-6 rounded-2xl border border-green-500/20">
        <h3 className="text-xl font-bold mb-3 text-green-400">🔐 Admin Credentials</h3>
        <div className="space-y-2 text-sm">
          <p><span className="text-slate-400">Username:</span> <span className="font-mono font-bold text-white">{ADMIN_USERNAME}</span></p>
          <p><span className="text-slate-400">Password:</span> <span className="font-mono font-bold text-white">{ADMIN_PASSWORD}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
