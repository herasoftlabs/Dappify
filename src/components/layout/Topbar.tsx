"use client";

import Image from "next/image";
import Link from "next/link";
import { headerMenu } from "@/data/menuData"; // Menü öğelerini dinamik olarak içe aktarıyoruz.
import { useRouter } from "next/navigation";

function Topbar() {
  const router = useRouter();

  return (
    <nav className="topbar flex items-center justify-between px-52 py-4 bg-primary-500 text-white">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-4">
        <div className="text-heading3-bold text-white max-xs:hidden">
          <div className="flex">
            Dappify
            <img
              src="https://d1uoymq29mtp9f.cloudfront.net/web/img/fire.gif"
              alt="fire icon"
              className="w-[30px] h-[30px]"
            />
          </div>
        </div>
      </Link>

      {/* Menü Öğeleri */}
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

      {/* Cüzdan Bağlama */}
      <div className="max-lg:hidden text-white">
        <button onClick={() => router.push('/404')} className="bg-blue px-4 py-2 rounded">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}

export default Topbar;
