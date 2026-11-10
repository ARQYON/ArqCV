import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CVProvider } from './context/CVContext';
import StepIndicator  from './components/wizard/StepIndicator';
import Step1Template  from './components/wizard/Step1Template';
import Step2Form      from './components/wizard/Step2Form';
import Step3Download  from './components/wizard/Step3Download';

function WizardApp() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white z-10 shrink-0">

        {/* Left: brand + back */}
        <div className="flex items-center gap-3">
          <span className="font-black text-lg tracking-tight text-gray-900">
            Arq<span className="text-arq-600">CV</span>
          </span>
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors ml-2"
            >
              <ArrowLeft size={13} /> Back
            </button>
          )}
        </div>

        {/* Center: step indicator */}
        <StepIndicator current={step} />

        {/* Right: step label */}
        <div className="text-xs text-gray-400 w-32 text-right">
          {step === 1 && 'Pick a template'}
          {step === 2 && 'Fill in details'}
          {step === 3 && 'Download your CV'}
        </div>
      </header>

      {/* ── Step content ── */}
      <main className="flex-1 overflow-hidden">

        {step === 1 && (
          <div className="h-full overflow-y-auto">
            <Step1Template onNext={() => setStep(2)} />
          </div>
        )}

        {step === 2 && (
          <div className="flex h-full">
            <Step2Form onNext={() => setStep(3)} />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col h-full">
            <Step3Download />
          </div>
        )}
      </main>

      {/* ── Step 2 footer: Next button ── */}
      {step === 2 && (
        <footer className="shrink-0 px-6 py-3 bg-white border-t border-gray-100 flex justify-end">
          <button
            className="btn-primary px-7 py-2.5 text-sm rounded-xl"
            onClick={() => setStep(3)}
          >
            Preview &amp; Download →
          </button>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CVProvider>
      <WizardApp />
    </CVProvider>
  );
}
