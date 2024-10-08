"use client";
import React, { useState } from "react";
import "@/styles/globals.css";
import { useAccount } from "@particle-network/connectkit";

const HomePage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    if (isConnected) {  
      window.location.href = "/dashboard";
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://forkast.news/wp-content/uploads/2021/08/Solana-1260x787.png')",
      }}
    >
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-md">
          <h1 className="text-5xl font-bold mb-4">Welcome to Dappify</h1>
          <p className="text-lg mb-6">
            Create, test, and deploy your dApps easily and efficiently.
          </p>

          
          <button
            onClick={handleGetStarted}
            className="bg-white text-black px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-500 transition duration-300"
          >
            Get Started Now
          </button>
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50 overflow-hidden">
          
          
          <div className="bg-[parent] p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Wallet not connected!</h2>
            <p className="mb-4">Please connect your wallet on Header Area.</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
