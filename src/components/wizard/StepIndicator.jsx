import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'Template' },
  { n: 2, label: 'Details'  },
  { n: 3, label: 'Download' },
];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 select-none">
      {STEPS.map((s, i) => {
        const done   = current > s.n;
        const active = current === s.n;
        return (
          <React.Fragment key={s.n}>
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all duration-300
                  ${done   ? 'bg-arq-600 border-arq-600 text-white scale-100'
                  : active ? 'bg-white border-arq-500 text-arq-600 shadow-md shadow-arq-100'
                           : 'bg-white border-gray-200 text-gray-300'}`}
              >
                {done ? <Check size={13} strokeWidth={3} /> : s.n}
              </div>
              <span
                className={`mt-1 text-[10px] font-semibold tracking-wide transition-colors duration-200
                  ${active ? 'text-arq-600' : done ? 'text-gray-400' : 'text-gray-200'}`}
              >
                {s.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="flex items-center mb-4 mx-1.5">
                <div
                  className={`h-0.5 w-12 rounded-full transition-all duration-500
                    ${current > s.n ? 'bg-arq-500' : 'bg-gray-150'}`}
                  style={{ backgroundColor: current > s.n ? undefined : '#f0f0f0' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
