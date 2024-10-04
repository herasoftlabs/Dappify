import React, { useState } from "react";
import Card from "@/components/common/Card";
import useProject from "@/hooks/useProject";

interface SelectTemplateProps {
  setCurrentStep: (step: number) => void; 
}

const DeployContract: React.FC<SelectTemplateProps> = ({ setCurrentStep }) => {
  const { projects } = useProject(); 
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [network, setNetwork] = useState("devnet");
  const [isDeploying, setIsDeploying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDeployed, setIsDeployed] = useState(false);

  

  const handleDeploy = async () => {
    if (!selectedProjectId) {
      alert("Please select a project to deploy.");
      return;
    }

    setIsDeploying(true);
    setLogs([]);
    setIsDeployed(false);

    try {
    
      setLogs((prevLogs) => [...prevLogs, "Connecting to blockchain..."]);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLogs((prevLogs) => [...prevLogs, `Deploying contract to ${network.toUpperCase()}...`]);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLogs((prevLogs) => [...prevLogs, "Finalizing deployment..."]);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsDeployed(true);
      setLogs((prevLogs) => [...prevLogs, "Contract deployed successfully!"]);
    } catch (error) {
      console.error("Deployment error:", error);
      setLogs((prevLogs) => [...prevLogs, "Failed to deploy the contract."]);
      alert("Failed to deploy the contract.");
    } finally {
      setIsDeploying(false);
    }
  };

  const handleSaveAndProceed = () => {
    setCurrentStep(4);
};

  return (
    <Card title="Deploy Your Contract">
      <p className="mb-4">Once you are ready, deploy your contract to the blockchain.</p>

    
      <div className="grid grid-cols-2 gap-4 mb-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`border rounded-md p-4 shadow-md cursor-pointer ${
              selectedProjectId === project.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedProjectId(project.id)}
          >
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">Contract ID: {project.id}</p>
          </div>
        ))}
      </div>

     
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Network:</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="border p-2 w-full rounded bg-gray-100"
        >
          <option value="devnet">Devnet</option>
          <option value="mainnet">Mainnet</option>
        </select>
      </div>

   
      {selectedProjectId && (
        <div className="mb-4">
          <button onClick={handleDeploy} disabled={isDeploying} className="bg-primary text-right text-white px-4 py-2 rounded-md mt-6">
            {isDeploying ? "Deploying..." : "Deploy Contract"}
        </button>

        </div>
      )}

   
      {logs.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Deployment Logs:</h3>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      )}

     
      {isDeployed && (
        <div className="mt-6">
         <button onClick={handleSaveAndProceed} className="bg-primary text-right text-white px-4 py-2 rounded-md mt-6">
          Save and Proceed to Test
        </button>
        </div>
      )}
    </Card>
  );
};

export default DeployContract;
