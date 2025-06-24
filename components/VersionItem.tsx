
import React from 'react';
import { VersionEntry } from '../types';
import Button from './Button';
import { EditIcon, DeleteIcon } from './icons';

interface VersionItemProps {
  versionEntry: VersionEntry;
  onEdit: (versionEntry: VersionEntry) => void;
  onDelete: (versionId: string) => void;
}

const VersionItem: React.FC<VersionItemProps> = ({ versionEntry, onEdit, onDelete }) => {
  const formattedDate = new Date(versionEntry.release_date).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
      <div className="flex-1">
        <p className="text-xl font-semibold text-sky-400">{versionEntry.version}</p>
        <p className="text-sm text-slate-400">
          Release Date: <span className="text-slate-300">{formattedDate}</span>
        </p>
      </div>
      <div className="flex items-center space-x-3">
         <span className={`px-3 py-1 text-xs font-semibold rounded-full ${versionEntry.force_update ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {versionEntry.force_update ? 'Force Update' : 'Optional Update'}
        </span>
        <Button variant="ghost" size="sm" onClick={() => onEdit(versionEntry)} aria-label="Edit version">
          <EditIcon />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(versionEntry.id)} aria-label="Delete version" className="text-red-400 hover:text-red-300 hover:bg-red-900/50">
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default VersionItem;
