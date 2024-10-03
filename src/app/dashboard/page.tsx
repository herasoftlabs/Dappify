import React from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
  // Varsayılan olarak oluşturulmuş dApp'ler yok, bu nedenle boş bir liste.
  const dapps:any = []; // Örnek için boş bir liste

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Dappify Dashboard!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Start building your decentralized applications easily with Dappify.
      </p>

      {dapps.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <Link href="/contract" prefetch>
            <div className="bg-white w-64 h-64 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition duration-300">
              <FaPlus className="text-gray-400 text-6xl" />
            </div>
          </Link>

          <p className="text-gray-700 mt-4">Create a new dApp</p>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your dApps</h2>
          <ul className="space-y-4">
            {dapps.map((dapp, index) => (
              <li key={index} className="bg-white p-4 rounded-md shadow-md text-left">
                <h3 className="text-xl font-bold text-gray-800">dApp {index + 1}</h3>
                <p className="text-gray-600">Description of the dApp {index + 1}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
