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

// Zustand store'da tanımlanan Project ve Contract arayüzlerini içe aktarın
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

// Null yerine uygun bir başlangıç değeri belirlemek için boş bir context kullanıyoruz
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

// useProjectContext hook'u ile context'i kullanmak için fonksiyon oluşturuyoruz
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
