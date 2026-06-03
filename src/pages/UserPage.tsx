import { useMemo, useState } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { users as initialUsers, type UserItem } from '../data/mock';

const pagerItems = ['1', '2', '3', '4', '5'];
const visibleSelectedLimit = 5;

export function UserPage() {
  const [dataSource, setDataSource] = useState<UserItem[]>(initialUsers);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(['u1', 'u2']);
  const [keyword, setKeyword] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form] = Form.useForm();

  const filteredData = useMemo(
    () =>
      dataSource.filter((item) =>
        [item.username, item.fullname, item.email, item.phone, item.role].some((value) =>
          value.includes(keyword)
        )
      ),
    [dataSource, keyword]
  );

  const selectedItems = dataSource.filter((item) => selectedRowKeys.includes(item.key));
  const visibleSelectedItems = selectedItems.slice(0, visibleSelectedLimit);
  const collapsedSelectedCount = Math.max(selectedItems.length - visibleSelectedLimit, 0);
  const allChecked =
    filteredData.length > 0 && filteredData.every((item) => selectedRowKeys.includes(item.key));

  const onDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的用户');
      return;
    }

    setDataSource((prev) => prev.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    message.success('已删除所选用户');
  };

  const onAdd = async () => {
    try {
      const values = await form.validateFields();
      const next: UserItem = {
        key: `u${Date.now()}`,
        username: values.username,
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        status: values.status,
        role: values.role,
      };

      setDataSource((prev) => [...prev, next]);
      setShowAdd(false);
      form.resetFields();
      message.success('添加用户成功');
    } catch {
      return;
    }
  };

  return (
    <div className="user-page">
      <div className="selected-user-section">
        <div className="field-label">已选用户</div>
        <div className="selected-user-inline">
          {visibleSelectedItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className="selected-user-tag"
              onClick={() => setSelectedRowKeys((prev) => prev.filter((key) => key !== item.key))}
            >
              <span>{item.username}</span>
              <CloseOutlined />
            </button>
          ))}

          {collapsedSelectedCount > 0 ? (
            <span className="selected-user-more">+{collapsedSelectedCount}</span>
          ) : null}
        </div>
      </div>

      <div className="user-toolbar">
        <label className="search-input user-search-input">
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
            onClick={() => setShowAdd(true)}
          >
            添加用户
          </Button>
          <Button className="light-action-button" icon={<DeleteOutlined />} onClick={onDelete}>
            删除用户
          </Button>
        </div>
      </div>

      <div className="table-shell user-table-shell">
        <table className="design-table user-design-table">
          <colgroup>
            <col style={{ width: '56px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '240px' }} />
            <col style={{ width: '190px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '104px' }} />
          </colgroup>
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={(event) => {
                    setSelectedRowKeys(
                      event.target.checked ? filteredData.map((item) => item.key) : []
                    );
                  }}
                />
              </th>
              <th>用户名</th>
              <th>全名</th>
              <th>电子邮箱</th>
              <th>手机号</th>
              <th>状态</th>
              <th>角色</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => {
              const checked = selectedRowKeys.includes(item.key);
              return (
                <tr key={item.key}>
                  <td className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => {
                        setSelectedRowKeys((prev) =>
                          event.target.checked
                            ? [...new Set([...prev, item.key])]
                            : prev.filter((key) => key !== item.key)
                        );
                      }}
                    />
                  </td>
                  <td>{item.username}</td>
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <span
                      className={`status-pill ${item.status === '启用' ? 'is-running' : 'is-stopped'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span className="role-pill">{item.role}</span>
                  </td>
                  <td className="user-action-cell">
                    <button type="button" className="ghost-icon-button" aria-label={`编辑${item.username}`}>
                      <EditOutlined />
                    </button>
                    <button type="button" className="ghost-icon-button" aria-label={`更多${item.username}`}>
                      <MoreOutlined />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer user-table-footer">
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
          <span>⌄</span>
        </button>
      </div>

      <Modal
        title="添加用户"
        open={showAdd}
        onOk={onAdd}
        onCancel={() => {
          setShowAdd(false);
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form} initialValues={{ status: '启用', role: '角色名称' }}>
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fullname" label="全名" rules={[{ required: true, message: '请输入全名' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="电子邮箱"
            rules={[{ required: true, type: 'email', message: '请输入有效邮箱' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select
              options={[
                { label: '启用', value: '启用' },
                { label: '禁用', value: '禁用' },
              ]}
            />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
