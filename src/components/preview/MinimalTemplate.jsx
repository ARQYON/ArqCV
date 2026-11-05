import React from 'react';

/* ─── helpers ─────────────────────────────── */
function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{title}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </div>
  );
}

function DateRange({ start, end, current }) {
  if (!start) return null;
  return (
    <span className="text-[10px] text-gray-400">
      {start} - {current ? 'Present' : end || ''}
    </span>
  );
}

/* ─── main template ───────────────────────── */
export default function MinimalTemplate({ cv }) {
  const { personal: p, experience, education, skills, projects } = cv;

  return (
    <div
      id="cv-preview"
      className="bg-white w-full font-sans text-gray-800"
      style={{ minHeight: '297mm', padding: '12mm 14mm', fontSize: '11px', lineHeight: '1.5' }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {p.name || 'Your Name'}
        </h1>
        <p className="text-sm font-medium text-arq-600 mt-0.5">
          {p.title || 'Your Title'}
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-gray-500">
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website  && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.github   && <span>{p.github}</span>}
        </div>

        {/* Summary */}
        {p.summary && (
          <p className="mt-3 text-[11px] text-gray-600 leading-relaxed max-w-2xl">
            {p.summary}
          </p>
        )}
      </div>

      {/* Experience */}
      {experience.some(e => e.company || e.role) && (
        <Section title="Experience">
          {experience.map(exp => (
            (exp.company || exp.role) ? (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-[11px] text-gray-800">{exp.role}</span>
                    {exp.company && <span className="text-[11px] text-gray-500"> · {exp.company}</span>}
                  </div>
                  <DateRange start={exp.startDate} end={exp.endDate} current={exp.current} />
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
        <Section title="Education">
          {education.map(edu => (
            (edu.school || edu.degree) ? (
              <div key={edu.id} className="mb-2 flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-[11px]">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  </span>
                  {edu.school && (
                    <span className="text-[11px] text-gray-500"> · {edu.school}</span>
                  )}
                  {edu.gpa && (
                    <span className="text-[10px] text-gray-400"> · GPA {edu.gpa}</span>
                  )}
                </div>
                <DateRange start={edu.startDate} end={edu.endDate} />
              </div>
            ) : null
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.some(p => p.name) && (
        <Section title="Projects">
          {projects.map(proj => (
            proj.name ? (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-[11px]">{proj.name}</span>
                  {proj.url && (
                    <span className="text-[10px] text-arq-500">{proj.url}</span>
                  )}
                </div>
                {proj.tech && (
                  <span className="text-[10px] text-gray-400">{proj.tech}</span>
                )}
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
        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Footer */}
      <div className="mt-8 pt-3 border-t border-gray-100 text-[9px] text-gray-300 text-center">
        Built with ArqCV by ARQYON · arqyon.dev
      </div>
    </div>
  );
}
