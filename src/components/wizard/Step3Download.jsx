import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2, Shield, Zap, FileText } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import MinimalTemplate from '../preview/MinimalTemplate';
import ModernTemplate  from '../preview/ModernTemplate';
import ClassicTemplate from '../preview/ClassicTemplate';

const TEMPLATE_MAP = { minimal: MinimalTemplate, modern: ModernTemplate, classic: ClassicTemplate };

const BADGES = [
  { icon: Shield,   text: 'No watermark' },
  { icon: Zap,      text: 'High quality PDF' },
  { icon: FileText, text: 'A4 ready' },
];

export default function Step3Download() {
  const { cv, activeTemplate, accentColor } = useCV();
  const [status, setStatus] = useState('idle'); // idle | exporting | done
  const Template = TEMPLATE_MAP[activeTemplate] || MinimalTemplate;

  const handleDownload = async () => {
    setStatus('exporting');
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const el = document.getElementById('cv-preview');
      if (!el) { setStatus('idle'); return; }

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

      const name = cv.personal?.name ? cv.personal.name.replace(/\s+/g, '_') : 'CV';
      pdf.save(`${name}_ArqCV.pdf`);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Top bar ── */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4
                      bg-white border-b border-gray-100">
        <div>
          <p className="text-sm font-bold text-gray-900">
            {status === 'done' ? '🎉 Downloaded!' : 'Your CV is ready!'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {status === 'done'
              ? 'Check your Downloads folder.'
              : 'Review below, then hit Download.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Badges */}
          <div className="hidden sm:flex items-center gap-3">
            {BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                <Icon size={12} className="text-gray-300" />
                {text}
              </div>
            ))}
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={status === 'exporting'}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white
                       text-sm font-bold transition-all duration-300
                       disabled:opacity-70 active:scale-95"
            style={{
              background: status === 'done'
                ? 'linear-gradient(135deg, #059669, #047857)'
                : `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
              boxShadow: status === 'done'
                ? '0 4px 16px #05966940'
                : `0 4px 16px ${accentColor}40`,
            }}
          >
            {status === 'exporting' && <><Loader2 size={15} className="animate-spin" /> Generating…</>}
            {status === 'done'      && <><CheckCircle2 size={15} /> Downloaded!</>}
            {status === 'idle'      && <><Download size={15} /> Download PDF</>}
          </button>
        </div>
      </div>

      {/* ── CV Preview ── */}
      <div className="flex-1 overflow-y-auto bg-[#f4f5f7] py-10 px-6 flex justify-center">
        <div
          id="cv-preview"
          className="bg-white shadow-2xl w-full"
          style={{ maxWidth: '210mm', minHeight: '297mm' }}
        >
          <Template cv={cv} accentColor={accentColor} />
        </div>
      </div>

      {/* ── Footer note ── */}
      <div className="shrink-0 py-2 text-center bg-white border-t border-gray-50">
        <p className="text-[11px] text-gray-300">
          Built with <span className="font-bold text-arq-400">ArqCV</span> by ARQYON — free, forever.
        </p>
      </div>
    </div>
  );
}
