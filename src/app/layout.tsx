import React from 'react';
import '../styles/globals.css';
import Topbar from '../components/layout/Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
