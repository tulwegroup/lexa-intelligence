
import { Worker, Agent, AgentId, Document, AuditEntry } from './types';

export const MOCK_WORKERS: Worker[] = [
  { id: 'W001', name: 'Sarah Jenkins', role: 'Software Engineer', socCode: '2136', visaType: 'Skilled Worker', visaExpiry: '2025-06-15', salary: 45000, status: 'Compliant', riskScore: 12, lastAudit: '2024-03-01' },
  { id: 'W002', name: 'David Chen', role: 'Data Analyst', socCode: '2139', visaType: 'Skilled Worker', visaExpiry: '2024-05-20', salary: 38000, status: 'Warning', riskScore: 68, lastAudit: '2024-03-10' },
  { id: 'W003', name: 'Elena Rodriguez', role: 'Project Manager', socCode: '2424', visaType: 'Skilled Worker', visaExpiry: '2026-11-02', salary: 52000, status: 'Compliant', riskScore: 5, lastAudit: '2024-02-15' },
  { id: 'W004', name: 'Marcus Thorne', role: 'UI/UX Designer', socCode: '2137', visaType: 'Skilled Worker', visaExpiry: '2024-04-12', salary: 41000, status: 'Critical', riskScore: 92, lastAudit: '2024-03-18' },
  { id: 'W005', name: 'Linda Wu', role: 'DevOps Lead', socCode: '2136', visaType: 'Skilled Worker', visaExpiry: '2027-01-10', salary: 65000, status: 'Compliant', riskScore: 8, lastAudit: '2024-01-20' },
];

export const MOCK_DOCUMENTS: Document[] = [
  { id: 'D001', workerId: 'W001', type: 'Passport', status: 'Verified', lastChecked: '2024-03-01', confidence: 0.99 },
  { id: 'D002', workerId: 'W001', type: 'BRP', status: 'Verified', expiryDate: '2025-06-15', lastChecked: '2024-03-01', confidence: 0.98 },
  { id: 'D003', workerId: 'W004', type: 'Passport', status: 'Flagged', lastChecked: '2024-03-18', confidence: 0.65 },
  { id: 'D004', workerId: 'W002', type: 'Contract', status: 'Verified', lastChecked: '2024-03-10', confidence: 0.95 },
  { id: 'D005', workerId: 'W003', type: 'NI Number', status: 'Verified', lastChecked: '2024-02-15', confidence: 1.0 },
];

export const MOCK_AUDIT_TRAIL: AuditEntry[] = [
  { id: 'A001', timestamp: '2024-03-20 09:12:05', action: 'BRP Verification Failed', agent: 'Doc Intel Agent', severity: 'high', hash: 'sha256:8f3c...12ab' },
  { id: 'A002', timestamp: '2024-03-20 10:45:12', action: 'Salary Sync: HRIS Integration', agent: 'Change Detection', severity: 'low', hash: 'sha256:4d1a...99ef' },
  { id: 'A003', timestamp: '2024-03-20 11:30:00', action: 'Mock Audit initiated', agent: 'Simulation Agent', severity: 'medium', hash: 'sha256:bc32...ee44' },
  { id: 'A004', timestamp: '2024-03-20 14:20:15', action: 'Visa Expiry Notification Sent', agent: 'Timeline Agent', severity: 'low', hash: 'sha256:77a1...cc01' },
];

export const AGENTS: Agent[] = [
  { id: AgentId.Orchestrator, name: 'Compliance Orchestrator', status: 'active', healthScore: 98, lastAction: 'Self-audit complete', capabilities: ['Coordination', 'Alert Routing', 'Health Monitoring'], currentTask: 'Analyzing overall compliance state' },
  { id: AgentId.DocumentIntel, name: 'Doc Intel Agent', status: 'busy', healthScore: 95, lastAction: 'OCR extraction: Marcus T.', capabilities: ['OCR', 'NLP', 'Forgery Detection'], currentTask: 'Processing BRP for Marcus Thorne' },
  { id: AgentId.Timeline, name: 'Timeline Agent', status: 'active', healthScore: 100, lastAction: 'Updated renewal buffers', capabilities: ['Predictive Scheduling', 'Expiry Tracking'], currentTask: 'Optimizing renewal buffers' },
  { id: AgentId.ChangeDetection, name: 'Change Detection', status: 'idle', healthScore: 92, lastAction: 'Payroll sync successful', capabilities: ['HRIS Sync', 'Anomaly Detection'], currentTask: 'Monitoring payroll for variance' },
  { id: AgentId.Simulation, name: 'Audit Simulator', status: 'busy', healthScore: 96, lastAction: 'Injecting stress scenario #4', capabilities: ['Mock Audits', 'Stress Testing'], currentTask: 'Running Weekly Mock Inspection' },
  { id: AgentId.Reporting, name: 'Narrative Agent', status: 'idle', healthScore: 99, lastAction: 'Generated monthly summary', capabilities: ['Storytelling', 'Regulatory Language'], currentTask: 'Waiting for audit triggers' },
];

export const APP_THEME = {
  primary: '#0f172a',
  secondary: '#334155',
  accent: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};
