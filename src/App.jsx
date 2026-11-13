import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { CVProvider } from './context/CVContext';
import StepIndicator  from './components/wizard/StepIndicator';
import Step1Template  from './components/wizard/Step1Template';
import Step2Form      from './components/wizard/Step2Form';
import Step3Download  from './components/wizard/Step3Download';

const STEP_LABELS = ['', 'Pick a template', 'Fill in your details', 'Preview & download'];

function WizardApp() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* ── Header ── */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3
                         bg-white/90 backdrop-blur border-b border-gray-100/80 z-20">

        {/* Brand */}
        <div className="flex items-center gap-3 w-40">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-arq-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-[17px] tracking-tight text-gray-900">
              Arq<span className="text-arq-600">CV</span>
            </span>
          </div>
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1 text-[11px] text-gray-400
                         hover:text-arq-600 transition-colors ml-1 font-medium"
            >
              <ArrowLeft size={12} /> Back
            </button>
          )}
        </div>

        {/* Step indicator — centred */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <StepIndicator current={step} />
        </div>

        {/* Step label */}
        <div className="w-40 flex justify-end">
          <span className="text-[11px] font-medium text-gray-400 text-right">
            {STEP_LABELS[step]}
          </span>
        </div>
      </header>

      {/* ── Step content ── */}
      <main className="flex-1 overflow-hidden">

        {step === 1 && (
          <div key="s1" className="h-full overflow-y-auto step-enter">
            <Step1Template onNext={() => setStep(2)} />
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="flex h-full step-enter">
            <Step2Form />
          </div>
        )}

        {step === 3 && (
          <div key="s3" className="flex flex-col h-full step-enter">
            <Step3Download />
          </div>
        )}
      </main>

      {/* ── Step 2 → 3 footer button ── */}
      {step === 2 && (
        <footer className="shrink-0 px-6 py-3 bg-white border-t border-gray-100 flex justify-end">
          <button
            className="btn-primary px-7 py-2.5 text-sm"
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
