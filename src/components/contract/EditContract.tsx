"use client";
import React, { useState } from 'react';
import useModal from '@/hooks/useModal';

import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import Sidebar from '../layout/Sidebar';
import RightAssistant from '../layout/RightAssistant';
import { FiSettings, FiCode } from "react-icons/fi";
import { SiCodeblocks } from "react-icons/si";
import CodeEditor from "./CodeEditor"; 
import "@/styles/WhiteBoardCard.css"; 

const EditContract: React.FC = ({ selectedTemplate }: any) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isFlipped, setIsFlipped] = useState(false);
  const [rustCode, setRustCode] = useState("");
  const [programTitle, setProgramTitle] = useState("Unnamed Project 1");

  const flipCard = () => setIsFlipped(!isFlipped);

  const renderContent = () => {
    if (selectedTemplate === "blank-anchor") {
      return (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-gray-400 font-semibold text-center mb-4">
            Select an element from the <u>left menu</u> to start creating a contract!
          </p>
        </div>
      );
    } else if (selectedTemplate === "spl-token") {
      return (
        <div className="grid items-center justify-around gap-7 p-5 grid-cols-3">
          <div className="bg-[#37C2B9] p-2 w-full rounded-md text-left">
            <h1 className="text-[1.2rem] text-white text-body-bold bg-gray-50/50 rounded-md px-2">STRUCTS</h1>
            <ul className="text-white mt-2 px-2">
              <li>pub struct TokenAccount</li>
              <li>pub struct Mint</li>
            </ul>
          </div>
          <div className="bg-[#37C2B9] p-2 w-full rounded-md text-left">
            <h1 className="text-[1.2rem] text-white text-body-bold bg-gray-50/50 rounded-md px-2">FUNCTIONS</h1>
            <ul className="text-white mt-2 px-2">
              <li>fn create_mint()</li>
              <li>fn mint_to()</li>
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex">
      <Sidebar />
      
      
      <Card>
        
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <p className="text-xl font-semibold mr-2">Project Name:</p>
            <input
              type="text"
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
              className="bg-transparent border-b-2 border-gray-300 text-lg font-thin focus:outline-none focus:border-[#212f48]"
            />
          </div>

         
          <div className="flex gap-1">
            <button onClick={flipCard} className="bg-[#212f48] text-white p-2 rounded hover:text-black">
              <FiCode size={20} />
            </button>
            <button className="bg-[#212f48] text-white p-2 rounded hover:text-black">
              <FiSettings size={20} />
            </button>
          </div>
        </div>
        
        {/* Whiteboard Container */}
        <div className="whiteboard-container relative max-w-5xl">
          <div className={`whiteboard-card ${isFlipped ? "flipped" : ""}`}>
            
            {/* Front Side */}
            <div className="whiteboard-front">
              {renderContent()}
            </div>
            
            {/* Back Side */}
            <div className="whiteboard-back">
              {/* Code Editor section */}
              <CodeEditor code={rustCode} onCodeChange={setRustCode} />
              <button onClick={flipCard} className="bg-blue-500 text-white p-2 mt-4 rounded">
                Save and Close
              </button>
            </div>
          </div>
        </div>
      </Card>

      <RightAssistant />
    </div>
  );
};

export default EditContract;
