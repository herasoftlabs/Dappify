"use client";

import { FC, ReactNode } from 'react';
import { ProjectProvider } from './Project/ProjectContext'; 

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ProjectProvider>
        {children}
    </ProjectProvider>
  );
};
