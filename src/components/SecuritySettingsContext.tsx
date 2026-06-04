import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type SecuritySettings = {
  refererAllowList: string;
  iframePolicy: 'same-origin' | 'allow-all' | 'deny';
  customResponseHeaders: string;
  allowedIpList: string;
  blockedIpList: string;
  knownProxyIpList: string;
};

export const defaultSecuritySettings: SecuritySettings = {
  refererAllowList: '',
  iframePolicy: 'same-origin',
  customResponseHeaders: `Referrer-Policy:strict-origin-when-cross-origin
X-Content-Type-Options:nosniff`,
  allowedIpList: '',
  blockedIpList: '',
  knownProxyIpList: '',
};

type SecuritySettingsContextValue = {
  globalSecuritySettings: SecuritySettings;
  setGlobalSecuritySettings: React.Dispatch<React.SetStateAction<SecuritySettings>>;
};

const SecuritySettingsContext = createContext<SecuritySettingsContextValue | null>(null);

export function SecuritySettingsProvider({ children }: { children: ReactNode }) {
  const [globalSecuritySettings, setGlobalSecuritySettings] =
    useState<SecuritySettings>(defaultSecuritySettings);

  const value = useMemo(
    () => ({
      globalSecuritySettings,
      setGlobalSecuritySettings,
    }),
    [globalSecuritySettings]
  );

  return (
    <SecuritySettingsContext.Provider value={value}>
      {children}
    </SecuritySettingsContext.Provider>
  );
}

export function useSecuritySettings() {
  const context = useContext(SecuritySettingsContext);

  if (!context) {
    throw new Error('useSecuritySettings must be used within SecuritySettingsProvider');
  }

  return context;
}
