import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PersonalForm   from '../form/PersonalForm';
import ExperienceForm from '../form/ExperienceForm';
import EducationForm  from '../form/EducationForm';
import SkillsForm     from '../form/SkillsForm';
import ProjectsForm   from '../form/ProjectsForm';
import MinimalTemplate from '../preview/MinimalTemplate';
import ModernTemplate  from '../preview/ModernTemplate';
import ClassicTemplate from '../preview/ClassicTemplate';
import { useCV } from '../../context/CVContext';

const TEMPLATE_MAP = { minimal: MinimalTemplate, modern: ModernTemplate, classic: ClassicTemplate };

const SECTIONS = [
  { id: 'personal',   label: 'Personal Info',  Component: PersonalForm   },
  { id: 'experience', label: 'Work Experience', Component: ExperienceForm },
  { id: 'education',  label: 'Education',       Component: EducationForm  },
  { id: 'skills',     label: 'Skills',          Component: SkillsForm     },
  { id: 'projects',   label: 'Projects',        Component: ProjectsForm   },
];

function Accordion({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Step2Form() {
  const { cv, activeTemplate, accentColor } = useCV();
  const Template = TEMPLATE_MAP[activeTemplate] || MinimalTemplate;

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* ── Left: accordion form ── */}
      <div className="w-[420px] min-w-[320px] border-r border-gray-100 overflow-y-auto px-5 py-5 bg-gray-50">
        <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">Fill in your details</p>
        {SECTIONS.map(({ id, label, Component }) => (
          <Accordion key={id} label={label} defaultOpen={id === 'personal'}>
            <Component />
          </Accordion>
        ))}
      </div>

      {/* ── Right: live preview ── */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-sm w-full" style={{ maxWidth: '210mm' }}>
          <Template cv={cv} accentColor={accentColor} />
        </div>
      </div>

    </div>
  );
}
