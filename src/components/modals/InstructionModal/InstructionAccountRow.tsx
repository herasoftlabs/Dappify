import React from "react";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface InstructionAccount {
  id: number;
  accountName: string;
  isDropdownOpen?: boolean;
  selectedVariable?: string;
}

interface AvailableVariable {
  name: string;
  type: string;
}

interface InstructionAccountRowProps {
  account: InstructionAccount;
  onDelete: () => void;
  onToggleDropdown: (id: number) => void;
  availableVariables: AvailableVariable[]; // Context'ten gelen Struct değişkenleri listesi
  onVariableSelect: (id: number, variableName: string) => void;
  isParameter: boolean;
}

const InstructionAccountRow: React.FC<InstructionAccountRowProps> = ({ 
  account, 
  onDelete, 
  onToggleDropdown, 
  availableVariables, 
  onVariableSelect, 
  isParameter 
}) => {
  // Değişkenleri konsola yazdırarak kontrol edelim
  console.log(`Available Variables for account '${account.accountName}':`, availableVariables);

  return (
    <div className="relative mt-4 border rounded-md py-1 px-2 w-full flex items-center justify-between">
      <div className="flex-grow flex items-center relative">
        {account.accountName}
        {!isParameter && (
          <>
            {account.selectedVariable && (
              <div className="ml-1">{`(${account.selectedVariable})`}</div>
            )}
            <div
              className="cursor-pointer ml-2"
              onClick={() => onToggleDropdown(account.id)}
            >
              {account.isDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            
            {account.isDropdownOpen && (
  <div className="absolute top-full left-0 w-full bg-white border mt-1 z-50 rounded shadow-lg overflow-y-auto max-h-48">
    {availableVariables && availableVariables.length > 0 ? (
      availableVariables.map((variable) => (
        <div
          key={variable.name}
          className="cursor-pointer px-2 py-1 hover:bg-gray-200"
          onClick={() => onVariableSelect(account.id, variable.name)}
        >
          {variable.name} ({variable.type})
        </div>
      ))
    ) : (
      <div className="px-2 py-1 text-gray-500">No variables available</div>
    )}
  </div>
)}

          </>
        )}
      </div>
      <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
        Delete
      </button>
    </div>
  );
};

export default InstructionAccountRow;
