import React, { createContext, useContext, useState, useCallback } from 'react';
import { defaultCV } from '../data/defaultCV';

const CVContext = createContext(null);

export function CVProvider({ children }) {
  const [cv, setCV] = useState(defaultCV);
  const [activeTemplate, setActiveTemplate] = useState('minimal');

  // Update a top-level section (personal, etc.)
  const updateSection = useCallback((section, field, value) => {
    setCV(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }, []);

  // Update an array item (experience, education, projects)
  const updateArrayItem = useCallback((section, id, field, value) => {
    setCV(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  // Add a new blank item to an array section
  const addArrayItem = useCallback((section, blank) => {
    setCV(prev => ({
      ...prev,
      [section]: [...prev[section], { ...blank, id: Date.now().toString() }],
    }));
  }, []);

  // Remove an item from an array section
  const removeArrayItem = useCallback((section, id) => {
    setCV(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id),
    }));
  }, []);

  // Update skills (stored as array of strings)
  const updateSkills = useCallback((raw) => {
    const skills = raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    setCV(prev => ({ ...prev, skills }));
  }, []);

  return (
    <CVContext.Provider value={{
      cv,
      activeTemplate,
      setActiveTemplate,
      updateSection,
      updateArrayItem,
      addArrayItem,
      removeArrayItem,
      updateSkills,
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCV must be used inside CVProvider');
  return ctx;
}
