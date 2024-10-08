export interface Project {
  id: string;
  name: string;
  createdAt: string;
  folderName: string;
  template: string;
  contracts: Contract[];
}

export interface Program {
  id: string;  
  projectId: string;
  name: string;
  description: string;
  version: string;
  versionNumber: number; 
  createdAt: string; 
  instructions: Instruction[];
  accounts: Account[];
  errors: ErrorCode[];
  pdas: PDA[];
  events: Event[];
  access_controls: AccessControl[];
  cpi_calls: CPICall[];
  token_integrations: TokenIntegration[];
  advanced_settings: AdvancedSettings;
}

export interface Version extends Program {
  versionNumber: number; 
  createdAt: string; 
}

export type Contract = Program;

/* Instruction Data */
export interface Instruction {
  id: string;
  name: string;
  description: string;
  visibility?: string;
  returnType?: string; 
  lifetime?: string;
  parameters: Parameter[];
  context: ContextAccount[];
  access_control?: string;
  pdas?: string[];
  events?: string[];
  errors?: string[];
  token_integrations?: string[];
}

export interface ContextAccount {
  name: string;
  type: string;
  is_mut: boolean;
  is_signer: boolean;
  isLifeTime: boolean;
  data?: string;
  constraints?: any;
}

export interface Parameter {
  name: string;
  type: string;
  description: string;
  constraints?: any; 
}


/* Data Account Data */
export interface Account {
  id: string;
  name: string;
  description: string;
  type: 'struct' | 'enum';
  attributes?: string[];
  fields?: AccountField[];
  variants?: Variant[];
  size?: string;
  advanced_settings?: AdvancedSettings;
}

export interface Variant {
  name: string;
  fields?: AccountField[]; 
}

export interface AccountField {
  name: string;
  type: string;
  description?: string;
  fields?: AccountField[]; 
}

export interface AdvancedSettings {
  reentrancy_protection: boolean;
  serialization: SerializationSettings;
  constraints: Constraint[];
  multisig: MultisigSettings;
  time_based_restrictions: TimeBasedRestriction[];
}




/* Errors Data */
export interface ErrorCode {
  id: string;
  name: string;
  code: number;
  message: string;
  related_instructions?: string[];
}

/* PDA Data */
export interface PDA {
  id: string;
  name: string;
  description: string;
  seeds: Seed[];
  bump: string;
  related_accounts?: string[];
  related_instructions?: string[];
}

export interface Seed {
  type: string;
  value: string;
}

/* Event Data */
export interface Event {
  id: string;
  name: string;
  description: string;
  fields: EventField[];
  related_instructions?: string[];
}

export interface EventField {
  name: string;
  type: string;
  description: string;
}

/* Access Control Data */
export interface AccessControl {
  id: string;
  name: string;
  description: string;
  conditions: Condition[];
  related_instructions?: string[];
}

export interface Condition {
  account: string;
  field: string;
  operator: string;
  value: any;
}

/* CPI Call Data */
export interface CPICall {
  id: string;
  name: string;
  description: string;
  target_program: string;
  instruction: string;
  parameters: Parameter[];
  accounts: ContextAccount[];
  related_instructions?: string[];
}

/* Token Integration Data */
export interface TokenIntegration {
  id: string;
  name: string;
  description: string;
  type: string;
  token_mint: string;
  source_account: string;
  destination_account: string;
  amount: string;
  related_instructions?: string[];
}

/* Advanced Settings Data */
export interface AdvancedSettings {
  reentrancy_protection: boolean;
  serialization: SerializationSettings;
  constraints: Constraint[];
  multisig: MultisigSettings;
  time_based_restrictions: TimeBasedRestriction[];
}

export interface SerializationSettings {
  zero_copy: boolean;
}

export interface Constraint {
  name: string;
  description: string;
  expression: string;
}

export interface MultisigSettings {
  enabled: boolean;
  signers_required?: number;
}

export interface TimeBasedRestriction {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
}

export type EndpointTypes = "mainnet" | "devnet" | "localnet";