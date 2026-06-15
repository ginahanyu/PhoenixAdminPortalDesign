import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { AttachmentStorageSettingsPanel } from '../components/AttachmentStorageSettingsPanel';
import { DiagnosticLogLevelPanel } from '../components/DiagnosticLogLevelPanel';
import { useDiagnosticSettings } from '../components/DiagnosticSettingsContext';
import { MailServerConfigPanel } from '../components/MailServerConfigPanel';
import { SecurityConfigPanel } from '../components/SecurityConfigPanel';
import { useSecuritySettings } from '../components/SecuritySettingsContext';
import { useStorageSettings } from '../components/StorageSettingsContext';
import { CloudStoragePage } from './CloudStoragePage';

const configMenu = [
  { key: 'mail-server', label: '邮件服务' },
  { key: 'cloud-storage', label: '云存储' },
  { key: 'user-db', label: '用户数据库' },
  { key: 'backup-restore', label: '备份还原' },
  { key: 'security-settings', label: '安全配置' },
  { key: 'diagnostic-log-level', label: '诊断日志级别' },
  { key: 'storage-path', label: '存储路径' },
] as const;

type ConfigKey =
  | 'mail-server'
  | 'cloud-storage'
  | 'security-settings'
  | 'diagnostic-log-level'
  | 'backup-restore'
  | 'storage-path'
  | 'user-db';

export function ConfigPage() {
  const [selectedKey, setSelectedKey] = useState<ConfigKey>('mail-server');
  const { globalSecuritySettings, setGlobalSecuritySettings } = useSecuritySettings();
  const { globalLogLevel, setGlobalLogLevel } = useDiagnosticSettings();
  const { globalAttachmentStorageSettings, setGlobalAttachmentStorageSettings } =
    useStorageSettings();

  return (
    <div className="config-page">
      <aside className="config-sidebar">
        <nav className="config-menu">
          {configMenu.map((item) => (
            <div key={item.key} className="config-menu-group">
              <button
                type="button"
                className={`config-menu-item ${item.key === selectedKey ? 'is-active' : ''}`}
                onClick={() => setSelectedKey(item.key)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>
      </aside>

      <section className="config-content">
        {selectedKey === 'mail-server' ? <MailServerConfigPanel /> : null}

        {selectedKey === 'cloud-storage' ? (
          <div>
            <div className="config-placeholder-title">云存储配置</div>
            <CloudStoragePage />
          </div>
        ) : null}

        {selectedKey === 'security-settings' ? (
          <SecurityConfigPanel
            value={globalSecuritySettings}
            onChange={setGlobalSecuritySettings}
          />
        ) : null}

        {selectedKey === 'diagnostic-log-level' ? (
          <DiagnosticLogLevelPanel value={globalLogLevel} onChange={setGlobalLogLevel} />
        ) : null}

        {selectedKey === 'backup-restore' ? (
          <ConfigPlaceholder
            title="备份还原"
            description="这里可以配置自动备份周期、手动备份以及还原策略。"
          />
        ) : null}

        {selectedKey === 'storage-path' ? (
          <AttachmentStorageSettingsPanel
            title="附件存储设置"
            value={globalAttachmentStorageSettings}
            onChange={setGlobalAttachmentStorageSettings}
          />
        ) : null}

        {selectedKey === 'user-db' ? <UserDatabaseConfigPanel /> : null}
      </section>
    </div>
  );
}

function UserDatabaseConfigPanel() {
  const [databaseType, setDatabaseType] = useState<
    'SQLite' | 'MySql' | 'SqlServer' | 'Postgresql' | '达梦'
  >('SQLite');
  const [connectionString, setConnectionString] = useState('');

  const isSqlite = databaseType === 'SQLite';

  return (
    <div className="config-placeholder-card">
      <div className="config-placeholder-title">管理控制台的用户信息数据库设置</div>

      <div className="user-db-form">
        <div className="security-form-row">
          <div className="security-form-label">
            <span>数据库类型</span>
          </div>
          <div className="security-form-control">
            <Select
              value={databaseType}
              onChange={setDatabaseType}
              options={[
                { label: 'SQLite', value: 'SQLite' },
                { label: 'MySql', value: 'MySql' },
                { label: 'sqlserver', value: 'SqlServer' },
                { label: 'Postgresql', value: 'Postgresql' },
                { label: '达梦', value: '达梦' },
              ]}
            />
          </div>
        </div>

        <div className="security-form-row">
          <div className="security-form-label">
            <span>数据库连接字符串</span>
          </div>
          <div className="user-db-connection-row">
            <div className="security-form-control user-db-connection-input">
              <Input
                value={connectionString}
                onChange={(event) => setConnectionString(event.target.value)}
                disabled={isSqlite}
              />
            </div>
            <Button className="light-action-button" disabled={isSqlite}>
              测试连接
            </Button>
          </div>
        </div>
      </div>

      <div className="general-subtab-actions">
        <Button type="primary" className="primary-action-button">
          保存
        </Button>
      </div>
    </div>
  );
}

function ConfigPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="config-placeholder-card">
      <div className="config-placeholder-title">{title}</div>
      <div className="config-placeholder-text">{description}</div>
      <div className="general-subtab-actions">
        <Button type="primary" className="primary-action-button">
          保存
        </Button>
      </div>
    </div>
  );
}
