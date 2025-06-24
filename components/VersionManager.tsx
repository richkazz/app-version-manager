import React, { useState, useCallback } from "react";
import { AppConfig, VersionEntry, VersionFormData } from "../types";
import Button from "./Button";
import Modal from "./Modal";
import VersionForm from "./VersionForm";
import VersionItem from "./VersionItem";
import { PlusIcon, CopyIcon, DownloadIcon } from "./icons";

interface VersionManagerProps {
  appConfig: AppConfig | null;
  onUpdateAppConfig: (updatedAppConfig: AppConfig) => void;
  onAddVersion: (appConfigId: string, versionData: VersionFormData) => void;
  onEditVersion: (appConfigId: string, versionData: VersionFormData) => void;
  onDeleteVersion: (appConfigId: string, versionId: string) => void;
}

const VersionManager: React.FC<VersionManagerProps> = ({
  appConfig,
  onUpdateAppConfig,
  onAddVersion,
  onEditVersion,
  onDeleteVersion,
}) => {
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [editingVersion, setEditingVersion] = useState<
    VersionFormData | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenVersionModal = (version?: VersionEntry) => {
    setEditingVersion(version ? { ...version } : undefined);
    setIsVersionModalOpen(true);
  };

  const handleCloseVersionModal = () => {
    setIsVersionModalOpen(false);
    setEditingVersion(undefined);
  };

  const handleVersionFormSubmit = (data: VersionFormData) => {
    if (!appConfig) return;
    if (data.id) {
      // Editing existing version
      onEditVersion(appConfig.id, data);
      showToast("Version updated successfully!");
    } else {
      // Adding new version
      onAddVersion(appConfig.id, data);
      showToast("Version added successfully!");
    }
    handleCloseVersionModal();
  };

  const handleDeleteVersion = (versionId: string) => {
    if (!appConfig) return;
    if (window.confirm("Are you sure you want to delete this version?")) {
      onDeleteVersion(appConfig.id, versionId);
      showToast("Version deleted.");
    }
  };

  const copyJsonToClipboard = useCallback(() => {
    if (!appConfig) return;
    // Strip 'id' from versions for export
    const exportVersions = appConfig.versions.map(({ id, ...rest }) => rest);
    const jsonString = JSON.stringify(exportVersions, null, 2);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => showToast("JSON copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy JSON: ", err);
        showToast("Failed to copy JSON.");
      });
  }, [appConfig]);

  const downloadJsonFile = useCallback(() => {
    if (!appConfig) return;
    const exportVersions = appConfig.versions.map(({ id, ...rest }) => rest);
    const jsonString = JSON.stringify(exportVersions, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${appConfig.name
      .toLowerCase()
      .replace(/\s+/g, "_")}_${appConfig.type.toLowerCase()}_app_versions.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("JSON downloaded.");
  }, [appConfig]);

  if (!appConfig) {
    return (
      <div className="text-center p-10 bg-slate-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-slate-300 mb-4">
          No App Selected
        </h2>
        <p className="text-slate-400">
          Please select or create an app configuration to view and manage its
          versions.
        </p>
      </div>
    );
  }

  const sortedAndFilteredVersions = [...appConfig.versions]
    .filter((v) => v.version.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-xl">
      {toastMessage && (
        <div
          className="fixed top-5 right-5 bg-sky-500 text-white py-2 px-4 rounded-md shadow-lg z-[100]"
          role="alert"
        >
          {toastMessage}
        </div>
      )}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-sky-400" id="current-app-name">
            {appConfig.name}
          </h2>
          <p className="text-slate-400" id="current-app-type">
            {appConfig.type || "No type specified"} - Version Management
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={copyJsonToClipboard}
            variant="secondary"
            size="sm"
            leftIcon={<CopyIcon />}
            aria-label="Copy versions as JSON"
          >
            Copy JSON
          </Button>
          <Button
            onClick={downloadJsonFile}
            variant="secondary"
            size="sm"
            leftIcon={<DownloadIcon />}
            aria-label="Download versions as JSON file"
          >
            Download JSON
          </Button>
          <Button
            onClick={() => handleOpenVersionModal()}
            variant="primary"
            size="sm"
            leftIcon={<PlusIcon />}
            aria-label="Add new version"
          >
            Add New Version
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="search-versions" className="sr-only">
          Search versions
        </label>
        <input
          id="search-versions"
          type="text"
          placeholder="Search versions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border-slate-600 bg-slate-700 text-slate-100 focus:border-sky-500 focus:ring-sky-500 shadow"
        />
      </div>

      {sortedAndFilteredVersions.length > 0 ? (
        <div
          className="space-y-4"
          role="list"
          aria-labelledby="current-app-name"
        >
          {sortedAndFilteredVersions.map((versionEntry) => (
            <VersionItem
              key={versionEntry.id}
              versionEntry={versionEntry}
              onEdit={() => handleOpenVersionModal(versionEntry)}
              onDelete={() => handleDeleteVersion(versionEntry.id)} // Ensured onDelete is called with versionId
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-slate-400 text-lg">
            {searchTerm
              ? "No versions match your search."
              : "No versions added yet for this app configuration."}
          </p>
          {!searchTerm && (
            <Button
              onClick={() => handleOpenVersionModal()}
              variant="primary"
              className="mt-4"
              leftIcon={<PlusIcon />}
            >
              Add First Version
            </Button>
          )}
        </div>
      )}

      <Modal
        isOpen={isVersionModalOpen}
        onClose={handleCloseVersionModal}
        title={editingVersion?.id ? "Edit Version" : "Add New Version"}
        size="lg"
      >
        <VersionForm
          onSubmit={handleVersionFormSubmit}
          onCancel={handleCloseVersionModal}
          initialData={editingVersion}
        />
      </Modal>
    </div>
  );
};

export default VersionManager;
