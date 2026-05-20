import {
  EditOutlined,
  EyeInvisibleOutlined,
  FolderOpenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Input, Radio, Select, Switch } from 'antd';
import { useMemo, useState } from 'react';

const tabs = [
  { key: 'general', label: '常规设置' },
  { key: 'permission', label: '权限设置' },
  { key: 'datasource', label: '数据源' },
  { key: 'schedule', label: '计划任务' },
] as const;

const generalTabs = [
  { key: 'login', label: '登录设置' },
  { key: 'custom', label: '自定义设置' },
  { key: 'mail', label: '邮件服务器配置' },
] as const;

const customRows = [
  {
    key: '1',
    name: 'name',
    description: '',
    value: 'aaa',
    encrypted: '否',
  },
];

const dataSources = [
  {
    key: 'ds1',
    name: '数据源1',
    type: 'postgresql',
    jdbcUrl: 'postgresql://10.32.6.108:5432/BugX',
    description: '描述内容',
    databaseName: 'BugX',
    server: '10.32.6.108',
    username: 'postgres',
    password: '**********',
    port: '5432',
    database: 'BugX',
    url: 'postgresql://10.32.6.108:5432/BugX',
    jdbcParams: 'useSSL=false\nserverTimezone=UTC',
    connectionPoolEnabled: '是',
    maxWaitTime: '3000',
    socketTimeout: '60000',
    maxConnections: '8',
    minIdleConnections: '0',
    initialConnections: '0',
    customProperties: '-',
  },
  {
    key: 'ds2',
    name: '数据源2',
    type: 'sqlite',
    jdbcUrl: 'sqlite:///',
    description: '描述内容描述内容',
    databaseName: '',
    server: '',
    username: '',
    password: '',
    port: '',
    database: '',
    url: 'sqlite:///',
    jdbcParams: '-',
    connectionPoolEnabled: '-',
    maxWaitTime: '-',
    socketTimeout: '-',
    maxConnections: '-',
    minIdleConnections: '-',
    initialConnections: '-',
    customProperties: '-',
  },
] as const;

const scheduleTasks = [
  {
    key: 'task1',
    folder: '文件夹1 / 文件夹1',
    name: '定时同步用户信息',
    enabled: '已启用',
    triggerDetail: '每1小时执行一次',
    status: '已启用',
    description: '无',
    scheduleType: '定时触发（按小时）',
    startTime: '2026-02-11 00:00:00',
    endTime: '-',
    detail: '每1小时执行一次',
    timeout: '不限制',
    priority: '中',
  },
  {
    key: 'task2',
    folder: '文件夹1 / 文件夹1',
    name: '定时同步自动测试数据',
    enabled: '已启用',
    triggerDetail: '每1小时执行一次',
    status: '已启用',
    description: '无',
    scheduleType: '定时触发（按小时）',
    startTime: '2026-02-11 00:00:00',
    endTime: '-',
    detail: '每1小时执行一次',
    timeout: '不限制',
    priority: '中',
  },
] as const;

const permissionTree = [
  {
    key: 'built-in',
    label: '内置角色',
    children: ['匿名用户', '登录用户'],
  },
  {
    key: 'group-1',
    label: '1',
    children: ['admin', '销售主管', 'AAA'],
  },
] as const;

