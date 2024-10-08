import useProjectStore from '@/context/Project/useProjectStore';
import { Program } from '@/types/types'; 

const useProject = () => {
  const projects = useProjectStore((state) => state.projects);
  const currentVersion = useProjectStore((state) => state.currentVersion);
  const versions = useProjectStore((state) => state.versions);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProjectContracts = useProjectStore((state) => state.updateProjectContracts);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const addProgramVersion = (projectId: string, program: Program) =>
    useProjectStore.getState().addProgramVersion(projectId, program);

  const updateCurrentVersion = useProjectStore((state) => state.updateCurrentVersion);
  const rollbackVersion = useProjectStore((state) => state.rollbackVersion);

  return {
    projects,
    addProject,
    updateProjectContracts,
    deleteProject,
    addProgramVersion,
    updateCurrentVersion,
    rollbackVersion,
  };
};

export default useProject;
