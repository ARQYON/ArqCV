import React from 'react';

function Section({ title, accent, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
        <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">{title}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </div>
  );
}

export default function ClassicTemplate({ cv, accentColor }) {
  const { personal: p, experience, education, skills, projects } = cv;
  const accent = accentColor || '#4361ff';

  return (
    <div
      id="cv-preview"
      className="bg-white w-full font-sans text-gray-800"
      style={{ minHeight: '297mm', padding: '12mm 14mm', fontSize: '11px', lineHeight: '1.5' }}
    >
      {/* Header — two-column */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
            {p.name || 'Your Name'}
          </h1>
          <p className="text-[12px] font-semibold mt-0.5" style={{ color: accent }}>
            {p.title || 'Your Title'}
          </p>
          {p.summary && (
            <p className="mt-2 text-[10px] text-gray-500 leading-relaxed max-w-sm">
              {p.summary}
            </p>
          )}
        </div>
        <div className="text-right text-[10px] text-gray-500 space-y-0.5">
          {p.email    && <div>{p.email}</div>}
          {p.phone    && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
          {p.website  && <div>{p.website}</div>}
          {p.linkedin && <div>{p.linkedin}</div>}
          {p.github   && <div>{p.github}</div>}
        </div>
      </div>

      {/* Experience */}
      {experience.some(e => e.company || e.role) && (
        <Section title="Experience" accent={accent}>
          {experience.map(exp => (
            (exp.company || exp.role) ? (
              <div key={exp.id} className="mb-3 pl-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[11px]">{exp.role}</span>
                    {exp.company && <span className="text-[11px] text-gray-500"> · {exp.company}</span>}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-[9px] text-gray-400">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
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
        </Section>
      )}

      {/* Education */}
      {education.some(e => e.school || e.degree) && (
        <Section title="Education" accent={accent}>
          {education.map(edu => (
            (edu.school || edu.degree) ? (
              <div key={edu.id} className="mb-2 pl-4 flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[11px]">{edu.degree}</span>
                  {edu.field && <span className="text-[11px] text-gray-500"> · {edu.field}</span>}
                  {edu.school && <div className="text-[10px] text-gray-500">{edu.school}</div>}
                  {edu.gpa && <span className="text-[9px] text-gray-400">GPA: {edu.gpa}</span>}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-[9px] text-gray-400">{edu.startDate} — {edu.endDate}</span>
                )}
              </div>
            ) : null
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.some(p => p.name) && (
        <Section title="Projects" accent={accent}>
          {projects.map(proj => (
            proj.name ? (
              <div key={proj.id} className="mb-3 pl-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11px]">{proj.name}</span>
                  {proj.url && <span className="text-[9px]" style={{ color: accent }}>{proj.url}</span>}
                </div>
                {proj.tech && <div className="text-[9px] text-gray-400 italic">{proj.tech}</div>}
                {proj.description && (
                  <p className="text-[10px] text-gray-600 mt-0.5">{proj.description}</p>
                )}
              </div>
            ) : null
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills" accent={accent}>
          <div className="pl-4 flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: accent }}
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      <div className="mt-8 pt-3 border-t border-gray-100 text-[9px] text-gray-300 text-center">
        Built with ArqCV by ARQYON · arqyon.dev
      </div>
    </div>
  );
}
