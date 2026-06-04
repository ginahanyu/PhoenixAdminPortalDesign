import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type DiagnosticLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

type DiagnosticSettingsContextValue = {
  globalLogLevel: DiagnosticLogLevel;
  setGlobalLogLevel: React.Dispatch<React.SetStateAction<DiagnosticLogLevel>>;
};

const DiagnosticSettingsContext = createContext<DiagnosticSettingsContextValue | null>(null);

export function DiagnosticSettingsProvider({ children }: { children: ReactNode }) {
  const [globalLogLevel, setGlobalLogLevel] = useState<DiagnosticLogLevel>('info');

  const value = useMemo(
    () => ({
      globalLogLevel,
      setGlobalLogLevel,
    }),
    [globalLogLevel]
  );

  return (
    <DiagnosticSettingsContext.Provider value={value}>
      {children}
    </DiagnosticSettingsContext.Provider>
  );
}

export function useDiagnosticSettings() {
  const context = useContext(DiagnosticSettingsContext);

  if (!context) {
    throw new Error('useDiagnosticSettings must be used within DiagnosticSettingsProvider');
  }

  return context;
}
