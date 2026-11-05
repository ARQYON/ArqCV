import React from 'react';

function SideSection({ title, children }) {
  return (
    <div className="mb-5">
      <div className="text-[9px] font-bold tracking-widest text-arq-200 uppercase mb-2">{title}</div>
      {children}
    </div>
  );
}

function MainSection({ title, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold tracking-widest text-arq-600 uppercase">{title}</span>
        <div className="flex-1 h-px bg-arq-100" />
      </div>
      {children}
    </div>
  );
}

export default function ModernTemplate({ cv }) {
  const { personal: p, experience, education, skills, projects } = cv;

  return (
    <div
      id="cv-preview"
      className="bg-white w-full font-sans flex"
      style={{ minHeight: '297mm', fontSize: '11px', lineHeight: '1.5' }}
    >
      {/* ── Sidebar ───────────────────────────── */}
      <div
        className="bg-arq-700 text-white flex-shrink-0"
        style={{ width: '72mm', padding: '10mm 7mm' }}
      >
        {/* Name block */}
        <div className="mb-6">
          <h1 className="text-lg font-bold leading-tight text-white">
            {p.name || 'Your Name'}
          </h1>
          <p className="text-[11px] text-arq-200 mt-1 font-medium">
            {p.title || 'Your Title'}
          </p>
        </div>

        {/* Contact */}
        <SideSection title="Contact">
          <div className="space-y-1.5 text-[10px] text-arq-100">
            {p.email    && <div className="break-all">{p.email}</div>}
            {p.phone    && <div>{p.phone}</div>}
            {p.location && <div>{p.location}</div>}
            {p.website  && <div className="break-all">{p.website}</div>}
            {p.linkedin && <div className="break-all">{p.linkedin}</div>}
            {p.github   && <div className="break-all">{p.github}</div>}
          </div>
        </SideSection>

        {/* Skills */}
        {skills.length > 0 && (
          <SideSection title="Skills">
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-arq-600 text-arq-100 rounded text-[9px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SideSection>
        )}

        {/* Education in sidebar */}
        {education.some(e => e.school || e.degree) && (
          <SideSection title="Education">
            {education.map(edu => (
              (edu.school || edu.degree) ? (
                <div key={edu.id} className="mb-3 text-[10px]">
                  <div className="font-semibold text-white leading-tight">
                    {edu.degree}
                  </div>
                  {edu.field && <div className="text-arq-200">{edu.field}</div>}
                  {edu.school && <div className="text-arq-300">{edu.school}</div>}
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-arq-400 text-[9px] mt-0.5">
                      {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                    </div>
                  )}
                  {edu.gpa && <div className="text-arq-300 text-[9px]">GPA: {edu.gpa}</div>}
                </div>
              ) : null
            ))}
          </SideSection>
        )}
      </div>

      {/* ── Main content ──────────────────────── */}
      <div className="flex-1" style={{ padding: '10mm 10mm' }}>
        {/* Summary */}
        {p.summary && (
          <div className="mb-5 pb-4 border-b border-gray-100">
            <p className="text-[11px] text-gray-600 leading-relaxed">{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.some(e => e.company || e.role) && (
          <MainSection title="Experience">
            {experience.map(exp => (
              (exp.company || exp.role) ? (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-[11px] text-gray-900">{exp.role}</span>
                      {exp.company && (
                        <span className="text-[11px] text-arq-600 font-medium"> · {exp.company}</span>
                      )}
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-[9px] text-gray-400 whitespace-nowrap ml-2">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-[10px] text-gray-600 mt-1 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ) : null
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projects.some(p => p.name) && (
          <MainSection title="Projects">
            {projects.map(proj => (
              proj.name ? (
                <div key={proj.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[11px] text-gray-900">{proj.name}</span>
                    {proj.url && (
                      <span className="text-[9px] text-arq-500 ml-2">{proj.url}</span>
                    )}
                  </div>
                  {proj.tech && (
                    <span className="text-[9px] text-gray-400 italic">{proj.tech}</span>
                  )}
                  {proj.description && (
                    <p className="text-[10px] text-gray-600 mt-0.5">{proj.description}</p>
                  )}
                </div>
              ) : null
            ))}
          </MainSection>
        )}

        {/* Footer */}
        <div className="mt-8 pt-3 border-t border-gray-100 text-[9px] text-gray-300 text-right">
          Built with ArqCV by ARQYON · arqyon.dev
        </div>
      </div>
    </div>
  );
}
