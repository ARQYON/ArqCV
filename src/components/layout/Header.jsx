import React from 'react';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-arq-600 rounded-lg flex items-center justify-center">
          <FileText size={14} className="text-white" />
        </div>
        <div>
          <span className="font-bold text-gray-900 text-sm">ArqCV</span>
          <span className="text-xs text-gray-400 ml-2">by ARQYON</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
          ✓ Free · No signup · No watermark
        </span>
      </div>
    </header>
  );
}
