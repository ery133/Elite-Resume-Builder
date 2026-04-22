import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Monitor, Cpu, Info, Zap, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">EliteResume</span>
        </Link>
        <div className="flex gap-10 items-center text-sm font-bold text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition">Solutions</Link>
          <Link to="/about" className="text-indigo-600">Features</Link>
          <Link to="/builder" className="bg-indigo-600 px-6 py-3 rounded-xl text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 no-underline">
            Start Building
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-32 px-6">
        {/* Header */}
        <div className="text-center mb-24">
           <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
             How we beat the bots.
           </h1>
           <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
             Most resumes never get read by a human. We've reverse-engineered the Applicant Tracking Systems 
             to ensure your profile always makes the cut.
           </p>
        </div>

        {/* ATS Deep Dive */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-amber-100 rounded-[28px] flex items-center justify-center text-amber-600">
              <Monitor size={32} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">ATS Simulation.</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Our <b>ATS Mode</b> strips away the visual flourish to show you exactly how a parsing machine 
              categorizes your data. We flag tables, text boxes, and complex graphics that might cause rejection.
            </p>
            <ul className="space-y-4 pt-4 text-slate-700 font-bold">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={24} /> Verified with Workday & Greenhouse</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={24} /> Machine-readable text encoding</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={24} /> Proper header hierarchy (H1-H3)</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-2xl relative">
             <div className="space-y-6">
                <div className="h-6 w-3/4 bg-slate-100 rounded-full" />
                <div className="h-6 w-1/2 bg-slate-100 rounded-full" />
                <div className="flex gap-4">
                  <div className="h-20 flex-1 bg-slate-50 rounded-2xl" />
                  <div className="h-20 flex-1 bg-slate-100 rounded-2xl" />
                </div>
                <div className="h-24 w-full bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-200 flex items-center justify-center text-indigo-400 font-black text-xs uppercase tracking-widest">
                  ATS PARSED SUCCESS
                </div>
             </div>
          </div>
        </section>

        {/* AI Content */}
        <section className="bg-slate-900 rounded-[60px] p-20 text-white grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="grid grid-cols-2 gap-6">
                <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-3">
                  <Sparkles className="text-indigo-400" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Content Sync</span>
                </div>
                <div className="h-40 bg-indigo-600 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-2xl shadow-indigo-500/20">
                  <Cpu className="text-white" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Deep Llama</span>
                </div>
             </div>
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="text-4xl font-black tracking-tight leading-tight">Master AI Content <br /> Optimization.</h2>
            <p className="text-lg text-slate-300 font-medium leading-relaxed opacity-80">
              Generic resumes fail. Our AI synthesizes your unique background with the specific 
              demands of the job advertisement, generating high-impact results.
            </p>
            <div className="flex items-center gap-6">
               <div className="text-center">
                  <h4 className="text-3xl font-black">3x</h4>
                  <p className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">Interviews</p>
               </div>
               <div className="w-[1px] h-10 bg-white/10" />
               <div className="text-center">
                  <h4 className="text-3xl font-black">20s</h4>
                  <p className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">Processing</p>
               </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <div className="pt-40 text-center space-y-10">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">Ready to launch your career?</h3>
          <Link to="/builder" className="inline-flex items-center gap-4 bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all hover:translate-y-[-2px] shadow-2xl shadow-indigo-200 no-underline">
            Go to Builder <ChevronRight size={24} />
          </Link>
        </div>
      </div>

      <footer className="py-20 border-t border-slate-100 bg-white text-center">
        <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">
          &copy; 2026 EliteResume AI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
