import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('https://forkast.news/wp-content/uploads/2021/08/Solana-1260x787.png')", 
      }}
    >
      <div className="text-center bg-black bg-opacity-50 p-8 rounded-md">
        <h1 className="text-5xl font-bold mb-6">Welcome to Dappify</h1>
        <p className="text-lg mb-8">Create, test, and deploy your dApps easily and efficiently.</p>
        <Link href="/dashboard">
          <button className="bg-white text-black px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-blue transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
