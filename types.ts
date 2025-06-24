
export interface VersionEntry {
  id: string; // Unique ID for React keys and easier updates/deletes
  version: string;
  force_update: boolean;
  release_date: string; // ISO 8601 string format
}

export interface AppConfig {
  id: string; // Unique ID for the app configuration
  name: string;
  type: string; // e.g., "iOS", "Android", "Web"
  versions: VersionEntry[];
}

// For form handling, version ID is optional if creating a new one
export type VersionFormData = Omit<VersionEntry, 'id'> & { id?: string };