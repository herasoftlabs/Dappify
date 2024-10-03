import React from 'react';

const Loader: React.FC = () => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
);

export default Loader;
