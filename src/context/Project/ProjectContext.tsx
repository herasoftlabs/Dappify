"use client";
import React, { createContext, ReactNode, useContext } from 'react';
import useProjectStore from './useProjectStore';

// Context değerlerinin tipini tanımlıyoruz
interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProjectContracts: (id: string, contracts: Contract[]) => void;
}

interface ProjectContextProps {
  children: ReactNode;
}


interface Contract {
  name: string;
  code: string;
}

interface Project {
  id: string;
  name: string;
  createdAt: string;
  folderName: string;
  contracts: Contract[];
  template: string;
}


const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<ProjectContextProps> = ({ children }) => {
  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProjectContracts = useProjectStore((state) => state.updateProjectContracts);

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProjectContracts }}>
      {children}
    </ProjectContext.Provider>
  );
};


export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
