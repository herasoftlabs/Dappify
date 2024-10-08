import React from 'react';
import { Account } from '@/types/types';

interface SettingsPanelProps {
  accountType: 'Struct' | 'Enum';
  account: Account;
  onTypeChange: (type: 'Struct' | 'Enum') => void;
  onChange: (key: keyof Account, value: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ accountType, account, onTypeChange, onChange }) => {
  return (
    <div>
     
      <div className="mb-4">
        <label className="font-semibold">Account Type:</label>
        <select
          value={accountType}
          onChange={(e) => onTypeChange(e.target.value as 'Struct' | 'Enum')}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="Struct">Struct</option>
          <option value="Enum">Enum</option>
        </select>
      </div>

      
      <div className="mb-4">
        <label className="font-semibold">{accountType === 'Struct' ? 'Struct Name' : 'Enum Name'}:</label>
        <input
          type="text"
          value={account.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Account Name"
          className="border p-2 rounded mb-4 w-full"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
