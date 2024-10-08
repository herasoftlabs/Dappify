"use client";
import React, { createContext, ReactNode, useContext } from 'react';
import useProjectStore from './useProjectStore';
import { Program, Instruction } from '@/types/types';

interface ProjectContextType {
  currentVersion: Program | null;
  versions: Program[];
  addProgramVersion: (projectId: string, program: Program) => void; 
  updateCurrentVersion: (update: Partial<Program>) => void;
  rollbackVersion: (versionId: string) => void;
}


interface ProjectContextProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<ProjectContextProps> = ({ children }) => {
  const currentVersion = useProjectStore((state) => state.currentVersion);
  const versions = useProjectStore((state) => state.versions);
  const addProgramVersion = useProjectStore((state) => state.addProgramVersion);
  const updateCurrentVersion = useProjectStore((state) => state.updateCurrentVersion);
  const rollbackVersion = useProjectStore((state) => state.rollbackVersion);

  return (
    <ProjectContext.Provider
    value={{
      currentVersion,
      versions,
      addProgramVersion,
      updateCurrentVersion,
      rollbackVersion,
    }}
    >
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
