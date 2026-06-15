import { Button, Input, Select } from 'antd';
import { useStorageSettings, type AttachmentStorageSettings } from './StorageSettingsContext';

const storageModeOptions = [
  { label: '本地存储', value: 'local' },
  { label: '云存储', value: 'cloud' },
] as const;

const publicUrlOptions = [
  { label: 'Phoenix 代理下载 URL', value: 'Phoenix 代理下载 URL' },
  { label: '直接使用公开的URL进行下载', value: '直接使用公开的URL进行下载' },
];

export function AttachmentStorageSettingsPanel({
  title,
  value,
  onChange,
  disabled = false,
  showSaveButton = true,
}: {
  title: string;
  value: AttachmentStorageSettings;
  onChange?: (value: AttachmentStorageSettings) => void;
  disabled?: boolean;
  showSaveButton?: boolean;
}) {
  const { cloudStorageItems } = useStorageSettings();

  const cloudStorageOptions = cloudStorageItems.map((item) => ({
    label: item.name,
    value: item.key,
  }));

  const normalizedValue =
    value.storageMode === 'cloud' &&
    !cloudStorageOptions.some((item) => item.value === value.cloudStorageKey) &&
    cloudStorageOptions.length > 0
      ? { ...value, cloudStorageKey: cloudStorageOptions[0].value }
      : value;

  const updateValue = <K extends keyof AttachmentStorageSettings>(
    key: K,
    nextValue: AttachmentStorageSettings[K]
  ) => {
    if (!onChange || disabled) {
      return;
    }

    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  return (
    <div className="config-placeholder-card attachment-storage-card">
      <div className="config-placeholder-title">{title}</div>

      <div className="attachment-storage-form">
        <div className="security-form-row">
          <div className="security-form-label">
            <span>存储方式</span>
          </div>
          <div className="security-form-control">
            <Select
              value={normalizedValue.storageMode}
              onChange={(nextValue) => updateValue('storageMode', nextValue)}
              options={storageModeOptions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              disabled={disabled}
            />
          </div>
        </div>

        {normalizedValue.storageMode === 'local' ? (
          <div className="security-form-row">
            <div className="security-form-label">
              <span>本地附件目录</span>
            </div>
            <div className="security-form-control">
              <Input
                value={normalizedValue.localPath}
                onChange={(event) => updateValue('localPath', event.target.value)}
                disabled={disabled}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="security-form-row">
              <div className="security-form-label">
                <span>云存储配置</span>
              </div>
              <div className="security-form-control">
                <Select
                  value={normalizedValue.cloudStorageKey}
                  onChange={(nextValue) => updateValue('cloudStorageKey', nextValue)}
                  options={cloudStorageOptions}
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="security-form-row">
              <div className="security-form-label">
                <span>云端附件根路径</span>
              </div>
              <div className="security-form-control">
                <Input
                  value={normalizedValue.cloudPath}
                  onChange={(event) => updateValue('cloudPath', event.target.value)}
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="security-form-row">
              <div className="security-form-label">
                <span>公开 URL 策略</span>
              </div>
              <div className="security-form-control">
                <Select
                  value={normalizedValue.publicUrlStrategy}
                  onChange={(nextValue) => updateValue('publicUrlStrategy', nextValue)}
                  options={publicUrlOptions}
                  disabled={disabled}
                />
              </div>
            </div>
          </>
        )}
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
