import React from 'react';
import PersonalForm from '../form/PersonalForm';
import ExperienceForm from '../form/ExperienceForm';
import EducationForm from '../form/EducationForm';
import SkillsForm from '../form/SkillsForm';
import ProjectsForm from '../form/ProjectsForm';

export default function FormPanel() {
  return (
    <div className="h-full overflow-y-auto px-5 py-5">
      <PersonalForm />
      <ExperienceForm />
      <EducationForm />
      <SkillsForm />
      <ProjectsForm />
    </div>
  );
}
