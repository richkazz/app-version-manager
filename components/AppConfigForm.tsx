
import React, { useState, useEffect } from 'react';
import { AppConfig, VersionEntry } from '../types';
import Button from './Button';

interface AppConfigFormProps {
  onSubmit: (name: string, type: string, initialJson?: string) => void;
  onCancel: () => void;
  initialData?: Omit<AppConfig, 'id' | 'versions'>; // For editing name/type
}

const AppConfigForm: React.FC<AppConfigFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState(initialData?.type || '');
  const [initialJson, setInitialJson] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
        alert('App Name cannot be empty.');
        return;
    }
    if (initialJson.trim() !== '') {
      try {
        const parsed = JSON.parse(initialJson);
        if (!Array.isArray(parsed)) {
          setJsonError('Initial JSON must be an array of version entries.');
          return;
        }
        // Basic validation for version entry structure (can be more thorough)
        for (const item of parsed) {
          if (typeof item.version !== 'string' || typeof item.force_update !== 'boolean' || typeof item.release_date !== 'string') {
            setJsonError('Each version entry in JSON must have version (string), force_update (boolean), and release_date (string).');
            return;
          }
        }
        setJsonError(null);
        onSubmit(name, type, initialJson);
      } catch (error) {
        setJsonError('Invalid JSON format. Please check the syntax.');
        return;
      }
    } else {
      setJsonError(null);
      onSubmit(name, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="appName" className="block text-sm font-medium text-slate-300">
          App Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="appName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2"
          placeholder="e.g., My Awesome App"
        />
      </div>
      <div>
        <label htmlFor="appType" className="block text-sm font-medium text-slate-300">
          App Type
        </label>
        <input
          type="text"
          id="appType"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2"
          placeholder="e.g., iOS, Android, Web"
        />
      </div>
      {!initialData && ( // Only show JSON input for new app configs
        <div>
          <label htmlFor="initialJson" className="block text-sm font-medium text-slate-300">
            Initial Versions JSON (Optional)
          </label>
          <textarea
            id="initialJson"
            rows={5}
            value={initialJson}
            onChange={(e) => setInitialJson(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2"
            placeholder='e.g., [{"version":"1.0.0", "force_update":false, "release_date":"2023-01-01T10:00:00Z"}]'
          />
          {jsonError && <p className="mt-1 text-xs text-red-500">{jsonError}</p>}
           <p className="mt-1 text-xs text-slate-400">Paste an array of version objects. Each object needs: `version` (string), `force_update` (boolean), `release_date` (ISO string).</p>
        </div>
      )}
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Save Changes' : 'Create App Config'}
        </Button>
      </div>
    </form>
  );
};

export default AppConfigForm;
