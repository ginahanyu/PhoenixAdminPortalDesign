import { Button, DatePicker, Input, Select } from 'antd';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';

const logRows = Array.from({ length: 30 }, (_, index) => ({
  key: index,
  time: `2026-06-04 00:0${Math.floor(index / 6)}:${(index * 6 + 2).toString().padStart(2, '0')}.${(
    200 +
    index * 17
  )
    .toString()
    .slice(0, 3)}`,
  level: 'ERROR',
  route: 'RegisterNotificationApi',
  url: 'https://127.0.0.1/office365v/bpm/local/api/RegisterNotification',
  message: 'The SSL connection could not be established, see inner exception.',
}));

export function DiagnosticLogsPanel() {
  return (
    <div className="diagnostic-logs-panel">
      <div className="diagnostic-toolbar">
        <div className="diagnostic-filter-item">
          <span className="diagnostic-filter-label">应用或进程:</span>
          <Select
            placeholder="请选择应用或进程"
            className="diagnostic-select diagnostic-select-wide"
            options={[{ label: 'Phoenix Server', value: 'phoenix-server' }]}
          />
        </div>

        <div className="diagnostic-filter-item">
          <span className="diagnostic-filter-label">开始时间:</span>
          <DatePicker showTime className="diagnostic-date" />
        </div>

        <div className="diagnostic-filter-item">
          <span className="diagnostic-filter-label">结束时间:</span>
          <DatePicker className="diagnostic-date" />
        </div>

        <div className="diagnostic-filter-item">
          <span className="diagnostic-filter-label">级别:</span>
          <Select
            placeholder="请选择级别"
            className="diagnostic-select"
            options={[
              { label: '追踪', value: 'trace' },
              { label: '调试', value: 'debug' },
              { label: '信息', value: 'info' },
              { label: '警告', value: 'warn' },
              { label: '错误', value: 'error' },
            ]}
          />
        </div>

        <div className="diagnostic-filter-item diagnostic-filter-keyword">
          <span className="diagnostic-filter-label">关键字:</span>
          <Input placeholder="请选择关键字" />
        </div>

        <div className="diagnostic-toolbar-actions">
          <Button className="light-action-button" icon={<ReloadOutlined />}>
            重置
          </Button>
          <Button type="primary" className="primary-action-button">
            查询
          </Button>
          <button type="button" className="diagnostic-settings-icon" aria-label="诊断日志设置">
            <SettingOutlined />
          </button>
        </div>
      </div>

      <div className="diagnostic-log-shell">
        {logRows.map((row) => (
          <div key={row.key} className="diagnostic-log-row">
            <span className="diagnostic-log-time">{row.time}</span>
            <span className="diagnostic-log-level">[{row.level}]</span>
            <span className="diagnostic-log-text">- The api</span>
            <a href="/" onClick={(event) => event.preventDefault()} className="diagnostic-log-link">
              [{row.route}]
            </a>
            <span className="diagnostic-log-text">Route:</span>
            <a href="/" onClick={(event) => event.preventDefault()} className="diagnostic-log-link">
              [{row.url}]
            </a>
            <span className="diagnostic-log-text">requested in error:</span>
            <a href="/" onClick={(event) => event.preventDefault()} className="diagnostic-log-link">
              [{row.message}]
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
