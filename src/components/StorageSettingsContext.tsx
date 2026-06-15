import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { cloudStorages, type CloudStorageItem } from '../data/mock';

export type StorageMode = 'local' | 'cloud';

export type AttachmentStorageSettings = {
  storageMode: StorageMode;
  localPath: string;
  cloudStorageKey: string;
  cloudPath: string;
  publicUrlStrategy: string;
};

export const defaultAttachmentStorageSettings: AttachmentStorageSettings = {
  storageMode: 'local',
  localPath: 'uploads',
  cloudStorageKey: 'storage-3',
  cloudPath: 'uploads',
  publicUrlStrategy: 'Phoenix 代理下载 URL',
};

type StorageSettingsContextValue = {
  cloudStorageItems: CloudStorageItem[];
  setCloudStorageItems: React.Dispatch<React.SetStateAction<CloudStorageItem[]>>;
  globalAttachmentStorageSettings: AttachmentStorageSettings;
  setGlobalAttachmentStorageSettings: React.Dispatch<
    React.SetStateAction<AttachmentStorageSettings>
  >;
};

const StorageSettingsContext = createContext<StorageSettingsContextValue | null>(null);

export function StorageSettingsProvider({ children }: { children: ReactNode }) {
  const [cloudStorageItems, setCloudStorageItems] = useState<CloudStorageItem[]>(cloudStorages);
  const [globalAttachmentStorageSettings, setGlobalAttachmentStorageSettings] =
    useState<AttachmentStorageSettings>(defaultAttachmentStorageSettings);

  const value = useMemo(
    () => ({
      cloudStorageItems,
      setCloudStorageItems,
      globalAttachmentStorageSettings,
      setGlobalAttachmentStorageSettings,
    }),
    [cloudStorageItems, globalAttachmentStorageSettings]
  );

  return (
    <StorageSettingsContext.Provider value={value}>
      {children}
    </StorageSettingsContext.Provider>
  );
}

export function useStorageSettings() {
  const context = useContext(StorageSettingsContext);

  if (!context) {
    throw new Error('useStorageSettings must be used within StorageSettingsProvider');
  }

  return context;
}
