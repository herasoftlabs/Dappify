"use client";
import React, { createContext, useState, ReactNode } from 'react';

interface Contract {
  name: string;
  templateId?: number;
}

interface ContractContextType {
  contract: Contract | null;
  updateContract: (updatedContract: Partial<Contract>) => void;
}

export const ContractContext = createContext<ContractContextType | undefined>(undefined);

interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [contract, setContract] = useState<Contract | null>(null);

  const updateContract = (updatedContract: Partial<Contract>) => {
    setContract((prevContract) => ({
      ...prevContract,
      ...updatedContract,
    }));
  };

  return (
    <ContractContext.Provider value={{ contract, updateContract }}>
      {children}
    </ContractContext.Provider>
  );
};
