import React, { useContext, useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const DeployContract: React.FC = () => {

  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
     
     
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Contract deployed successfully!');
    } catch (error) {
      console.error('Deployment error:', error);
      alert('Failed to deploy the contract.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card title="Deploy Your Contract">
      <p className="mb-4">Once you are ready, deploy your contract to the blockchain.</p>
      <Button onClick={handleDeploy} disabled={isDeploying}>
        {isDeploying ? 'Deploying...' : 'Deploy Contract'}
      </Button>
    </Card>
  );
};

export default DeployContract;
