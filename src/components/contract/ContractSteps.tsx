"use client";
import React, { useState, useEffect } from 'react';
import SelectTemplate from './SelectTemplate';
import EditContract from './EditContract';
import TestContract from './TestContract';
import DeployContract from './DeployContract';
import PrepareOnePage from './PublishContract';

const steps = [
  { id: 1, title: 'Select Template', component: SelectTemplate },
  { id: 2, title: 'Edit Contract', component: EditContract },
  { id: 3, title: 'Test Contract', component: TestContract },
  { id: 4, title: 'Deploy Contract', component: DeployContract },
  { id: 5, title: 'Publish Dapp', component: PrepareOnePage },
];

const ContractSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  if (currentStep < 0 || currentStep >= steps.length) {
    return <div>Invalid step selected.</div>;
  }

  const CurrentComponent = steps[currentStep]?.component;
  if (!CurrentComponent) {
    return <div>Component not found for this step.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-gray-800 text-white p-3 rounded-lg mb-6">
        <ul className='flex x-6'>
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                aria-label={`Go to ${step.title} step`}
                onClick={() => setCurrentStep(index)}
                className={`text-lg font-medium px-4 py-2 rounded-md transition-colors ${
                  index === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
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
        <CurrentComponent setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
};

export default ContractSteps;
