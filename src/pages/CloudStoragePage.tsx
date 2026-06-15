import { useMemo, useState } from 'react';
import { Button, Dropdown, Form, Input, Modal, Select, message } from 'antd';
import {
  CloudOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { CloudStorageItem } from '../data/mock';
import { useStorageSettings } from '../components/StorageSettingsContext';

const providerOptions = [
  { label: 'Qiniu Kodo', value: 'Qiniu Kodo' },
  { label: 'Mock Cloud Storage', value: 'Mock Cloud Storage' },
];

type CloudStorageFormValues = {
  name: string;
  provider: string;
  region: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  domain?: string;
};

export function CloudStoragePage() {
  const { cloudStorageItems, setCloudStorageItems } = useStorageSettings();
  const [editingItem, setEditingItem] = useState<CloudStorageItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<CloudStorageItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [secretVisible, setSecretVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [form] = Form.useForm<CloudStorageFormValues>();

  const sortedItems = useMemo(
    () =>
      cloudStorageItems.filter((item) =>
        [item.name, item.provider, item.region, item.bucket, item.domain].some((value) =>
          value.toLowerCase().includes(keyword.toLowerCase())
        )
      ),
    [cloudStorageItems, keyword]
  );

  const openAddModal = () => {
    setEditingItem(null);
    setSecretVisible(false);
    setModalOpen(true);
    form.setFieldsValue({
      provider: 'Qiniu Kodo',
      name: '',
      region: '',
      bucket: '',
      accessKey: '',
      secretKey: '',
      domain: '',
    });
  };

  const openEditModal = (item: CloudStorageItem) => {
    setEditingItem(item);
    setSecretVisible(false);
    setModalOpen(true);
    form.setFieldsValue({
      name: item.name,
      provider: item.provider,
      region: item.region,
      bucket: item.bucket,
      accessKey: item.accessKey,
      secretKey: item.secretKey,
      domain: item.domain,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setSecretVisible(false);
    form.resetFields();
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const nextItem: CloudStorageItem = {
        key: editingItem?.key ?? `storage-${Date.now()}`,
        name: values.name,
        provider: values.provider,
        capabilities:
          values.provider === 'Qiniu Kodo'
            ? [
                { key: 'public-url', label: '公开 URL' },
                { key: 'read-write', label: '读/写' },
              ]
            : [{ key: 'basic-file', label: '基础文件操作' }],
        updatedAt: formatNow(),
        region: values.region,
        bucket: values.bucket,
        accessKey: values.accessKey,
        secretKey: values.secretKey,
        domain: values.domain ?? '',
      };

      setCloudStorageItems((prev) =>
        editingItem
          ? prev.map((item) => (item.key === editingItem.key ? nextItem : item))
          : [nextItem, ...prev]
      );

      message.success(editingItem ? '云存储配置修改成功' : '云存储配置添加成功');
      closeModal();
    } catch {
      return;
    }
  };

  const onTest = (item: CloudStorageItem) => {
    message.success(`${item.name} 连接测试成功`);
  };

  const onTestCurrentConfig = async () => {
    try {
      const values = await form.validateFields();
      message.success(`${values.name || '当前配置'} 连接测试成功`);
    } catch {
      return;
    }
  };

  const confirmDelete = () => {
    if (!deletingItem) {
      return;
    }

    setCloudStorageItems((prev) => prev.filter((current) => current.key !== deletingItem.key));
    setDeletingItem(null);
    message.success('云存储配置已删除');
  };

  const getMoreMenuItems = (item: CloudStorageItem) => [
    {
      key: 'test',
      label: '测试连接',
      onClick: () => onTest(item),
    },
    {
      key: 'delete',
      label: '删除',
      onClick: () => setDeletingItem(item),
    },
  ];

  return (
    <div className="cloud-storage-page">
      <div className="cloud-storage-toolbar">
        <label className="cloud-storage-search-input">
          <input
            placeholder="请输入搜索关键字"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <SearchOutlined />
        </label>
        <div className="list-actions">
          <Button
            type="primary"
            className="primary-action-button"
            icon={<PlusOutlined />}
            onClick={openAddModal}
          >
            添加配置
          </Button>
        </div>
      </div>

      <div className="table-shell cloud-storage-table-shell">
        <table className="design-table cloud-storage-table">
          <colgroup>
            <col style={{ width: '50%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>配置名称</th>
              <th>类型</th>
              <th>更新时间</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.key}>
                <td>
                  <span className="cloud-storage-name">
                    <CloudOutlined />
                    <span>{item.name}</span>
                  </span>
                </td>
                <td>{item.provider}</td>
                <td>{item.updatedAt}</td>
                <td className="user-action-cell cloud-storage-action-cell">
                  <button
                    type="button"
                    className="ghost-icon-button"
                    aria-label={`编辑${item.name}`}
                    onClick={() => openEditModal(item)}
                  >
                    <EditOutlined />
                  </button>
                  <Dropdown
                    menu={{ items: getMoreMenuItems(item) }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <button type="button" className="ghost-icon-button" aria-label={`更多${item.name}`}>
                      <MoreOutlined />
                    </button>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title={editingItem ? '修改云存储配置' : '添加云存储配置'}
        open={modalOpen}
        onCancel={closeModal}
        width={560}
        className="cloud-storage-modal"
        footer={
          <div className="cloud-storage-modal-footer">
            <Button className="light-action-button" onClick={onTestCurrentConfig}>
              测试连接
            </Button>
            <div className="cloud-storage-modal-footer-actions">
              <Button onClick={closeModal}>取消</Button>
              <Button type="primary" onClick={onSubmit}>
                确定
              </Button>
            </div>
          </div>
        }
      >
        <div className="cloud-storage-modal-body">
          <Form form={form} layout="vertical" requiredMark>
            <Form.Item
              name="name"
              label="配置名称"
              rules={[{ required: true, message: '请输入配置名称' }]}
            >
              <Input placeholder="请输入配置名称" />
            </Form.Item>

            <Form.Item
              name="provider"
              label="Provider 类型"
              rules={[{ required: true, message: '请选择 Provider 类型' }]}
            >
              <Select options={providerOptions} placeholder="请选择 Provider 类型" />
            </Form.Item>

            <Form.Item
              name="region"
              label="存储区域"
              rules={[{ required: true, message: '请输入存储区域' }]}
            >
              <Input placeholder="请输入存储区域" />
            </Form.Item>

            <Form.Item
              name="bucket"
              label="存储空间"
              rules={[{ required: true, message: '请输入存储空间' }]}
            >
              <Input placeholder="请输入存储空间" />
            </Form.Item>

            <Form.Item
              name="accessKey"
              label="Access Key"
              rules={[{ required: true, message: '请输入 Access Key' }]}
            >
              <Input placeholder="请输入 Access Key" />
            </Form.Item>

            <Form.Item
              name="secretKey"
              label="Secret Key"
              rules={[{ required: true, message: '请输入 Secret Key' }]}
            >
              <Input
                placeholder="请输入 Secret Key"
                type={secretVisible ? 'text' : 'password'}
                suffix={
                  <EyeInvisibleOutlined
                    className="cloud-storage-secret-toggle"
                    onClick={() => setSecretVisible((prev) => !prev)}
                  />
                }
              />
            </Form.Item>

            <Form.Item name="domain" label="访问域名">
              <Input placeholder="请输入访问域名" />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        title="删除云存储配置"
        open={Boolean(deletingItem)}
        onOk={confirmDelete}
        onCancel={() => setDeletingItem(null)}
        okText="删除"
        cancelText="取消"
      >
        <div>确认删除云存储配置{deletingItem ? `“${deletingItem.name}”` : ''}吗？</div>
      </Modal>
    </div>
  );
}

function formatNow() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');

  return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
