import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const BLANK = {
  company: '', role: '', startDate: '', endDate: '', current: false, description: '',
};

export default function ExperienceForm() {
  const { cv, updateArrayItem, addArrayItem, removeArrayItem } = useCV();

  return (
    <div className="section-card">
      <div className="section-title">
        <Briefcase size={15} className="text-arq-500" />
        Work Experience
      </div>

      {cv.experience.map((exp, idx) => (
        <div key={exp.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-400">Position {idx + 1}</span>
            {cv.experience.length > 1 && (
              <button
                className="btn-danger"
                onClick={() => removeArrayItem('experience', exp.id)}
              >
                <Trash2 size={12} /> Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Company</label>
              <input className="input" placeholder="ARQYON" value={exp.company}
                onChange={e => updateArrayItem('experience', exp.id, 'company', e.target.value)} />
            </div>
            <div>
              <label className="label">Role / Position</label>
              <input className="input" placeholder="Software Engineer" value={exp.role}
                onChange={e => updateArrayItem('experience', exp.id, 'role', e.target.value)} />
            </div>
            <div>
              <label className="label">Start Date</label>
              <input className="input" placeholder="Jan 2024" value={exp.startDate}
                onChange={e => updateArrayItem('experience', exp.id, 'startDate', e.target.value)} />
            </div>
            <div>
              <label className="label">End Date</label>
              <input className="input" placeholder="Present" value={exp.endDate}
                disabled={exp.current}
                onChange={e => updateArrayItem('experience', exp.id, 'endDate', e.target.value)} />
              <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                <input type="checkbox" checked={exp.current}
                  onChange={e => updateArrayItem('experience', exp.id, 'current', e.target.checked)} />
                <span className="text-xs text-gray-500">Currently working here</span>
              </label>
            </div>
          </div>
          <div className="mt-3">
            <label className="label">Description</label>
            <textarea className="textarea" rows={3}
              placeholder="• Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={e => updateArrayItem('experience', exp.id, 'description', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="btn-ghost mt-2" onClick={() => addArrayItem('experience', BLANK)}>
        <Plus size={14} /> Add Position
      </button>
    </div>
  );
}
