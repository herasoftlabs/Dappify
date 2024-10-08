import type { Metadata } from "next";
import "@/styles/globals.css";
import Topbar from "@/components/layout/Topbar";
import { ContextProvider } from "@/context/ContextProvider"; 
import { ParticleConnectkit } from '@/components/wallet/connectkit';

export const metadata: Metadata = {
  title: "Dappify | Solana dApp Generator",
  description: "Develop dApps on Solana quickly and easily!",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ParticleConnectkit>
        <ContextProvider> 
            <div className="app-container">
              <Topbar />
              {children}
            </div>
        </ContextProvider>
          </ParticleConnectkit>
      </body>
    </html>
  );
}
