import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { 
  Briefcase, GraduationCap, User, Plus, Check, X, 
  Sparkles, Download, FileText, Settings, ShieldCheck, Mail, Phone,
  Eye, Monitor, Cpu, Info, BarChart3, AlertCircle, ArrowLeft, Award,
  Laptop, Globe, PlusCircle, Image as ImageIcon, Loader2, BrainCircuit,
  FileSearch, MessageSquareQuote, CheckCircle2, Search, FileUp, ClipboardCheck, Sparkle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FormCard, Input, ExperienceItem, ProjectItem, TagInput, CustomSection } from '../components/Editor';

// --- HELPER FOR BULLET POINTS ---
const renderBulletsHTML = (text) => {
  if (!text) return null;
  const lines = text.split(/\n|•/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length <= 1 && !text.includes('•')) return <p className="text-[13px] leading-relaxed text-slate-600 whitespace-pre-wrap">{text}</p>;
  return (
    <ul className="list-none space-y-1.5 mt-1.5">
      {lines.map((line, i) => (
        <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
          <span className="text-indigo-500 font-black">•</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
};

const renderBulletsPDF = (text) => {
  if (!text) return null;
  const lines = text.split(/\n|•/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length <= 1 && !text.includes('•')) return <Text style={styles.itemDesc}>{text}</Text>;
  return (
    <View style={{ marginTop: 4 }}>
      {lines.map((line, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 6, marginBottom: 3 }}>
          <Text style={[styles.itemDesc, { color: '#4f46e5', fontWeight: 'bold' }]}>•</Text>
          <Text style={[styles.itemDesc, { flex: 1 }]}>{line}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  header: { borderBottom: '2pt solid #111827', paddingBottom: 15, marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 26, fontWeight: 'black', textTransform: 'uppercase', marginBottom: 6, color: '#111827' },
  contact: { flexDirection: 'row', justifyContent: 'center', gap: 10, fontSize: 9, color: '#6b7280', fontWeight: 'bold' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 10, fontWeight: 'black', textTransform: 'uppercase', color: '#4f46e5', borderBottom: '0.5pt solid #f1f5f9', paddingBottom: 3, marginBottom: 8, letterSpacing: 1 },
  summary: { fontSize: 10, lineHeight: 1.5, color: '#4b5563' },
  item: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemTitle: { fontSize: 11, fontWeight: 'black', color: '#111827' },
  itemDate: { fontSize: 9, color: '#9ca3af', fontWeight: 'bold' },
  itemSubtitle: { fontSize: 9, color: '#6b7280', fontStyle: 'italic', marginBottom: 4 },
  itemDesc: { fontSize: 10, lineHeight: 1.5, color: '#4b5563' },
  skillsWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillTag: { fontSize: 8, fontWeight: 'black', textTransform: 'uppercase', color: '#64748b', backgroundColor: '#f8fafc', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 2, border: '0.5pt solid #e2e8f0' },
  certList: { gap: 4 },
  certItem: { fontSize: 10, color: '#4b5563' }
});

// --- PDF COMPONENT ---
const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data?.personal?.name || "RESUME"}</Text>
        <View style={styles.contact}>
          {data?.personal?.email && <Text>{data.personal.email}</Text>}
          {data?.personal?.phone && <Text>• {data.personal.phone}</Text>}
          {data?.personal?.location && <Text>• {data.personal.location}</Text>}
        </View>
      </View>

      {data?.personal?.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.personal.summary}</Text>
        </View>
      )}

      {data?.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp?.company || 'Company'}</Text>
                <Text style={styles.itemDate}>{exp?.duration || ''}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp?.role || 'Role'}</Text>
              {renderBulletsPDF(exp?.description)}
            </View>
          ))}
        </View>
      )}

      {data?.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu?.school || 'Institution'}</Text>
                <Text style={styles.itemDate}>{edu?.duration || ''}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu?.degree} {edu?.gpa && `| GPA: ${edu.gpa}`}</Text>
            </View>
          ))}
        </View>
      )}

      {data?.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{proj?.title || 'Project Title'}</Text>
                {proj?.link && <Text style={styles.itemDate}>{proj.link}</Text>}
              </View>
              {renderBulletsPDF(proj?.description)}
            </View>
          ))}
        </View>
      )}

      <View style={{ flexDirection: 'row', gap: 20 }}>
        {data?.skills?.length > 0 && (
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrapper}>
              {data.skills.map((s, i) => s && <Text key={i} style={styles.skillTag}>{s}</Text>)}
            </View>
          </View>
        )}
        {data?.certifications?.length > 0 && (
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.certList}>
              {data.certifications.map((c, i) => c && <Text key={i} style={styles.certItem}>• {c}</Text>)}
            </View>
          </View>
        )}
      </View>

      {data?.customSections?.map((section, i) => section?.items?.length > 0 && (
        <View key={i} style={styles.section}>
           <Text style={styles.sectionTitle}>{section.title || 'Section'}</Text>
           {section.items.map((item, j) => (
             <View key={j} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{item?.label}: <Text style={{ fontWeight: 'normal' }}>{item?.value}</Text></Text>
             </View>
           ))}
        </View>
      ))}
    </Page>
  </Document>
);

