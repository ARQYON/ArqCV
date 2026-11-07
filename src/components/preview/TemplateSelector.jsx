import React from 'react';
import { useCV } from '../../context/CVContext';

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Two-column header, accent bar sections.',
    preview: (
      <div className="w-full h-full bg-white p-1.5">
        <div className="flex justify-between mb-1">
          <div><div className="h-1.5 w-8 bg-gray-800 rounded mb-0.5" /><div className="h-1 w-5 bg-blue-400 rounded" /></div>
          <div className="space-y-0.5"><div className="h-0.5 w-7 bg-gray-200 rounded" /><div className="h-0.5 w-6 bg-gray-200 rounded" /></div>
        </div>
        <div className="h-px bg-blue-400 mb-1.5" />
        <div className="space-y-0.5">
          <div className="h-1 w-full bg-gray-100 rounded" /><div className="h-1 w-5/6 bg-gray-100 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, single-column. Best for most jobs.',
    preview: (
      <div className="w-full h-full bg-white p-1.5">
        <div className="h-1.5 w-10 bg-gray-800 rounded mb-1" />
        <div className="h-1 w-6 bg-gray-300 rounded mb-2" />
        <div className="h-px bg-gray-200 mb-1.5" />
        <div className="space-y-0.5">
          <div className="h-1 w-full bg-gray-100 rounded" />
          <div className="h-1 w-5/6 bg-gray-100 rounded" />
          <div className="h-1 w-4/6 bg-gray-100 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sidebar layout with ARQYON blue. Great for tech roles.',
    preview: (
      <div className="w-full h-full flex">
        <div className="w-5 bg-arq-700 h-full p-1 flex-shrink-0">
          <div className="h-1 w-3 bg-arq-400 rounded mb-1" />
          <div className="h-0.5 w-2 bg-arq-500 rounded mb-2" />
          <div className="space-y-0.5">
            <div className="h-0.5 w-3 bg-arq-500 rounded" />
            <div className="h-0.5 w-2 bg-arq-500 rounded" />
            <div className="h-0.5 w-3 bg-arq-500 rounded" />
          </div>
        </div>
        <div className="flex-1 p-1.5">
          <div className="h-px bg-gray-200 mb-1.5" />
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-gray-100 rounded" />
            <div className="h-1 w-5/6 bg-gray-100 rounded" />
            <div className="h-1 w-4/6 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function TemplateSelector() {
  const { activeTemplate, setActiveTemplate } = useCV();

  return (
    <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
      <p className="text-xs font-medium text-gray-500 mb-2">Template</p>
      <div className="flex gap-2">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTemplate(t.id)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left transition-all
              ${activeTemplate === t.id
                ? 'border-arq-400 bg-arq-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
          >
            {/* mini preview */}
            <div className="w-10 h-12 rounded border border-gray-200 overflow-hidden flex-shrink-0 bg-white">
              {t.preview}
            </div>
            <div>
              <div className={`text-xs font-semibold ${activeTemplate === t.id ? 'text-arq-700' : 'text-gray-700'}`}>
                {t.name}
              </div>
              <div className="text-[10px] text-gray-400 leading-tight max-w-[100px]">
                {t.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
