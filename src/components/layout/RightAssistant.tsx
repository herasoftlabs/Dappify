"use client";
import React, { useState } from 'react';
import { FaRobot, FaTimes, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion'; 

const RightAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

 
  const toggleAssistant = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
    {/* 
    <div
      className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-40 flex flex-col`}
    > */}

      
      <div
        className="fixed  top-20 right-4 h-full z-50 p-2 bg-blue-600 text-primary rounded-full cursor-pointer"
        onClick={toggleAssistant}
      >
        {!isOpen ? <FaBars size={24} /> : ""}
      </div>

     
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.5 }}
        className="w-[20rem] rounded-l-lg py-[2rem] px-[1rem] bg-primary shadow-lg text-black fixed right-0 top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar z-40"
      >
        
        <div className="bg-blue-600 text-white  px-4 rounded-lg text-xl font-bold mb-6 flex justify-between items-center">
          <span><u>GPT Assistant</u></span>

          <button
            onClick={toggleAssistant}
            className="text-white hover:text-gray-400 transition-colors duration-200 absolute right-5 top-5"
          >
            <FaTimes />
          </button>
        </div>

      
        <div className="flex-1 overflow-y-auto text-primary bg-gray-200 p-7 rounded shadow-inner text-sm border border-gray-300 max-h-[500px]">
          
          <ul className="space-y-3 text-sm">
            <li className='list-disc'>
              <strong>Step 1:</strong> Select a template to start building your dApp.
            </li>
            <li className='list-disc'>
              <strong>Step 2:</strong> Use the left-side menu to add Data Accounts, Enums, or other components.
            </li>
            <li className='list-disc'>
              <strong>Step 3:</strong> Edit your contract details, functions, and instructions.
            </li>
            <li className='list-disc'>
              <strong>Step 4:</strong> Test and deploy your dApp to the blockchain.
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default RightAssistant;
