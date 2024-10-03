"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';

interface WebContainerContextProps {
  webContainerInstance: any | null;
  isInitialized: boolean;
}

const WebContainerContext = createContext<WebContainerContextProps>({
  webContainerInstance: null,
  isInitialized: false,
});

export const WebContainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webContainerInstance, setWebContainerInstance] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeWebContainer = async () => {
      try {
        const instance = await WebContainer.boot();
        setWebContainerInstance(instance);
        setIsInitialized(true);
        console.log("WebContainer initialized successfully:", instance);
      } catch (error) {
        console.error("Error initializing WebContainer:", error);
      }
    };

    initializeWebContainer();
  }, []);

  return (
    <WebContainerContext.Provider value={{ webContainerInstance, isInitialized }}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainer = () => useContext(WebContainerContext);
