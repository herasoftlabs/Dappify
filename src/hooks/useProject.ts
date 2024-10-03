import useProjectStore from '@/context/Project/useProjectStore'; 

const useProject = () => {
  const { projects, addProject, updateProjectContracts, deleteProject } = useProjectStore(); 
  return { projects, addProject, updateProjectContracts, deleteProject };
};

export default useProject;
