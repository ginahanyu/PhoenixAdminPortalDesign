import { useState } from 'react';
import { MailServerConfigPanel } from '../components/MailServerConfigPanel';
import { SecurityConfigPanel } from '../components/SecurityConfigPanel';

const configTabs = [
  { key: 'mail', label: '邮件服务器配置' },
  { key: 'security', label: '安全配置' },
] as const;

export function ApplicationGlobalConfigPage() {
  const [activeTab, setActiveTab] = useState<(typeof configTabs)[number]['key']>('mail');

  return (
    <div className="app-detail-page application-global-config-page">
      <div className="app-detail-tabs">
        {configTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`app-detail-tab ${activeTab === tab.key ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="app-detail-panel">
        {activeTab === 'mail' ? (
          <div className="general-settings-panel">
            <div className="general-settings-content">
              <MailServerConfigPanel />
            </div>
          </div>
        ) : null}

        {activeTab === 'security' ? (
          <div className="general-settings-panel security-config-page-panel">
            <div className="general-settings-content">
              <SecurityConfigPanel />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
