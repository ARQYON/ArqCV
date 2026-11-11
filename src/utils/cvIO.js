/**
 * ArqCV - CV data import / export utilities
 * Saves the full CV state (data + template + accent color) as a .json file.
 * Lets users back up their CV and restore it on any device or browser.
 */

export function exportCV(cv, activeTemplate, accentColor) {
  const payload = {
    _arqcv: true,
    version: '1.0',
    exportedAt: new Date().toISOString(),
    activeTemplate,
    accentColor,
    cv,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');

  const name = cv.personal?.name
    ? cv.personal.name.replace(/\s+/g, '_')
    : 'CV';

  a.href     = url;
  a.download = `${name}_ArqCV.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importCV(file) {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/json') {
      reject(new Error('Please select a valid ArqCV .json file.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data._arqcv) {
          reject(new Error('This file was not exported from ArqCV.'));
          return;
        }

        resolve({
          cv:             data.cv,
          activeTemplate: data.activeTemplate || 'minimal',
          accentColor:    data.accentColor    || '#4361ff',
        });
      } catch {
        reject(new Error('Could not read the file. Make sure it is a valid JSON file.'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read the file.'));
    reader.readAsText(file);
  });
}
