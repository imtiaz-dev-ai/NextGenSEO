import React, { useState, useEffect } from 'react';
import { getCommunityPostsFromFirebase, saveCommunityPostToFirebase, likeCommunityPostInFirebase, addCommentToPostInFirebase } from '../utils/firebase';

const TABS = ['Discussions', 'Resources', 'Members'] as const;
type Tab = typeof TABS[number];

const IconLink = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const IconChart = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconSearch = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconMail = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconTrend = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconRobot = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconMsg = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const IconHeart = ({ filled }: { filled: boolean }) => <svg className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const IconShare = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;
const IconDiscuss = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>;
const IconBox = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const IconUsers = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconSend = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;

interface Comment { name: string; text: string; time: string; initials: string; color: string; }
interface Post { id: string; name: string; initials: string; color: string; title: string; body: string; tag: string; likes: number; comments: Comment[]; createdAt: any; }

const COLORS = ['from-purple-500 to-pink-500','from-blue-500 to-cyan-500','from-emerald-500 to-teal-500','from-amber-500 to-orange-500','from-pink-500 to-rose-500','from-violet-500 to-purple-500'];
const TAGS = ['Link Building','Technical SEO','Guest Posts','Content SEO','Local SEO','General'];
const TAG_COLORS: Record<string,string> = {
  'Link Building':'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Technical SEO':'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Guest Posts':'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Content SEO':'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Local SEO':'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'General':'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const RESOURCES = [
  { icon: <IconLink />, title: 'Link Building Checklist 2025', desc: '50-point checklist for white-hat link acquisition', tag: 'Free' },
  { icon: <IconChart />, title: 'DR Improvement Roadmap', desc: 'Step-by-step guide to go from DR 20 to DR 60+', tag: 'Free' },
  { icon: <IconSearch />, title: 'Technical SEO Audit Template', desc: 'Google Sheets template covering 100+ SEO checks', tag: 'Free' },
  { icon: <IconMail />, title: 'Outreach Email Templates', desc: '10 proven templates with 30-40% reply rates', tag: 'Free' },
  { icon: <IconTrend />, title: 'Keyword Research SOP', desc: 'Internal SOP for finding low-competition keywords', tag: 'Free' },
  { icon: <IconRobot />, title: 'AI SEO Prompt Library', desc: '100+ ChatGPT & Claude prompts for SEO tasks', tag: 'Free' },
];

const MEMBERS = [
  { initials:'SJ', color:'from-purple-500 to-pink-500', name:'Sarah Johnson', role:'Content Strategist', posts:142, joined:'Jan 2024', badge:'Top Contributor' },
  { initials:'DC', color:'from-blue-500 to-cyan-500', name:'David Chen', role:'Technical SEO Lead', posts:98, joined:'Mar 2024', badge:'' },
  { initials:'ER', color:'from-emerald-500 to-teal-500', name:'Emily Rodriguez', role:'Link Building Expert', posts:215, joined:'Nov 2023', badge:'Top Contributor' },
  { initials:'AK', color:'from-amber-500 to-orange-500', name:'Alex Kim', role:'SEO Analyst', posts:76, joined:'May 2024', badge:'' },
  { initials:'ML', color:'from-pink-500 to-rose-500', name:'Marcus Lee', role:'Content Writer', posts:53, joined:'Jul 2024', badge:'' },
  { initials:'PS', color:'from-violet-500 to-purple-500', name:'Priya Sharma', role:'Local SEO Expert', posts:189, joined:'Feb 2024', badge:'Top Contributor' },
];

const Avatar = ({ initials, color, size='md' }: { initials:string; color:string; size?:'sm'|'md'|'lg' }) => {
  const sz = size==='lg' ? 'w-16 h-16 text-lg' : size==='sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return <div className={`${sz} rounded-full bg-gradient-to-br ${color} flex items-center justify-center font-black text-white shrink-0`}>{initials}</div>;
};

const timeAgo = (ts: any) => {
  const d = ts?.toDate ? ts.toDate() : new Date(ts || Date.now());
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
};

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Discussions');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Record<string,boolean>>({});
  const [openComments, setOpenComments] = useState<Record<string,boolean>>({});
  const [commentText, setCommentText] = useState<Record<string,string>>({});
  const [userName, setUserName] = useState('');
  const [joined, setJoined] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title:'', body:'', tag:'General' });
  const [posting, setPosting] = useState(false);

  const userColor = COLORS[userName.length % COLORS.length];
  const userInitials = userName.trim().split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) || '?';

  useEffect(() => {
    getCommunityPostsFromFirebase().then((data: any) => {
      const sorted = [...data].sort((a:any,b:any) => {
        const ta = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt||0);
        const tb = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt||0);
        return tb.getTime() - ta.getTime();
      });
      setPosts(sorted as Post[]);
      setLoading(false);
    }).catch(()=>setLoading(false));
  }, []);

  const handleLike = async (post: Post) => {
    if (!joined) { alert('Join the community first!'); return; }
    const alreadyLiked = likedPosts[post.id];
    const newLikes = alreadyLiked ? post.likes - 1 : post.likes + 1;
    setLikedPosts(prev => ({ ...prev, [post.id]: !alreadyLiked }));
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: newLikes } : p));
    await likeCommunityPostInFirebase(post.id, newLikes);
  };

  const handleComment = async (post: Post) => {
    const text = (commentText[post.id] || '').trim();
    if (!text) return;
    if (!joined || !userName.trim()) { alert('Enter your name and join first!'); return; }
    const newComment: Comment = { name: userName.trim(), initials: userInitials, color: userColor, text, time: new Date().toISOString() };
    const updated = [...(post.comments || []), newComment];
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, comments: updated } : p));
    setCommentText(prev => ({ ...prev, [post.id]: '' }));
    await addCommentToPostInFirebase(post.id, updated);
  };

  const handleNewPost = async () => {
    if (!newPost.title.trim() || !newPost.body.trim()) { alert('Title and body required!'); return; }
    if (!joined || !userName.trim()) { alert('Enter your name and join first!'); return; }
    setPosting(true);
    const postData = { name: userName.trim(), initials: userInitials, color: userColor, title: newPost.title.trim(), body: newPost.body.trim(), tag: newPost.tag };
    const id = await saveCommunityPostToFirebase(postData);
    const created: Post = { ...postData, id, likes: 0, comments: [], createdAt: new Date().toISOString() };
    setPosts(prev => [created, ...prev]);
    setNewPost({ title:'', body:'', tag:'General' });
    setShowPostForm(false);
    setPosting(false);
  };

  return (
    <div className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase mb-4">SEO Community</div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">The <span className="gradient-text">SEO Community</span><br />Built for Growth</h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">Connect with SEO professionals. Share strategies, get feedback, and grow together.</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8">
          {[{v:`${posts.length || '0'}+`,l:'Discussions',icon:<IconDiscuss />},{v:'2,000+',l:'Members',icon:<IconUsers />},{v:'50+',l:'Resources',icon:<IconBox />}].map((s,i)=>(
            <div key={i} className="glass px-5 py-3 rounded-2xl text-center border border-white/5">
              <div className="flex justify-center text-purple-400 mb-0.5">{s.icon}</div>
              <div className="text-lg font-black gradient-text">{s.v}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Join form */}
        {!joined ? (
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="text" placeholder="Your name to join..."
              value={userName} onChange={e=>setUserName(e.target.value)}
              className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none text-sm"
            />
            <button
              onClick={()=>{ if(userName.trim()){ setJoined(true); } else alert('Enter your name!'); }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-black text-sm text-white transition-all shadow-lg shadow-purple-500/30"
            >Join Free →</button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Avatar initials={userInitials} color={userColor} size="sm" />
            <span className="text-emerald-400 font-black text-sm">✓ Welcome, {userName}!</span>
            <button onClick={()=>{setJoined(false);setUserName('');}} className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Leave</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/5 pb-4 overflow-x-auto">
        {TABS.map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab===tab?'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20':'glass text-slate-400 hover:text-white border border-white/5'}`}>
            {tab==='Discussions'&&<IconDiscuss />}{tab==='Resources'&&<IconBox />}{tab==='Members'&&<IconUsers />}
            {tab}
          </button>
        ))}
      </div>

      {/* Discussions */}
      {activeTab==='Discussions' && (
        <div className="space-y-4">
          {/* New Post Button */}
          {joined && (
            <button onClick={()=>setShowPostForm(!showPostForm)}
              className="w-full glass rounded-2xl p-4 border border-dashed border-purple-500/30 hover:border-purple-500/60 transition-all flex items-center gap-3 text-left">
              <Avatar initials={userInitials} color={userColor} size="sm" />
              <span className="text-slate-400 text-sm">Start a discussion...</span>
              <span className="ml-auto text-purple-400 font-black text-lg">+</span>
            </button>
          )}

          {/* New Post Form */}
          {showPostForm && joined && (
            <div className="glass rounded-2xl p-6 border border-purple-500/30">
              <h3 className="font-black text-white mb-4">New Discussion</h3>
              <input type="text" placeholder="Title..." value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none text-sm mb-3" />
              <textarea placeholder="Share your thoughts, questions, or insights..." value={newPost.body} onChange={e=>setNewPost(p=>({...p,body:e.target.value}))}
                rows={3} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none text-sm mb-3 resize-none" />
              <div className="flex gap-3 items-center">
                <select value={newPost.tag} onChange={e=>setNewPost(p=>({...p,tag:e.target.value}))}
                  className="bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none">
                  {TAGS.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <button onClick={handleNewPost} disabled={posting}
                  className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-xl font-black text-sm text-white transition-all disabled:opacity-50">
                  {posting ? 'Posting...' : 'Post'}
                </button>
                <button onClick={()=>setShowPostForm(false)} className="glass px-4 py-2 rounded-xl font-bold text-sm text-slate-400 hover:text-white transition-all">Cancel</button>
              </div>
            </div>
          )}

          {/* Posts */}
          {loading ? (
            <div className="flex justify-center py-16"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">No discussions yet. Be the first to post!</div>
          ) : posts.map(post=>(
            <div key={post.id} className="glass rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all">
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <Avatar initials={post.initials||'?'} color={post.color||COLORS[0]} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-black text-white text-sm">{post.name}</span>
                      <span className="text-slate-500 text-xs">· {timeAgo(post.createdAt)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${TAG_COLORS[post.tag]||TAG_COLORS['General']}`}>{post.tag}</span>
                    </div>
                    <h3 className="font-black text-white text-base mb-2 leading-snug">{post.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{post.body}</p>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <button onClick={()=>handleLike(post)} className={`flex items-center gap-1.5 transition-colors ${likedPosts[post.id]?'text-pink-400':'hover:text-pink-400'}`}>
                        <IconHeart filled={!!likedPosts[post.id]} />
                        {post.likes}
                      </button>
                      <button onClick={()=>setOpenComments(prev=>({...prev,[post.id]:!prev[post.id]}))}
                        className="flex items-center gap-1.5 hover:text-purple-400 transition-colors">
                        <IconMsg />
                        {(post.comments||[]).length} Comments
                      </button>
                      <button onClick={()=>{
                        const url = window.location.href;
                        const text = `${post.title} — ${post.body.slice(0,80)}...`;
                        if(navigator.share){ navigator.share({title:post.title,text,url}).catch(()=>{}); }
                        else { window.open(`https://wa.me/?text=${encodeURIComponent(text+' '+url)}`,'_blank'); }
                      }} className="flex items-center gap-1.5 hover:text-slate-300 transition-colors ml-auto">
                        <IconShare />Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments section */}
              {openComments[post.id] && (
                <div className="border-t border-white/5 px-5 sm:px-6 pb-5">
                  {(post.comments||[]).length > 0 && (
                    <div className="space-y-3 pt-4 mb-4">
                      {(post.comments||[]).map((c,i)=>(
                        <div key={i} className="flex items-start gap-3">
                          <Avatar initials={c.initials||'?'} color={c.color||COLORS[0]} size="sm" />
                          <div className="flex-1 bg-slate-900/40 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-white text-xs">{c.name}</span>
                              <span className="text-slate-500 text-[10px]">{timeAgo(c.time)}</span>
                            </div>
                            <p className="text-slate-300 text-sm">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {joined ? (
                    <div className="flex items-center gap-3 pt-2">
                      <Avatar initials={userInitials} color={userColor} size="sm" />
                      <input
                        type="text" placeholder="Write a comment..."
                        value={commentText[post.id]||''}
                        onChange={e=>setCommentText(prev=>({...prev,[post.id]:e.target.value}))}
                        onKeyDown={e=>{ if(e.key==='Enter') handleComment(post); }}
                        className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none text-sm"
                      />
                      <button onClick={()=>handleComment(post)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 p-2.5 rounded-xl text-white hover:from-purple-600 hover:to-pink-600 transition-all">
                        <IconSend />
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-500 text-xs pt-3 text-center">Join the community to comment</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resources */}
      {activeTab==='Resources' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map((r,i)=>(
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all hover:-translate-y-1 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">{r.icon}</div>
              <div className="flex items-start gap-2 mb-2">
                <h3 className="font-black text-white text-sm flex-1 leading-snug">{r.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black shrink-0">{r.tag}</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-5 flex-1">{r.desc}</p>
              <a href="https://wa.me/923480440402" target="_blank" rel="noopener noreferrer"
                className="w-full glass border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5 py-2.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white transition-all text-center block">
                Get Free Resource →
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Members */}
      {activeTab==='Members' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MEMBERS.map((m,i)=>(
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Avatar initials={m.initials} color={m.color} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-white truncate">{m.name}</h3>
                  <p className="text-purple-400 text-xs font-bold">{m.role}</p>
                  {m.badge && <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black">⭐ {m.badge}</span>}
                </div>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-400 border-t border-white/5 pt-4">
                <span><span className="text-white font-black">{m.posts}</span> Posts</span>
                <span className="text-slate-600">·</span>
                <span>Joined <span className="text-slate-300">{m.joined}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-14 glass rounded-3xl p-8 sm:p-12 text-center border border-purple-500/20 bg-purple-500/[0.02]">
        <div className="flex justify-center mb-4">
          <div className="flex -space-x-2">
            {MEMBERS.slice(0,5).map((m,i)=>(
              <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center font-black text-white text-xs border-2 border-slate-900`}>{m.initials}</div>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-black text-slate-400 text-xs border-2 border-slate-900">+</div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black mb-3">Ready to grow with the community?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm">Join SEO professionals sharing strategies, tools, and real opportunities every day. Completely free.</p>
        <a href="https://wa.me/923480440402" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl font-black text-base shadow-xl shadow-purple-500/20 transition-all text-white">
          <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp Community
        </a>
      </div>
    </div>
  );
};

export default Community;
