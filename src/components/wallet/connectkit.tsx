
'use client';

import React from 'react';
import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { wallet, type EntryPosition } from '@particle-network/connectkit/wallet';
import { mainnet, solana, solanaTestnet, solanaDevnet } from '@particle-network/connectkit/chains';
import { authWalletConnectors } from '@particle-network/connectkit/auth';

import { solanaWalletConnectors,injected as solaInjected } from '@particle-network/connectkit/solana';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;

if (!projectId || !clientKey || !appId) {
    throw new Error('Please configure the Particle project in .env first!');
}

const config = createConfig({
  projectId: projectId as string,
  clientKey: clientKey as string,
  appId: appId as string,
  appearance: {"mode":"dark","recommendedWallets":[{"walletId":"okxWallet","label":"none"},{"walletId":"phantom","label":"none"}],"theme":{"--pcm-font-family":"'__Poppins_68bcaa', '__Poppins_Fallback_68bcaa'","--pcm-body-background":"#212f48","--pcm-body-background-secondary":"#2b3952","--pcm-body-background-tertiary":"#35435c","--pcm-body-color":"#ffffff","--pcm-body-color-secondary":"#b3b3b3","--pcm-body-color-tertiary":"#999999","--pcm-primary-button-bankground":"#242643","--pcm-primary-button-color":"#ffffff","--pcm-primary-button-hover-background":"#373a4f","--pcm-secondary-button-color":"#ffffff","--pcm-secondary-button-bankground":"#0e0e1c","--pcm-secondary-button-hover-background":"#000000","--pcm-body-action-color":"#808080","--pcm-button-border-color":"#4c5561","--pcm-accent-color":"#ffffff","--pcm-rounded-sm":"4px","--pcm-rounded-md":"8px","--pcm-rounded-lg":"11px","--pcm-rounded-xl":"22px","--pcm-button-font-weight":"500","--pcm-modal-box-shadow":"0px 6px 20px 6px rgba(0, 0, 0, 0.1)"},"splitEmailAndPhone":false,"collapseWalletList":false,"hideContinueButton":true,"connectorsOrder":["email","phone","social","wallet","passkey"],"language":"en-US","collapsePasskeyButton":true},
  walletConnectors: [
    
    
    authWalletConnectors({
      authTypes: [
        
        
        "email",
      ],
      fiatCoin: "USD",
      promptSettingConfig:{
      promptMasterPasswordSettingWhenLogin:0,
      promptPaymentPasswordSettingWhenSign:0,
      }
    }),
    
    solanaWalletConnectors({
      connectorFns: [solaInjected({ target: "okxWallet" }),solaInjected({ target: "phantom" })],
    }),
  ],
  plugins: [
    wallet({
      entryPosition: "bottom-right" as EntryPosition,
      visible: false,
      customStyle: {
        fiatCoin: "USD",
      },
    }),
    
  ],
  chains: [solanaDevnet,mainnet, solana],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
  