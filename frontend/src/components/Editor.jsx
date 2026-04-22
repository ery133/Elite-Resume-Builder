import React from 'react';
import { Plus, Trash2, Award, Briefcase, GraduationCap, Laptop, Sparkles, PlusCircle } from 'lucide-react';

export const FormCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm fade-in mb-8">
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export const Input = ({ label, placeholder, value, onChange, type = "text", multiline = false }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    {multiline ? (
      <textarea
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all min-h-[120px] resize-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type={type}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

export const ExperienceItem = ({ item, onChange, onRemove, type = "exp" }) => {
  const isEdu = type === "edu";
  const icon = isEdu ? <GraduationCap size={16}/> : <Briefcase size={16}/>;
  
  return (
    <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-2xl relative group hover:bg-white hover:shadow-lg transition-all">
      <button onClick={onRemove} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input label={isEdu ? "Institution" : "Organization"} placeholder="..." value={isEdu ? item.school : item.company} onChange={(v) => onChange(isEdu ? {...item, school: v} : {...item, company: v})} />
        <Input label={isEdu ? "Degree" : "Role"} placeholder="..." value={isEdu ? item.degree : item.role} onChange={(v) => onChange(isEdu ? {...item, degree: v} : {...item, role: v})} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input label="Dates" placeholder="e.g. 2020 - 2024" value={item.duration} onChange={(v) => onChange({...item, duration: v})} />
        {isEdu && <Input label="GPA / honors" placeholder="e.g. 3.9/4.0" value={item.gpa} onChange={(v) => onChange({...item, gpa: v})} />}
      </div>
      {!isEdu && <Input label="Description" multiline value={item.description} onChange={(v) => onChange({...item, description: v})} />}
    </div>
  );
};

export const ProjectItem = ({ item, onChange, onRemove }) => (
  <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-2xl relative group hover:bg-white hover:shadow-lg transition-all">
    <button onClick={onRemove} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Input label="Project Title" value={item.title} onChange={(v) => onChange({...item, title: v})} />
      <Input label="Link (URL)" placeholder="github.com/..." value={item.link} onChange={(v) => onChange({...item, link: v})} />
    </div>
    <Input label="Short Description" multiline value={item.description} onChange={(v) => onChange({...item, description: v})} />
  </div>
);

export const TagInput = ({ label, tags, onAdd, onRemove }) => {
  const [val, setVal] = React.useState('');
  return (
    <div className="space-y-2">
      <Input label={label} value={val} onChange={setVal} placeholder="Type and press add..." />
      <button 
        onClick={() => { if(val) { onAdd(val); setVal(''); } }}
        className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-1 hover:text-indigo-800 transition"
      >
        <Plus size={12}/> Add Skill
      </button>
      <div className="flex flex-wrap gap-2 pt-2">
        {tags.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2">
            {t} <button onClick={() => onRemove(t)}><Trash2 size={12} className="text-slate-400 hover:text-red-500"/></button>
          </span>
        ))}
      </div>
    </div>
  );
};

export const CustomSection = ({ section, onChange, onRemove }) => (
  <div className="space-y-6 animate-in slide-in-from-top-4">
    <div className="flex justify-between items-center bg-slate-900 rounded-2xl p-4 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <PlusCircle size={20} className="text-indigo-400" />
        <input 
          className="bg-transparent border-none text-white font-black uppercase text-xs tracking-widest focus:outline-none w-48"
          value={section.title}
          onChange={(e) => onChange({...section, title: e.target.value})}
          placeholder="SECTION TITLE..."
        />
      </div>
      <button onClick={onRemove} className="text-slate-400 hover:text-red-400 transition"><Trash2 size={16}/></button>
    </div>
    
    {section.items.map((item, i) => (
      <div key={i} className="flex gap-4 items-end p-4 border border-slate-100 bg-slate-50/30 rounded-xl relative group">
        <button 
          onClick={() => onChange({...section, items: section.items.filter((_, idx) => idx !== i)})}
          className="absolute -top-2 -right-2 bg-white text-slate-300 hover:text-red-500 rounded-full shadow border border-slate-100 p-1 opacity-0 group-hover:opacity-100 transition"
        >
          <Trash2 size={12}/>
        </button>
        <Input label="Title" value={item.label} onChange={(v) => {
          const n = [...section.items]; n[i].label = v; onChange({...section, items: n});
        }} />
        <Input label="Detail" value={item.value} onChange={(v) => {
          const n = [...section.items]; n[i].value = v; onChange({...section, items: n});
        }} />
      </div>
    ))}
    <button 
      onClick={() => onChange({...section, items: [...section.items, { label: '', value: '' }]})}
      className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-1 pl-2"
    >
      <Plus size={14}/> Add New Entry
    </button>
  </div>
);
