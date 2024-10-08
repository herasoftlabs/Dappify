import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import SettingsPanel from "./SettingsPanel";
import ContextPanel from "./ContextPanel";
import InstructionPanel from "./InstructionPanel";
import ParametersPanel from "./ParametersPanel";
import AdditionalPanel from "./AdditionalPanel"; 
import PreviewPanel from "./PreviewPanel";
import { Instruction, Account } from "@/types/types";
import { jsonToAnchor } from "@/utils/jsonToAnchor";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  instruction: Instruction | null; 
  onSave?: (updatedInstruction: Instruction) => void;
  accounts: Account[]; 
}

const InstructionModal: React.FC<ModalProps> = ({ isOpen, onClose, instruction, onSave, accounts }) => {
  const [activeTab, setActiveTab] = useState<string>("settings");
  const [currentInstruction, setCurrentInstruction] = useState<Instruction | null>(null); 
  const [contextCode, setContextCode] = useState<string>("");
  const [instructionCode, setInstructionCode] = useState<string>("");

  useEffect(() => {
    if (!instruction) {
      const newInstruction = {
        id: `instruction-${Date.now()}`,  
        name: '',
        description: '',
        parameters: [],
        context: [],
        pdas: [],
        errors: [],
        events: [],
        access_control: '',
      };
      setCurrentInstruction(newInstruction);
    } else {
      if (!instruction.id) {
        instruction.id = `instruction-${Date.now()}`; 
      }
      setCurrentInstruction(instruction);
      generateCode(instruction, accounts);
    }
  }, [instruction, accounts]);
  
  

  useEffect(() => {
    if (currentInstruction) {
      generateCode(currentInstruction, accounts); 
    }
  }, [currentInstruction, accounts]);

  const handleSave = () => {
    if (currentInstruction && onSave) {
      /* console.log('Saving Instruction:', currentInstruction);  */
      onSave(currentInstruction);
    }
    onClose();
  };
  
  

  const handleFieldChange = (key: keyof Instruction, value: any) => {
    if (currentInstruction) {
      const updatedInstruction = { ...currentInstruction, [key]: value };
      /* console.log('Updated Instruction Field:', key, value);  */
      setCurrentInstruction(updatedInstruction);
    }
  };
  

  const generateCode = (instruction: Instruction, accounts: Account[]) => { 
    const idl = {
      name: "example_program",
      instructions: [instruction],
      accounts: accounts, 
      types: []
    };

    const generatedCode = jsonToAnchor(idl); 
    setInstructionCode(generatedCode);
    setContextCode(generatedCode);
  };

  const renderTabContent = () => {
    if (!currentInstruction) return null;

    switch (activeTab) {
      case "settings":
        return (
          <SettingsPanel 
            instruction={currentInstruction} 
            onChange={handleFieldChange} 
          />
        );
      case "context":
        return (
          <ContextPanel
            context={currentInstruction.context}
            accounts={accounts} 
            onChange={(updatedContext) => handleFieldChange("context", updatedContext)}
          />
        );
      case "parameters":
        return (
          <ParametersPanel 
            parameters={currentInstruction.parameters}
            onChange={(updatedParameters) => handleFieldChange("parameters", updatedParameters)}
          />
        );
      case "instruction":
        return (
          <InstructionPanel 
            instructionBody={currentInstruction.description} 
            onChange={(body) => handleFieldChange("description", body)} 
          />
        );
      case "additional":
        return (
          <AdditionalPanel 
          additionalData={{
            pdas: currentInstruction.pdas,
            errors: currentInstruction.errors,
            events: currentInstruction.events,
            access_control: currentInstruction.access_control,
          }}
          onChange={(updatedAdditional) => {
            handleFieldChange("pdas", updatedAdditional.pdas);
            handleFieldChange("errors", updatedAdditional.errors);
            handleFieldChange("events", updatedAdditional.events);
            handleFieldChange("access_control", updatedAdditional.access_control);
          }}
        />
        );
      default:
        return null;
    }
  };

  if (!isOpen || !currentInstruction) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg flex max-w-5xl w-full min-h-[70vh] overflow-hidden">
        
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Instruction</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
              &#10005;
            </button>
          </div>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderTabContent()}
        </div>
        
        <PreviewPanel
          instructionCode={instructionCode}
          instruction={currentInstruction}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default InstructionModal;
