import { EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Input, Select, Switch } from 'antd';

type MailServerConfigPanelProps = {
  showSaveButton?: boolean;
};

export function MailServerConfigPanel({
  showSaveButton = true,
}: MailServerConfigPanelProps) {
  return (
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

      {showSaveButton ? (
        <div className="general-subtab-actions">
          <Button type="primary" className="primary-action-button">
            保存
          </Button>
        </div>
      ) : null}
    </div>
  );
}
