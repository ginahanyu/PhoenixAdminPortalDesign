import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { type ReactNode, useEffect, useState } from 'react';
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

type DatabaseType = 'SQLite' | 'MySql' | 'SqlServer' | 'Postgresql' | '达梦';

const databaseOptions = [
  { label: 'SQLite', value: 'SQLite' },
  { label: 'MySql', value: 'MySql' },
  { label: 'sqlserver', value: 'SqlServer' },
  { label: 'Postgresql', value: 'Postgresql' },
  { label: '达梦', value: '达梦' },
] satisfies Array<{ label: string; value: DatabaseType }>;

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
  const [databaseType, setDatabaseType] = useState<DatabaseType>('SQLite');
  const [description, setDescription] = useState('-');
  const [host, setHost] = useState('10.32.6.108');
  const [username, setUsername] = useState('postgres');
  const [password, setPassword] = useState('12345678');
  const [port, setPort] = useState('5432');
  const [databaseName, setDatabaseName] = useState('BugX');
  const [jdbcParams, setJdbcParams] = useState('');
  const [enablePool, setEnablePool] = useState(true);
  const [maxWaitTime, setMaxWaitTime] = useState(3000);
  const [socketTimeout, setSocketTimeout] = useState(60000);
  const [maxActiveConnections, setMaxActiveConnections] = useState(8);
  const [minIdleConnections, setMinIdleConnections] = useState(0);
  const [initialConnections, setInitialConnections] = useState(0);
  const [customParams, setCustomParams] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveErrorOpen, setSaveErrorOpen] = useState(false);

  const isSqlite = databaseType === 'SQLite';
  const protocolMap: Record<DatabaseType, string> = {
    SQLite: 'sqlite',
    MySql: 'mysql',
    SqlServer: 'sqlserver',
    Postgresql: 'postgresql',
    达梦: 'dm',
  };
  const jdbcUrl = `jdbc:${protocolMap[databaseType]}://${host}:${port}/${databaseName}`;
  const paramsPlaceholder = `每行一条，格式：key=value
示例：
characterEncoding=UTF-8
useSSL=false`;

  useEffect(() => {
    if (!isSaving) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsSaving(false);
      setSaveErrorOpen(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isSaving, isSqlite]);

  const handleSave = () => {
    setIsSaving(true);
  };

  return (
    <div className="config-placeholder-card user-db-config-card">
      <div className="config-placeholder-title">管理控制台的用户信息数据库设置</div>

      {isSqlite ? (
        <div className="user-db-form">
          <div className="security-form-row">
            <div className="security-form-label">
              <span>数据库类型</span>
            </div>
            <div className="security-form-control">
              <Select value={databaseType} onChange={setDatabaseType} options={databaseOptions} />
            </div>
          </div>
        </div>
      ) : (
        <div className="user-db-advanced-layout">
          <div className="user-db-advanced-column">
            <DatabaseField label="数据源类型">
              <Select value={databaseType} onChange={setDatabaseType} options={databaseOptions} />
            </DatabaseField>

            <DatabaseField label="数据源描述">
              <Input value={description} onChange={(event) => setDescription(event.target.value)} />
            </DatabaseField>

            <DatabaseField label="服务器名" required>
              <Input value={host} onChange={(event) => setHost(event.target.value)} />
            </DatabaseField>

            <DatabaseField label="用户名" required>
              <Input value={username} onChange={(event) => setUsername(event.target.value)} />
            </DatabaseField>

            <DatabaseField label="密码" required>
              <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
            </DatabaseField>

            <DatabaseField label="端口号" required>
              <Input value={port} onChange={(event) => setPort(event.target.value)} />
            </DatabaseField>

            <DatabaseField label="数据库" required>
              <Select
                value={databaseName}
                onChange={setDatabaseName}
                options={[
                  { label: 'BugX', value: 'BugX' },
                  { label: 'Phoenix', value: 'Phoenix' },
                  { label: 'AdminPortal', value: 'AdminPortal' },
                ]}
              />
            </DatabaseField>

            <DatabaseField label="URL">
              <Input value={jdbcUrl} readOnly />
            </DatabaseField>

            <DatabaseField label="JDBC URL参数" multiline>
              <Input.TextArea
                value={jdbcParams}
                onChange={(event) => setJdbcParams(event.target.value)}
                autoSize={{ minRows: 4, maxRows: 4 }}
                placeholder={paramsPlaceholder}
              />
            </DatabaseField>
          </div>

          <div className="user-db-advanced-column user-db-advanced-column-right">
            <DatabaseField label="是否启用连接池？" inline>
              <Switch checked={enablePool} onChange={setEnablePool} />
            </DatabaseField>

            <DatabaseField label="最大等待时间" suffix="毫秒">
              <InputNumber value={maxWaitTime} onChange={(value) => setMaxWaitTime(value ?? 0)} />
            </DatabaseField>

            <DatabaseField label="Socket 超时时间" suffix="毫秒">
              <InputNumber value={socketTimeout} onChange={(value) => setSocketTimeout(value ?? 0)} />
            </DatabaseField>

            <DatabaseField label="最大连接数">
              <InputNumber
                value={maxActiveConnections}
                onChange={(value) => setMaxActiveConnections(value ?? 0)}
              />
            </DatabaseField>

            <DatabaseField label="最少空闲连接数">
              <InputNumber
                value={minIdleConnections}
                onChange={(value) => setMinIdleConnections(value ?? 0)}
              />
            </DatabaseField>

            <DatabaseField label="初始化连接数">
              <InputNumber
                value={initialConnections}
                onChange={(value) => setInitialConnections(value ?? 0)}
              />
            </DatabaseField>

            <DatabaseField label="自定义参数" multiline>
              <Input.TextArea
                value={customParams}
                onChange={(event) => setCustomParams(event.target.value)}
                autoSize={{ minRows: 4, maxRows: 4 }}
                placeholder={paramsPlaceholder}
              />
            </DatabaseField>
          </div>
        </div>
      )}

      <div className="general-subtab-actions user-db-actions">
        {!isSqlite ? <Button className="light-action-button">测试连接</Button> : null}
        <Button type="primary" className="primary-action-button" onClick={handleSave} loading={isSaving}>
          保存
        </Button>
      </div>

      <Modal
        open={saveErrorOpen}
        onCancel={() => setSaveErrorOpen(false)}
        footer={[
          <Button key="retry" type="primary" className="primary-action-button" onClick={() => setSaveErrorOpen(false)}>
            知道了
          </Button>,
        ]}
        width={640}
        centered
        className="user-db-save-error-modal"
        title={null}
      >
        <div className="user-db-save-error-modal-body">
          <CloseCircleFilled className="user-db-save-error-modal-icon" />
          <div className="user-db-save-error-modal-content">
            <div className="user-db-save-error-modal-title">保存失败</div>
            <div className="user-db-save-error-modal-text">
              {isSqlite
                ? 'SQLite 用户数据库配置保存失败，请检查当前配置后重试。'
                : 'Server 用户数据库保存或迁移失败，请根据配置和数据库状态检查后重试。'}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DatabaseField({
  label,
  children,
  required = false,
  multiline = false,
  inline = false,
  suffix,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
  multiline?: boolean;
  inline?: boolean;
  suffix?: string;
}) {
  return (
    <div
      className={`user-db-advanced-row ${multiline ? 'user-db-advanced-row-textarea' : ''} ${
        inline ? 'user-db-advanced-row-inline' : ''
      }`}
    >
      <div className={`user-db-advanced-label ${required ? 'is-required' : ''}`}>{label}：</div>
      <div className="user-db-advanced-control">
        {children}
        {suffix ? <span className="user-db-advanced-suffix">{suffix}</span> : null}
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
