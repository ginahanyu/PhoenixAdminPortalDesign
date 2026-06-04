import { Button, Select } from 'antd';
import type { DiagnosticLogLevel } from './DiagnosticSettingsContext';

type DiagnosticLogLevelPanelProps = {
  value: DiagnosticLogLevel;
  onChange?: (value: DiagnosticLogLevel) => void;
  disabled?: boolean;
  showSaveButton?: boolean;
};

const options = [
  { label: '追踪', value: 'trace' },
  { label: '调试', value: 'debug' },
  { label: '信息', value: 'info' },
  { label: '警告', value: 'warn' },
  { label: '错误', value: 'error' },
] as const;

export function DiagnosticLogLevelPanel({
  value,
  onChange,
  disabled = false,
  showSaveButton = true,
}: DiagnosticLogLevelPanelProps) {
  return (
    <div className="diagnostic-level-panel">
      <div className="security-form-row">
        <div className="security-form-label">
          <span>日志级别</span>
        </div>
        <div className="security-form-control">
          <Select
            value={value}
            onChange={onChange}
            disabled={disabled}
            options={options.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
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
