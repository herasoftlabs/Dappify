"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { menuData } from '../../data/menuData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AccountModal from '@/components/modals/StructModal'; 
import InstructionModal from '@/components/modals/InstructionModal/InstructionModal';
import { Instruction } from '@/types/types';
import { useProjectContext,  } from '@/context/Project/ProjectContext';

const Sidebar: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null); 
  const { currentVersion, updateCurrentVersion, versions } = useProjectContext();

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>(() =>
    menuData.reduce((acc, item) => {
      acc[item.id] = true; 
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const openModalWithRoute = (route: string) => {
    setSelectedRoute(route);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRoute(null);
    setModalOpen(false);
  };

  const handleSaveInstruction = (updatedInstruction: Instruction) => {
    if (currentVersion) {
      let updatedInstructions;
   
      if (updatedInstruction.id) {
        updatedInstructions = currentVersion.instructions.map((instr) =>
          instr.id === updatedInstruction.id ? updatedInstruction : instr
        );
      } else {
        updatedInstruction.id = `instruction-${Date.now()}`;
        updatedInstructions = [...currentVersion.instructions, updatedInstruction];
      }
 
      updateCurrentVersion({ ...currentVersion, instructions: updatedInstructions });
      
      console.log('Updated Instructions:', updatedInstructions);
 
      closeModal();
    }
  };
  
  
  

  return (
    <>

      <div
        className="fixed left-4 top-20 z-50 p-2 bg-blue-600 text-primary rounded-full cursor-pointer"
        onClick={toggleSidebar}
      >
        {!isSidebarOpen ? <FaBars size={24} /> : ""}
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
        className="w-[15rem] rounded-r-lg py-[2rem] px-[1rem] bg-primary shadow-lg text-white fixed left-0 top-[7rem] overflow-y-auto custom-scrollbar z-40"
      >
        
        <div className="bg-blue-600 text-white py-3 px-4 rounded-lg text-xl font-bold mb-6 flex justify-between items-center">
          <span>Menü</span>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-400 transition-colors duration-200 absolute right-5 top-5"
          >
            <FaTimes />
          </button>
        </div>

       
        {menuData.map((menuItem) => (
          <div key={menuItem.id} className="mb-6">
            <div
              className="flex items-center cursor-pointer text-lg font-semibold text-gray-100 hover:text-blue-400 transition-all duration-200"
              onClick={() => toggleMenu(menuItem.id)}
            >
              {openMenus[menuItem.id] ? (
                <FaChevronDown className="mr-2" />
              ) : (
                <FaChevronRight className="mr-2" />
              )}
              {menuItem.name}
            </div>

            {openMenus[menuItem.id] && menuItem.subItems && (
              <ul className="ml-2 mt-4 space-y-1">
                {menuItem.subItems.map((subItem) => (
                  <li
                    key={subItem.id}
                    className="text-gray-300 hover:text-white hover:bg-[#1A2434] rounded-md cursor-pointer transition-colors duration-200"
                    onClick={() => openModalWithRoute(subItem.id)}
                  >
                    <Link href="#" className="block py-2 px-4 hover:bg-blue-500 rounded-md">
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </motion.div>

      {/* Instruction Modal */}
      {selectedRoute === "instruction" && (
        <InstructionModal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          instruction={{
            id: '',
            name: '',
            description: '',
            parameters: [],
            context: [],
            pdas: [],
            errors: [],
            events: [],
            access_control: '',
          }} 
          accounts={[]}
          onSave={(updatedInstruction) => {
      
            handleSaveInstruction(updatedInstruction);
          }}
        /> 
      )}


      
      {/* DataAccount Modal */}
      {selectedRoute === "data-account" && (
        <AccountModal 
          isOpen={modalOpen} 
          onClose={closeModal} 
        /> 
      )}
    </>
  );
};

export default Sidebar;
