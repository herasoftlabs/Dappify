import React from 'react';
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';
import { ProjectProvider } from '@/context/Project/ProjectContext';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProjectProvider>
      <div className="flex">
        <Topbar />
        <Sidebar />
        <main className="flex-grow mt-20 p-6">
          {children}
        </main>
      </div>
    </ProjectProvider>
  );
};

export default DashboardLayout;
