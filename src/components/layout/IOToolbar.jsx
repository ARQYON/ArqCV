import React, { useRef, useState } from 'react';
import { Upload, Save, AlertCircle } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import { exportCV, importCV } from '../../utils/cvIO';

export default function IOToolbar() {
  const { cv, activeTemplate, accentColor, loadImported } = useCV();
  const fileRef  = useRef(null);
  const [error, setError] = useState('');

  const handleExport = () => {
    exportCV(cv, activeTemplate, accentColor);
  };

  const handleImportClick = () => {
    setError('');
    fileRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importCV(file);
      loadImported(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      // reset so the same file can be re-selected
      e.target.value = '';
    }
  };

  return (
    <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileChange}
        />

        <button className="btn-ghost" onClick={handleImportClick} title="Load a previously saved ArqCV JSON file">
          <Upload size={13} />
          Import JSON
        </button>

        <button className="btn-ghost" onClick={handleExport} title="Save your CV data as a JSON file">
          <Save size={13} />
          Export JSON
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </div>
      )}

      <p className="text-[11px] text-gray-400 ml-auto">
        Export to back up · Import to restore on any device
      </p>
    </div>
  );
}
