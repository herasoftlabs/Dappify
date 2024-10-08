"use client";
import React, { useState } from "react";
import Card from "@/components/common/Card";
import useProject from "@/hooks/useProject";
import Modal from "@/components/common/Modal";

interface CodeType {
  instructions: { name: string; args?: { name: string }[] }[];
  accounts: { name: string; type: { fields: { name: string; type: string }[] } }[];
}

interface SelectTemplateProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    projectId: string;
}

const TestContract: React.FC<SelectTemplateProps> = ({ setCurrentStep, projectId }) => {
  const { projects } = useProject(); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* const [testInputs, setTestInputs] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

 
  const currentProject = projects.length > 0 ? projects[0] : null;
  const code: CodeType = currentProject && currentProject.contracts.length > 0 && typeof currentProject.contracts[0].code === "object"
    ? currentProject.contracts[0].code
    : { instructions: [], accounts: [] };

  const handleInputChange = (
    sectionName: keyof CodeType,
    itemName: string,
    paramName: string,
    value: string
  ) => {
    setTestInputs((prevInputs) => ({
      ...prevInputs,
      [sectionName]: {
        ...prevInputs[sectionName],
        [itemName]: {
          ...prevInputs[sectionName]?.[itemName],
          [paramName]: value,
        },
      },
    }));
  };

  const handleSaveAndProceed = () => {
      setCurrentStep(3);
  };

  const handleRunTest = (sectionName: keyof CodeType, itemName: string) => {
    const params = testInputs[sectionName]?.[itemName] || {};
    console.log(`Running test for ${sectionName} -> ${itemName}`);
    console.log("With parameters:", params);
    console.log(`Testing contract: ${currentProject?.name}`); 

    
    setModalMessage(`Running test for ${itemName} with parameters: ${JSON.stringify(params)}`);
    setIsModalOpen(true);

 
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };
 */
  return (
    
    <Card title="">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Test Contract</h2>
        <p className="text-gray-500 text-center mb-6">
          Test your contract by running different scenarios.
        </p>
        <div className="w-full max-w-4xl">
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold ml-4"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestContract;
