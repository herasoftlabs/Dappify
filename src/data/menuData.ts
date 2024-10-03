
import { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  path?: string;
  subItems?: MenuItem[];
  icon?: ReactNode; // Menü öğesi için ikon eklenebilir.
}

export const menuData: MenuItem[] = [
  {
    id: 'elements',
    name: 'Elements',
    subItems: [
      { id: 'data-account', name: 'Data Account', path: '/contract/data-account' },
      { id: 'enum', name: 'Enum', path: '/contract/enum' },
      { id: 'function', name: 'Function', path: '/contract/function' },
      { id: 'instruction', name: 'Instruction', path: '/contract/instruction' },
    ],
  },
  {
    id: 'modules',
    name: 'Modules',
    subItems: [
      { id: 'spl-token', name: 'SPL Token Module', path: '/contract/spl-token-module' },
      { id: 'nft-module', name: 'NFT Module', path: '/contract/nft-module' },
      { id: 'staking-module', name: 'Staking Module', path: '/contract/staking-module' },
    ],
  },
];




export const headerMenu = [
  {
    id: 'monitoring',
    name: 'Monitoring',
    path: '/project-details',
   
  },
  {
    id: 'storage',
    name: 'Storage',
    path: '/airdrop',
    
  },
  {
    id: 'domains',
    name: 'Domains',
    path: '/domains',
   
  },
  {
    id: 'analytics',
    name: 'Analytics',
    path: '/analytics',
  
  },
];