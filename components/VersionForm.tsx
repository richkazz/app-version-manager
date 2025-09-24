import React, { useState, useEffect } from 'react';
import { VersionFormData } from '../types'; // Assuming 'types.ts' is where your interfaces are defined
import Button from './Button'; // Assuming your Button component is here

interface VersionFormProps {
  onSubmit: (data: VersionFormData) => void;
  onCancel: () => void;
  initialData?: VersionFormData;
}

const VersionForm: React.FC<VersionFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [version, setVersion] = useState(initialData?.version || '');
  const [forceUpdate, setForceUpdate] = useState(initialData?.force_update || false);
  const [releaseDate, setReleaseDate] = useState(
    initialData?.release_date
      ? new Date(initialData.release_date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16) // Default to now (local time for input)
  );
  // New state variables for the update details
  const [updateTitle, setUpdateTitle] = useState(initialData?.update_title || '');
  const [updateFeatures, setUpdateFeatures] = useState(initialData?.update_features || '');
  const [updateMessage, setUpdateMessage] = useState(initialData?.update_message || '');

  useEffect(() => {
    if (initialData) {
      setVersion(initialData.version || '');
      setForceUpdate(initialData.force_update || false);
      setReleaseDate(
        initialData.release_date
          ? new Date(initialData.release_date).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16)
      );
      // Initialize new fields from initialData
      setUpdateTitle(initialData.update_title || '');
      setUpdateFeatures(initialData.update_features || '');
      setUpdateMessage(initialData.update_message || '');
    } else {
      // Reset for new entry
      setVersion('');
      setForceUpdate(false);
      setReleaseDate(new Date().toISOString().slice(0, 16));
      // Reset new fields
      setUpdateTitle('');
      setUpdateFeatures('');
      setUpdateMessage('');
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
      id: initialData?.id, // Keep ID if editing, omit if creating
      version,
      force_update: forceUpdate,
      release_date: isoReleaseDate,
      // Include new fields in the submitted data
      update_title: updateTitle,
      update_features: updateFeatures,
      update_message: updateMessage,
    });
  };

  const inputClasses = "mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2";
  const labelClasses = "block text-sm font-medium text-slate-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Version */}
      <div>
        <label htmlFor="version" className={labelClasses}>
          Version <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          required
          className={inputClasses}
          placeholder="e.g., 1.0.0 or 2.3.4-beta1"
        />
      </div>

      {/* Release Date */}
      <div>
        <label htmlFor="releaseDate" className={labelClasses}>
          Release Date <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
          className={inputClasses}
        />
      </div>

      {/* Force Update Checkbox */}
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

      {/* Update Title */}
      <div>
        <label htmlFor="updateTitle" className={labelClasses}>
          Update Title
        </label>
        <input
          type="text"
          id="updateTitle"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          className={inputClasses}
          placeholder="e.g., Exciting New Features!"
        />
      </div>

      {/* Update Features */}
      <div>
        <label htmlFor="updateFeatures" className={labelClasses}>
          Key Features (Markdown supported)
        </label>
        <textarea
          id="updateFeatures"
          value={updateFeatures}
          onChange={(e) => setUpdateFeatures(e.target.value)}
          rows={4}
          className={`${inputClasses} resize-y`}
          placeholder="- Added dark mode support\n- Improved performance\n- Bug fixes"
        ></textarea>
      </div>

      {/* Update Message */}
      <div>
        <label htmlFor="updateMessage" className={labelClasses}>
          Detailed Update Message (Markdown supported)
        </label>
        <textarea
          id="updateMessage"
          value={updateMessage}
          onChange={(e) => setUpdateMessage(e.target.value)}
          rows={6}
          className={`${inputClasses} resize-y`}
          placeholder="We're thrilled to announce version X.Y.Z! This update brings..."
        ></textarea>
      </div>

      {/* Action Buttons */}
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