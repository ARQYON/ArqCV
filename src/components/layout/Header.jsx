import React, { useRef } from 'react';
import { FileText, Trash2, Palette } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const PRESET_COLORS = [
  { label: 'ARQYON Blue', value: '#4361ff' },
  { label: 'Slate',       value: '#475569' },
  { label: 'Emerald',     value: '#059669' },
  { label: 'Rose',        value: '#e11d48' },
  { label: 'Violet',      value: '#7c3aed' },
  { label: 'Amber',       value: '#d97706' },
];

export default function Header() {
  const { accentColor, setAccentColor, clearCV } = useCV();
  const colorRef = useRef(null);

  const handleClear = () => {
    if (window.confirm('Clear all data and start fresh?')) clearCV();
  };

  return (
    <header className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center justify-between shadow-sm z-10">

      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
          <FileText size={14} className="text-white" />
        </div>
        <div>
          <span className="font-bold text-gray-900 text-sm">ArqCV</span>
          <span className="text-xs text-gray-400 ml-2">by ARQYON</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">

        {/* Color presets */}
        <div className="flex items-center gap-1.5">
          <Palette size={13} className="text-gray-400" />
          {PRESET_COLORS.map(c => (
            <button
              key={c.value}
              title={c.label}
              onClick={() => setAccentColor(c.value)}
              className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: c.value,
                borderColor: accentColor === c.value ? '#111' : 'transparent',
              }}
            />
          ))}
          {/* Custom color */}
          <input
            ref={colorRef}
            type="color"
            value={accentColor}
            onChange={e => setAccentColor(e.target.value)}
            className="w-5 h-5 rounded-full cursor-pointer border-0 p-0 bg-transparent"
            title="Custom color"
          />
        </div>

        <div className="w-px h-5 bg-gray-200" />

        <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
          ✓ Auto-saved
        </span>

        <button className="btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50" onClick={handleClear}>
          <Trash2 size={13} /> Clear
        </button>
      </div>
    </header>
  );
}
