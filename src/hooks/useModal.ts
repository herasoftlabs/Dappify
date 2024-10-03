"use client";
import { useState } from 'react';

interface UseModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
