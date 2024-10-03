export interface Step {
    id: number;
    name: string;
    path: string;
    description?: string;
  }
  
  export const stepsData: Step[] = [
    {
      id: 1,
      name: 'Select Template',
      path: '/contract/select-template',
      description: 'Choose a template that fits your dApp needs.',
    },
    {
      id: 2,
      name: 'Edit Contract',
      path: '/contract/edit-contract',
      description: 'Customize and edit the contract according to your requirements.',
    },
    {
      id: 3,
      name: 'Test Contract',
      path: '/contract/test-contract',
      description: 'Test your contract before deployment.',
    },
    {
      id: 4,
      name: 'Deploy Contract',
      path: '/contract/deploy-contract',
      description: 'Deploy your contract to the blockchain network.',
    },
    {
      id: 5,
      name: 'Publish Contract',
      path: '/contract/publish-contract',
      description: 'Create a one-page site to interact with your dApp.',
    },
  ];
  