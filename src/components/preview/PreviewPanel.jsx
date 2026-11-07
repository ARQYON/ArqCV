import React, { useState } from 'react';
import { Download, Eye, Loader2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import TemplateSelector from './TemplateSelector';

const TEMPLATE_MAP = {
  minimal: MinimalTemplate,
  modern:  ModernTemplate,
  classic: ClassicTemplate,
};

export default function PreviewPanel() {
  const { cv, activeTemplate, accentColor } = useCV();
  const [exporting, setExporting] = useState(false);

  const Template = TEMPLATE_MAP[activeTemplate] || MinimalTemplate;

  const handleDownload = async () => {
    setExporting(true);
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

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
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
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <TemplateSelector />

      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Eye size={15} className="text-arq-500" />
          Live Preview
        </div>
        <button
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleDownload}
          disabled={exporting}
          style={{ backgroundColor: accentColor }}
        >
          {exporting
            ? <><Loader2 size={14} className="animate-spin" /> Exporting…</>
            : <><Download size={14} /> Download PDF</>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-sm w-full" style={{ maxWidth: '210mm' }}>
          <Template cv={cv} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
