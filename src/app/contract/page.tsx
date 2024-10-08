"use client"; 

import ContractLayout from '@/app/contract/layout';
import ContractSteps from '@/components/contract/ContractSteps';
import { useSearchParams } from 'next/navigation';

const EditContractPage: React.FC = () => {
  const searchParams = useSearchParams(); 
  const projectId = searchParams.get('id'); 

  if (!projectId) {
    return <div>Project ID not found.</div>; 
  }

  return (
    <ContractLayout>
      <ContractSteps projectId={projectId} />
    </ContractLayout>
  );
};

export default EditContractPage;
