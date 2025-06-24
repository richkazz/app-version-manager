
import React from 'react';
import { AppConfig } from '../types';
import Button from './Button';
import { PlusIcon, ChevronDownIcon, DeleteIcon } from './icons'; // Removed EyeIcon as it's not used

interface AppSelectorProps {
  appConfigs: AppConfig[];
  selectedAppConfigId: string | null;
  onSelectAppConfig: (id: string) => void;
  onAddAppConfig: () => void;
  onDeleteAppConfig: (id: string) => void;
}

const AppSelector: React.FC<AppSelectorProps> = ({
  appConfigs,
  selectedAppConfigId,
  onSelectAppConfig,
  onAddAppConfig,
  onDeleteAppConfig
}) => {
  const selectedAppName = appConfigs.find(app => app.id === selectedAppConfigId)?.name || "Select App Configuration";

  if (appConfigs.length === 0) {
    return (
      <div className="p-6 text-center bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-300 mb-4">No App Configurations Yet</h2>
        <p className="text-slate-400 mb-6">Get started by creating your first app configuration to manage its versions.</p>
        <Button onClick={onAddAppConfig} variant="primary" size="lg" leftIcon={<PlusIcon />}>
          Create First App Configuration
        </Button>
      </div>
    );
  }
  
  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="relative w-full sm:w-auto sm:min-w-[250px]">
        <select
          id="appConfigSelect"
          value={selectedAppConfigId || ''}
          onChange={(e) => onSelectAppConfig(e.target.value)}
          className="w-full appearance-none bg-slate-700 border border-slate-600 text-slate-100 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-slate-600 focus:border-sky-500 shadow"
          aria-label="Select App Configuration"
        >
          <option value="" disabled>Select an App Configuration</option>
          {appConfigs.map((app) => (
            <option key={app.id} value={app.id}>
              {app.name} ({app.type || 'N/A'})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <ChevronDownIcon className="w-5 h-5"/>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {selectedAppConfigId && (
            <Button
                variant="danger"
                size="md"
                onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "\${selectedAppName}" and all its versions? This action cannot be undone.`)) {
                        onDeleteAppConfig(selectedAppConfigId);
                    }
                }}
                leftIcon={<DeleteIcon className="w-4 h-4"/>}
            >
                Delete Current App
            </Button>
        )}
        <Button onClick={onAddAppConfig} variant="secondary" size="md" leftIcon={<PlusIcon className="w-4 h-4"/>}>
          New App Config
        </Button>
      </div>
    </div>
  );
};

export default AppSelector;
