import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Wrench, FolderOpen } from 'lucide-react';
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
  { id: 'personal',   label: 'Personal Info',  icon: User,          Component: PersonalForm,   tip: 'Your name and contact details appear at the top of every template.'   },
  { id: 'experience', label: 'Work Experience', icon: Briefcase,     Component: ExperienceForm, tip: 'List your most recent role first. Leave dates blank if still ongoing.'  },
  { id: 'education',  label: 'Education',       icon: GraduationCap, Component: EducationForm,  tip: 'Include degree, institution, and graduation year.'                    },
  { id: 'skills',     label: 'Skills',          icon: Wrench,        Component: SkillsForm,     tip: 'Comma-separated. E.g. React, Node.js, Python, AWS'                   },
  { id: 'projects',   label: 'Projects',        icon: FolderOpen,    Component: ProjectsForm,   tip: 'Side-projects and GitHub repos stand out for tech roles.'            },
];

function Accordion({ id, label, icon: Icon, tip, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-2xl border transition-all duration-200 mb-2.5 overflow-hidden
      ${open ? 'border-arq-200 shadow-sm shadow-arq-50' : 'border-gray-100 bg-white'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors
          ${open ? 'bg-arq-50' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors
            ${open ? 'bg-arq-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
            <Icon size={13} strokeWidth={2.5} />
          </div>
          <span className={`text-sm font-semibold transition-colors
            ${open ? 'text-arq-700' : 'text-gray-700'}`}>
            {label}
          </span>
        </div>
        {open
          ? <ChevronUp  size={15} className="text-arq-400 shrink-0" />
          : <ChevronDown size={15} className="text-gray-300 shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-arq-100 bg-white px-4 pb-4 pt-3">
          {tip && (
            <p className="text-[11px] text-arq-400 bg-arq-50 px-3 py-1.5 rounded-lg mb-3 font-medium">
              💡 {tip}
            </p>
          )}
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

      {/* ── Left: form panel ── */}
      <div className="w-[400px] min-w-[320px] border-r border-gray-100 overflow-y-auto
                      bg-gray-50/60 flex flex-col">
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Your details
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Changes appear live in the preview on the right.
          </p>
        </div>

        <div className="px-4 pb-5 pt-2 flex-1">
          {SECTIONS.map(({ id, label, icon, tip, Component }) => (
            <Accordion key={id} id={id} label={label} icon={icon} tip={tip} defaultOpen={id === 'personal'}>
              <Component />
            </Accordion>
          ))}
        </div>
      </div>

      {/* ── Right: live preview ── */}
      <div className="flex-1 overflow-y-auto bg-[#f4f5f7] p-8 flex justify-center">
        <div className="bg-white shadow-2xl w-full" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
          <div id="cv-preview">
            <Template cv={cv} accentColor={accentColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
