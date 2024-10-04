import React from 'react';
import ContractLayout from '@/app/contract/layout';
import ContractSteps from '@/components/contract/ContractSteps';

const EditContractPage: React.FC = () => {
  return (
    <ContractLayout>
      <ContractSteps />
    </ContractLayout>
  );
};

export default EditContractPage;
