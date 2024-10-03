import React, { useContext } from 'react';
import Card from '@/components/common/Card';


const TestContract: React.FC = () => {
 /*  const { contract } = useContext(ContractContext); */

  const handleRunTest = () => {
   
/*     console.log(`Testing contract: ${contract?.name}`); */
  };

  return (
    <Card title="Test Your Contract">
      <p className="mb-4">Before deploying, make sure to test your contract thoroughly.</p>
      <button
        onClick={handleRunTest}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Run Tests
      </button>
    </Card>
  );
};

export default TestContract;
