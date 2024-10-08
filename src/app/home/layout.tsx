"use client";
import React from 'react';
import '@/styles/globals.css'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className="h-screen flex flex-col overflow-hidden bg-cover bg-center text-white">{children}</main>
    </>
  );
};

export default Layout;
