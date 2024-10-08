import React from "react";
import InstructionAccountRow from "./InstructionAccountRow";

export interface Field {
  id: number;
  type: string;
  name: string;
  accountName: string;
  isMutable: boolean;
  isPublic: boolean;
  selectedVariable?: string;
  isDropdownOpen?: boolean;
  fields?: { name: string; type: string }[];
}

export interface Parameter {
  id: number;
  paramName: string;
  accountName: string;
}

export interface InstructionAccount {
  id: number;
  accountName: string;
  selectedVariable?: string;
  isDropdownOpen?: boolean;
}

interface InstructionPanelProps {
  instructionAccounts: InstructionAccount[];
  setInstructionAccounts: (accounts: InstructionAccount[]) => void;
  contextFields: Field[];
  parameters: Parameter[];
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({ instructionAccounts, setInstructionAccounts, contextFields, parameters }) => {
  const addInstructionAccount = (accountName: string) => {
    setInstructionAccounts([...instructionAccounts, { id: Date.now(), accountName, isDropdownOpen: false }]);
  };

  const toggleDropdown = (id: number) => {
    setInstructionAccounts(
      instructionAccounts.map((account) =>
        account.id === id ? { ...account, isDropdownOpen: !account.isDropdownOpen } : account
      )
    );
  };

  const handleVariableSelect = (id: number, variableName: string) => {
    setInstructionAccounts(
      instructionAccounts.map((account) =>
        account.id === id ? { ...account, selectedVariable: variableName, isDropdownOpen: false } : account
      )
    );
  };

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-4">
        {contextFields.map((field) => (
          <button key={field.id} onClick={() => addInstructionAccount(field.name)} className="bg-blue text-white px-4 py-2 rounded">
            {field.name}
          </button>
        ))}
        {parameters.map((param) => (
          <button key={param.id} onClick={() => addInstructionAccount(param.paramName)} className="bg-green-500 text-white px-4 py-2 rounded">
            {param.paramName}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {instructionAccounts.map((account) => (
          <InstructionAccountRow
            key={account.id}
            account={account}
            onDelete={() => setInstructionAccounts(instructionAccounts.filter((a) => a.id !== account.id))}
            onToggleDropdown={toggleDropdown}
            availableVariables={contextFields.find((field) => field.name === account.accountName)?.fields || []}
            onVariableSelect={handleVariableSelect}
            isParameter={parameters.some((param) => param.paramName === account.accountName)}
          />
        ))}
      </div>
    </div>
  );
};

export default InstructionPanel;
