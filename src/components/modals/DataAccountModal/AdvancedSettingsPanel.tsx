import React from 'react';
import { AdvancedSettings } from '@/types/types';

interface AdvancedSettingsPanelProps {
  advancedSettings?: AdvancedSettings;
  onChange: (settings: AdvancedSettings) => void;
}

const AdvancedSettingsPanel: React.FC<AdvancedSettingsPanelProps> = ({
  advancedSettings = {
    reentrancy_protection: false,
    serialization: { zero_copy: false },
    constraints: [],
    multisig: { enabled: false },
    time_based_restrictions: []
  }, 
  onChange 
}) => {
  const handleChange = (key: keyof AdvancedSettings, value: any) => {
    onChange({ ...advancedSettings, [key]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="font-semibold">Reentrancy Protection:</label>
        <input
          type="checkbox"
          checked={advancedSettings.reentrancy_protection}
          onChange={(e) => handleChange('reentrancy_protection', e.target.checked)}
          className="ml-2"
        />
      </div>
      
    </div>
  );
};

export default AdvancedSettingsPanel;
