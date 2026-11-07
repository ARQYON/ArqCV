import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { defaultCV } from '../data/defaultCV';

const CVContext = createContext(null);

const STORAGE_KEY = 'arqcv_data';

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function CVProvider({ children }) {
  const saved = loadSaved();
  const [cv, setCV]                     = useState(saved?.cv || defaultCV);
  const [activeTemplate, setActiveTemplate] = useState(saved?.activeTemplate || 'minimal');
  const [accentColor, setAccentColor]   = useState(saved?.accentColor || '#4361ff');

  // Auto-save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cv, activeTemplate, accentColor }));
    } catch { /* storage full or blocked — silent */ }
  }, [cv, activeTemplate, accentColor]);

  const updateSection = useCallback((section, field, value) => {
    setCV(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  }, []);

  const updateArrayItem = useCallback((section, id, field, value) => {
    setCV(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  }, []);

  const addArrayItem = useCallback((section, blank) => {
    setCV(prev => ({
      ...prev,
      [section]: [...prev[section], { ...blank, id: Date.now().toString() }],
    }));
  }, []);

  const removeArrayItem = useCallback((section, id) => {
    setCV(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  }, []);

  const updateSkills = useCallback((raw) => {
    const skills = raw.split(',').map(s => s.trim()).filter(Boolean);
    setCV(prev => ({ ...prev, skills }));
  }, []);

  const clearCV = useCallback(() => {
    setCV(defaultCV);
    setActiveTemplate('minimal');
    setAccentColor('#4361ff');
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return (
    <CVContext.Provider value={{
      cv, activeTemplate, setActiveTemplate,
      accentColor, setAccentColor,
      updateSection, updateArrayItem, addArrayItem, removeArrayItem,
      updateSkills, clearCV,
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
