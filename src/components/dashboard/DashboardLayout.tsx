import React from 'react';
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Topbar />
      <Sidebar />
      <main className="flex-grow ml-64 mt-20 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
