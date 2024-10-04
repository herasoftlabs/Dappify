"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Modal from '@/components/common/Modal';
import Loader from '@/components/common/Loader';
import useProject from '@/hooks/useProject'; 

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState('');

  
  const { projects, addProject, deleteProject } = useProject(); 

  const handleCreateDapp = () => {
   
    setIsLoading(true);

    setTimeout(() => {
      
      const timestamp = Date.now().toString();
      const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9]/g, '');
      const folderName = `/projects/${sanitizedProjectName}_${timestamp}`;
      const template = "// This is a template code for the project.";

      const newProject = {
        id: timestamp,
        name: sanitizedProjectName,
        createdAt: new Date().toISOString(),
        folderName,
        template,
        contracts: [],
      };

     
      addProject(newProject);

   
      setIsLoading(false);
      setIsModalOpen(false);
    }, 2000); 
  };

  const handleDeleteDapp = (dappId: string) => {
    
    deleteProject(dappId);
  };

  const handleDappClick = (dappId: string) => {
    
    router.push(`/contract?id=${dappId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userLocale = navigator.language || 'en-US';

    return date.toLocaleString(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Dappify Dashboard!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Start building your decentralized applications easily with Dappify.
      </p>

      <div className="flex flex-col items-center justify-center mt-12">
        <div
          className="bg-white w-[20rem] h-[7rem] rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <div className='flex flex-col items-center'>
            <FaPlus className="text-gray-400 text-6xl" />
            <p className="text-gray-700 mt-4">Create a new dApp</p>
          </div>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mt-8">
          <h1 className="text-[1.5rem] font-semibold text-left text-gray-800 mb-4">Your Projects</h1>
          <hr className='my-5'/>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <li
                key={project.id}
                className="bg-white relative p-4 rounded-md shadow-md text-left flex flex-col justify-between hover:bg-gray-100 transition duration-300"
              >
                <div onClick={() => handleDappClick(project.id)} className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Project Name: {project.name || "Null"}
                    </h3>
                    <small> (ID: {project.id || "Null"})</small>
                  </div>

                  <p className="text-gray-600">
                    Created At: {project.createdAt ? formatDate(project.createdAt) : "Null"}
                  </p>
                  <p className="text-gray-600">Folder Name: <span className='opacity-50'>{project.folderName || "Null"}</span></p>
                  <p className="text-gray-600">Contracts Count: {project.contracts.length || "0"}</p>
                </div>

                <button
                  className="bg-red-500 absolute top-1 right-1 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
                  onClick={() => handleDeleteDapp(project.id)}
                >
                  <FaTrash  size={13}/>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New dApp">
        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleCreateDapp}
          >
            Create
          </button>
        </div>
      </Modal>

      {isLoading && <Loader />}
    </div>
  );
};

export default DashboardPage;
