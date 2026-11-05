import React from 'react';
import { Zap } from 'lucide-react';
import { useCV } from '../../context/CVContext';

export default function SkillsForm() {
  const { cv, updateSkills } = useCV();

  return (
    <div className="section-card">
      <div className="section-title">
        <Zap size={15} className="text-arq-500" />
        Skills
      </div>
      <label className="label">Skills (comma-separated)</label>
      <textarea
        className="textarea"
        rows={3}
        placeholder="React, Node.js, C++, MongoDB, Tailwind CSS, Git..."
        value={cv.skills.join(', ')}
        onChange={e => updateSkills(e.target.value)}
      />
      <p className="text-xs text-gray-400 mt-1.5">
        Separate each skill with a comma. They'll appear as tags on your CV.
      </p>
    </div>
  );
}
