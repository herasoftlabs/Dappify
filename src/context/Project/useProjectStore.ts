import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Contract ve Project arayüzlerini tanımlıyoruz
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

// Zustand store'un tipini belirtiyoruz
interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProjectContracts: (id: string, contracts: Contract[]) => void;
  deleteProject: (id: string) => void; // Yeni silme fonksiyonu
}

// Zustand store'u oluşturuyoruz ve persist middleware'ini ekliyoruz
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
