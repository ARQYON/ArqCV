import React from 'react';
import { ArrowRight, Zap, Eye, Download } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal',
    tag: 'Most popular',
    tagColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    desc: 'Clean single-column layout. Works for any industry.',
    preview: (accent) => (
      <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
        <div className="h-3 w-28 rounded-sm" style={{ backgroundColor: '#1a1a1a' }} />
        <div className="h-2 w-20 rounded-sm" style={{ backgroundColor: accent }} />
        <div className="h-px bg-gray-100 my-1.5" />
        <div className="space-y-1.5">
          {[1, 0.9, 0.75, 0.6, 0.85].map((w, i) => (
            <div key={i} className="h-1.5 rounded-sm bg-gray-100" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
        <div className="h-px bg-gray-100 my-1.5" />
        <div className="space-y-1.5">
          {[0.95, 0.8, 0.65].map((w, i) => (
            <div key={i} className="h-1.5 rounded-sm bg-gray-100" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {[42, 56, 46, 50].map((w, i) => (
            <div key={i} className="h-3 rounded-full" style={{ width: w, backgroundColor: `${accent}22` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    name: 'Modern',
    tag: 'Developer pick',
    tagColor: 'bg-blue-50 text-blue-600 border border-blue-100',
    desc: 'Bold sidebar layout. Stands out for tech and creative roles.',
    preview: (accent) => (
      <div className="w-full h-full flex">
        <div className="w-16 h-full p-2.5 flex flex-col gap-2" style={{ backgroundColor: accent }}>
          <div className="w-8 h-8 rounded-full bg-white opacity-25 mx-auto" />
          <div className="h-2 w-10 rounded-sm bg-white opacity-70 mx-auto mt-1" />
          <div className="h-1.5 w-8 rounded-sm bg-white opacity-40 mx-auto" />
          <div className="h-px bg-white opacity-20 my-1" />
          {[0.9, 0.7, 0.8, 0.6].map((w, i) => (
            <div key={i} className="h-1 rounded-sm bg-white opacity-25" style={{ width: `${w * 100}%` }} />
          ))}
          <div className="h-px bg-white opacity-20 my-1" />
          <div className="flex flex-wrap gap-1">
            {[1, 1, 1].map((_, i) => (
              <div key={i} className="h-2.5 w-5 rounded-sm bg-white opacity-20" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          <div className="h-px bg-gray-100" />
          {[1, 0.85, 0.7, 0.9, 0.6].map((w, i) => (
            <div key={i} className="h-1.5 rounded-sm bg-gray-100" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    tag: 'Professional',
    tagColor: 'bg-amber-50 text-amber-600 border border-amber-100',
    desc: 'Two-column header with accent bars. Traditional and trustworthy.',
    preview: (accent) => (
      <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-3 w-24 rounded-sm bg-gray-800 mb-1" />
            <div className="h-2 w-16 rounded-sm" style={{ backgroundColor: accent }} />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-14 rounded-sm bg-gray-100" />
            <div className="h-1.5 w-12 rounded-sm bg-gray-100" />
          </div>
        </div>
        <div className="h-0.5 rounded mt-1" style={{ backgroundColor: accent }} />
        {[['Exp', 1], ['Edu', 0.8]].map(([, w], si) => (
          <div key={si}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-0.5 h-3 rounded" style={{ backgroundColor: accent }} />
              <div className="h-1.5 w-14 rounded-sm bg-gray-200" />
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="pl-2 space-y-1">
              {[w, w * 0.85, w * 0.7].map((fw, i) => (
                <div key={i} className="h-1.5 rounded-sm bg-gray-100" style={{ width: `${fw * 100}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const COLORS = ['#4361ff', '#475569', '#059669', '#e11d48', '#7c3aed', '#d97706', '#0891b2'];

const PERKS = [
  { icon: Zap,      text: 'Instant PDF — no wait' },
  { icon: Eye,      text: 'Live preview as you type' },
  { icon: Download, text: 'Free forever, no watermark' },
];

export default function Step1Template({ onNext }) {
  const { activeTemplate, setActiveTemplate, accentColor, setAccentColor } = useCV();

  return (
    <div className="min-h-full flex flex-col">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-b from-arq-50 to-white px-6 pt-10 pb-6 text-center">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
          Build a CV that gets you hired
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
          Free, no login, no watermark. Pick a template, fill in your details and download a pixel-perfect PDF.
        </p>

        {/* Perks row */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
              <Icon size={13} className="text-arq-500" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Template grid ── */}
      <div className="flex-1 px-6 pb-6 max-w-4xl mx-auto w-full">

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 mt-2">
          Choose a template
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {TEMPLATES.map(t => {
            const selected = activeTemplate === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTemplate(t.id)}
                className={`flex flex-col rounded-2xl border-2 overflow-hidden text-left
                            transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5
                            ${selected
                              ? 'border-arq-500 shadow-lg shadow-arq-100 scale-[1.01]'
                              : 'border-gray-150 hover:border-gray-300'}`}
                style={{ borderColor: selected ? accentColor : undefined }}
              >
                {/* A4 preview */}
                <div className="aspect-[210/280] w-full bg-white overflow-hidden">
                  {t.preview(accentColor)}
                </div>

                {/* Info */}
                <div className={`px-4 py-3 border-t transition-colors
                  ${selected ? 'border-arq-100' : 'border-gray-100'}`}
                  style={{ borderTopColor: selected ? `${accentColor}30` : undefined,
                           backgroundColor: selected ? `${accentColor}08` : '#fff' }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-gray-900 text-sm">{t.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.tagColor}`}>
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Color picker ── */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Accent color
          </span>
          <div className="flex items-center gap-2">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setAccentColor(c)}
                title={c}
                className="w-6 h-6 rounded-full transition-all duration-150 hover:scale-125"
                style={{
                  backgroundColor: c,
                  boxShadow: accentColor === c ? `0 0 0 2px white, 0 0 0 4px ${c}` : 'none',
                  transform: accentColor === c ? 'scale(1.15)' : undefined,
                }}
              />
            ))}
            <label
              className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300
                         hover:border-gray-400 cursor-pointer overflow-hidden relative
                         flex items-center justify-center transition-colors"
              title="Custom color"
            >
              <input
                type="color"
                value={accentColor}
                onChange={e => setAccentColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <span className="text-[9px] font-bold text-gray-400 pointer-events-none">+</span>
            </label>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl text-white
                       text-sm font-bold shadow-lg transition-all duration-200
                       hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              boxShadow: `0 8px 24px ${accentColor}40`,
            }}
          >
            Continue with {TEMPLATES.find(t => t.id === activeTemplate)?.name}
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
