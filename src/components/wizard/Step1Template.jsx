import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal',
    tag: 'Most popular',
    tagColor: 'bg-emerald-100 text-emerald-700',
    desc: 'Clean, single-column layout. Works for any industry. Easy to read.',
    preview: (accent) => (
      <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
        <div className="h-3 w-28 rounded" style={{ backgroundColor: '#1a1a1a' }} />
        <div className="h-2 w-20 rounded" style={{ backgroundColor: accent }} />
        <div className="h-px bg-gray-200 my-1" />
        <div className="space-y-1.5">
          {[1,0.9,0.75,0.6,0.85].map((w,i) => (
            <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w*100}%` }} />
          ))}
        </div>
        <div className="h-px bg-gray-200 my-1" />
        <div className="space-y-1.5">
          {[0.95,0.8,0.65].map((w,i) => (
            <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w*100}%` }} />
          ))}
        </div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {[40,55,45,50].map((w,i) => (
            <div key={i} className="h-3 rounded-full bg-gray-100" style={{ width: w }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    name: 'Modern',
    tag: 'Developer pick',
    tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Bold sidebar layout. Stands out for tech and creative roles.',
    preview: (accent) => (
      <div className="w-full h-full flex">
        <div className="w-16 h-full p-2 flex flex-col gap-2" style={{ backgroundColor: accent }}>
          <div className="h-2.5 w-10 rounded bg-white opacity-80" />
          <div className="h-1.5 w-8 rounded bg-white opacity-50" />
          <div className="h-px bg-white opacity-20 my-1" />
          <div className="space-y-1">
            {[0.9,0.7,0.8,0.6].map((w,i)=>(
              <div key={i} className="h-1 rounded bg-white opacity-30" style={{ width: `${w*100}%` }} />
            ))}
          </div>
          <div className="h-px bg-white opacity-20 my-1" />
          <div className="flex flex-wrap gap-1">
            {[1,1,1].map((_,i)=>(
              <div key={i} className="h-2.5 w-5 rounded bg-white opacity-20" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          <div className="h-px bg-gray-100" />
          <div className="space-y-1.5">
            {[1,0.85,0.7,0.9,0.6].map((w,i)=>(
              <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${w*100}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    tag: 'Professional',
    tagColor: 'bg-amber-100 text-amber-700',
    desc: 'Two-column header with accent bars. Traditional and trustworthy.',
    preview: (accent) => (
      <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-3 w-24 rounded bg-gray-800 mb-1" />
            <div className="h-2 w-16 rounded" style={{ backgroundColor: accent }} />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-14 rounded bg-gray-100" />
            <div className="h-1.5 w-12 rounded bg-gray-100" />
          </div>
        </div>
        <div className="h-0.5 rounded mt-1" style={{ backgroundColor: accent }} />
        {[['Experience', 1], ['Education', 0.8]].map(([label, w], si) => (
          <div key={si}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-0.5 h-3 rounded" style={{ backgroundColor: accent }} />
              <div className="h-1.5 w-14 rounded bg-gray-300" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="pl-2 space-y-1">
              {[w, w*0.85, w*0.7].map((fw, i) => (
                <div key={i} className="h-1.5 rounded bg-gray-100" style={{ width: `${fw*100}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Step1Template({ onNext }) {
  const { activeTemplate, setActiveTemplate, accentColor, setAccentColor } = useCV();

  return (
    <div className="flex flex-col items-center px-6 py-8 max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Choose your template</h2>
      <p className="text-gray-500 text-sm mb-8">Pick the style that fits your profession. You can change it later.</p>

      <div className="grid grid-cols-3 gap-5 w-full mb-10">
        {TEMPLATES.map(t => {
          const selected = activeTemplate === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`flex flex-col rounded-2xl border-2 overflow-hidden text-left transition-all duration-150 hover:shadow-lg
                ${selected ? 'border-arq-500 shadow-lg shadow-arq-100' : 'border-gray-200 hover:border-gray-300'}`}
            >
              {/* A4 preview */}
              <div className="aspect-[210/297] w-full bg-white overflow-hidden relative">
                {t.preview(accentColor)}
                {selected && (
                  <div className="absolute inset-0 ring-2 ring-inset rounded-sm pointer-events-none" style={{ ringColor: accentColor }} />
                )}
              </div>

              {/* Info */}
              <div className={`p-4 border-t ${selected ? 'bg-arq-50 border-arq-100' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${t.tagColor}`}>{t.tag}</span>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{t.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Color picker row */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs text-gray-500 font-medium">Accent color:</span>
        {['#4361ff','#475569','#059669','#e11d48','#7c3aed','#d97706'].map(c => (
          <button
            key={c}
            onClick={() => setAccentColor(c)}
            className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
            style={{ backgroundColor: c, borderColor: accentColor === c ? '#111' : 'transparent' }}
          />
        ))}
        <input type="color" value={accentColor}
          onChange={e => setAccentColor(e.target.value)}
          className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 bg-transparent" title="Custom" />
      </div>

      <button
        className="btn-primary px-8 py-3 text-base rounded-xl"
        style={{ backgroundColor: accentColor }}
        onClick={onNext}
      >
        Continue with {TEMPLATES.find(t => t.id === activeTemplate)?.name}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
