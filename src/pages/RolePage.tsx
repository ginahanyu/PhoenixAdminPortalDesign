import { useMemo, useState } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import {
  EditOutlined,
  FolderOpenOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { initialRoles, users as initialUsers, type RoleItem, type UserItem } from '../data/mock';

const pagerItems = ['1', '2', '3', '4', '5'];

export function RolePage() {
  const [roles, setRoles] = useState<RoleItem[]>(initialRoles);
  const [selectedRoleKey, setSelectedRoleKey] = useState('role-1');
  const [keyword, setKeyword] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form] = Form.useForm();

  const selectedRole = roles.find((role) => role.key === selectedRoleKey) ?? roles[0];

  const displayedMembers = useMemo(
    () =>
      selectedRole.members.filter((member) =>
        [member.username, member.fullname, member.email, member.phone].some((value) =>
          value.includes(keyword)
        )
      ),
    [keyword, selectedRole]
  );

  const notAssignedOptions = initialUsers
    .filter((user) => !selectedRole.members.some((member) => member.key === user.key))
    .map((item) => ({ label: item.username, value: item.key }));

  const onRemoveMember = (memberKey: string) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.key === selectedRole.key
          ? { ...role, members: role.members.filter((member) => member.key !== memberKey) }
          : role
      )
    );
    message.success('成员已移除');
  };

  const onAddMember = async () => {
    try {
      const values = await form.validateFields();
      const newMember = initialUsers.find((item) => item.key === values.userKey);
      if (!newMember) {
        return;
      }

      setRoles((prev) =>
        prev.map((role) =>
          role.key === selectedRole.key
            ? { ...role, members: [...role.members, newMember] }
            : role
        )
      );

      setShowAdd(false);
      form.resetFields();
      message.success('已添加成员');
    } catch {
      return;
    }
  };

  return (
    <div className="role-layout">
      <section className="role-tree-panel">
        <div className="role-search-row">
          <label className="search-input">
            <input placeholder="请输入搜索关键字" />
            <SearchOutlined />
          </label>
          <button type="button" className="icon-square-button" aria-label="新增角色">
            <PlusOutlined />
          </button>
        </div>

        <div className="role-tree">
          <div className="role-category">
            <div className="role-category-title">
              <FolderOpenOutlined />
              <span>{selectedRole.category}</span>
            </div>

            <div className="role-items">
              {roles.map((role) => {
                const active = role.key === selectedRoleKey;
                return (
                  <button
                    key={role.key}
                    type="button"
                    className={`role-item ${active ? 'is-active' : ''}`}
                    onClick={() => setSelectedRoleKey(role.key)}
                  >
                    <span className="role-item-main">
                      <UserOutlined />
                      <span>{role.title}</span>
                    </span>
                    {active ? <MoreOutlined className="role-item-more" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="role-content-panel">
        <div className="role-detail-header">
          <div className="role-name">
            <span>{selectedRole.title}</span>
            <EditOutlined />
          </div>
        </div>

        <div className="section-subtitle">当前成员</div>

        <div className="role-toolbar">
          <label className="search-input search-input-wide">
            <input
              placeholder="请输入搜索关键字"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <SearchOutlined />
          </label>

          <Button
            type="primary"
            className="primary-action-button"
            icon={<PlusOutlined />}
            onClick={() => setShowAdd(true)}
          >
            添加成员
          </Button>
        </div>

        <div className="table-shell">
          <table className="design-table">
            <thead>
              <tr>
                <th>用户名</th>
                <th>全名</th>
                <th>电子邮箱</th>
                <th>手机号</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {displayedMembers.map((member) => (
                <RoleMemberRow key={member.key} member={member} onRemove={onRemoveMember} />
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
            <span>⌄</span>
          </button>
        </div>
      </section>

      <Modal
        title="添加成员"
        open={showAdd}
        onOk={onAddMember}
        onCancel={() => {
          setShowAdd(false);
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="userKey"
            label="选择用户"
            rules={[{ required: true, message: '请选择一个用户' }]}
          >
            <Select options={notAssignedOptions} placeholder="请选择用户" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

function RoleMemberRow({
  member,
  onRemove,
}: {
  member: UserItem;
  onRemove: (memberKey: string) => void;
}) {
  return (
    <tr>
      <td>{member.username}</td>
      <td>{member.fullname}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
      <td className="action-cell">
        <button
          type="button"
          className="ghost-icon-button"
          onClick={() => onRemove(member.key)}
          aria-label={`删除${member.username}`}
        >
          <DeleteOutlined />
        </button>
      </td>
    </tr>
  );
}
