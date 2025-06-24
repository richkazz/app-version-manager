
import React, { useState, useEffect } from 'react';
import { VersionFormData } from '../types';
import Button from './Button';

interface VersionFormProps {
  onSubmit: (data: VersionFormData) => void;
  onCancel: () => void;
  initialData?: VersionFormData;
}

const VersionForm: React.FC<VersionFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [version, setVersion] = useState(initialData?.version || '');
  const [forceUpdate, setForceUpdate] = useState(initialData?.force_update || false);
  // datetime-local input needs YYYY-MM-DDTHH:MM format
  const [releaseDate, setReleaseDate] = useState(
    initialData?.release_date
      ? new Date(initialData.release_date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16) // Default to now
  );

  useEffect(() => {
    if (initialData) {
      setVersion(initialData.version || '');
      setForceUpdate(initialData.force_update || false);
      setReleaseDate(initialData.release_date ? new Date(initialData.release_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
    } else {
      // Reset for new entry
      setVersion('');
      setForceUpdate(false);
      setReleaseDate(new Date().toISOString().slice(0, 16));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (version.trim() === '') {
        alert('Version string cannot be empty.');
        return;
    }
    // Convert releaseDate (local time from input) back to ISO string (UTC)
    const isoReleaseDate = new Date(releaseDate).toISOString();
    onSubmit({
      id: initialData?.id,
      version,
      force_update: forceUpdate,
      release_date: isoReleaseDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="version" className="block text-sm font-medium text-slate-300">
          Version <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2"
          placeholder="e.g., 1.0.0 or 2.3.4-beta1"
        />
      </div>
      <div>
        <label htmlFor="releaseDate" className="block text-sm font-medium text-slate-300">
          Release Date <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2"
        />
      </div>
      <div className="flex items-center">
        <input
          id="forceUpdate"
          type="checkbox"
          checked={forceUpdate}
          onChange={(e) => setForceUpdate(e.target.checked)}
          className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-sky-500 focus:ring-sky-500"
        />
        <label htmlFor="forceUpdate" className="ml-2 block text-sm text-slate-300">
          Force Update
        </label>
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData?.id ? 'Save Changes' : 'Add Version'}
        </Button>
      </div>
    </form>
  );
};

export default VersionForm;
