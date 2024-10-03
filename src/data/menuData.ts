
import { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  path?: string;
  subItems?: MenuItem[];
  icon?: ReactNode;
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
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
   
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    path: '#',
   
  },
  {
    id: 'storage',
    name: 'Storage',
    path: '#',
    
  },
  {
    id: 'domains',
    name: 'Domains',
    path: '#',
   
  },
  {
    id: 'analytics',
    name: 'Analytics',
    path: '#',
  
  },
];