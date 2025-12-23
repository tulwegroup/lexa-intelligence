
export type ComplianceStatus = 'Compliant' | 'Warning' | 'Critical' | 'Pending';

export interface Worker {
  id: string;
  name: string;
  role: string;
  socCode: string;
  visaType: string;
  visaExpiry: string;
  salary: number;
  status: ComplianceStatus;
  riskScore: number;
  lastAudit: string;
}

export interface Document {
  id: string;
  workerId: string;
  type: 'Passport' | 'BRP' | 'Contract' | 'NI Number' | 'Degree Certificate';
  status: 'Verified' | 'Flagged' | 'Missing' | 'Processing';
  expiryDate?: string;
  lastChecked: string;
  confidence: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  agent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  hash: string;
}

export enum AgentId {
  Orchestrator = 'orchestrator',
  DocumentIntel = 'doc-intel',
  Timeline = 'timeline',
  ChangeDetection = 'change-detect',
  Reporting = 'reporting',
  Simulation = 'simulation',
  Conversational = 'conversational'
}

export interface Agent {
  id: AgentId;
  name: string;
  status: 'active' | 'idle' | 'busy' | 'warning';
  capabilities: string[];
  currentTask?: string;
  healthScore: number;
  lastAction: string;
}
