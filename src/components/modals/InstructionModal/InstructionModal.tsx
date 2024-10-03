import React, { useState } from "react";
import Tabs from "./Tabs";
import SettingsPanel from "./SettingsPanel";
import ContextPanel from "./ContextPanel";
import InstructionPanel from "./InstructionPanel";
import ParametersPanel from "./ParametersPanel";
import PreviewPanel from "./PreviewPanel";

// types.ts

export interface Field {
  id: number;
  type: string;
  name: string;
  accountName: string;
  isMutable: boolean;
  isPublic: boolean;
  selectedVariable?: string;
  isDropdownOpen?: boolean;
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
  showAssignSelect?: boolean;
  showAddSelect?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const InstructionModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("settings");
  const [contextName, setContextName] = useState<string>("");
  const [instructionName, setInstructionName] = useState<string>("");
  const [contextVisibility, setContextVisibility] = useState<boolean>(true);
  const [instructionVisibility, setInstructionVisibility] = useState<boolean>(true);
  const [contextFields, setContextFields] = useState<Field[]>([]);
  const [instructionAccounts, setInstructionAccounts] = useState<InstructionAccount[]>([]);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [returnType, setReturnType] = useState<string>("Result<()>");
  
  const generateContextCode = () => {
    if (!contextName) return "";
  
    const visibilityModifier = contextVisibility ? "pub " : "";
    const contextDeclarations = contextFields
      .map((field) => {
        const accountName = field.accountName || "Unknown";
        return `${visibilityModifier}${field.name}: Account<'info, ${accountName}>`;
      })
      .join("\n    ");
  
    return `
  #[derive(Accounts)]
  ${visibilityModifier}struct ${contextName}<'info> {
    ${contextDeclarations}
  }
    `;
  };
  
  
  const generateInstructionCode = (): string => {
    if (!instructionName) return "";
  
    const visibilityModifier = instructionVisibility ? "pub " : "";
    const ctxParameter = contextName ? `ctx: Context<${contextName}>` : "";
    const parameterDeclarations = parameters
      .map((param) => `${param.paramName}: ${param.accountName}`)
      .join(", ");
    const allParameters = [ctxParameter, parameterDeclarations].filter(Boolean).join(", ");
  
    const instructionBody = instructionAccounts
      .map((account) => {
        const baseAccount = parameters.some((param) => param.paramName === account.accountName)
          ? account.accountName
          : `ctx.accounts.${account.accountName}`;
  
        return account.selectedVariable
          ? `${baseAccount}.${account.selectedVariable}`
          : baseAccount;
      })
      .join("\n    ");
  
    return `
  ${visibilityModifier}fn ${instructionName}<'info>(${allParameters}) -> ${returnType} {
      ${instructionBody}
  }
    `;
  };
  

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return (
          <SettingsPanel 
            contextName={contextName}
            setContextName={setContextName}
            instructionName={instructionName}
            setInstructionName={setInstructionName}
            contextVisibility={contextVisibility}
            setContextVisibility={setContextVisibility}
            instructionVisibility={instructionVisibility}
            setInstructionVisibility={setInstructionVisibility}
            returnType={returnType}
            setReturnType={setReturnType}
          />
        );
      case "context":
        return (
          <ContextPanel 
            contextFields={contextFields} 
            setContextFields={setContextFields}
            generateContextCode={generateContextCode} // generateContextCode'u ekledik
          />
        );
      case "instruction":
        return (
          <InstructionPanel 
            contextFields={contextFields} 
            instructionAccounts={instructionAccounts} 
            setInstructionAccounts={setInstructionAccounts} 
            parameters={parameters} 
          />
        );
      case "parameters":
        return (
          <ParametersPanel 
            parameters={parameters} 
            setParameters={setParameters} 
          />
        );
      default:
        return null;
    }
  };
 
  return (
  
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg flex max-w-5xl w-full min-h-[70vh] overflow-hidden">
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Instruction</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
              &#10005;
            </button>
          </div>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderTabContent()}
        </div>
        <PreviewPanel
          contextCode={generateContextCode()}
          instructionCode={generateInstructionCode()}
        />
      </div>
    </div>
    
  );
};

export default InstructionModal;
