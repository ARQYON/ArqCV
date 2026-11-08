import React from 'react';
import IOToolbar from './IOToolbar';
import PersonalForm from '../form/PersonalForm';
import ExperienceForm from '../form/ExperienceForm';
import EducationForm from '../form/EducationForm';
import SkillsForm from '../form/SkillsForm';
import ProjectsForm from '../form/ProjectsForm';

export default function FormPanel() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <IOToolbar />
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <PersonalForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
        <ProjectsForm />
      </div>
    </div>
  );
}
