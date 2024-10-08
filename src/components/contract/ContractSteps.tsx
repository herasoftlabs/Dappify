"use client";
import React, { useState } from 'react';
import SelectTemplate from '@/components/contract/SelectTemplate';
import EditContract from '@/components/contract/EditContract';
import TestContract from '@/components/contract/TestContract';
import DeployContract from '@/components/contract/DeployContract';
import PrepareOnePage from '@/components/contract/PublishContract';

interface ContractStepsProps {
  projectId: string;
}

const ContractSteps: React.FC<ContractStepsProps> = ({ projectId }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, title: 'Select Template', component: (props: any) => <SelectTemplate {...props} /> },
    { id: 2, title: 'Edit Contract', component: (props: any) => <EditContract {...props} /> },
    { id: 3, title: 'Test Contract', component: (props: any) => <TestContract {...props} /> },
    { id: 4, title: 'Deploy Contract', component: (props: any) => <DeployContract {...props} /> },
    { id: 5, title: 'Publish Dapp', component: (props: any) => <PrepareOnePage {...props} /> },
  ];

  const CurrentComponent = steps[currentStep]?.component;

  if (!CurrentComponent) {
    return <div>Component not found for this step.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      
      <div className="flex justify-center bg-gray-800 text-white p-3 rounded-lg mb-6">
        <ul className="flex space-x-6">
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                aria-label={`Go to ${step.title} step`}
                onClick={() => setCurrentStep(index)}
                className={`text-lg font-medium px-4 py-2 rounded-md transition-colors ${
                  index === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {step.title}
              </button>
              {index < steps.length - 1 && <span className="mx-2 text-gray-300">/</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-4xl">
        <CurrentComponent setCurrentStep={setCurrentStep} projectId={projectId} />
      </div>
    </div>
  );
};

export default ContractSteps;
