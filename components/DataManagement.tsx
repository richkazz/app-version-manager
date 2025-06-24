import React from 'react';
import { AppConfig } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';
import Button from './Button'; // Assuming a Button component exists

interface DataManagementProps {
  setAllAppConfigs: React.Dispatch<React.SetStateAction<AppConfig[]>>;
}

const DataManagement: React.FC<DataManagementProps> = ({ setAllAppConfigs }) => {
  const handleExport = () => {
    try {
      const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!data) {
        alert('No data to export.');
        return;
      }

      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'app-version-manager-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Export successful');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('An error occurred while exporting data.');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          alert('Error: Could not read file content.');
          return;
        }
        const importedData = JSON.parse(text);

        // Validate structure
        if (!Array.isArray(importedData)) {
          alert('Error: Invalid file format. Expected an array of app configurations.');
          return;
        }

        for (const item of importedData) {
          if (
            typeof item.id !== 'string' ||
            typeof item.name !== 'string' ||
            typeof item.type !== 'string' ||
            !Array.isArray(item.versions)
          ) {
            alert('Error: Invalid data structure in imported file. Each app config must have id, name, type, and versions array.');
            return;
          }
          for (const version of item.versions) {
            if (
              typeof version.id !== 'string' ||
              typeof version.version !== 'string' ||
              typeof version.force_update !== 'boolean' ||
              typeof version.release_date !== 'string' // Could add regex for ISO date
            ) {
              alert('Error: Invalid version structure in imported file.');
              return;
            }
          }
        }

        // Confirmation
        if (!window.confirm('Importing this file will overwrite all current data. Are you sure?')) {
          // Reset the file input so the same file can be selected again if needed
          event.target.value = '';
          return;
        }

        // Update localStorage and app state
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(importedData));
        setAllAppConfigs(importedData as AppConfig[]); // Type assertion after validation
        alert('Data imported successfully!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert(`An error occurred while importing data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        // Reset the file input so the same file can be selected again if needed
        event.target.value = '';
      }
    };
    reader.onerror = () => {
      alert('Error reading file.');
       // Reset the file input
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-8 p-4 border border-slate-700 rounded-lg bg-slate-800">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">Data Management</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleExport} variant="secondary">
          Export All Data
        </Button>
        <div>
          <input
            type="file"
            id="import-file"
            accept=".json"
            onChange={handleImport}
            className="hidden" // Hide the default input
          />
          <Button
            onClick={() => document.getElementById('import-file')?.click()}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Import Data from File
          </Button>
          <p className="text-xs text-slate-500 mt-1">
            Importing will overwrite all current data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
