import React from 'react';
import ContractLayout from '../layout';
import EditContract from '@/components/contract/EditContract';
import ContractSteps from '@/components/contract/ContractSteps';

const EditContractPage: React.FC = () => {
  return (
    <ContractLayout>
      <ContractSteps />
    </ContractLayout>
  );
};

export default EditContractPage;
