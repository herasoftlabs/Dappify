
export interface Template {
    id: number;
    name: string;
    category: string;
    description: string;
    isComingSoon: boolean;
    imageUrl: string; 
  }
  
  export const templatesData: Template[] = [
    {
      id: 1,
      name: 'Blank Anchor Template',
      category: "Basic",
      description: 'A blank dApp template will be created.',
      isComingSoon: false,
      imageUrl: 'https://placehold.co/200x200.png',
    },
    {
      id: 1,
      name: 'SPL Token Template',
      category: "Advanced",
      description: 'Create and manage your own SPL token with this template.',
      isComingSoon: true,
      imageUrl: 'https://placehold.co/200x200.png',
    },
    {
      id: 2,
      name: 'NFT Marketplace Template',
      category: "Advanced",
      description: 'Build an NFT marketplace with pre-built components.',
      isComingSoon: true,
      imageUrl: 'https://placehold.co/200x200.png',
    },
    {
      id: 3,
      name: 'Staking Template',
      category: "Advanced",
      description: 'Create a staking dApp with token reward distribution.',
      isComingSoon: true,
      imageUrl: 'https://placehold.co/200x200.png',
    },
  ];
  