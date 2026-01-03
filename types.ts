
export enum AppView {
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW',
  CODE = 'CODE',
  PROJECTS = 'PROJECTS',
  SETTINGS = 'SETTINGS',
  TEMPLATES = 'TEMPLATES',
  DASHBOARD = 'DASHBOARD',
  ADMIN = 'ADMIN',
  BILLING = 'BILLING',
  BILLING_ADMIN = 'BILLING_ADMIN',
  COMPILER = 'COMPILER',
  MOBILE_FORGE = 'MOBILE_FORGE',
  FIGMA_SYNC = 'FIGMA_SYNC',
  ASSET_VAULT = 'ASSET_VAULT',
  INTEGRATIONS = 'INTEGRATIONS',
  DB_MANAGER = 'DB_MANAGER',
  DATA_WAREHOUSE = 'DATA_WAREHOUSE',
  API_CONNECTORS = 'API_CONNECTORS',
  DEPLOY_MANAGER = 'DEPLOY_MANAGER',
  STYLE_SYSTEM = 'STYLE_SYSTEM',
  SYSTEM_MONITOR = 'SYSTEM_MONITOR'
}

export type Framework = 'html' | 'nextjs' | 'bootstrap' | 'php' | 'wordpress' | 'python' | 'react' | 'typescript' | 'vue' | 'sql' | 'go' | 'kotlin' | 'swift';

export type UserRole = 'ADMIN' | 'USER' | 'DEMO' | 'ARCHITECT';
export type SubscriptionPlan = 'FREE' | 'LITE' | 'PRO' | 'ELITE';
export type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUAL';

export interface ProjectFile {
  name: string;
  language: string;
  content: string;
  path: string;
}

export interface GeneratedWebsite {
  id: string;
  userId?: string;
  name: string;
  html: string;
  code?: string;
  files?: ProjectFile[];
  framework: Framework;
  description: string;
  createdAt: number;
  updatedAt: number;
  isPublished: boolean;
  githubRepo?: string;
  figmaUrl?: string;
  sizeKb?: number;
  deployUrl?: string;
}

export type PaymentMethod = 'BANCOLOMBIA' | 'NEQUI' | 'PAYPAL' | 'BINANCE' | 'WESTERN_UNION' | 'BBVA' | 'GLOBAL66' | 'NU_BANK' | 'WOMPI';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: 'USD' | 'COP';
  method: PaymentMethod;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REVIEW';
  date: number;
  plan: SubscriptionPlan;
  cycle: BillingCycle;
  reference?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  plan: SubscriptionPlan;
  location: string;
  balance: number;
  passwordHash?: string;
  integrations?: {
    githubToken?: string;
    figmaToken?: string;
    openaiKey?: string;
    anthropicKey?: string;
    endpoints?: string[];
    vercelToken?: string;
  };
  createdAt?: number;
  transactions?: Transaction[];
  warehouseStats?: {
    totalUsedBytes: number;
    maxBytes: number;
  };
}
