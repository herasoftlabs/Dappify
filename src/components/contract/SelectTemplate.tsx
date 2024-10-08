"use client";
import React, { useState } from 'react';
import useProject from '@/hooks/useProject';
import { templates } from '@/data/templatesData';
import Card from '@/components/common/Card';
import { Account } from '@/types/types'; // İlgili türleri import edin

interface SelectTemplateProps {
  projectId: string;
  setCurrentStep: (step: number) => void;
}

const SelectTemplate: React.FC<SelectTemplateProps> = ({ projectId, setCurrentStep }) => {
  const { projects, updateProjectContracts, addProgramVersion } = useProject();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const project = projects.find((proj) => proj.id === projectId);

  if (!project) {
    return <div>Project not found.</div>;
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleConfirm = () => {
    if (!selectedTemplate) {
      alert('Please select a template.');
      return;
    }

    const selectedTemplateData = templates.find((temp) => temp.id === selectedTemplate);

    if (selectedTemplateData) {
      const timestamp = new Date().toISOString();
      const versionNumber = 1;

      if (selectedTemplate === 'blank') {
        updateProjectContracts(projectId, []);
        addProgramVersion(projectId, {
          id: `${projectId}-v1`,
          projectId,
          name: 'Blank Version',
          description: 'A blank template to start from scratch.',
          version: 'v1.0.0',
          versionNumber: versionNumber,
          createdAt: timestamp,
          instructions: [],
          accounts: [],
          errors: [],
          pdas: [],
          events: [],
          access_controls: [],
          cpi_calls: [],
          token_integrations: [],
          advanced_settings: {
            reentrancy_protection: false,
            serialization: { zero_copy: false },
            constraints: [],
            multisig: { enabled: false },
            time_based_restrictions: [],
          },
        });
      } else {
       
        const adjustedAccounts = selectedTemplateData.program.accounts.map((account: any) => ({
          ...account,
          type: account.type === 'struct' || account.type === 'enum' ? account.type : 'struct', 
        }));

        const programWithMeta = {
          ...selectedTemplateData.program,
          id: `${projectId}-v1`,
          projectId,
          createdAt: timestamp,
          versionNumber: versionNumber,
          accounts: adjustedAccounts, 
        };

        updateProjectContracts(projectId, [programWithMeta]);
        addProgramVersion(projectId, programWithMeta);
      }

      setCurrentStep(1);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Template for {project.name}</h1>
      <Card className="flex-grow overflow-y-auto max-h-screen p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border p-4 rounded-md cursor-pointer ${
                selectedTemplate === template.id ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <h2 className="text-xl font-semibold">{template.name}</h2>
              <p className="text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-6 flex justify-end">
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={handleConfirm}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default SelectTemplate;
