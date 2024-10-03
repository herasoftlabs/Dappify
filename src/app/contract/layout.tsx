import React from 'react';
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import RightAssistant from '../../components/layout/RightAssistant';

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
