import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import type { SecuritySettings } from './SecuritySettingsContext';

const { TextArea } = Input;

type SecurityConfigPanelProps = {
  value: SecuritySettings;
  onChange?: (value: SecuritySettings) => void;
  disabled?: boolean;
  showSaveButton?: boolean;
};

export function SecurityConfigPanel({
  value,
  onChange,
  disabled = false,
  showSaveButton = true,
}: SecurityConfigPanelProps) {
  const updateValue = <K extends keyof SecuritySettings>(key: K, nextValue: SecuritySettings[K]) => {
    onChange?.({
      ...value,
      [key]: nextValue,
    });
  };

  return (
    <div className="security-settings-panel">
      <div className="security-settings-group">
        <div className="security-settings-group-title">默认设置</div>
        <div className="security-form-grid">
          <div className="security-form-row">
            <div className="security-form-label">
              <span>Http Referer 允许列表</span>
              <QuestionCircleOutlined />
            </div>
            <div className="security-form-control">
              <TextArea
                disabled={disabled}
                value={value.refererAllowList}
                onChange={(event) => updateValue('refererAllowList', event.target.value)}
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
                value={value.iframePolicy}
                onChange={(nextValue) => updateValue('iframePolicy', nextValue)}
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
                value={value.customResponseHeaders}
                onChange={(event) => updateValue('customResponseHeaders', event.target.value)}
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="security-settings-group security-settings-group-spacing">
        <div className="security-settings-group-title">IP限制设置</div>
        <div className="security-form-grid">
          <div className="security-form-row">
            <div className="security-form-label">
              <span>可访问应用的IP地址列表(白名单)</span>
              <QuestionCircleOutlined />
            </div>
            <div className="security-form-control">
              <TextArea
                disabled={disabled}
                value={value.allowedIpList}
                onChange={(event) => updateValue('allowedIpList', event.target.value)}
                autoSize={{ minRows: 4, maxRows: 6 }}
                placeholder="配置可访问应用的IP地址列表, 多个IP请以换行分隔, 支持使用CIDR方法分配IP地址, 比如:192.168.0.0/24"
              />
            </div>
          </div>

          <div className="security-form-row">
            <div className="security-form-label">
              <span>不可访问应用的IP地址列表(黑名单)</span>
              <QuestionCircleOutlined />
            </div>
            <div className="security-form-control">
              <TextArea
                disabled={disabled}
                value={value.blockedIpList}
                onChange={(event) => updateValue('blockedIpList', event.target.value)}
                autoSize={{ minRows: 4, maxRows: 6 }}
                placeholder="配置不可访问应用的IP地址列表, 多个IP请以换行分隔, 支持使用CIDR方法分配IP地址, 比如:192.168.0.0/24"
              />
            </div>
          </div>

          <div className="security-form-row">
            <div className="security-form-label">
              <span>已知的代理地址列表</span>
              <QuestionCircleOutlined />
            </div>
            <div className="security-form-control">
              <TextArea
                disabled={disabled}
                value={value.knownProxyIpList}
                onChange={(event) => updateValue('knownProxyIpList', event.target.value)}
                autoSize={{ minRows: 4, maxRows: 6 }}
                placeholder="配置已知的代理地址列表, 多个IP请以换行分隔, 支持使用CIDR方法分配IP地址, 比如:192.168.0.0/24"
              />
            </div>
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
