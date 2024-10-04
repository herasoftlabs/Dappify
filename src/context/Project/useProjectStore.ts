import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface Contract {
  name: string;
  code: string;
}

interface Project {
  id: string;
  name: string;
  createdAt: string;
  folderName: string;
  template: string;
  contracts: Contract[];
}


interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProjectContracts: (id: string, contracts: Contract[]) => void;
  deleteProject: (id: string) => void; 
}


const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project: Project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
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
