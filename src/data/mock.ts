export type UserItem = {
  key: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: '启用' | '禁用';
  role: string;
};

export const users: UserItem[] = [
  {
    key: 'u1',
    username: '张三',
    fullname: '张三',
    email: '42346456@qq.com',
    phone: '13533456765',
    status: '启用',
    role: '角色1',
  },
  {
    key: 'u2',
    username: '李四',
    fullname: '李四',
    email: '42346456@qq.com',
    phone: '13533456765',
    status: '禁用',
    role: '角色1',
  },
];

export type RoleItem = {
  key: string;
  title: string;
  category: string;
  members: UserItem[];
};

export const initialRoles: RoleItem[] = [
  {
    key: 'role-1',
    title: '角色1',
    category: '分类1',
    members: [users[0], users[1]],
  },
  {
    key: 'role-2',
    title: '角色2',
    category: '分类1',
    members: [],
  },
  {
    key: 'role-3',
    title: '角色3',
    category: '分类1',
    members: [],
  },
];

export type AppItem = {
  key: string;
  name: string;
  status: '运行中' | '启动中' | '已停止' | '异常';
  address: string;
  port: string;
  startTime: string;
  publishTime: string;
  healthTime: string;
  version: string;
};

export const applications: AppItem[] = [
  {
    key: 'app1',
    name: '应用1',
    status: '运行中',
    address: 'http://10.32.6.108:8001',
    port: '8001',
    startTime: '2026/2/24 09:19:36',
    publishTime: '2026/2/24 09:19:36',
    healthTime: '2026/2/25 15:34:57',
    version: '-',
  },
  {
    key: 'app2',
    name: '应用2',
    status: '启动中',
    address: 'http://10.32.6.108:8000',
    port: '8000',
    startTime: '2026/2/24 09:19:36',
    publishTime: '2026/2/24 09:19:36',
    healthTime: '2026/2/25 15:34:57',
    version: '-',
  },
];
