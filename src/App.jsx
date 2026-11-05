import React from 'react';
import { CVProvider } from './context/CVContext';
import Header from './components/layout/Header';
import FormPanel from './components/layout/FormPanel';
import PreviewPanel from './components/preview/PreviewPanel';

export default function App() {
  return (
    <CVProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">

          {/* Left - form */}
          <div className="w-[420px] min-w-[320px] border-r border-gray-100 overflow-hidden flex flex-col">
            <FormPanel />
          </div>

          {/* Right - live preview */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <PreviewPanel />
          </div>

        </div>
      </div>
    </CVProvider>
  );
}
