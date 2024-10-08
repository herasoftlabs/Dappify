"use client";
import React, { useState, useEffect } from 'react';
import useModal from '@/hooks/useModal';
import Card from '@/components/common/Card';
import Sidebar from '../layout/Sidebar';
import RightAssistant from '../layout/RightAssistant';
import { FiSettings, FiCode, FiEdit2 } from "react-icons/fi";
import { useProjectContext,  } from '@/context/Project/ProjectContext';
import { Instruction, Account, AccountField, ContextAccount, PDA, Event, AccessControl, Version, } from '@/types/types';
import useProject from '@/hooks/useProject';
import InstructionModal from '@/components/modals/InstructionModal/InstructionModal';
import AccountModal from '@/components/modals/DataAccountModal/AccountModal';

interface EditContractProps {
  projectId: string;
  setCurrentStep: (step: number) => void;
}

const EditContract: React.FC<EditContractProps> = ({ projectId, setCurrentStep }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isFlipped, setIsFlipped] = useState(false);
  const { currentVersion, updateCurrentVersion, versions } = useProjectContext();
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [filteredVersions, setFilteredVersions] = useState<Version[]>([]);
  const { projects } = useProject();
  const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
const [isDataAccountModalOpen, setIsDataAccountModalOpen] = useState(false);



  useEffect(() => {
   /*  if (currentVersion) {
      console.log('Current Contract Data Version:', currentVersion);
    } */
    setFilteredVersions(versions.filter((version) => version.projectId === projectId));
  }, [currentVersion, projects, projectId, versions]);
  

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleSaveAndProceed = () => {
    setCurrentStep(2); 
  };

  const handleEditInstruction = (instruction: Instruction) => {
    setSelectedInstruction(instruction);
    openModal();
  };

  const handleEditDataAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsDataAccountModalOpen(true); 
  };

  const handleSaveDataAccount = (updatedAccount: Account) => {
    if (currentVersion) {
      const updatedAccounts = currentVersion.accounts.map((acc) =>
        acc.id === updatedAccount.id ? updatedAccount : acc
      );
      
      updateCurrentVersion({ ...currentVersion, accounts: updatedAccounts });
      setIsDataAccountModalOpen(false); 
    }
  };
  
  

  const handleEditPDA = (pda: PDA) => {
    openModal();
  };

  const handleSaveInstruction = (updatedInstruction: Instruction) => {
    if (currentVersion) {
      const updatedInstructions = currentVersion.instructions.map((instr) =>
        instr.id === updatedInstruction.id ? updatedInstruction : instr
      );
      updateCurrentVersion({ ...currentVersion, instructions: updatedInstructions });
      closeModal();
    }
  };
  

  const handleEditEvent = (event: Event) => {
    openModal();
  };

  const handleEditAccessControl = (accessControl: AccessControl) => {
    openModal();
  };

  const openVersionModal = () => {
    setIsVersionModalOpen(true);
  };

  const closeVersionModal = () => {
    setIsVersionModalOpen(false);
  };

  const addProgramVersion = (projectId: string, newVersion: Partial<Version>) => {
    const timestamp = new Date();
    const versionId = `${projectId}-${Date.now()}`;
    const versionNumber = versions.filter((v) => v.projectId === projectId).length + 1;
  
    const version: Version = {
      ...newVersion,
      id: versionId,
      projectId,
      createdAt: timestamp.toISOString(),
      version: `v${versionNumber}`,
      versionNumber,
      name: newVersion.name || "Default Name",
      description: newVersion.description || "No description provided",
      instructions: newVersion.instructions || [],
      accounts: newVersion.accounts || [],
      errors: newVersion.errors || [],
      pdas: newVersion.pdas || [],
      events: newVersion.events || [],
      access_controls: newVersion.access_controls || [],
      cpi_calls: newVersion.cpi_calls || [],
      token_integrations: newVersion.token_integrations || [],
      advanced_settings: newVersion.advanced_settings || {
        reentrancy_protection: false,
        serialization: { zero_copy: false },
        constraints: [],
        multisig: { enabled: false },
        time_based_restrictions: [],
      },
    };
    addProgramVersion(projectId, version);
  };
  

  const handleVersionSelect = (versionId: string) => {
    const selectedVersion = filteredVersions.find((version) => version.id === versionId);
    if (selectedVersion) {
      const timestamp = new Date().toISOString();
      const newVersion: Version = {
        ...selectedVersion,
        id: `${selectedVersion.projectId}-${Date.now()}`, 
        version: `v${filteredVersions.length + 1}`, 
        createdAt: timestamp, 
        versionNumber: filteredVersions.length + 1,
        name: selectedVersion.name || "Default Name", 
        description: selectedVersion.description || "No description provided",
        instructions: selectedVersion.instructions || [],
        accounts: selectedVersion.accounts || [],
        errors: selectedVersion.errors || [],
        pdas: selectedVersion.pdas || [],
        events: selectedVersion.events || [],
        access_controls: selectedVersion.access_controls || [],
        cpi_calls: selectedVersion.cpi_calls || [],
        token_integrations: selectedVersion.token_integrations || [],
        advanced_settings: selectedVersion.advanced_settings || {
          reentrancy_protection: false,
          serialization: { zero_copy: false },
          constraints: [],
          multisig: { enabled: false },
          time_based_restrictions: [],
        },
      };
      
      updateCurrentVersion(newVersion);
      alert(`Versiyon ${newVersion.name} seçildi. Whiteboard ve context verisi güncellendi.`);
    }
    closeVersionModal();
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
              value={currentVersion?.name || ""}
              onChange={(e) => {
                if (currentVersion) {
                  updateCurrentVersion({ ...currentVersion, name: e.target.value });
                }
              }}
              className="bg-transparent border-b-2 border-gray-300 text-lg font-thin focus:outline-none focus:border-[#212f48]"
            />
          </div>
          <div className="flex gap-1">
            <button onClick={flipCard} className="bg-[#212f48] text-white p-2 rounded hover:text-black">
              <FiCode size={20} />
            </button>
            <button className="bg-[#212f48] text-white p-2 rounded hover:text-black" onClick={openVersionModal}>
              <FiSettings size={20} />
            </button>
          </div>
        </div>

        <div className="whiteboard-container relative w-full mt-8">
          <div className={`whiteboard-card ${isFlipped ? "flipped" : ""}`}>
            <div className="whiteboard-front">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                  <h3 className="text-2xl font-bold mb-4 text-white">Instructions</h3>
                  {currentVersion && currentVersion.instructions.map((instruction, index) => (
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
                        {instruction.context.map((account: ContextAccount, idx: number) => (
                          <div key={idx} className="bg-[#1a2434] text-white px-2 py-1 rounded-md">
                            {account.name} <small>({account.is_mut ? "Mutable" : "Immutable"})</small>, <small>({account.is_signer ? "Signer" : "Not Signer"})</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                  <h3 className="text-2xl font-bold mb-4 text-white">Data Accounts</h3>
                  {currentVersion && currentVersion.accounts.map((account, index) => (
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
                      {account.fields && account.fields.length > 0 ? (
                        account.fields.map((field: AccountField, idx: number) => (
                          <div key={idx} className="bg-[#1a2434] text-white px-2 py-1 rounded-md">
                            {field.name} <small>({field.type})</small>
                          </div>
                        ))
                      ) : (
                        <p>No fields available for this account.</p>
                      )}
                    </div>
                    </div>
                  ))}
                </div>

                {/* PDAs */}
                {currentVersion && currentVersion.pdas.length > 0 && (
                  <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                    <h3 className="text-2xl font-bold mb-4 text-white">PDAs</h3>
                    {currentVersion.pdas.map((pda, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 relative">
                        <button
                          className="absolute top-2 right-2 bg-transparent text-[#1a2434]"
                          onClick={() => handleEditPDA(pda)}
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <p className="text-lg font-semibold">Name: {pda.name}</p>
                        <p className="font-semibold">Seeds:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pda.seeds.map((seed, idx) => (
                            <div key={idx} className="bg-[#1a2434] text-white px-2 py-1 rounded-md">
                              {seed.type}: {seed.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Events */}
                {currentVersion && currentVersion.events.length > 0 && (
                  <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                    <h3 className="text-2xl font-bold mb-4 text-white">Events</h3>
                    {currentVersion.events.map((event, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 relative">
                        <button
                          className="absolute top-2 right-2 bg-transparent text-[#1a2434]"
                          onClick={() => handleEditEvent(event)}
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <p className="text-lg font-semibold">Name: {event.name}</p>
                        <p className="font-semibold">Fields:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {event.fields.map((field, idx) => (
                            <div key={idx} className="bg-[#1a2434] text-white px-2 py-1 rounded-md">
                              {field.name} <small>({field.type})</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Access Controls */}
                {currentVersion && currentVersion.access_controls.length > 0 && (
                  <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                    <h3 className="text-2xl font-bold mb-4 text-white">Access Controls</h3>
                    {currentVersion.access_controls.map((accessControl, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 relative">
                        <button
                          className="absolute top-2 right-2 bg-transparent text-[#1a2434]"
                          onClick={() => handleEditAccessControl(accessControl)}
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <p className="text-lg font-semibold">Name: {accessControl.name}</p>
                        <p className="font-semibold">Conditions:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {accessControl.conditions.map((condition, idx) => (
                            <div key={idx} className="bg-[#1a2434] text-white px-2 py-1 rounded-md">
                              {condition.account} {condition.operator} {condition.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Errors */}
                {currentVersion && currentVersion.errors.length > 0 && (
                  <div className="flex-1 bg-[#1a2434] p-4 rounded-md shadow-md relative">
                    <h3 className="text-2xl font-bold mb-4 text-white">Errors</h3>
                    {currentVersion.errors.map((error, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 relative">
                        <p className="text-lg font-semibold">Name: {error.name}</p>
                        <p className="font-semibold">Code: {error.code}</p>
                        <p className="font-semibold">Message: {error.message}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            <div className="whiteboard-back">
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

      {/* Instruction Modal */}
      {isOpen && (
        <InstructionModal
          isOpen={isOpen}
          onClose={closeModal}
          onSave={handleSaveInstruction} 
          instruction={selectedInstruction}
          accounts={currentVersion?.accounts || []}
        />
      )}

      {isDataAccountModalOpen && (
        <AccountModal
          isOpen={isDataAccountModalOpen}
          onClose={() => setIsDataAccountModalOpen(false)} 
          account={selectedAccount}
          onSave={handleSaveDataAccount} 
          accounts={currentVersion?.accounts || []}
        />
      )}

      {/* Version Modal */}
      {isVersionModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden">
    <div className="bg-white p-8 rounded-md shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Select a Version</h2>
      {filteredVersions
        .slice()
        .reverse()
        .map((version, index) => (
          <div key={`${version.id}-${index}`} className="mb-2">
            <button
              onClick={() => handleVersionSelect(version.id)}
              className="w-full text-left p-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              {version.name} (v{version.versionNumber}) - {new Date(version.createdAt).toLocaleString()}
            </button>
          </div>
        ))}
      <button
        onClick={closeVersionModal}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default EditContract;
