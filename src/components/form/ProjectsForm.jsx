import React from 'react';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';

const BLANK = { name: '', url: '', description: '', tech: '' };

export default function ProjectsForm() {
  const { cv, updateArrayItem, addArrayItem, removeArrayItem } = useCV();

  return (
    <div className="section-card">
      <div className="section-title">
        <FolderGit2 size={15} className="text-arq-500" />
        Projects
      </div>

      {cv.projects.map((proj, idx) => (
        <div key={proj.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-400">Project {idx + 1}</span>
            {cv.projects.length > 1 && (
              <button className="btn-danger" onClick={() => removeArrayItem('projects', proj.id)}>
                <Trash2 size={12} /> Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Project Name</label>
              <input className="input" placeholder="ArqCV" value={proj.name}
                onChange={e => updateArrayItem('projects', proj.id, 'name', e.target.value)} />
            </div>
            <div>
              <label className="label">URL / GitHub Link</label>
              <input className="input" placeholder="github.com/ARQYON/arqcv" value={proj.url}
                onChange={e => updateArrayItem('projects', proj.id, 'url', e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="label">Tech Stack</label>
              <input className="input" placeholder="React, Tailwind, Node.js" value={proj.tech}
                onChange={e => updateArrayItem('projects', proj.id, 'tech', e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="label">Description</label>
              <textarea className="textarea" rows={2}
                placeholder="What it does and why it matters..."
                value={proj.description}
                onChange={e => updateArrayItem('projects', proj.id, 'description', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-ghost mt-2" onClick={() => addArrayItem('projects', BLANK)}>
        <Plus size={14} /> Add Project
      </button>
    </div>
  );
}
