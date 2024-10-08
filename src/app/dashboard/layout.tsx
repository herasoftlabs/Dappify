import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="p-6 flex items-center justify-center bg-gray-100">
    {children}
  </div>
  );
};

export default DashboardLayout;
