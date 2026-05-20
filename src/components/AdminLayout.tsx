import {
  AppstoreOutlined,
  DownOutlined,
  LeftOutlined,
  MonitorOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { applications } from '../data/mock';

type MenuLink = {
  key: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  indent?: boolean;
};

const menuLinks: MenuLink[] = [
  { key: 'users', label: '用户', path: '/users', indent: true },
  { key: 'roles', label: '角色', path: '/roles', indent: true },
  { key: 'organization', label: '组织', indent: true },
  { key: 'attributes', label: '自定义属性', indent: true },
  {
    key: 'applications',
    label: '应用管理',
    path: '/applications',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'monitor',
    label: '系统监控',
    icon: <MonitorOutlined />,
  },
];

const pageTitles: Record<string, string> = {
  users: '用户',
  roles: '角色',
  applications: '应用管理',
};

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const applicationMatch = useMatch('/applications/:appKey');

  const selectedKey = location.pathname.includes('/roles')
    ? 'roles'
    : location.pathname.includes('/applications')
      ? 'applications'
      : 'users';

  const applicationTitle = applicationMatch
    ? applications.find((item) => item.key === applicationMatch.params.appKey)?.name ?? '应用'
    : null;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-block">
          <div className="brand-mark" />
          <div className="brand-text">Phoenix Server</div>
        </div>

        <div className="nav-group">
          <div className="nav-group-header">
            <div className="nav-group-title">
              <UserOutlined />
              <span>内置用户</span>
            </div>
            <DownOutlined className="nav-group-arrow" />
          </div>

          <nav className="nav-list">
            {menuLinks.map((item) => {
              const active = item.key === selectedKey;
              const className = [
                'nav-item',
                item.indent ? 'nav-item-indent' : '',
                active ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ');

              const content = (
                <span className="nav-item-label">
                  {item.icon ? <span className="nav-item-icon">{item.icon}</span> : null}
                  <span>{item.label}</span>
                </span>
              );

              return item.path ? (
                <Link key={item.key} to={item.path} className={className}>
                  {content}
                </Link>
              ) : (
                <div key={item.key} className={className}>
                  {content}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          {applicationTitle ? (
            <div className="page-heading-with-back">
              <Link to="/applications" className="topbar-back-link" aria-label="返回应用列表">
                <LeftOutlined />
              </Link>
              <h1 className="page-heading">{applicationTitle}</h1>
            </div>
          ) : (
            <h1 className="page-heading">{pageTitles[selectedKey] ?? '用户'}</h1>
          )}

          <div className="topbar-user">
            <UserOutlined />
            <span>admin</span>
            <DownOutlined className="topbar-user-arrow" />
          </div>
        </header>

        <section className="admin-content">{children}</section>
      </main>
    </div>
  );
}
