import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import MinimalTemplate from '../preview/MinimalTemplate';
import ModernTemplate  from '../preview/ModernTemplate';
import ClassicTemplate from '../preview/ClassicTemplate';

const TEMPLATE_MAP = { minimal: MinimalTemplate, modern: ModernTemplate, classic: ClassicTemplate };

export default function Step3Download() {
  const { cv, activeTemplate, accentColor } = useCV();
  const [state, setState] = useState('idle'); // idle | exporting | done
  const Template = TEMPLATE_MAP[activeTemplate] || MinimalTemplate;

  const handleDownload = async () => {
    setState('exporting');
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const el = document.getElementById('cv-preview');
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      const pdf  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const a4r   = pdfW / pdfH;

      let iW, iH, oX = 0, oY = 0;
      if (ratio > a4r) { iW = pdfW; iH = pdfW / ratio; oY = (pdfH - iH) / 2; }
      else             { iH = pdfH; iW = pdfH * ratio;  oX = (pdfW - iW) / 2; }

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', oX, oY, iW, iH);

      const name = cv.personal.name ? cv.personal.name.replace(/\s+/g, '_') : 'CV';
      pdf.save(`${name}_ArqCV.pdf`);
      setState('done');
      setTimeout(() => setState('idle'), 3000);
    } catch {
      setState('idle');
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div>
          <p className="text-sm font-semibold text-gray-800">Your CV is ready!</p>
          <p className="text-xs text-gray-400">Review it below, then download as PDF.</p>
        </div>

        <button
          className="btn-primary px-6 py-2.5 text-sm rounded-xl disabled:opacity-60 transition-all"
          style={{ backgroundColor: state === 'done' ? '#059669' : accentColor }}
          onClick={handleDownload}
          disabled={state === 'exporting'}
        >
          {state === 'exporting' && <><Loader2 size={15} className="animate-spin" /> Generating PDF…</>}
          {state === 'done'      && <><CheckCircle2 size={15} /> Downloaded!</>}
          {state === 'idle'      && <><Download size={15} /> Download PDF</>}
        </button>
      </div>

      {/* Full A4 preview */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8 flex justify-center">
        <div
          className="bg-white shadow-2xl w-full"
          style={{ maxWidth: '210mm', minHeight: '297mm' }}
        >
          <Template cv={cv} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
