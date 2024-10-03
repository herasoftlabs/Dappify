import React from 'react';
import Topbar from '@/components/layout/Topbar';
import { ProjectProvider } from '@/context/Project/ProjectContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-col h-screen">
     
      <div className="p-6 flex items-center justify-center bg-gray-100">
      <ProjectProvider>
      {/* Diğer layout bileşenleri (Sidebar, Topbar, vs.) */}
      {children}
    </ProjectProvider>
      </div>
    </div>
  );
};

export default DashboardLayout;
