
import React, { useState } from 'react';
import { generateBlogPost } from '../services/gemini';
import { BlogPost } from '../types';

const BlogWriter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const kwArray = keywords.split(',').map(k => k.trim());
      const data = await generateBlogPost(topic, kwArray);
      setPost(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">AI <span className="text-sky-400">Content Architect</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Generate high-authority, SEO-optimized blog posts with semantic depth and strategic keyword placement.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl mb-12 border-sky-500/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 ml-2">Main Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., The Future of Headless CMS"
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 ml-2">Target Keywords (Comma Separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="headless cms, api-first, content infrastructure"
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-sky-500/20 active:scale-95"
          >
            {loading ? 'Drafting Excellence...' : 'Generate Blog Post'}
          </button>
        </div>
      </div>

      {post && ( post.content ? (
        <div className="space-y-8 animate-in fade-in duration-1000">
          <div className="glass p-8 rounded-3xl border-emerald-500/10">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-black text-slate-100">{post.title}</h3>
              <div className="px-3 py-1 bg-sky-500/20 text-sky-400 rounded-lg text-xs font-bold">SEO OPTIMIZED</div>
            </div>
            <div className="mb-8">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Meta Description</p>
              <div className="p-4 bg-slate-800/50 rounded-xl text-slate-300 text-sm border border-white/5 italic">
                {post.metaDescription}
              </div>
            </div>
            <div className="prose prose-invert max-w-none prose-sky">
               <div className="whitespace-pre-wrap text-slate-300 leading-loose text-lg">
                {post.content}
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-rose-400 py-10">Generation failed. Please try again with a more specific topic.</div>
      ))}
    </div>
  );
};

export default BlogWriter;
