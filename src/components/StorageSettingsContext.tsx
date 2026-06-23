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

export type AppStorageSettings = {
  appPath: string;
};

export const defaultAttachmentStorageSettings: AttachmentStorageSettings = {
  storageMode: 'local',
  localPath: 'uploads',
  cloudStorageKey: 'storage-3',
  cloudPath: 'uploads',
  publicUrlStrategy: 'Phoenix 代理下载 URL',
};

export const defaultAppStorageSettings: AppStorageSettings = {
  appPath: 'D:\\grapecity-java\\phoenix\\workspace1',
};

type StorageSettingsContextValue = {
  cloudStorageItems: CloudStorageItem[];
  setCloudStorageItems: React.Dispatch<React.SetStateAction<CloudStorageItem[]>>;
  globalAttachmentStorageSettings: AttachmentStorageSettings;
  setGlobalAttachmentStorageSettings: React.Dispatch<
    React.SetStateAction<AttachmentStorageSettings>
  >;
  globalAppStorageSettings: AppStorageSettings;
  setGlobalAppStorageSettings: React.Dispatch<React.SetStateAction<AppStorageSettings>>;
  effectiveAppStoragePath: string;
  setEffectiveAppStoragePath: React.Dispatch<React.SetStateAction<string>>;
};

const StorageSettingsContext = createContext<StorageSettingsContextValue | null>(null);

export function StorageSettingsProvider({ children }: { children: ReactNode }) {
  const [cloudStorageItems, setCloudStorageItems] = useState<CloudStorageItem[]>(cloudStorages);
  const [globalAttachmentStorageSettings, setGlobalAttachmentStorageSettings] =
    useState<AttachmentStorageSettings>(defaultAttachmentStorageSettings);
  const [globalAppStorageSettings, setGlobalAppStorageSettings] =
    useState<AppStorageSettings>(defaultAppStorageSettings);
  const [effectiveAppStoragePath, setEffectiveAppStoragePath] = useState(
    defaultAppStorageSettings.appPath
  );

  const value = useMemo(
    () => ({
      cloudStorageItems,
      setCloudStorageItems,
      globalAttachmentStorageSettings,
      setGlobalAttachmentStorageSettings,
      globalAppStorageSettings,
      setGlobalAppStorageSettings,
      effectiveAppStoragePath,
      setEffectiveAppStoragePath,
    }),
    [
      cloudStorageItems,
      globalAttachmentStorageSettings,
      globalAppStorageSettings,
      effectiveAppStoragePath,
    ]
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
