import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'Choose Template' },
  { n: 2, label: 'Your Details'    },
  { n: 3, label: 'Download'        },
];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 select-none">
      {STEPS.map((s, i) => {
        const done   = current > s.n;
        const active = current === s.n;
        return (
          <React.Fragment key={s.n}>
            {/* circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                  ${done   ? 'bg-arq-600 border-arq-600 text-white'
                  : active ? 'bg-white border-arq-600 text-arq-600'
                           : 'bg-white border-gray-200 text-gray-400'}`}
              >
                {done ? <Check size={14} /> : s.n}
              </div>
              <span className={`mt-1 text-[10px] font-medium whitespace-nowrap
                ${active ? 'text-arq-600' : done ? 'text-gray-500' : 'text-gray-300'}`}>
                {s.label}
              </span>
            </div>
            {/* connector */}
            {i < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 mb-4 mx-1 ${current > s.n ? 'bg-arq-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
