import { ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
  useStorageSettings,
  type AppStorageSettings,
  type AttachmentStorageSettings,
} from './StorageSettingsContext';

const storageModeOptions = [
  { label: '本地存储', value: 'local' },
  { label: '云存储', value: 'cloud' },
] as const;

const publicUrlOptions = [
  { label: 'Phoenix 代理下载 URL', value: 'Phoenix 代理下载 URL' },
  { label: '直接使用公开的 URL 进行下载', value: '直接使用公开的 URL 进行下载' },
];

const restartWarningTitle = '配置已保存，重启服务后生效';
const restartWarningText = '原路径下的应用不会自动迁移，请手动复制需要保留的应用目录至新的路径下。';

export function AttachmentStorageSettingsPanel({
  title,
  value,
  onChange,
  disabled = false,
  showSaveButton = true,
  appStorageValue,
  onAppStorageChange,
  showAppStorageGroup = false,
  hidePanelTitle = false,
}: {
  title: string;
  value: AttachmentStorageSettings;
  onChange?: (value: AttachmentStorageSettings) => void;
  disabled?: boolean;
  showSaveButton?: boolean;
  appStorageValue?: AppStorageSettings;
  onAppStorageChange?: (value: AppStorageSettings) => void;
  showAppStorageGroup?: boolean;
  hidePanelTitle?: boolean;
}) {
  const { cloudStorageItems, effectiveAppStoragePath } = useStorageSettings();
  const [saveWarningOpen, setSaveWarningOpen] = useState(false);
  const [appPathDraft, setAppPathDraft] = useState(appStorageValue?.appPath ?? '');
  const [appPathDirty, setAppPathDirty] = useState(false);

  useEffect(() => {
    setAppPathDraft(appStorageValue?.appPath ?? '');
    setAppPathDirty(false);
  }, [appStorageValue?.appPath]);

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

  const handleAppPathChange = (nextValue: string) => {
    setAppPathDraft(nextValue);
    setAppPathDirty(true);
  };

  const handleSave = () => {
    if (
      showAppStorageGroup &&
      onAppStorageChange &&
      appStorageValue &&
      appPathDraft !== appStorageValue.appPath
    ) {
      onAppStorageChange({
        appPath: appPathDraft,
      });
      setAppPathDirty(false);
      setSaveWarningOpen(true);
      return;
    }

    if (showAppStorageGroup && appPathDirty) {
      setSaveWarningOpen(true);
    }
  };

  const warningTooltip = (
    <div className="storage-warning-tooltip">
      <div className="storage-warning-tooltip-title">{restartWarningTitle}</div>
      <div className="storage-warning-tooltip-text">{restartWarningText}</div>
      <div className="storage-warning-tooltip-path">
        当前生效路径：{effectiveAppStoragePath || '-'}
      </div>
    </div>
  );

  return (
    <>
      <div className="config-placeholder-card attachment-storage-card">
        {!hidePanelTitle ? <div className="config-placeholder-title">{title}</div> : null}

        <div className="attachment-storage-form">
          <div className="attachment-storage-section">
            <div className="attachment-storage-section-title">附件存储路径</div>

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

          {showAppStorageGroup && appStorageValue ? (
            <div className="attachment-storage-section">
              <div className="attachment-storage-section-header">
                <div className="attachment-storage-section-title">应用存储路径</div>
                <Tooltip
                  title={warningTooltip}
                  color="#ffffff"
                  overlayClassName="storage-warning-tooltip-overlay"
                >
                  <span className="storage-warning-tag">
                    <InfoCircleOutlined />
                    <span>重启后生效</span>
                  </span>
                </Tooltip>
              </div>

              <div className="attachment-storage-section-text">
                应用发布到服务器后，将存储在此路径下，并按应用名自动创建对应的子目录。修改该存储路径后，需要重启服务才能使配置生效。
              </div>

              <div className="security-form-row">
                <div className="security-form-label">
                  <span>* 应用存储路径</span>
                </div>
                <div className="security-form-control">
                  <Input
                    value={appPathDraft}
                    onChange={(event) => handleAppPathChange(event.target.value)}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {showSaveButton ? (
          <div className="general-subtab-actions">
            <Button type="primary" className="primary-action-button" onClick={handleSave}>
              保存
            </Button>
          </div>
        ) : null}
      </div>

      <Modal
        open={saveWarningOpen}
        onCancel={() => setSaveWarningOpen(false)}
        footer={[
          <Button
            key="confirm"
            type="primary"
            className="primary-action-button"
            onClick={() => setSaveWarningOpen(false)}
          >
            知道了
          </Button>,
        ]}
        width={620}
        centered
        className="storage-warning-modal"
        title={null}
      >
        <div className="storage-warning-modal-body">
          <ExclamationCircleFilled className="storage-warning-modal-icon" />
          <div className="storage-warning-modal-content">
            <div className="storage-warning-modal-title">{restartWarningTitle}</div>
            <div className="storage-warning-modal-text">{restartWarningText}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
