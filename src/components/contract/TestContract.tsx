import React, { useState } from "react";
import Card from "@/components/common/Card";
import useProject from "@/hooks/useProject";
import Modal from "@/components/common/Modal";

interface CodeType {
  instructions: { name: string; args?: { name: string }[] }[];
  accounts: { name: string; type: { fields: { name: string; type: string }[] } }[];
}

interface SelectTemplateProps {
  setCurrentStep: (step: number) => void; 
}

const TestContract: React.FC<SelectTemplateProps> = ({ setCurrentStep }) => {
  const { projects } = useProject(); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [testInputs, setTestInputs] = useState<{ [key: string]: any }>({});
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

  return (
    <Card title={`Test Your Contract: ${currentProject?.name}`}>
      <p className="mb-4">
        Before deploying, make sure to test your contract thoroughly.
      </p>

      {Object.keys(code).map((sectionName, index) => {
      
        const sectionItems = (code as any)[sectionName];
        if (!Array.isArray(sectionItems)) {
          return null;
        }

        return (
          <div key={index} className="mb-8 p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4 capitalize text-center bg-gray-100 p-3">{sectionName}</h2>

            <div className="grid grid-cols-2 gap-8">
              {sectionItems.map((item: any, idx: number) => (
                <div key={idx} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <div className="mb-2">
                    {item.args && item.args.length > 0 ? (
                      item.args.map((arg: any, argIdx: number) => (
                        <div key={argIdx} className="mb-2">
                          <label className="block font-medium mb-1">
                            {arg.name}:
                          </label>
                          <input
                            type="text"
                            className="border p-2 w-full rounded bg-gray-100"
                            placeholder={`Enter value for ${arg.name}`}
                            value={testInputs[sectionName]?.[item.name]?.[arg.name] || ""}
                            onChange={(e) =>
                              handleInputChange(
                                sectionName as keyof CodeType,
                                item.name,
                                arg.name,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No parameters required.</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRunTest(sectionName as keyof CodeType, item.name)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Run {item.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <button
        onClick={() => console.log("Running all tests...")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-6"
      >
        Run All Tests
      </button>

     

      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Test Running">
        <p>{modalMessage}</p>
      </Modal>
      <button onClick={handleSaveAndProceed} className="bg-primary text-right text-white px-4 py-2 rounded-md mt-6">
          Save and Proceed to Test
        </button>
    </Card>
  );
};

export default TestContract;
