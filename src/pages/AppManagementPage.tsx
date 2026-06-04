import { useMemo, useState } from 'react';
import { Button, message } from 'antd';
import {
  ExclamationCircleOutlined,
  MoreOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { applications as initialApplications, type AppItem } from '../data/mock';

const pagerItems = ['1', '2', '3', '4', '5'];

const statusClassName: Record<AppItem['status'], string> = {
  运行中: 'is-running',
  启动中: 'is-starting',
  已停止: 'is-stopped',
  异常: 'is-error',
};

export function AppManagementPage() {
  const [apps] = useState<AppItem[]>(initialApplications);

  const stats = useMemo(
    () => ({
      total: apps.length,
      running: apps.filter((item) => item.status === '运行中').length,
      stopped: apps.filter((item) => item.status === '已停止').length,
      abnormal: apps.filter((item) => item.status === '异常').length,
    }),
    [apps]
  );

  return (
    <div className="app-page">
      <div className="stats-grid">
        <StatCard icon={<AppstoreOutlined />} tone="blue" label="总应用数" value={stats.total} />
        <StatCard icon={<PlayCircleOutlined />} tone="green" label="运行中" value={stats.running} />
        <StatCard icon={<PauseCircleOutlined />} tone="gray" label="已停止" value={stats.stopped} />
        <StatCard icon={<ExclamationCircleOutlined />} tone="red" label="异常" value={stats.abnormal} />
      </div>

      <div className="list-section-heading">
        <div className="section-subtitle">应用列表</div>
        <div className="list-actions">
          <Button
            type="primary"
            className="primary-action-button"
            icon={<RocketOutlined />}
            onClick={() => message.success('离线应用发布已触发')}
          >
            离线应用发布
          </Button>
        </div>
      </div>

      <div className="table-shell">
        <table className="design-table">
          <thead>
            <tr>
              <th>应用名称</th>
              <th>状态</th>
              <th>应用地址</th>
              <th>端口</th>
              <th>启动时间</th>
              <th>发布时间</th>
              <th>最后健康检查时间</th>
              <th>版本</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.key}>
                <td>
                  <Link to={`/applications/${app.key}`} className="table-link">
                    {app.name}
                  </Link>
                </td>
                <td>
                  <span className={`status-pill ${statusClassName[app.status]}`}>{app.status}</span>
                </td>
                <td>{app.address}</td>
                <td>{app.port}</td>
                <td>{app.startTime}</td>
                <td>{app.publishTime}</td>
                <td>{app.healthTime}</td>
                <td>{app.version}</td>
                <td className="action-cell">
                  <button type="button" className="ghost-icon-button" aria-label={`更多操作-${app.name}`}>
                    <MoreOutlined />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="table-pagination">
          <button type="button" className="pager-arrow" aria-label="上一页">
            ‹
          </button>
          {pagerItems.map((item) => (
            <button
              key={item}
              type="button"
              className={`pager-item ${item === '1' ? 'is-active' : ''}`}
            >
              {item}
            </button>
          ))}
          <button type="button" className="pager-arrow" aria-label="下一页">
            ›
          </button>
        </div>

        <button type="button" className="page-size-button">
          10 条/页
          <span>▾</span>
        </button>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  tone,
  label,
  value,
}: {
  icon: React.ReactNode;
  tone: 'blue' | 'green' | 'gray' | 'red';
  label: string;
  value: number;
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-icon-${tone}`}>{icon}</div>
      <div className="stat-meta">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}
