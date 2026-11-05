import React from 'react';
import { User } from 'lucide-react';
import { useCV } from '../../context/CVContext';

export default function PersonalForm() {
  const { cv, updateSection } = useCV();
  const p = cv.personal;

  const field = (label, key, placeholder, type = 'text') => (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        value={p[key]}
        onChange={e => updateSection('personal', key, e.target.value)}
      />
    </div>
  );

  return (
    <div className="section-card">
      <div className="section-title">
        <User size={15} className="text-arq-500" />
        Personal Information
      </div>
      <div className="grid grid-cols-2 gap-3">
        {field('Full Name', 'name', 'Adil Hassan')}
        {field('Job Title', 'title', 'Full Stack Developer')}
        {field('Email', 'email', 'you@example.com', 'email')}
        {field('Phone', 'phone', '+92 300 0000000')}
        {field('Location', 'location', 'Punjab, Pakistan')}
        {field('Website', 'website', 'yoursite.com')}
        {field('LinkedIn', 'linkedin', 'linkedin.com/in/you')}
        {field('GitHub', 'github', 'github.com/you')}
      </div>
      <div className="mt-3">
        <label className="label">Professional Summary</label>
        <textarea
          className="textarea"
          rows={3}
          placeholder="A brief 2–3 sentence summary of who you are and what you do..."
          value={p.summary}
          onChange={e => updateSection('personal', 'summary', e.target.value)}
        />
      </div>
    </div>
  );
}
