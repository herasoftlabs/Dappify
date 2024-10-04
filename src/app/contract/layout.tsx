import React from 'react';

interface ContractLayoutProps {
  children: React.ReactNode;
}

const ContractLayout: React.FC<ContractLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
     
    <div className="p-6 flex items-center justify-center bg-gray-100">
      {children}
    </div>
  </div>
  );
};

export default ContractLayout;
