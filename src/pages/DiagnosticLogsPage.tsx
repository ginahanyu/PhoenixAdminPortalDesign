import { useState } from 'react';
import { DiagnosticLogLevelPanel } from '../components/DiagnosticLogLevelPanel';
import { DiagnosticLogsPanel } from '../components/DiagnosticLogsPanel';
import { useDiagnosticSettings } from '../components/DiagnosticSettingsContext';

type DiagnosticTabKey = 'logs' | 'level';

export function DiagnosticLogsPage() {
  const [activeTab, setActiveTab] = useState<DiagnosticTabKey>('logs');
  const { globalLogLevel, setGlobalLogLevel } = useDiagnosticSettings();

  return (
    <div className="diagnostic-page">
      <div className="diagnostic-tabs">
        <button
          type="button"
          className={`diagnostic-tab ${activeTab === 'logs' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          诊断日志
        </button>
        <button
          type="button"
          className={`diagnostic-tab ${activeTab === 'level' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('level')}
        >
          级别设置
        </button>
      </div>

      <div className="general-settings-content diagnostic-page-content">
        {activeTab === 'logs' ? <DiagnosticLogsPanel /> : null}
        {activeTab === 'level' ? (
          <DiagnosticLogLevelPanel value={globalLogLevel} onChange={setGlobalLogLevel} />
        ) : null}
      </div>
    </div>
  );
}
