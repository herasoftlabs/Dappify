"use client";

import Link from "next/link";
import { headerMenu } from "@/data/menuData"; 
import { ConnectButton, useAccount, useChains } from '@particle-network/connectkit';


function Topbar() {
  
  


  return (
    <nav className="topbar flex items-center justify-between px-52 py-4 bg-primary-500 text-white">
     
      {/* Logo */}
      <Link href="/" className="flex items-center gap-4">
        <div className="text-heading3-bold text-white max-xs:hidden">
          <div className="flex">
            <img
              src="/images/dappify-logo2.png"
              alt="Logo"
              className="w-[100px] h-auto"
            />
          </div>
        </div>
      </Link>

      {/* Menü */}
      <div className="flex justify-between items-center gap-10 text-light-2 text-small-regular max-md:hidden">
        {headerMenu.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="flex items-center gap-2 font-semibold text-[white]/100 hover:text-[white]/70"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Network Switcher ve Cüzdan Bağlama Butonu */}
      <div className="flex items-center gap-6">
      <ConnectButton />
          


        
      </div>
    </nav>
  );
}

export default Topbar;
