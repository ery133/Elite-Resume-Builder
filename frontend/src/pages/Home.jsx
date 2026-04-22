import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, Download, Layers, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">EliteResume</span>
        </div>
        <div className="hidden md:flex gap-10 items-center text-sm font-bold text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition">Solutions</Link>
          <Link to="/about" className="hover:text-indigo-600 transition">Features</Link>
          <Link to="/builder" className="bg-indigo-600 px-6 py-3 rounded-xl text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 no-underline">
            Start Building Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-extrabold uppercase tracking-[0.2em] mb-10 mx-auto">
          <Sparkles size={14} className="animate-pulse" /> Next-Gen AI Resume Engine
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 tracking-tight leading-[0.95] mb-12">
          Your Resume, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Perfectly Tailored.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-14 font-medium">
          EliteResume uses state-of-the-art AI to transform your unique experience into 
          job-winning bullet points. Pass recruiter bots and land 3x more interviews instantly.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/builder" className="bg-indigo-600 px-12 py-5 rounded-2xl text-white text-lg font-bold hover:bg-slate-900 transition-all hover:translate-y-[-2px] shadow-2xl shadow-indigo-200 no-underline flex items-center justify-center gap-3">
            Build My Resume <ArrowRight size={20} />
          </Link>
          <Link to="/about" className="bg-white border-2 border-slate-100 px-12 py-5 rounded-2xl text-slate-900 text-lg font-bold hover:border-indigo-100 transition shadow-sm no-underline">
            How it Works
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-40 grayscale pointer-events-none">
          {['Google', 'Airbnb', 'Hubspot', 'Notion', 'Slack'].map(brand => (
            <span key={brand} className="text-2xl font-black">{brand}</span>
          ))}
        </div>
      </header>

      {/* Feature Section */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">The Professional Choice.</h2>
            <p className="text-slate-500 font-medium">Everything you need to beat the ATS bots and recruiters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Llama-3 Integration</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Our AI doesn't just rewrite text; it synthesizes your experience with JD requirements to create high-impact achievements.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ATS Optimizer</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Instant machine-readability analysis. Every template is rigorously tested to ensure it clears major ATS platforms.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-8 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Download size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Elite PDF Export</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Pixel-perfect, designer-grade PDF exports. No hidden costs or watermarks—ever. Your success is our mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <section className="py-32 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built by recruiters, powered by AI.</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              We spent months working with top talent acquisition teams to figure out exactly what machines and humans want to see.
            </p>
            <ul className="space-y-4 pt-4">
              {['Single-column machine-safe layouts', 'Result-oriented action verb engine', 'Real-time keyword gap analysis'].map(item => (
                <li key={item} className="flex items-center gap-4 text-slate-700 font-bold">
                  <CheckCircle2 className="text-emerald-500" size={24} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 p-12 rounded-[40px] shadow-2xl overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full" />
             <div className="space-y-4 opacity-80 group-hover:opacity-100 transition-opacity">
               <div className="h-4 w-3/4 bg-slate-800 rounded-full" />
               <div className="h-4 w-1/2 bg-slate-800 rounded-full" />
               <div className="grid grid-cols-2 gap-4 pt-8">
                  <div className="h-24 bg-slate-800 rounded-2xl" />
                  <div className="h-24 bg-slate-800 rounded-2xl" />
               </div>
               <div className="h-32 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl" />
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white text-center">
        <div className="flex items-center justify-center gap-2 mb-8 scale-75">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">EliteResume</span>
        </div>
        <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">
          &copy; 2026 EliteResume AI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
