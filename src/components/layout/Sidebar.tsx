"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { menuData } from '../../data/menuData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DataAccount from '@/components/modals/DataAccountModal/StructModal'; 
import InstructionModal from '@/components/modals/InstructionModal/InstructionModal';


const Sidebar: React.FC = () => {
  // Menülerin açılıp kapanması için state yönetimi
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>(() =>
    menuData.reduce((acc, item) => {
      acc[item.id] = true; // Başlangıçta tüm menüleri açık yapıyoruz
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Menü başlangıçta gizli olacak
  const [modalOpen, setModalOpen] = useState(false); // Modalın açık olup olmadığını kontrol eder
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null); // Hangi modalın açılacağını belirler

  // Menü başlıklarına tıklandığında açılıp kapanmayı kontrol eden fonksiyon
  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Menü açma/kapatma fonksiyonu
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Modal açma fonksiyonu
  const openModalWithRoute = (route: string) => {
    setSelectedRoute(route);
    setModalOpen(true);
  };

  // Modal kapatma fonksiyonu
  const closeModal = () => {
    setSelectedRoute(null);
    setModalOpen(false);
  };

  return (
    <>
      {/* Menü Açma İkonu */}
      <div
        className="fixed left-4 top-20 z-50 p-2 bg-blue-600 text-primary rounded-full cursor-pointer"
        onClick={toggleSidebar}
      >
        {!isSidebarOpen ? <FaBars size={24} /> : ""}
      </div>

      {/* Sidebar Menü */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
        className="w-[15rem] rounded-r-lg py-[2rem] px-[1rem] bg-primary shadow-lg text-white fixed left-0 top-[7rem] overflow-y-auto custom-scrollbar z-40"
      >
        {/* Menü Başlığı */}
        <div className="bg-blue-600 text-white py-3 px-4 rounded-lg text-xl font-bold mb-6 flex justify-between items-center">
          <span>Menü</span>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-400 transition-colors duration-200 absolute right-5 top-5"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menü Öğeleri */}
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

            {/* Alt Menü Öğeleri */}
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

      {/* Modallar */}
      {selectedRoute === "instruction" && (
        <InstructionModal isOpen={modalOpen} onClose={closeModal} > 
         
        </InstructionModal>
      )}
      {selectedRoute === "data-account" && (
        <DataAccount isOpen={modalOpen} onClose={closeModal} > 
         
        </DataAccount>
      )}
     
      
    </>
  );
};

export default Sidebar;
