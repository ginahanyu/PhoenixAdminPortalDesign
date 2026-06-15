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

export type CloudStorageCapability = {
  key: string;
  label: string;
};

export type CloudStorageItem = {
  key: string;
  name: string;
  provider: string;
  capabilities: CloudStorageCapability[];
  updatedAt: string;
  region: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  domain: string;
};

export const cloudStorages: CloudStorageItem[] = [
  {
    key: 'storage-1',
    name: '111',
    provider: 'Mock Cloud Storage',
    capabilities: [{ key: 'basic-file', label: '基础文件操作' }],
    updatedAt: '2026/6/9 10:15:26',
    region: 'cn-east-1',
    bucket: 'mock-storage-assets',
    accessKey: 'mock-access-key-01',
    secretKey: 'mock-secret-key-01',
    domain: 'https://mock-storage.example.com',
  },
  {
    key: 'storage-2',
    name: '人大多发货单号发给',
    provider: 'Mock Cloud Storage',
    capabilities: [{ key: 'basic-file', label: '基础文件操作' }],
    updatedAt: '2026/6/9 10:26:11',
    region: 'cn-north-1',
    bucket: 'shipment-documents',
    accessKey: 'mock-access-key-02',
    secretKey: 'mock-secret-key-02',
    domain: 'https://shipment-storage.example.com',
  },
  {
    key: 'storage-3',
    name: '七牛云',
    provider: 'Qiniu Kodo',
    capabilities: [
      { key: 'public-url', label: '公开 URL' },
      { key: 'read-write', label: '读/写' },
    ],
    updatedAt: '2026/6/9 15:34:09',
    region: 'z0',
    bucket: 'phoenix-admin',
    accessKey: 'qiniu-access-key',
    secretKey: 'qiniu-secret-key',
    domain: 'https://cdn.phoenix-admin.example.com',
  },
];
