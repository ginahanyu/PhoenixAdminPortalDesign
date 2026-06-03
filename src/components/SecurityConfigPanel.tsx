import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';

const { TextArea } = Input;

type SecurityConfigPanelProps = {
  disabled?: boolean;
  showSaveButton?: boolean;
};

export function SecurityConfigPanel({
  disabled = false,
  showSaveButton = true,
}: SecurityConfigPanelProps) {
  return (
    <div className="security-settings-panel">
      <div className="security-form-grid">
        <div className="security-form-row">
          <div className="security-form-label">
            <span>Http Referer 允许列表</span>
            <QuestionCircleOutlined />
          </div>
          <div className="security-form-control">
            <TextArea
              disabled={disabled}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder={`配置哪些 URL 允许在 "referer" 请求头中使用，比如:
https://www.example.com*
http://localhost*`}
            />
          </div>
        </div>

        <div className="security-form-row">
          <div className="security-form-label">
            <span>iframe 跨域策略</span>
            <QuestionCircleOutlined />
          </div>
          <div className="security-form-control">
            <Select
              disabled={disabled}
              placeholder="请选择"
              defaultValue="same-origin"
              options={[
                { label: '同源限制', value: 'same-origin' },
                { label: '允许所有来源', value: 'allow-all' },
                { label: '禁止嵌入', value: 'deny' },
              ]}
            />
          </div>
        </div>

        <div className="security-form-row">
          <div className="security-form-label">
            <span>自定义 Http 响应头</span>
            <QuestionCircleOutlined />
          </div>
          <div className="security-form-control">
            <TextArea
              disabled={disabled}
              autoSize={{ minRows: 4, maxRows: 6 }}
              defaultValue={`Referrer-Policy:strict-origin-when-cross-origin
X-Content-Type-Options:nosniff`}
            />
          </div>
        </div>
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
