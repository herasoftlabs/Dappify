import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, Contract, Program, Instruction } from '@/types/types';

interface ProjectStore {
  projects: Project[];
  currentVersion: Program | null;
  versions: Program[];
  addProject: (project: Project) => void;
  addProgramVersion: (projectId: string, program: Program) => void; 
  updateCurrentVersion: (update: Partial<Program>) => void;
  rollbackVersion: (versionId: string) => void;
  updateProjectContracts: (id: string, contracts: Contract[]) => void;
  deleteProject: (id: string) => void;
}


const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentVersion: null,
      versions: [],
      
      addProject: (project: Project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

        addProgramVersion: (projectId: string, program: Program) => {
          const currentVersion = get().currentVersion;
          const timestamp = new Date().toISOString();
          const versionNumber = get().versions.filter((v) => v.projectId === projectId).length + 1;
          const newProgramVersion = { ...program, createdAt: timestamp, versionNumber, projectId };
        
          if (currentVersion) {
            set((state) => ({
              versions: [...state.versions, currentVersion],
              currentVersion: newProgramVersion,
            }));
          } else {
            set({ currentVersion: newProgramVersion });
          }
        },
        
        
      updateCurrentVersion: (update: Partial<Program>) =>
        set((state) => {
          const currentVersion = state.currentVersion;
          if (currentVersion) {
            const updatedVersion = { ...currentVersion, ...update };
            return { currentVersion: updatedVersion };
          }
          return {};
        }),
      rollbackVersion: (versionId: string) => {
        const version = get().versions.find((v) => v.id === versionId);
        if (version) {
          set((state) => ({
            currentVersion: version,
            versions: state.versions.filter((v) => v.id !== versionId),
          }));
        }
      },
      updateProjectContracts: (id: string, contracts: Contract[]) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, contracts } : project
          ),
        })),
      deleteProject: (id: string) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
    }),
    {
      name: 'project-storage',
    }
  )
);


export default useProjectStore;
