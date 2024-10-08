export const templates = [
  {
    id: 'blank',
    name: 'Anchor Blank',
    description: 'A blank template with no predefined contracts.',
    program: {
      name: 'Anchor Blank Template',
      description: 'A blank program template',
      version: 'v1.0',
      instructions: [],
      accounts: [],
      errors: [],
      pdas: [],
      events: [],
      access_controls: [],
      cpi_calls: [],
      token_integrations: [],
      advanced_settings: {
        reentrancy_protection: false,
        serialization: { zero_copy: false },
        constraints: [],
        multisig: { enabled: false },
        time_based_restrictions: [],
      },
    },
    contracts: [],
  },
  {
    id: 'token',
    name: 'Token Module',
    description: 'A token-based program template',
    program: {
      name: 'Token Module',
      description: 'A program to create and manage tokens on the blockchain.',
      version: 'v1.0',
      instructions: [
        {
          id: 'instr_001',
          name: 'initialize_mint',
          description: 'Initializes a new token mint with a specified supply.',
          visibility: 'public',
          returnType: 'Result<()>',
          lifetime: 'info', 
          
          parameters: [
            {
              name: 'decimals',
              type: 'u8',
              description: 'The number of decimals for the token.',
            },
            {
              name: 'initial_supply',
              type: 'u64',
              description: 'The initial supply of the token.',
            },
          ],
          context: [
            {
              name: 'mint_account',
              type: 'Account',
              is_mut: true,
              is_signer: false,
              isLifeTime: true,
              data: 'acc_001',
              constraints: {
                init: true,
                payer: 'admin',
                space: '8 + 32 + 1 + 8',
              },
            },
            {
              name: 'admin',
              type: 'Signer',
              is_mut: false,
              is_signer: true,
              isLifeTime: false,
            },
            {
              name: 'system_program',
              type: 'Program',
              is_mut: false,
              is_signer: false,
              isLifeTime: false,
            },
          ],
          access_control: 'ac_001',
          pdas: ['pda_001'],
          events: ['event_001'],
          errors: ['err_001'],
        },
        {
          id: 'instr_002',
          name: 'mint_to',
          description: 'Mints tokens to a specified account.',
          visibility: 'public',
          returnType: 'Result<()>',
          lifetime: 'info', 
          parameters: [
            {
              name: 'amount',
              type: 'u64',
              description: 'The amount of tokens to mint.',
            },
          ],
          context: [
            {
              name: 'mint_account',
              type: 'Account',
              is_mut: true,
              is_signer: false,
              isLifeTime: true,
              data: 'acc_001',
            },
            {
              name: 'receiver_account',
              type: 'Account',
              is_mut: true,
              is_signer: false,
              isLifeTime: false,
            },
            {
              name: 'mint_authority',
              type: 'Signer',
              is_mut: false,
              is_signer: true,
              isLifeTime: false,
            },
          ],
          access_control: 'ac_001',
          pdas: ['pda_001'],
          events: ['event_001'],
          errors: ['err_001'],
        },
      ],
      accounts: [
        {
          id: 'acc_001',
          name: 'MintAccount',
          description: 'The token mint account that holds the token details.',
          type: 'struct',
          attributes: ['account'],
          fields: [
            {
              name: 'mint_authority',
              type: 'Pubkey',
              description: 'The public key of the mint authority.',
            },
            {
              name: 'supply',
              type: 'u64',
              description: 'The total supply of tokens.',
            },
            {
              name: 'decimals',
              type: 'u8',
              description: 'Number of decimals for token amounts.',
            },
          ],
          size: '8 + 32 + 8 + 1',
        },
        {
          id: 'acc_002',
          name: 'TokenState',
          description: 'A state account that holds information about the token status',
          type: 'enum',  
          variants: [
            {
              name: 'Initialized',
              fields: [
                { name: 'admin', type: 'Pubkey', description: 'Admin public key' },
              ],
            },
            {
              name: 'Paused',
              fields: [
                { name: 'reason', type: 'String', description: 'Pause reason' },
              ],
            },
            {
              name: 'Active',
              fields: [],
            },
          ],
        },
      ],
      errors: [
        {
          id: 'err_001',
          name: 'MintAuthorityMismatch',
          code: 1001,
          message: 'The provided mint authority does not match.',
        },
        {
          id: 'err_002',
          name: 'InsufficientSupply',
          code: 1002,
          message: 'Insufficient token supply for the requested operation.',
        },
      ],
      pdas: [
        {
          id: 'pda_001',
          name: 'mint_pda',
          description: 'A PDA associated with the mint account.',
          seeds: [
            {
              type: 'string',
              value: 'b"mint"',
            },
          ],
          bump: 'auto',
          related_accounts: ['mint_account'],
          related_instructions: ['instr_001'],
        },
      ],
      events: [
        {
          id: 'event_001',
          name: 'MintInitialized',
          description: 'Emitted when a new mint is initialized.',
          fields: [
            {
              name: 'admin',
              type: 'Pubkey',
              description: 'The admin who initialized the mint.',
            },
            {
              name: 'timestamp',
              type: 'i64',
              description: 'The time when the mint was initialized.',
            },
          ],
          related_instructions: ['instr_001'],
        },
      ],
      access_controls: [
        {
          id: 'ac_001',
          name: 'IsAdmin',
          description: 'Checks if the caller is the admin.',
          conditions: [
            {
              account: 'mint_account',
              field: 'mint_authority',
              operator: '==',
              value: 'admin.key()',
            },
          ],
          related_instructions: ['instr_001'],
        },
      ],
      cpi_calls: [],
      token_integrations: [],
      advanced_settings: {
        reentrancy_protection: true,
        serialization: {
          zero_copy: false,
        },
        constraints: [
          {
            name: 'PositiveAmount',
            description: 'The mint amount must be positive.',
            expression: 'amount > 0',
          },
        ],
        multisig: {
          enabled: false,
        },
        time_based_restrictions: [],
      },
    },
    contracts: [],
  },
  {
    id: 'sample',
    name: 'Sample Package',
    description: 'Tüm konseptleri içeren örnek bir Solana programı.',
    program: {
      name: 'Sample Project',
      description: 'Tüm konseptleri içeren örnek bir Solana programı',
      version: '0.1.0',
      instructions: [
        {
          id: 'instr_001',
          name: 'initialize',
          description: 'Programı başlatır ve gerekli ayarları yapar',
          visibility: 'public',
          returnType: 'Result<()>',
          lifetime: 'bilgi',
          parameters: [
            {
              name: 'admin',
              type: 'Pubkey',
              description: 'Yönetici adresi',
            },
          ],
          context: [
            {
              name: 'settings_account',
              type: 'Account',
              is_mut: true,
              is_signer: false,
              isLifeTime: true,
              data: 'acc_001',
              constraints: {
                init: true,
                payer: 'admin',
                space: '8 + 49',
                seeds: ["b'settings'"],
                bump: 'auto',
              },
            },
            {
              name: 'admin',
              type: 'Signer',
              is_mut: true,
              is_signer: true,
              isLifeTime: false,
            },
            {
              name: 'system_program',
              type: 'Program',
              is_mut: false,
              is_signer: false,
              isLifeTime: false,
            },
          ],
          access_control: 'ac_001',
          pdas: ['pda_001'],
          events: ['event_001'],
          errors: ['err_001'],
        },
        {
          id: 'instr_002',
          name: 'create_user_profile',
          description: 'Yeni bir kullanıcı profili oluşturur',
          visibility: 'public',
          returnType: 'Result<()>',
          lifetime: 'info',
          data: 'acc_001',
          parameters: [
            {
              name: 'username',
              type: 'String',
              description: 'Kullanıcı adı',
              constraints: {
                max_length: 32,
              },
            },
            {
              name: 'bio',
              type: 'String',
              description: 'Kullanıcı biyografisi',
              constraints: {
                max_length: 256,
              },
            },
          ],
          context: [
            {
              name: 'user',
              type: 'Signer',
              is_mut: true,
              is_signer: true,
              isLifeTime: false,
            },
            {
              name: 'profile_account',
              type: 'Account',
              is_mut: true,
              is_signer: false,
              isLifeTime: true,
              data: 'acc_001',
              constraints: {
                init: true,
                payer: 'user',
                space: '8 + 36 + 260',
                seeds: ["b'profile'", "user.key()"],
                bump: 'auto',
              },
            },
            {
              name: 'system_program',
              type: 'Program',
              is_mut: false,
              is_signer: false,
              isLifeTime: false,
            },
          ],
          access_control: 'ac_001',
          pdas: ['pda_001'],
          events: ['event_001'],
          errors: ['err_001'],
        },
      ],
      accounts: [
        {
          id: 'acc_001',
          name: 'UserProfile',
          description: 'Kullanıcı profili veri yapısı',
          type: 'struct',
          attributes: ['account'],
          fields: [
            {
              name: 'username',
              type: 'String',
              description: 'Kullanıcı adı',
              constraints: {
                max_length: 32,
              },
            },
            {
              name: 'bio',
              type: 'String',
              description: 'Kullanıcı biyografisi',
              constraints: {
                max_length: 256,
              },
            },
            {
              name: 'settings',
              type: 'UserSettings',
              description: 'Kullanıcı ayarları',
            },
          ],
          size: '8 + 36 + 260 + 16',
        },
        {
          id: 'acc_002',
          name: 'SettingsProfile',
          description: 'Kullanıcı ayarlar veri yapısı',
          type: 'struct',
          attributes: ['account'],
          fields: [
            {
              name: 'ayarlar',
              type: 'String',
              description: 'Ayar adı',
              constraints: {
                max_length: 32,
              },
            },
            {
              name: 'bio',
              type: 'String',
              description: 'Kullanıcı biyografisi',
              constraints: {
                max_length: 256,
              },
            },
            {
              name: 'settings',
              type: 'UserSettings',
              description: 'Kullanıcı ayarları',
            },
          ],
          size: '8 + 36 + 260 + 16',
        },
        {
          id: 'acc_002',
          name: 'UserStatus',
          description: 'Kullanıcının durumu',
          type: 'enum', 
          variants: [
            {
              name: 'Active',
              fields: [],
            },
            {
              name: 'Suspended',
              fields: [
                { name: 'reason', type: 'String', description: 'Suspension reason' },
              ],
            },
            {
              name: 'Deleted',
              fields: [],
            },
          ],
        },
      ],
      errors: [
        {
          id: 'err_001',
          name: 'UsernameAlreadyExists',
          code: 1001,
          message: 'Bu kullanıcı adı zaten mevcut.',
          related_instructions: ['instr_002'],
        },
      ],
      pdas: [
        {
          id: 'pda_001',
          name: 'profile_pda',
          description: 'Kullanıcı profili PDA\'sı',
          seeds: [
            {
              type: 'string',
              value: "b'profile'",
            },
            {
              type: 'account',
              value: 'user.key()',
            },
          ],
          bump: 'auto',
          related_accounts: ['profile_account'],
          related_instructions: ['instr_002'],
        },
      ],
      events: [
        {
          id: 'event_001',
          name: 'ProgramInitialized',
          description: 'Program ilk kez başlatıldığında yayınlanır',
          fields: [
            {
              name: 'admin',
              type: 'Pubkey',
              description: 'Yönetici adresi',
            },
            {
              name: 'timestamp',
              type: 'i64',
              description: 'Başlatılma zamanı',
            },
          ],
          related_instructions: ['instr_001'],
        },
      ],
      access_controls: [
        {
          id: 'ac_001',
          name: 'IsAdmin',
          description: 'İşlemi sadece yönetici yapabilir',
          conditions: [
            {
              account: 'settings_account',
              field: 'admin',
              operator: '==',
              value: 'admin.key()',
            },
          ],
          related_instructions: ['instr_002'],
        },
      ],
      cpi_calls: [],
      token_integrations: [],
      advanced_settings: {
        reentrancy_protection: true,
        serialization: {
          zero_copy: false,
        },
        constraints: [
          {
            name: 'PositiveAmount',
            description: 'Miktar pozitif olmalı',
            expression: 'amount > 0',
          },
        ],
        multisig: {
          enabled: false,
        },
        time_based_restrictions: [],
      },
    },
    contracts: [],
  },
];
