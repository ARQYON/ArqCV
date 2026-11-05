import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const BLANK = { school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };

export default function EducationForm() {
  const { cv, updateArrayItem, addArrayItem, removeArrayItem } = useCV();

  return (
    <div className="section-card">
      <div className="section-title">
        <GraduationCap size={15} className="text-arq-500" />
        Education
      </div>

      {cv.education.map((edu, idx) => (
        <div key={edu.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-400">Entry {idx + 1}</span>
            {cv.education.length > 1 && (
              <button className="btn-danger" onClick={() => removeArrayItem('education', edu.id)}>
                <Trash2 size={12} /> Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="label">School / University</label>
              <input className="input" placeholder="University of Punjab" value={edu.school}
                onChange={e => updateArrayItem('education', edu.id, 'school', e.target.value)} />
            </div>
            <div>
              <label className="label">Degree</label>
              <input className="input" placeholder="BS Information Technology" value={edu.degree}
                onChange={e => updateArrayItem('education', edu.id, 'degree', e.target.value)} />
            </div>
            <div>
              <label className="label">Field of Study</label>
              <input className="input" placeholder="Computer Science" value={edu.field}
                onChange={e => updateArrayItem('education', edu.id, 'field', e.target.value)} />
            </div>
            <div>
              <label className="label">Start Year</label>
              <input className="input" placeholder="2022" value={edu.startDate}
                onChange={e => updateArrayItem('education', edu.id, 'startDate', e.target.value)} />
            </div>
            <div>
              <label className="label">End Year</label>
              <input className="input" placeholder="2026" value={edu.endDate}
                onChange={e => updateArrayItem('education', edu.id, 'endDate', e.target.value)} />
            </div>
            <div>
              <label className="label">GPA / CGPA (optional)</label>
              <input className="input" placeholder="3.8 / 4.0" value={edu.gpa}
                onChange={e => updateArrayItem('education', edu.id, 'gpa', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-ghost mt-2" onClick={() => addArrayItem('education', BLANK)}>
        <Plus size={14} /> Add Education
      </button>
    </div>
  );
}
