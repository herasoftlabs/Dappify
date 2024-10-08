# Dappify
Dappify is a no-code platform for building, testing, and deploying decentralized applications (dApps) on the Solana blockchain. Designed for developers and businesses alike, Dappify provides an intuitive and user-friendly interface to rapidly create blockchain applications without requiring deep coding knowledge. The platform also offers integrated hosting services for deployed dApps.

## Features
No-Code Development: Create blockchain dApps easily using a visual builder. Choose from templates or start from scratch, customizing components to meet your needs.

#### Template and Custom Development: 
Users can either select pre-built templates or start with an empty canvas, adding and configuring visual components to generate the required code. The platform leverages a user experience similar to Elementor, allowing attributes to be specified directly through the interface.

#### Integrated Code Editor: 
While Dappify is a no-code platform, advanced users have the option to inspect and modify the generated code using an integrated code editor.

#### Solana Integration: 
Dappify is built specifically for the Solana blockchain. Users can develop dApps leveraging core Solana structures like accounts, instructions, and more.

#### Deployment and Hosting: 
The generated code is maintained within context throughout the project. During the deployment phase, code is compiled into Anchor project files and deployed directly onto the blockchain. Dappify also provides hosting for these dApps, making it an all-in-one solution.

#### Wallet Integration: 
Users can connect their Phantom wallet to the platform for easy testing and deployment to the Solana network.

## Technology Stack
#### Frontend: 
Built using Next.js and Tailwind CSS, ensuring modern, responsive, and scalable UI/UX design.
#### WebContainer: 
Dappify uses WebContainer technology to provide an in-browser Node.js environment, allowing users to run development scripts such as package installations without needing a local setup.
#### Anchor for Solana: 
Solana's Anchor framework is used for building smart contracts. When creating a new dApp, Dappify uses Anchor to generate reliable and efficient smart contracts that interact seamlessly with the Solana blockchain.


## File Structure
```
dappify/
│
├── public/                         # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                        # Next.js app directory with pages and layouts
│   │   ├── layout.tsx              # Main Layout, used for all pages
│   │   ├── page.tsx                # Home page of the app
│   │   ├── dashboard/              # Dashboard page and layout where users create projects
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── contract/               # Contract-related pages and layout
│   │       ├── page.tsx
│   │       └── layout.tsx
│   │   
│   ├── components/                 # Reusable components for the application
│   │   ├── common/                 # General-purpose components (e.g., Button, Modal)
│   │   ├── layout/                 # Layout components (Topbar, Sidebar, etc.)
│   │   │   ├── RightAssistant.tsx 
│   │   │   ├── Sidebar.tsx 
│   │   │   └── Topbar.tsx 
│   │   ├── dashboard/              # Dashboard component where users create projects
│   │   │   └── DashboardLayout.tsx
│   │   ├── contracts
│   │   │   ├── CodeEditor.tsx      # Editor where codes are shown as rust code
│   │   │   ├── ContractSteps.tsx   # To display components in a tab
│   │   │   ├── DeployContract.tsx  # The section where the Contract will be deployed to the Blockchain network
│   │   │   ├── EditContract.tsx    # The section where the Contract will be organized visually and coded.
│   │   │   ├── PublishContract.tsx # Preparing the frontend design that will interact with the deployed contract
│   │   │   ├── SelectTemplate.tsx  # Section for selecting a template at the beginning for contracts (Blank, Token, NFT etc.)
│   │   │   └── TestContract.tsx    # Section where contracts will be tested
│   │   └── modals/                 # Modal components for specific actions
│   │       ├── DataAccountModal/
│   │       └── InstructionModal/
│   │           └── ContextPanel.tsx          # The section where the context accounts of the instruction are kept.
│   │           └── FieldRow.tsx              # 
│   │           └── InstructionAccountRow.tsx # 
│   │           └── InstructionModal.tsx      # Main part of the instruction modal
│   │           └── InstructionPanel.tsx      # 
│   │           └── InstructionRow.tsx        # 
│   │           └── ParametersPanel.tsx       # Instruction section where parameters are shown
│   │           └── PreviewPanel.tsx          # The section where the data is displayed as rust code
│   │           └── SettingsPanel.tsx         # Instruction General Settings section
│   │           └── Tabs.tsx                  # Section where tabs are kept
│   │
│   ├── context/                              # React Context API files for state management
│   │   ├── Project/
│   │   │   ├── ProjectContext.tsx
│   │   │   └── useProjectStore.tsx
│   │   ├── WalletContext.tsx
│   │   └── WebContainerContext.tsx
│   ├── data/                           # Static data for menus, templates, etc.
│   │   ├── menuData.ts                 # The section where the component insertion menu in EditContract is kept
│   │   ├── stepsData.ts                # The section where the steps on the Contract page are kept
│   │   └── templateData.ts             # The section where the templates in the SelectTemplate section are kept
│   ├── styles/                         # Global styles (CSS)
│   │   ├── global.css
│   │   └── WhiteBoardCard.css
│   ├── templates/ 
│   │   └── anchorTemplate.ts           # Template to be used when writing contracts to context 
│   ├── types/ 
│   │   └── types.ts                    # Types kept when writing data to the context
│   ├── utils/                          # Helper functions and utilities
│   │   ├── anchorToJson.js             # Anchor to Json conversion tool
│   │   ├── api.ts
│   │   ├── constant.ts
│   │   ├── helper.ts
│   │   └── jsonToAnchor.js             # Json to Anchor conversion tool
│   └── hooks/                          # Custom hooks (e.g., useContract, useWallet)
│       ├── useModal.ts                 # Hook to call Modal
│       ├── useProject.ts               # Hook to call Project Context
│       └── useWallet.ts                # Hook to call Wallet Information
│
└── next.config.js                      # Next.js configuration file

```

## WebContainer Integration
Dappify uses WebContainer to set up in-browser development environments. When a user starts a new project from the Dashboard, WebContainer is used to initialize the environment, install dependencies, and prepare the workspace for Solana smart contract development using Anchor.

#### The setup process includes:

Installing necessary packages such as Rust, Anchor CLI, and any required npm dependencies.
Running development scripts within the browser for instant feedback.
For Anchor setup, follow Anchor Installation Guide.

## Contributing
We welcome contributions from the community! Please read the contribution guidelines before submitting a pull request. Contributions that enhance user experience, add new templates, or improve performance are highly appreciated.

## License
Dappify is open source and distributed under the MIT License. See LICENSE for more information.