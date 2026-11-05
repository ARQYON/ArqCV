import React, { useState } from 'react';
import { Download, Eye, Loader2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import TemplateSelector from './TemplateSelector';

const TEMPLATE_MAP = {
  minimal: MinimalTemplate,
  modern:  ModernTemplate,
};

export default function PreviewPanel() {
  const { cv, activeTemplate } = useCV();
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
        scale: 3,           // higher quality
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth  = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgRatio  = canvas.width / canvas.height;
      const a4Ratio   = pdfWidth / pdfHeight;

      let imgWidth, imgHeight, offsetX = 0, offsetY = 0;

      if (imgRatio > a4Ratio) {
        imgWidth  = pdfWidth;
        imgHeight = pdfWidth / imgRatio;
        offsetY   = (pdfHeight - imgHeight) / 2;
      } else {
        imgHeight = pdfHeight;
        imgWidth  = pdfHeight * imgRatio;
        offsetX   = (pdfWidth - imgWidth) / 2;
      }

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        offsetX, offsetY,
        imgWidth, imgHeight,
      );

      const name = cv.personal.name
        ? cv.personal.name.replace(/\s+/g, '_')
        : 'CV';
      pdf.save(`${name}_ArqCV.pdf`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Template picker */}
      <TemplateSelector />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Eye size={15} className="text-arq-500" />
          Live Preview
        </div>
        <button
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleDownload}
          disabled={exporting}
        >
          {exporting
            ? <><Loader2 size={14} className="animate-spin" /> Exporting…</>
            : <><Download size={14} /> Download PDF</>
          }
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex justify-center">
        <div
          className="bg-white shadow-xl rounded-sm w-full"
          style={{ maxWidth: '210mm' }}
        >
          <Template cv={cv} />
        </div>
      </div>
    </div>
  );
}
