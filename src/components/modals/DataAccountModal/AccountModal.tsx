import React, { useState, useEffect } from 'react';
import Tabs from './Tabs'; 
import SettingsPanel from './SettingsPanel'; 
import FieldsPanel from './FieldsPanel';
import VariantsPanel from './VariantsPanel'; 
import AdvancedSettingsPanel from './AdvancedSettingsPanel'; 
import PreviewPanel from './PreviewPanel'; 
import { Account } from '@/types/types'; 
import { jsonToAnchor } from '@/utils/jsonToAnchor'; 

interface DataAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
  onSave: (updatedAccount: Account) => void; 
  accounts: Account[]; 
}

const AccountModal: React.FC<DataAccountModalProps> = ({ isOpen, onClose, account, onSave, accounts }) => {
  const [activeTab, setActiveTab] = useState<string>('settings'); 
  const [accountType, setAccountType] = useState<'Struct' | 'Enum'>('Struct'); 
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null); 
  const [accountCode, setAccountCode] = useState<string>(""); 

  useEffect(() => {
    if (!account) {
      const newAccount: Account = {
        id: `account-${Date.now()}`,
        name: '',
        description: '',
        type: 'struct',
        fields: [], 
      };
      setCurrentAccount(newAccount);
    } else {
      setCurrentAccount({
        ...account,
        fields: account.fields ?? [], 
        variants: account.variants ?? [], 
      });
      setAccountType(account.type === 'enum' ? 'Enum' : 'Struct'); 
    }
  }, [account]);

  useEffect(() => {
    if (currentAccount) {
      generateCode(currentAccount); 
    }
  }, [currentAccount]);

  const handleSave = () => {
    if (currentAccount) {
      onSave(currentAccount); 
      onClose();
    }
  };

  const handleFieldChange = (key: keyof Account, value: any) => {
    if (currentAccount) {
      setCurrentAccount({ ...currentAccount, [key]: value });
    }
  };

  const generateCode = (account: Account) => {
    const idl = {
      name: "example_program",
      accounts: [account],
      instructions: [],
      types: [],
    };

    const generatedCode = jsonToAnchor(idl); 
    setAccountCode(generatedCode);
  };

  const renderTabContent = () => {
    if (!currentAccount) return null;

    switch (activeTab) {
      case 'settings':
        return (
          <SettingsPanel
            accountType={accountType}
            account={currentAccount}
            onTypeChange={setAccountType} 
            onChange={handleFieldChange}
          />
        );
      case 'fields':
        if (accountType === 'Struct') {
          return (
            <FieldsPanel
  fields={currentAccount.fields ?? []}  
  onChange={(updatedFields) => handleFieldChange('fields', updatedFields)}
/>
          );
        } else if (accountType === 'Enum') {
          return (
            <VariantsPanel
              accountId={currentAccount.id} 
              variants={currentAccount.variants || []}  
              onChange={(updatedVariants) => handleFieldChange('variants', updatedVariants)}
            />
          );
        }
        break;
      case 'advanced':
        return (
          <AdvancedSettingsPanel
            advancedSettings={currentAccount?.advanced_settings}
            onChange={(updatedSettings) => handleFieldChange('advanced_settings', updatedSettings)}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen || !currentAccount) return null;

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden`}>
      <div className="bg-white rounded-lg shadow-lg flex max-w-5xl w-full min-h-[70vh] overflow-hidden">
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Data Account</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
              &#10005;
            </button>
          </div>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderTabContent()}
        </div>
        <div className="w-1/3 bg-gray-100 p-6">
          <PreviewPanel
            accountCode={accountCode}
            account={currentAccount}
            onSave={handleSave}
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Save Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