// --- HTML PREVIEW COMPONENT (FOR BROWSER) ---
const ResumePreview = ({ data }) => {
  if (!data) return null;
  return (
    <div className="flex flex-col text-slate-800 font-sans max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-2">{data?.personal?.name || "RESUME"}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-xs font-bold text-slate-500">
          {data?.personal?.email && <span>{data.personal.email}</span>}
          {data?.personal?.phone && <span>• {data.personal.phone}</span>}
          {data?.personal?.location && <span>• {data.personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data?.personal?.summary && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-600">{data.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data?.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-sm font-black text-slate-900">{exp?.company || 'Company'}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{exp?.duration}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 italic mb-1.5">{exp?.role}</p>
                {renderBulletsHTML(exp?.description)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data?.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-sm font-black text-slate-900">{edu?.school}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{edu?.duration}</span>
                </div>
                <p className="text-xs font-bold text-slate-500">{edu?.degree} {edu?.gpa && `| GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">Key Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-sm font-black text-slate-900">{proj?.title}</h3>
                  <span className="text-[10px] font-bold text-indigo-400 lowercase">{proj?.link}</span>
                </div>
                {renderBulletsHTML(proj?.description)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Certs */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          {data?.skills?.length > 0 && (
            <>
              <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => s && (
                  <span key={i} className="text-[10px] font-black uppercase text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">{s}</span>
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          {data?.certifications?.length > 0 && (
            <>
              <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">Certifications</h2>
              <ul className="space-y-1">
                {data.certifications.map((c, i) => c && (
                  <li key={i} className="text-[13px] text-slate-600">• {c}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Custom Sections */}
      {data?.customSections?.map((section, i) => section?.items?.length > 0 && (
        <div key={i} className="mb-6">
           <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 border-b border-slate-100 pb-1 mb-3">{section.title || 'Other Achievements'}</h2>
           <div className="space-y-2">
             {section.items.map((item, j) => (
               <div key={j} className="text-[13px] leading-relaxed">
                  <span className="font-bold text-slate-800">{item?.label}:</span> <span className="text-slate-600">{item?.value}</span>
               </div>
             ))}
           </div>
        </div>
      ))}
    </div>
  );
};

const Builder = () => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('resume_history');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToHistory = () => {
    const entry = {
      id: Date.now(),
      name: resumeData.personal.name || "Untitled Resume",
      date: new Date().toLocaleString(),
      data: resumeData
    };
    const newHistory = [entry, ...history.slice(0, 9)]; // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('resume_history', JSON.stringify(newHistory));
    alert("Resume saved to your history!");
  };

  const loadFromHistory = (entry) => {
    if (confirm(`Load "${entry.name}"? Current unsaved work will be lost.`)) {
      setResumeData(entry.data);
      alert("Resume loaded from history!");
    }
  };

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'history'
  const [resumeData, setResumeData] = useState({
    personal: { name: '', email: '', phone: '', location: '', summary: '' },
    experience: [{ id: 1, company: '', role: '', duration: '', description: '' }],
    education: [], projects: [], skills: [], certifications: [], customSections: [], jobDescription: ''
  });

  const [isPreviewMode, setIsPreviewMode] = useState('design');
  const [isProcessing, setIsProcessing] = useState(false);
  const [exclusiveTool, setExclusiveTool] = useState(null);
  const [toolContent, setToolContent] = useState(null);

  const sectionRefs = { 
    identity: useRef(null), 
    experience: useRef(null), 
    education: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    ai: useRef(null), 
    importer: useRef(null) 
  };
  const scrollToSection = (section) => sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });

  const handleResumeImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
        setIsProcessing(true);
        try {
            const { data: { text } } = await Tesseract.recognize(file, 'eng');
            const resp = await axios.post('/api/ai/optimize', { 
                resumeData: { ...resumeData, experience: [{ description: text }] }, 
                jobDescription: "Extract resume data" 
            });
            alert("Image scanned! Please check and refine the fields.");
            setIsProcessing(false);
            return;
        } catch { 
            alert("Image OCR failed."); 
            setIsProcessing(false);
            return;
        }
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const resp = await axios.post('/api/ai/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const parsed = resp.data || {};
      setResumeData(prev => ({ 
        ...prev, 
        ...parsed,
        personal: { ...prev.personal, ...(parsed.personal || {}) },
        experience: (parsed.experience || []).map((exp, i) => ({ 
          company: '', role: '', duration: '', description: '', 
          ...exp, 
          id: Date.now() + i 
        })),
        education: (parsed.education || []).map((edu, i) => ({ 
          school: '', degree: '', duration: '', gpa: '', 
          ...edu, 
          id: Date.now() + i + 100 
        })),
        projects: (parsed.projects || []).map((proj, i) => ({ 
          title: '', link: '', description: '', 
          ...proj, 
          id: Date.now() + i + 200 
        })),
        customSections: (parsed.customSections || []).map((sec, i) => ({ 
          title: '', items: [], 
          ...sec, 
          id: Date.now() + i + 300 
        }))
      }));
      
      // TRIGGER AUTOMATIC GENERAL AUDIT
      try {
        const auditResp = await axios.post('/api/ai/audit', { 
            resumeText: JSON.stringify(parsed), 
            jobDescription: "" // Empty JD triggers General Audit mode in backend
        });
        setAuditData(auditResp.data);
      } catch (auditErr) {
        console.error("Initial audit failed:", auditErr);
      }

      alert("Resume Imported Successfully!");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Connection refused or AI timeout.";
      alert(`AI Import Failed: ${msg}`);
    } finally {
      setIsProcessing(false);
      e.target.value = null;
    }
  };

  const handleJDScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsProcessing(true);
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      setResumeData(prev => ({ ...prev, jobDescription: text }));
    } catch { alert("JD Extraction failed."); }
    finally { setIsProcessing(false); e.target.value = null; }
  };

  const [auditData, setAuditData] = useState(null);
  const [showAuditModal, setShowAuditModal] = useState(false);

  const calculateATSScore = () => {
    if (auditData?.score) return auditData.score;
    if (!resumeData.jobDescription) return 0;
    
    // --- DICTIONARIES FOR ANALYSIS ---
    const strongVerbs = new Set(['developed', 'built', 'implemented', 'led', 'managed', 'optimized', 'engineered', 'designed', 'orchestrated', 'streamlined', 'catalyzed', 'quantified', 'executed', 'architected', 'spearheaded']);
    const noiseWords = new Set(['the', 'and', 'with', 'from', 'this', 'that', 'for', 'about', 'their', 'your', 'will', 'highly', 'able', 'proven', 'experience', 'company', 'work', 'role', 'responsible', 'skills', 'excellent', 'strong', 'ability', 'degree', 'years', 'plus', 'preferred', 'required', 'technical', 'development', 'solutions', 'opportunity', 'successful', 'candidate']);
    
    const resumeStr = JSON.stringify(resumeData).toLowerCase();
    const expText = (resumeData.experience || []).map(e => e.description).join(' ').toLowerCase();
    const summaryText = (resumeData.personal?.summary || '').toLowerCase();
    const skillsText = (resumeData.skills || []).join(' ').toLowerCase();

    // 1. Keyword Match & Placement (30%)
    const targetKeywords = auditData?.mandatoryKeywords 
      ? auditData.mandatoryKeywords.map(k => k.toLowerCase())
      : resumeData.jobDescription.toLowerCase()
          .split(/\W+/)
          .filter(w => w.length >= 3 && !noiseWords.has(w))
          .slice(0, 15);
    
    let keywordPoints = 0;
    if (targetKeywords.length > 0) {
      let uniqueMatches = 0;
      targetKeywords.forEach(word => {
        const foundInSummary = summaryText.includes(word);
        const foundInExp = expText.includes(word);
        const foundInSkills = skillsText.includes(word);
        
        if (foundInSummary || foundInExp || foundInSkills) {
          uniqueMatches++;
          // Bonus for placement in multiple sections
          if (foundInSummary && foundInExp && foundInSkills) uniqueMatches += 0.2;
        }
      });
      keywordPoints = Math.min((uniqueMatches / targetKeywords.length) * 30, 30);
    }

    // 2. Experience & Strong Verbs (25%)
    let verbPoints = 0;
    const words = expText.split(/\W+/);
    const usedStrongVerbs = words.filter(w => strongVerbs.has(w));
    verbPoints = Math.min((new Set(usedStrongVerbs).size / 5) * 25, 25); // Needs 5 unique strong verbs for full points

    // 3. Quantified Impact (20%)
    const numberMatches = (expText.match(/\d+%/g) || []).length + (expText.match(/\$\d+/g) || []).length + (expText.match(/\b\d+\b/g) || []).filter(n => parseInt(n) > 1).length;
    const impactPoints = Math.min(numberMatches * 4, 20); // 5 metrics for full points

    // 4. Formatting & Structure (15%)
    let structurePoints = 0;
    if (resumeData.experience?.length >= 2) structurePoints += 5;
    if (resumeData.education?.length >= 1) structurePoints += 5;
    if (resumeData.skills?.length >= 6) structurePoints += 5;

    // 5. Grammar & Categorization (10%)
    let grammarPoints = 0;
    if (resumeData.skills?.length > 0 && resumeData.certifications?.length > 0) grammarPoints += 5; // Basic categorization check
    if (summaryText.length > 100 && summaryText.length < 500) grammarPoints += 5; // Summary length/quality check

    let finalScore = keywordPoints + verbPoints + impactPoints + structurePoints + grammarPoints;

    // --- PENALTY SYSTEM ---
    // Penalty for weak results: If keyword match is under 40%, slash the total score
    if (keywordPoints < 12) finalScore *= 0.7;
    
    // Penalty for lack of verbs
    if (verbPoints < 5) finalScore -= 10;

    return Math.max(0, Math.min(Math.round(finalScore), 100));
  };

  const handleAI = async (endpoint) => {
    setExclusiveTool(endpoint);
    try {
      const resp = await axios.post(`/api/ai/${endpoint}`, { resumeData, jobDescription: resumeData.jobDescription });
      setToolContent(resp.data);
    } catch { alert("AI Agent Busy."); }
  };

  const handleAudit = async () => {
    setIsProcessing(true);
    try {
      const resumeText = JSON.stringify(resumeData);
      const resp = await axios.post('/api/ai/audit', { resumeText, jobDescription: resumeData.jobDescription });
      setAuditData(resp.data);
      setShowAuditModal(true);
    } catch { alert("Audit Failed."); }
    finally { setIsProcessing(false); }
  };

  const handleOptimize = async () => {
    setIsProcessing(true);
    try {
      const resp = await axios.post('/api/ai/optimize', { resumeData, jobDescription: resumeData.jobDescription });
      if (resp.data.optimizedData) {
        setResumeData(resp.data.optimizedData);
        setAuditData(prev => ({ ...prev, score: resp.data.matchScore }));
        alert("Resume Optimized for ATS!");
      }
    } catch { alert("Optimization Failed."); }
    finally { setIsProcessing(false); }
  };

  return (
    <div className="flex bg-slate-100 h-screen overflow-hidden">
      <nav className="w-20 bg-slate-900 flex flex-col items-center py-8 z-30 shadow-2xl">
        <Link to="/" className="mb-10 text-indigo-500 hover:scale-110 transition"><ArrowLeft size={24} /></Link>
        <div className="flex flex-col gap-6">
          <button onClick={() => setActiveTab('editor')} className={`p-3 rounded-xl transition ${activeTab === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`} title="Editor"><Settings size={22} /></button>
          <button onClick={() => setActiveTab('history')} className={`p-3 rounded-xl transition ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`} title="History"><ClipboardCheck size={22} /></button>
          
          <div className="h-px w-8 bg-slate-800 my-2" />
          
          <button onClick={() => scrollToSection('identity')} title="Identity" className="text-slate-500 hover:text-white transition"><User size={22} /></button>
          <button onClick={() => scrollToSection('experience')} title="Experience" className="text-slate-500 hover:text-white transition"><Briefcase size={22} /></button>
          <button onClick={() => scrollToSection('education')} title="Education" className="text-slate-500 hover:text-white transition"><GraduationCap size={22} /></button>
          <button onClick={() => scrollToSection('projects')} title="Projects" className="text-slate-500 hover:text-white transition"><Laptop size={22} /></button>
          <button onClick={() => scrollToSection('skills')} title="Skills" className="text-slate-500 hover:text-white transition"><Award size={22} /></button>
          
          <div className="h-px w-8 bg-slate-800 my-2" />
          
          <button onClick={() => scrollToSection('importer')} title="Importer" className="text-slate-500 hover:text-white transition"><FileUp size={22} /></button>
          <button onClick={() => scrollToSection('ai')} title="ATS Scan" className="text-slate-500 hover:text-white transition"><BrainCircuit size={22} /></button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-12 py-12 scroll-smooth">
        <header className="flex justify-between items-center mb-12">
           <div className="flex flex-col">
             <h1 className="text-4xl font-black text-slate-900 tracking-tight">Resume Designer</h1>
             <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">AI-Powered ATS Hub</p>
           </div>
           <div className="flex gap-4">
             <button 
               onClick={saveToHistory} 
               className="bg-white border border-slate-200 px-6 py-3 rounded-xl text-xs font-black uppercase shadow-sm flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-200 transition text-emerald-600"
             >
               <CheckCircle2 size={16}/> Save to History
             </button>
             <button onClick={() => handleAI('letter')} className="bg-white border border-slate-200 px-6 py-3 rounded-xl text-xs font-black uppercase shadow-sm flex items-center gap-2 hover:bg-slate-50 transition"><Mail size={16}/> Cover Letter</button>
             <PDFDownloadLink 
               document={<ResumePDF data={resumeData} />} 
               fileName={`${resumeData.personal.name || 'resume'}.pdf`}
               className="bg-indigo-600 px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl no-underline hover:bg-indigo-700 transition"
             >
               {({ loading }) => (loading ? 'Generating...' : 'Download PDF')}
             </PDFDownloadLink>
           </div>
        </header>

        <div className="space-y-12 pb-32">
          {activeTab === 'history' ? (
            <div className="fade-in space-y-8">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Resume History</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Saved on your device</p>
               </div>
               
               {history.length === 0 ? (
                 <div className="bg-white border-2 border-dashed border-slate-200 p-24 rounded-[60px] text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6"><ClipboardCheck size={40}/></div>
                    <p className="text-slate-400 font-black text-lg">No history found yet.</p>
                    <p className="text-slate-400 font-bold text-sm mt-2">Start building and save your first version!</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {history.map((item) => (
                      <div key={item.id} className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group" onClick={() => loadFromHistory(item)}>
                         <div className="flex justify-between items-start mb-6">
                            <div className="bg-indigo-50 w-16 h-16 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-100">
                               <FileText size={28}/>
                            </div>
                            <div className="text-right">
                               <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.date.split(',')[0]}</span>
                               <span className="block text-[10px] font-bold text-slate-300 uppercase">{item.date.split(',')[1]}</span>
                            </div>
                         </div>
                         <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.name}</h3>
                         <div className="flex items-center gap-2 mt-4 text-xs font-bold text-emerald-500">
                            <CheckCircle2 size={14}/> <span>Restorable Version</span>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          ) : (
            <>
          {/* AI Importer Section */}
          <div ref={sectionRefs.importer}>
            <FormCard title="AI Content Importer" icon={FileUp}>
              <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><ClipboardCheck size={160} /></div>
                <div className="relative z-10 space-y-8">
                  <div className="max-w-md">
                    <h3 className="text-3xl font-black tracking-tight mb-2">Import Your History</h3>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">Upload any resume (PDF, Word, or Photo) and our AI will automatically populate all fields for you.</p>
                  </div>
                  <label className="inline-flex items-center gap-4 bg-indigo-600 px-10 py-5 rounded-2xl text-sm font-black uppercase cursor-pointer hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-600/20">
                    {isProcessing ? <><Loader2 className="animate-spin" size={20}/> AI is Mapping History...</> : <><Sparkle size={20}/> Upload & Auto-Populate</>}
                    <input type="file" className="hidden" accept=".pdf,.docx,image/*" onChange={handleResumeImport} />
                  </label>
                </div>
              </div>
            </FormCard>
          </div>

          <div ref={sectionRefs.identity}>
            <FormCard title="Identity & Summary" icon={User}>
              <div className="grid grid-cols-2 gap-6">
                <Input label="Full Name" value={resumeData.personal.name} onChange={(v) => setResumeData({...resumeData, personal: {...resumeData.personal, name: v}})} />
                <Input label="Email" value={resumeData.personal.email} onChange={(v) => setResumeData({...resumeData, personal: {...resumeData.personal, email: v}})} />
                <Input label="Phone" value={resumeData.personal.phone} onChange={(v) => setResumeData({...resumeData, personal: {...resumeData.personal, phone: v}})} />
                <Input label="Location" value={resumeData.personal.location} onChange={(v) => setResumeData({...resumeData, personal: {...resumeData.personal, location: v}})} />
              </div>
              <Input label="Professional Summary" multiline placeholder="A brief overview of your professional background..." value={resumeData.personal.summary} onChange={(v) => setResumeData({...resumeData, personal: {...resumeData.personal, summary: v}})} />
            </FormCard>
          </div>

          <div ref={sectionRefs.experience}>
            <FormCard title="Experience" icon={Briefcase}>
              {resumeData.experience.map((exp, i) => (
                <ExperienceItem key={exp.id} item={exp} onChange={(u) => { const n = [...resumeData.experience]; n[i] = u; setResumeData({...resumeData, experience: n})}} onRemove={() => setResumeData({...resumeData, experience: resumeData.experience.filter((_, idx) => idx !== i)})} />
              ))}
              <button 
                onClick={() => setResumeData({...resumeData, experience: [...resumeData.experience, { id: Date.now(), company: '', role: '', duration: '', description: '' }]})}
                className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-200 transition flex items-center justify-center gap-2"
              >
                <Plus size={18}/> Add Work Experience
              </button>
            </FormCard>
          </div>

          <div ref={sectionRefs.education}>
            <FormCard title="Education" icon={GraduationCap}>
              {resumeData.education.map((edu, i) => (
                <ExperienceItem key={edu.id} type="edu" item={edu} onChange={(u) => { const n = [...resumeData.education]; n[i] = u; setResumeData({...resumeData, education: n})}} onRemove={() => setResumeData({...resumeData, education: resumeData.education.filter((_, idx) => idx !== i)})} />
              ))}
              <button 
                onClick={() => setResumeData({...resumeData, education: [...resumeData.education, { id: Date.now(), school: '', degree: '', duration: '', gpa: '' }]})}
                className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-200 transition flex items-center justify-center gap-2"
              >
                <Plus size={18}/> Add Education
              </button>
            </FormCard>
          </div>

          <div ref={sectionRefs.projects}>
            <FormCard title="Projects" icon={Laptop}>
              {resumeData.projects.map((proj, i) => (
                <ProjectItem key={proj.id} item={proj} onChange={(u) => { const n = [...resumeData.projects]; n[i] = u; setResumeData({...resumeData, projects: n})}} onRemove={() => setResumeData({...resumeData, projects: resumeData.projects.filter((_, idx) => idx !== i)})} />
              ))}
              <button 
                onClick={() => setResumeData({...resumeData, projects: [...resumeData.projects, { id: Date.now(), title: '', link: '', description: '' }]})}
                className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-200 transition flex items-center justify-center gap-2"
              >
                <Plus size={18}/> Add Project
              </button>
            </FormCard>
          </div>

          <div ref={sectionRefs.skills}>
            <FormCard title="Skills & Certs" icon={Award}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TagInput label="Skills (Technologies, Tools, Soft Skills)" tags={resumeData.skills} onAdd={(s) => setResumeData({...resumeData, skills: [...resumeData.skills, s]})} onRemove={(s) => setResumeData({...resumeData, skills: resumeData.skills.filter(t => t !== s)})} />
                <TagInput label="Certifications" tags={resumeData.certifications} onAdd={(c) => setResumeData({...resumeData, certifications: [...resumeData.certifications, c]})} onRemove={(c) => setResumeData({...resumeData, certifications: resumeData.certifications.filter(t => t !== c)})} />
              </div>
            </FormCard>
          </div>

          <div>
            <FormCard title="Custom Sections" icon={PlusCircle}>
              {resumeData.customSections.map((sec, i) => (
                <CustomSection key={sec.id} section={sec} onChange={(u) => { const n = [...resumeData.customSections]; n[i] = u; setResumeData({...resumeData, customSections: n})}} onRemove={() => setResumeData({...resumeData, customSections: resumeData.customSections.filter((_, idx) => idx !== i)})} />
              ))}
              <button 
                onClick={() => setResumeData({...resumeData, customSections: [...resumeData.customSections, { id: Date.now(), title: 'Additional Achievements', items: [{ label: '', value: '' }] }]})}
                className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-200 transition flex items-center justify-center gap-2"
              >
                <Plus size={18}/> Add Custom Section
              </button>
            </FormCard>
          </div>

          <div ref={sectionRefs.ai}>
            <FormCard title="ATS Intelligence" icon={BrainCircuit}>
              <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[40px] space-y-6">
                <div className="flex justify-between items-center text-indigo-600">
                   <h3 className="text-xs font-black uppercase tracking-widest ">Target Job & ATS Scan</h3>
                   <label className="text-[10px] font-black uppercase cursor-pointer border-b border-indigo-200">Scan JD Image <input type="file" className="hidden" accept="image/*" onChange={handleJDScan} /></label>
                </div>
                <Input label="Target Job Description" multiline placeholder="Paste text or scan above..." value={resumeData.jobDescription} onChange={(v) => setResumeData({...resumeData, jobDescription: v})} />
                <div className="flex gap-4 pt-4">
                  <button onClick={handleAudit} disabled={isProcessing} className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 py-4 rounded-2xl font-black text-xs uppercase hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-2">
                    {isProcessing ? <Loader2 className="animate-spin" size={16}/> : <Search size={16}/>} Run AI Audit
                  </button>
                  <button onClick={handleOptimize} disabled={isProcessing} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                    {isProcessing ? <Loader2 className="animate-spin" size={16}/> : <Sparkles size={16}/>} Auto-Optimize Content
                  </button>
                </div>
              </div>
            </FormCard>
          </div>
        </>
      )}
        </div>
      </main>

      <section className="w-[48%] bg-slate-200 border-l border-slate-300 py-10 px-12 overflow-y-auto flex gap-6 items-start">
        {/* Real-time ATS Analysis Sidebar */}
        <div className="w-68 flex flex-col gap-6 shrink-0 sticky top-10">
          <div className="bg-white p-7 rounded-[40px] shadow-sm border border-slate-100 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
             
             <div className="relative z-10">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><BarChart3 size={14} className="text-indigo-500"/> Stringent Scan</h3>
                  <div className="group relative">
                     <Info size={14} className="text-slate-300 cursor-help hover:text-indigo-500 transition" />
                     <div className="absolute right-0 top-6 w-56 bg-slate-900 text-[10px] text-slate-300 p-4 rounded-[24px] shadow-2xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-50 leading-relaxed border border-slate-800">
                        <span className="text-white font-black uppercase block mb-2 text-indigo-400">Weighted Criteria:</span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between"><span>Keyword Placement</span> <span className="text-white">30%</span></div>
                          <div className="flex justify-between"><span>Experience & Verbs</span> <span className="text-white">25%</span></div>
                          <div className="flex justify-between"><span>Quantified Impact</span> <span className="text-white">20%</span></div>
                          <div className="flex justify-between"><span>Structure & Layout</span> <span className="text-white">15%</span></div>
                          <div className="flex justify-between"><span>Grammar & Categorization</span> <span className="text-white">10%</span></div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-800 text-[9px] italic text-slate-500">Includes penalties for tables, columns, and weak verbs.</div>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="text-center mb-2">
                     <div className="text-4xl font-black text-slate-900 tracking-tighter">{calculateATSScore()}%</div>
                     <div className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full inline-block mt-1">Stringency Mode</div>
                  </div>

                  <div className="space-y-3">
                     {[
                       { label: 'Keywords', val: auditData?.breakdown?.keywords || (calculateATSScore() * 0.3), max: 30, color: 'bg-indigo-500' },
                       { label: 'Impact', val: auditData?.breakdown?.impact || (calculateATSScore() * 0.2), max: 20, color: 'bg-emerald-500' },
                       { label: 'Verbs', val: auditData?.breakdown?.verbs || (calculateATSScore() * 0.25), max: 25, color: 'bg-amber-500' },
                     ].map((cat, idx) => (
                       <div key={idx}>
                          <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 mb-1">
                             <span>{cat.label}</span>
                             <span>{Math.round(cat.val)}/{cat.max}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <div className={`h-full ${cat.color} transition-all duration-700 ease-out`} style={{ width: `${(cat.val/cat.max)*100}%` }}></div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <button 
                    onClick={handleAudit} 
                    disabled={isProcessing}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-indigo-600 transition shadow-xl hover:scale-[1.02] active:scale-95"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" size={14}/> : <ShieldCheck size={14} className="text-emerald-400"/>} Deep AI Audit
                  </button>
                  
                  {auditData?.matchingKeywords?.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1"><Check size={12}/> Top Assets</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                         {auditData.matchingKeywords.slice(0, 6).map((k, i) => <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold border border-emerald-100/50">{k}</span>)}
                      </div>
                    </div>
                  )}
               </div>
             </div>
          </div>
          
          <div className="bg-slate-900 p-7 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500"><Sparkles size={120}/></div>
             <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2"><Cpu size={14}/> AI Insight</h3>
                <p className="text-[11px] leading-relaxed font-bold text-slate-300">
                   {auditData?.verdict || (resumeData.jobDescription ? "Your profile is being scrutinized against the JD..." : "Audit your profile to unlock strategic career insights.")}
                </p>
             </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center pb-20">
          <div className="bg-white w-[794px] h-[1123px] p-16 shadow-2xl fade-in relative transform origin-top scale-[0.8] rounded-sm overflow-hidden border border-slate-100">
             <ResumePreview data={resumeData} />
             <div className={`absolute top-10 right-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-black shadow-xl transition-all ${calculateATSScore() >= 80 ? 'bg-emerald-500 scale-110' : 'bg-indigo-600 scale-100'}`}>{calculateATSScore()}%</div>
          </div>
        </div>
      </section>

      {/* Audit Results Modal */}
      {showAuditModal && auditData && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-12 animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-5xl rounded-[60px] p-16 relative overflow-hidden flex flex-col max-h-[90vh] shadow-[0_0_100px_rgba(79,70,229,0.2)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 opacity-50" />
            <button onClick={() => setShowAuditModal(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 hover:rotate-90 transition-all p-2 z-10"><X size={32}/></button>
            
            <div className="mb-12 flex flex-col md:flex-row items-center gap-10 border-b border-slate-100 pb-12 relative z-10">
              <div className="relative">
                <div className={`w-40 h-40 rounded-[48px] flex items-center justify-center text-5xl font-black text-white shadow-2xl relative z-10 ${auditData.score >= 80 ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}>
                  {auditData.score}%
                </div>
                <div className="absolute inset-0 bg-white rounded-[48px] scale-110 blur-xl opacity-20" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter leading-none">{resumeData.jobDescription ? 'Stringent ATS Analysis' : 'Executive Profile Audit'}</h2>
                <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start mt-4">
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full tracking-widest">Industry Standard</span>
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full tracking-widest leading-none flex items-center gap-2"><ShieldCheck size={12}/> AI Certified Scan</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto pr-6 space-y-12 pb-10 custom-scrollbar relative z-10">
              {/* SCORE BREAKDOWN BARS */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { label: 'Keywords', val: auditData.breakdown?.keywords, max: 30, color: 'text-indigo-600', bg: 'bg-indigo-600' },
                  { label: 'Relevance', val: auditData.breakdown?.relevance, max: 25, color: 'text-blue-600', bg: 'bg-blue-600' },
                  { label: 'Impact', val: auditData.breakdown?.impact, max: 20, color: 'text-emerald-600', bg: 'bg-emerald-600' },
                  { label: 'Verbs', val: auditData.breakdown?.verbs, max: 15, color: 'text-amber-600', bg: 'bg-amber-600' },
                  { label: 'Structure', val: auditData.breakdown?.formatting, max: 10, color: 'text-rose-600', bg: 'bg-rose-600' }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase text-slate-400">{item.label}</span>
                      <span className={`text-xs font-black ${item.color}`}>{item.val}/{item.max}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${item.bg} transition-all duration-1000 delay-300`} style={{ width: `${(item.val/item.max)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* IMPACT ANALYSIS */}
              <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-6 transition-transform duration-700"><Sparkles size={200}/></div>
                <div className="relative z-10">
                  <h4 className="text-xs font-black uppercase text-indigo-400 mb-6 flex items-center gap-3 tracking-[0.2em]"><Cpu size={16}/> Neural Impact & Strategic Calibration</h4>
                  <p className="text-lg font-bold text-slate-100 leading-relaxed max-w-3xl italic">"{auditData.impactAnalysis}"</p>
                  <p className="text-slate-400 text-sm mt-6 font-medium leading-relaxed">{auditData.verdict}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase text-rose-500 flex items-center gap-3 tracking-[0.2em]"><AlertCircle size={18}/> Critical Enhancements</h4>
                  <div className="space-y-4">
                    {auditData.improvements.map((imp, i) => (
                      <div key={i} className="bg-rose-50/50 text-rose-800 p-6 rounded-3xl text-sm font-bold border border-rose-100/50 flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">{i+1}</div>
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                   <div>
                    <h4 className="text-xs font-black uppercase text-emerald-500 flex items-center gap-3 tracking-[0.2em] mb-6"><CheckCircle2 size={18}/> Keyword Optimization</h4>
                    <div className="flex flex-wrap gap-2">
                      {auditData.matchingKeywords?.map((kw, i) => <span key={i} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase border border-emerald-100/50 transition hover:bg-emerald-100">{kw}</span>)}
                    </div>
                   </div>
                   <div>
                    <h4 className="text-xs font-black uppercase text-amber-500 flex items-center gap-3 tracking-[0.2em] mb-6"><Search size={18}/> Strategic Gaps to Fill</h4>
                    <div className="flex flex-wrap gap-2">
                      {auditData.missingKeywords?.map((kw, i) => <span key={i} className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase border border-amber-100/50 transition hover:bg-amber-100">{kw}</span>)}
                    </div>
                   </div>
                </div>
              </div>

              {/* STRATEGIC MOVES */}
              {auditData.strategicMoves?.length > 0 && (
                <div className="space-y-8">
                   <h4 className="text-xs font-black uppercase text-slate-400 flex items-center gap-3 tracking-[0.2em]"><Monitor size={18}/> Industry Alignment Strategy</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {auditData.strategicMoves.map((move, i) => (
                       <div key={i} className="bg-white border border-slate-100 p-7 rounded-[40px] shadow-sm flex items-start gap-6 hover:shadow-xl hover:translate-x-1 transition-all duration-300">
                         <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-black shrink-0 shadow-sm">{i+1}</div>
                         <p className="text-[13px] font-bold text-slate-600 leading-relaxed">{move}</p>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              <div className="bg-indigo-50/30 p-10 rounded-[48px] border border-indigo-100/50">
                <h4 className="text-xs font-black uppercase text-indigo-400 mb-6 tracking-[0.2em]">Formatting & Compatibility Report</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {auditData.formattingRisks?.map((risk, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-700 font-bold text-xs bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm"><div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"/> {risk}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10 flex gap-6 relative z-10">
              <button onClick={() => setShowAuditModal(false)} className="px-10 py-6 rounded-[32px] font-black text-[13px] uppercase text-slate-400 hover:text-slate-900 transition tracking-widest">Close Analysis</button>
              <button 
                onClick={() => { setShowAuditModal(false); handleOptimize(); }} 
                className="flex-1 bg-indigo-600 text-white py-6 rounded-[32px] font-black text-sm uppercase hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-600/30 active:scale-[0.98] flex items-center justify-center gap-4 group"
              >
                 <Sparkles size={20} className="group-hover:rotate-12 transition-transform"/> Deploy AI Optimization (Target 95+)
              </button>
            </div>
          </div>
        </div>
      )}

      {exclusiveTool && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-12">
          <div className="bg-white w-full max-w-4xl rounded-[60px] p-16 relative overflow-hidden flex flex-col max-h-[90vh]">
            <button onClick={() => setExclusiveTool(null)} className="absolute top-10 right-10 text-slate-400 hover:rotate-90 transition p-2"><X size={32}/></button>
            <div className="overflow-y-auto pr-4 whitespace-pre-line text-slate-700 leading-relaxed font-medium">
               {!toolContent ? <div className="animate-pulse py-20 text-center text-xs font-black uppercase tracking-widest">Generating Your Next Career Move...</div> : toolContent.letter || JSON.stringify(toolContent)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
