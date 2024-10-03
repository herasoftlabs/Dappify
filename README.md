dappify/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             
│   │   ├── page.tsx               
│   │   ├── dashboard/
│   │   │   ├── page.tsx           
│   │   │   └── layout.tsx         
│   │   ├── contract/
│   │   │   ├── page.tsx           
│   │   │   └── layout.tsx         
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Topbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── RightAssistant.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── contract/
│   │   │   ├── ContractSteps.tsx
│   │   │   ├── SelectTemplate.tsx
│   │   │   ├── EditContract.tsx
│   │   │   ├── TestContract.tsx
│   │   │   ├── DeployContract.tsx
│   │   │   └── PrepareOnePage.tsx
│   │   │
│   │   └── modals/
│   │       ├── DataAccountModal/
│   │       └── InstructionModal/
│   │
│   ├── context/
│   │   ├── ContractContext.tsx
│   │   └── WalletContext.tsx
│   │
│   ├── data/
│   │   ├── menuData.ts
│   │   ├── templatesData.ts
│   │   └── stepsData.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── utils/
│   │   ├── api.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── useContract.ts
│   │   ├── useWallet.ts
│   │   └── useModal.ts
│
└── next.config.js