export function ApplicationDetailPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('general');
  const [activeGeneralTab, setActiveGeneralTab] =
    useState<(typeof generalTabs)[number]['key']>('login');
  const [loginMode, setLoginMode] = useState('normal');
  const [permissionViewMode, setPermissionViewMode] = useState<'role' | 'group'>('role');
  const [permissionKeyword, setPermissionKeyword] = useState('');
  const [selectedPermissionSubject, setSelectedPermissionSubject] = useState('匿名用户');
  const [dataSourceKeyword, setDataSourceKeyword] = useState('');
  const [selectedDataSourceKey, setSelectedDataSourceKey] = useState('ds1');
  const [scheduleKeyword, setScheduleKeyword] = useState('');
  const [selectedTaskKey, setSelectedTaskKey] = useState('task1');

  const filteredDataSources = useMemo(
    () =>
      dataSources.filter((item) =>
        [item.name, item.type, item.jdbcUrl, item.description].some((value) =>
          value.toLowerCase().includes(dataSourceKeyword.toLowerCase())
        )
      ),
    [dataSourceKeyword]
  );

  const selectedDataSource =
    filteredDataSources.find((item) => item.key === selectedDataSourceKey) ??
    dataSources.find((item) => item.key === selectedDataSourceKey) ??
    filteredDataSources[0] ??
    dataSources[0];

  const filteredScheduleTasks = useMemo(
    () =>
      scheduleTasks.filter((item) =>
        [item.folder, item.name, item.triggerDetail].some((value) =>
          value.toLowerCase().includes(scheduleKeyword.toLowerCase())
        )
      ),
    [scheduleKeyword]
  );

  const selectedTask =
    filteredScheduleTasks.find((item) => item.key === selectedTaskKey) ??
    scheduleTasks.find((item) => item.key === selectedTaskKey) ??
    filteredScheduleTasks[0] ??
    scheduleTasks[0];

  return (
    <div className="app-detail-page">
      <div className="app-detail-tabs">
        {tabs.map((tab) => (
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
        {activeTab === 'permission' ? (
          <div className="permission-layout">
            <div className="permission-topbar">
              <div className="permission-mode-group">
                <button
                  type="button"
                  className={`permission-mode-button ${permissionViewMode === 'role' ? 'is-active' : ''}`}
                  onClick={() => setPermissionViewMode('role')}
                >
                  按角色查看
                </button>
                <button
                  type="button"
                  className={`permission-mode-button ${permissionViewMode === 'group' ? 'is-active' : ''}`}
                  onClick={() => setPermissionViewMode('group')}
                >
                  按权限组查看
                </button>
              </div>

              <Button className="light-action-button" disabled>
                保存
              </Button>
            </div>

            <div className="permission-content">
              <div className="permission-sidebar">
                <div className="permission-search-row">
                  <Input placeholder="搜索" className="permission-search-input" />
                  <button type="button" className="permission-search-button" aria-label="搜索权限对象">
                    <SearchOutlined />
                  </button>
                </div>

                <div className="permission-tree">
                  {permissionTree.map((group) => (
                    <div key={group.key} className="permission-tree-group">
                      <div className="permission-tree-group-title">
                        <span className="permission-tree-arrow">▾</span>
                        <FolderOpenOutlined />
                        <span>{group.label}</span>
                      </div>

                      <div className="permission-tree-items">
                        {group.children.map((item) => (
                          <button
                            key={item}
                            type="button"
                            className={`permission-tree-item ${selectedPermissionSubject === item ? 'is-active' : ''}`}
                            onClick={() => setSelectedPermissionSubject(item)}
                          >
                            <span className="permission-tree-item-icon">⌘</span>
                            <span>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="permission-main">
                <div className="permission-linked-row">
                  <span className="permission-linked-label">已关联:</span>
                  <span className="permission-linked-tag">匿名权限组</span>
                </div>

                <div className="permission-table-search">
                  <Input
                    value={permissionKeyword}
                    onChange={(event) => setPermissionKeyword(event.target.value)}
                    placeholder="搜索..."
                    className="permission-table-search-input"
                  />
                </div>

                <div className="permission-table-shell">
                  <table className="design-table permission-table">
                    <colgroup>
                      <col style={{ width: '46px' }} />
                      <col style={{ width: '260px' }} />
                      <col style={{ width: '1fr' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="checkbox-col">
                          <input type="checkbox" checked readOnly />
                        </th>
                        <th>文件夹</th>
                        <th>权限组</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="checkbox-col">
                          <input type="checkbox" checked readOnly />
                        </td>
                        <td />
                        <td className="permission-group-cell">
                          <label className="permission-checkbox-item">
                            <input type="checkbox" checked readOnly />
                            <span>匿名权限组</span>
                          </label>
                          <label className="permission-checkbox-item">
                            <input type="checkbox" />
                            <span>默认权限组</span>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'general' ? (
          <div className="general-settings-panel">
            <div className="general-settings-tabs general-settings-button-group">
              {generalTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`general-settings-tab ${activeGeneralTab === tab.key ? 'is-active' : ''}`}
                  onClick={() => setActiveGeneralTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="general-settings-content">
              {activeGeneralTab === 'login' ? (
                <div className="plain-settings-block">
                  <div className="login-mode-row">
                    <div className="field-label plain-label">登录模式</div>
                    <Radio.Group value={loginMode} onChange={(event) => setLoginMode(event.target.value)}>
                      <Radio value="normal">普通认证</Radio>
                      <Radio value="third-party">三方登录用户集成</Radio>
                    </Radio.Group>
                  </div>

                  <div className="general-subtab-actions">
                    <Button type="primary" className="primary-action-button">
                      保存
                    </Button>
                  </div>
                </div>
              ) : null}

              {activeGeneralTab === 'custom' ? (
                <div className="custom-settings-panel">
                  <div className="table-shell custom-settings-table-shell">
                    <table className="design-table custom-settings-table">
                      <colgroup>
                        <col style={{ width: '160px' }} />
                        <col style={{ width: '170px' }} />
                        <col style={{ width: '200px' }} />
                        <col style={{ width: '90px' }} />
                        <col style={{ width: '80px' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>配置名称</th>
                          <th>配置说明</th>
                          <th>配置值</th>
                          <th>加密</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {customRows.map((row) => (
                          <tr key={row.key}>
                            <td>{row.name}</td>
                            <td>{row.description}</td>
                            <td>{row.value}</td>
                            <td>{row.encrypted}</td>
                            <td className="custom-action-cell">
                              <button
                                type="button"
                                className="ghost-icon-button"
                                aria-label={`编辑配置${row.name}`}
                              >
                                <EditOutlined />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {activeGeneralTab === 'mail' ? (
                <div className="mail-settings-panel">
                  <div className="mail-section-title">发件基础信息</div>
                  <div className="mail-form-grid">
                    <div className="mail-form-item">
                      <label>发件人邮箱</label>
                      <Input placeholder="例如：no-reply@example.com" />
                    </div>
                    <div className="mail-form-item">
                      <label>发件人名称</label>
                      <Input placeholder="例如：Phoenix 通知中心" />
                    </div>
                    <div className="mail-form-item">
                      <label>邮件主题前缀</label>
                      <Input placeholder="例如：[Phoenix]" />
                    </div>
                  </div>

                  <div className="mail-section-title mail-section-spacing">邮件服务器配置</div>
                  <div className="mail-form-grid">
                    <div className="mail-form-item">
                      <label>服务类型</label>
                      <Select defaultValue="常规" options={[{ label: '常规', value: '常规' }]} />
                    </div>
                    <div className="mail-form-item">
                      <label>SMTP 地址</label>
                      <Input defaultValue="smtp.163.com" />
                    </div>
                    <div className="mail-form-item">
                      <label>SMTP 端口</label>
                      <Input defaultValue="25" />
                    </div>
                    <div className="mail-form-item">
                      <label>用户名</label>
                      <Input defaultValue="18700470462@163.com" />
                    </div>
                    <div className="mail-form-item">
                      <label>密码</label>
                      <Input.Password defaultValue="password" iconRender={() => <EyeInvisibleOutlined />} />
                    </div>
                    <div className="mail-form-item">
                      <label>安全连接</label>
                      <div className="mail-switch-row">
                        <Switch checked={false} />
                        <span>启用 SSL/TLS 加密连接以提升邮件传输安全性</span>
                      </div>
                    </div>
                  </div>

                  <div className="mail-section-title mail-section-spacing">测试邮件</div>
                  <div className="mail-test-row">
                    <div className="mail-form-item mail-test-input">
                      <label>测试收件人</label>
                      <Input defaultValue="Alex.Li@developertools.com" />
                    </div>
                    <Button className="light-action-button mail-test-button">发送测试邮件</Button>
                  </div>

                  <div className="general-subtab-actions">
                    <Button type="primary" className="primary-action-button">
                      保存
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {activeTab === 'datasource' ? (
          <div className="datasource-layout">
            <div className="datasource-list-panel">
              <div className="datasource-search-row">
                <Input
                  value={dataSourceKeyword}
                  onChange={(event) => setDataSourceKeyword(event.target.value)}
                  placeholder="请输入搜索关键字"
                  suffix={<SearchOutlined />}
                  className="datasource-search-input"
                />
              </div>

              <div className="table-shell datasource-table-shell">
                <table className="design-table datasource-table">
                  <colgroup>
                    <col style={{ width: '90px' }} />
                    <col style={{ width: '120px' }} />
                    <col style={{ width: '300px' }} />
                    <col style={{ width: '160px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>名称</th>
                      <th>数据源类型</th>
                      <th>JDBC URL</th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDataSources.map((item) => (
                      <tr
                        key={item.key}
                        className={item.key === selectedDataSource.key ? 'is-selected' : ''}
                        onClick={() => setSelectedDataSourceKey(item.key)}
                      >
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.jdbcUrl}</td>
                        <td>{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="datasource-detail-panel">
              <div className="datasource-detail-header">
                <div className="datasource-detail-title">{selectedDataSource.name}</div>
                <Button type="primary" className="primary-action-button" icon={<EditOutlined />}>
                  编辑
                </Button>
              </div>

              <div className="datasource-detail-grid">
                <DetailRow label="数据源名称" value={selectedDataSource.databaseName || '-'} />
                <DetailRow label="数据源描述" value={selectedDataSource.description} />
                <DetailRow label="数据源类型" value={selectedDataSource.type} />
                <DetailRow label="服务器名" value={selectedDataSource.server || '-'} />
                <DetailRow label="用户名" value={selectedDataSource.username || '-'} />
                <DetailRow label="密码" value={selectedDataSource.password || '-'} />
                <DetailRow label="端口号" value={selectedDataSource.port || '-'} />
                <DetailRow label="数据库" value={selectedDataSource.database || '-'} />
                <DetailRow label="URL" value={selectedDataSource.url} />
                <DetailRow label="JDBC URL参数" value={selectedDataSource.jdbcParams} multiline />
              </div>

              <div className="datasource-detail-divider" />

              <div className="datasource-detail-grid datasource-detail-grid-secondary">
                <DetailRow label="启用连接池" value={selectedDataSource.connectionPoolEnabled} />
                <DetailRow label="最大等待时间" value={selectedDataSource.maxWaitTime} />
                <DetailRow label="Socket超时时间" value={selectedDataSource.socketTimeout} />
                <DetailRow label="最大连接数" value={selectedDataSource.maxConnections} />
                <DetailRow label="最少空闲连接数" value={selectedDataSource.minIdleConnections} />
                <DetailRow label="初始化连接数" value={selectedDataSource.initialConnections} />
                <DetailRow label="自定义属性" value={selectedDataSource.customProperties} />
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'schedule' ? (
          <div className="schedule-layout">
            <div className="schedule-list-panel">
              <div className="schedule-toolbar">
                <Input
                  value={scheduleKeyword}
                  onChange={(event) => setScheduleKeyword(event.target.value)}
                  placeholder="请输入搜索关键字"
                  suffix={<SearchOutlined />}
                  className="datasource-search-input"
                />
              </div>

              <div className="schedule-table-actions">
                <button type="button" className="ghost-icon-button schedule-settings-button" aria-label="计划任务设置">
                  <SettingOutlined />
                </button>
              </div>

              <div className="table-shell schedule-table-shell">
                <table className="design-table schedule-table">
                  <colgroup>
                    <col style={{ width: '330px' }} />
                    <col style={{ width: '150px' }} />
                    <col style={{ width: '200px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>计划任务</th>
                      <th>启用</th>
                      <th>触发方式详情</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="schedule-folder-row">
                      <td colSpan={3}>
                        <span className="schedule-folder-content">
                          <span className="schedule-folder-toggle">⊟</span>
                          <FolderOpenOutlined />
                          <span>{selectedTask.folder}</span>
                        </span>
                      </td>
                    </tr>
                    {filteredScheduleTasks.map((task) => (
                      <tr
                        key={task.key}
                        className={task.key === selectedTask.key ? 'is-selected' : ''}
                        onClick={() => setSelectedTaskKey(task.key)}
                      >
                        <td className="schedule-task-name-cell">{task.name}</td>
                        <td>
                          <span className="status-pill is-running">{task.enabled}</span>
                        </td>
                        <td>{task.triggerDetail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="schedule-detail-panel">
              <div className="schedule-detail-header">
                <div className="datasource-detail-title">{selectedTask.name}</div>
                <div className="schedule-detail-actions">
                  <Button type="primary" className="primary-action-button" icon={<PlayCircleOutlined />}>
                    运行
                  </Button>
                  <Button className="light-action-button" icon={<PauseCircleOutlined />}>
                    停用
                  </Button>
                  <Button type="primary" className="primary-action-button" icon={<EditOutlined />}>
                    编辑
                  </Button>
                </div>
              </div>

              <div className="schedule-detail-section">
                <div className="mail-section-title">状态</div>
                <div className="schedule-detail-text">{selectedTask.status}</div>
              </div>

              <div className="datasource-detail-divider" />

              <div className="schedule-detail-section">
                <div className="mail-section-title">描述</div>
                <div className="schedule-detail-text">{selectedTask.description}</div>
              </div>

              <div className="datasource-detail-divider" />

              <div className="schedule-detail-section">
                <div className="mail-section-title">触发方式</div>
                <div className="datasource-detail-grid schedule-detail-grid">
                  <DetailRow label="调度类型" value={selectedTask.scheduleType} />
                  <DetailRow label="开始时间" value={selectedTask.startTime} />
                  <DetailRow label="结束时间" value={selectedTask.endTime} />
                  <DetailRow label="详情" value={selectedTask.detail} />
                  <DetailRow label="超时时间" value={selectedTask.timeout} />
                  <DetailRow label="优先级" value={selectedTask.priority} />
                </div>
              </div>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className={`datasource-detail-row ${multiline ? 'is-multiline' : ''}`}>
      <div className="datasource-detail-label">{label}:</div>
      <div className="datasource-detail-value">{value}</div>
    </div>
  );
}
