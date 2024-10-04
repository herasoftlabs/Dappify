// anchorTemplate.ts

export interface Instruction {
  name: string;
  accounts: {
    name: string;
    isMut: boolean;
    isSigner: boolean;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
}

export interface Account {
  name: string;
  type: {
    kind: string;
    fields: {
      name: string;
      type: string;
    }[];
  };
}

export interface AnchorTemplate {
  version: string;
  name: string;
  instructions: Instruction[];
  accounts: Account[];
  types: {
    name: string;
    type: {
      kind: string;
      variants: {
        name: string;
      }[];
    };
  }[];
}

export const anchorTemplates = {
  blankAnchorJson: {
    version: "0.1.0",
    name: "onchain_voting",
    instructions: [
      {
        name: "initVoteBank",
        accounts: [
          { name: "voteAccount", isMut: true, isSigner: true },
          { name: "signer", isMut: true, isSigner: true },
          { name: "systemProgram", isMut: false, isSigner: false }
        ],
        args: []
      },
      {
        name: "gibVote",
        accounts: [
          { name: "voteAccount", isMut: true, isSigner: false },
          { name: "signer", isMut: false, isSigner: true }
        ],
        args: [
          {
            name: "voteType",
            type: { defined: "VoteType" }
          }
        ]
      }
    ],
    accounts: [
      {
        name: "VoteBank",
        type: {
          kind: "struct",
          fields: [
            { name: "isOpenToVote", type: "bool" },
            { name: "gm", type: "u64" },
            { name: "gn", type: "u64" }
          ]
        }
      }
    ],
    types: [
      {
        name: "VoteType",
        type: {
          kind: "enum",
          variants: [{ name: "GM" }, { name: "GN" }]
        }
      }
    ]
  } as AnchorTemplate,
  splTokenJson: {
    program: {
      name: "spl_token_project",
      instructions: [
        {
          name: "create_token",
          context: "CreateToken",
          description: "Creates a token and transfers it.",
          parameters: [
            {
              name: "amount",
              type: "u64"
            }
          ]
        }
      ],
      accounts: [
        {
          name: "mint",
          type: "Account",
          reference: "Mint",
          mutable: true
        },
        {
          name: "from",
          type: "Signer",
          mutable: true
        },
        {
          name: "to",
          type: "Account",
          reference: "TokenAccount"
        },
        {
          name: "token_program",
          type: "Program",
          reference: "token::Token"
        }
      ]
    }
  }
};
