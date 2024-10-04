"use client";
import React, { useState, useEffect } from 'react';
import useModal from '@/hooks/useModal';
import Card from '@/components/common/Card';
import Sidebar from '../layout/Sidebar';
import RightAssistant from '../layout/RightAssistant';
import { FiSettings, FiCode, FiEdit2 } from "react-icons/fi";
import CodeEditor from "./CodeEditor";
import "@/styles/WhiteBoardCard.css";
import useProject from '@/hooks/useProject';
import { useSearchParams } from 'next/navigation';
import { jsonToAnchor } from '@/utils/jsonToAnchor';
import { anchorToJson } from '@/utils/anchorToJson';
import InstructionModal from '@/components/modals/InstructionModal/InstructionModal';

interface SelectTemplateProps {
  setCurrentStep: (step: number) => void; 
}

const EditContract: React.FC<SelectTemplateProps> = ({ setCurrentStep }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isFlipped, setIsFlipped] = useState(false);
  const searchParams = useSearchParams();
  const projectIdFromUrl = searchParams.get('id');
  const { projects, updateProjectContracts } = useProject();
  
  const [jsonCode, setJsonCode] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rustCode, setRustCode] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentInstruction, setCurrentInstruction] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentAccount, setCurrentAccount] = useState<any>(null);

  useEffect(() => {
    if (projectIdFromUrl) {
      const currentProject = projects.find((project) => project.id === projectIdFromUrl);
      if (currentProject && currentProject.contracts.length > 0) {
        const code = currentProject.contracts[0].code;
  
        
        setJsonCode(code);
        const anchorCode = jsonToAnchor(code);
        setRustCode(anchorCode);
      }
    }
  }, [projectIdFromUrl, projects]);
  

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleSaveAndProceed = () => {
    if (projectIdFromUrl) {
      const updatedContract = { name: jsonCode.name, code: jsonCode };
      updateProjectContracts(projectIdFromUrl, [updatedContract]);
      setCurrentStep(2);
    }
  };

  const handleEditInstruction = (instruction: any) => {
    setCurrentInstruction(instruction);
    openModal();
  };

  const handleEditDataAccount = (account: any) => {
    setCurrentAccount(account);
    openModal();
  };

  const updateInstruction = (updatedInstruction: any) => {
    setJsonCode((prevJsonCode: typeof jsonCode) => {
      const updatedInstructions = prevJsonCode.instructions.map((inst: any) =>
        inst.name === updatedInstruction.name ? updatedInstruction : inst
      );
      return {
        ...prevJsonCode,
        instructions: updatedInstructions,
      };
    });
    closeModal();
  };

  const updateDataAccount = (updatedAccount: any) => {
    setJsonCode((prevJsonCode: typeof jsonCode) => {
      const updatedAccounts = prevJsonCode.accounts.map((acc: any) =>
        acc.name === updatedAccount.name ? updatedAccount : acc
      );
      return {
        ...prevJsonCode,
        accounts: updatedAccounts,
      };
    });
    closeModal();
  };

  return (
    <div className="flex">
      <Sidebar />
      <Card className="flex-grow overflow-y-auto max-h-screen p-4">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <p className="text-xl font-semibold mr-2">Contract Name:</p>
            <input
              type="text"
              value={jsonCode.name || ""}
              onChange={(e) => setJsonCode((prevJsonCode: typeof jsonCode) => ({
                ...prevJsonCode,
                name: e.target.value,
              }))}
              className="bg-transparent border-b-2 border-gray-300 text-lg font-thin focus:outline-none focus:border-[#212f48]"
            />
          </div>
          <div className="flex gap-1">
            <button onClick={flipCard} className="bg-[#212f48] text-white p-2 rounded hover:text-black">
              <FiCode size={20} />
            </button>
            <button className="bg-[#212f48] text-white p-2 rounded hover:text-black">
              <FiSettings size={20} />
            </button>
          </div>
        </div>
        
       
        <div className="whiteboard-container relative w-full mt-8">
          <div className={`whiteboard-card ${isFlipped ? "flipped" : ""}`}>
           
            <div className="whiteboard-front">
              <div className="flex gap-8">
               
                <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                  <h3 className="text-2xl font-bold mb-4 text-white">Instructions</h3>
                  {jsonCode.instructions && jsonCode.instructions.map((instruction: any, index: number) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 relative">
                      <button
                        className="absolute top-2 right-2 bg-transparent text-[#1a2434]"
                        onClick={() => handleEditInstruction(instruction)}
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <p className="text-lg font-semibold">Name: {instruction.name}</p>
                      <p className="font-semibold">Accounts:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {instruction.accounts.map((account: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-[#1a2434] text-white px-2 py-1 rounded-md"
                          >
                            {account.name} <small>({account.isMut ? "Mutable" : "Immutable"})</small>, <small>({account.isSigner ? "Signer" : "Not Signer"})</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

               
                <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                  <h3 className="text-2xl font-bold mb-4 text-white">Data Accounts</h3>
                  {jsonCode.accounts && jsonCode.accounts.map((account: any, index: number) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 relative">
                      <button
                        className="absolute top-2 right-2 bg-transparent text-[#1a2434]"
                        onClick={() => handleEditDataAccount(account)}
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <p className="text-lg font-semibold">Name: {account.name}</p>
                      <p className="font-semibold">Fields:</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {account.type.fields.map((field: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-[#1a2434] text-white px-2 py-1 rounded-md"
                          >
                            {field.name} <small> ({field.type}) </small>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            
            <div className="whiteboard-back">
            
              <CodeEditor code={rustCode} onCodeChange={(value) => {
                setRustCode(value);
                try {
                  const newJsonCode = anchorToJson(value);
                  
                  setJsonCode((prevJsonCode: typeof jsonCode) => {
                    return {
                      ...prevJsonCode,
                      ...newJsonCode, 
                    };
                  });
                } catch (e) {
                  console.error("Invalid Anchor code", e);
                }
              }} />

              <button onClick={flipCard} className="bg-blue-500 text-white p-2 mt-4 rounded">
                Save and Close
              </button>
            </div>
          </div>
        </div>

        <button onClick={handleSaveAndProceed} className="bg-primary text-white px-4 py-2 rounded-md mt-6">
          Save and Proceed to Test
        </button>
      </Card>
      <RightAssistant />

     
      {currentInstruction && (
        <InstructionModal
          isOpen={isOpen}
          onClose={() => closeModal()}
          instruction={currentInstruction}
          onSave={(updatedInstruction: any) => updateInstruction(updatedInstruction)}
        />
      )}

      {/* Data Account Modal */}
      {/* {currentAccount && (
        <DataAccountModal
          isOpen={isOpen}
          onClose={() => closeModal()}
          account={currentAccount}
          onSave={(updatedAccount: any) => updateDataAccount(updatedAccount)}
        />
      )} */}
    </div>
  );
};

export default EditContract;
