
import React, { useState, useEffect, useCallback } from 'react';
import { AppConfig, VersionEntry, VersionFormData } from './types';
import { LOCAL_STORAGE_KEY } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import AppSelector from './components/AppSelector';
import VersionManager from './components/VersionManager';
import Modal from './components/Modal';
import AppConfigForm from './components/AppConfigForm';
import DataManagement from './components/DataManagement'; // Import the new component
// import { PlusIcon } from './components/icons'; // PlusIcon seems unused in App.tsx directly

const App: React.FC = () => {
  const [allAppConfigs, setAllAppConfigs] = useLocalStorage<AppConfig[]>(LOCAL_STORAGE_KEY, []);
  const [selectedAppConfigId, setSelectedAppConfigId] = useState<string | null>(null);
  const [isAppConfigModalOpen, setIsAppConfigModalOpen] = useState(false);

  // Effect to manage selectedAppConfigId based on allAppConfigs
  useEffect(() => {
    const currentSelectedAppExists = selectedAppConfigId ? allAppConfigs.some(app => app.id === selectedAppConfigId) : false;

    if (allAppConfigs.length === 0) {
      // If no apps exist, ensure selection is null
      if (selectedAppConfigId !== null) {
        setSelectedAppConfigId(null);
      }
    } else { // Apps exist
      if (!currentSelectedAppExists) {
        // If current selection is invalid (e.g. null or points to a deleted app),
        // select the first available app.
        setSelectedAppConfigId(allAppConfigs[0].id);
      }
      // If currentSelectedAppExists is true, the selection is valid, so do nothing.
    }
  }, [allAppConfigs, selectedAppConfigId]);


  const handleAddAppConfig = (name: string, type: string, initialJson?: string) => {
    let initialVersions: VersionEntry[] = [];
    if (initialJson) {
      try {
        const parsedVersions: Omit<VersionEntry, 'id'>[] = JSON.parse(initialJson);
        initialVersions = parsedVersions.map(v => ({ ...v, id: crypto.randomUUID() }));
      } catch (e) {
        console.error("Failed to parse initial JSON for new app config:", e);
        alert("Error: Could not parse the provided JSON for initial versions.");
      }
    }
    const newAppConfig: AppConfig = {
      id: crypto.randomUUID(),
      name,
      type,
      versions: initialVersions,
    };
    setAllAppConfigs(prev => [...prev, newAppConfig]);
    // setSelectedAppConfigId(newAppConfig.id); // The useEffect will handle selecting it
    setIsAppConfigModalOpen(false);
  };

  const handleDeleteAppConfig = (idToDelete: string) => {
    setAllAppConfigs(prevConfigs => prevConfigs.filter(app => app.id !== idToDelete));
    // If the deleted app was the selected one, clear the selection.
    // The useEffect will then handle picking a new selection if available or setting to null.
    if (selectedAppConfigId === idToDelete) {
      setSelectedAppConfigId(null);
    }
  };

  const handleAddVersion = useCallback((appConfigId: string, versionData: VersionFormData) => {
    const newVersionEntry: VersionEntry = {
      ...versionData,
      id: crypto.randomUUID(),
    };
    setAllAppConfigs(prevConfigs =>
      prevConfigs.map(app =>
        app.id === appConfigId
          ? { ...app, versions: [...app.versions, newVersionEntry] }
          : app
      )
    );
  }, [setAllAppConfigs]);
  
  const handleEditVersion = useCallback((appConfigId: string, versionData: VersionFormData) => {
    if (!versionData.id) return; // Should have an ID for editing
    setAllAppConfigs(prevConfigs =>
      prevConfigs.map(app =>
        app.id === appConfigId
          ? {
              ...app,
              versions: app.versions.map(v =>
                v.id === versionData.id ? { ...v, ...versionData } as VersionEntry : v
              ),
            }
          : app
      )
    );
  }, [setAllAppConfigs]);

  const handleDeleteVersion = useCallback((appConfigId: string, versionId: string) => {
    setAllAppConfigs(prevConfigs =>
      prevConfigs.map(app => {
        if (app.id === appConfigId) {
          return {
            ...app,
            versions: app.versions.filter(v => v.id !== versionId),
          };
        }
        return app;
      })
    );
  }, [setAllAppConfigs]);


  const currentAppConfig = allAppConfigs.find(app => app.id === selectedAppConfigId) || null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          App Version Manager
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Manage and track versions for your applications with ease.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        <AppSelector
          appConfigs={allAppConfigs}
          selectedAppConfigId={selectedAppConfigId}
          onSelectAppConfig={setSelectedAppConfigId} // Direct selection is fine here
          onAddAppConfig={() => setIsAppConfigModalOpen(true)}
          onDeleteAppConfig={handleDeleteAppConfig}
        />

        <VersionManager
          appConfig={currentAppConfig}
          onUpdateAppConfig={(updatedApp) => { 
             setAllAppConfigs(prev => prev.map(app => app.id === updatedApp.id ? updatedApp : app));
          }}
          onAddVersion={handleAddVersion}
          onEditVersion={handleEditVersion}
          onDeleteVersion={handleDeleteVersion}
        />
      </main>

      <Modal
        isOpen={isAppConfigModalOpen}
        onClose={() => setIsAppConfigModalOpen(false)}
        title="Create New App Configuration"
        size="lg"
      >
        <AppConfigForm
          onSubmit={handleAddAppConfig}
          onCancel={() => setIsAppConfigModalOpen(false)}
        />
      </Modal>

      <footer className="text-center mt-12 py-6 border-t border-slate-700 space-y-6">
        <DataManagement setAllAppConfigs={setAllAppConfigs} />
        <p className="text-sm text-slate-500">
          App Version Manager &copy; {new Date().getFullYear()}. Data stored locally in your browser.
        </p>
      </footer>
    </div>
  );
};

export default App;
