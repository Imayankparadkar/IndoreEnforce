import { 
  type User, 
  type InsertUser, 
  type ScamReport, 
  type InsertScamReport,
  type CaseInvestigation,
  type InsertCaseInvestigation,
  type ThreatData,
  type InsertThreatData,
  type FraudIdentifier,
  type InsertFraudIdentifier,
  type OfficerAction,
  type InsertOfficerAction,
  type KautilyaOperation,
  type InsertKautilyaOperation,
  type MayajaalProfile,
  type InsertMayajaalProfile,
  type VajraAction,
  type InsertVajraAction
} from "@shared/schema";
import { randomUUID } from "crypto";
import crypto from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Scam Reports
  createScamReport(report: InsertScamReport): Promise<ScamReport>;
  getScamReports(): Promise<ScamReport[]>;
  getScamReport(id: string): Promise<ScamReport | undefined>;
  updateScamReport(id: string, updates: Partial<ScamReport>): Promise<ScamReport | undefined>;
  getScamReportsByLocation(location: string): Promise<ScamReport[]>;

  // Case Investigations
  createCaseInvestigation(investigation: InsertCaseInvestigation): Promise<CaseInvestigation>;
  getCaseInvestigations(): Promise<CaseInvestigation[]>;
  getCaseInvestigationsByOfficer(officerId: string): Promise<CaseInvestigation[]>;
  updateCaseInvestigation(id: string, updates: Partial<CaseInvestigation>): Promise<CaseInvestigation | undefined>;

  // Threat Data
  createThreatData(threat: InsertThreatData): Promise<ThreatData>;
  getThreatData(): Promise<ThreatData[]>;
  getThreatDataByLocation(location: string): Promise<ThreatData[]>;
  updateThreatData(id: string, updates: Partial<ThreatData>): Promise<ThreatData | undefined>;

  // Fraud Identifiers
  createFraudIdentifier(identifier: InsertFraudIdentifier): Promise<FraudIdentifier>;
  getFraudIdentifiers(): Promise<FraudIdentifier[]>;
  getFraudIdentifier(identifier: string): Promise<FraudIdentifier | undefined>;
  updateFraudIdentifier(id: string, updates: Partial<FraudIdentifier>): Promise<FraudIdentifier | undefined>;
  getFraudIdentifiersByType(type: string): Promise<FraudIdentifier[]>;

  // Officer Actions
  createOfficerAction(action: InsertOfficerAction): Promise<OfficerAction>;
  getOfficerActions(): Promise<OfficerAction[]>;
  getOfficerActionsByOfficer(officerId: string): Promise<OfficerAction[]>;

  // Kautilya Operations (6-step workflow)
  createKautilyaOperation(operation: InsertKautilyaOperation): Promise<KautilyaOperation>;
  getKautilyaOperation(id: string): Promise<KautilyaOperation | undefined>;
  getKautilyaOperationsByOfficer(officerId: string): Promise<KautilyaOperation[]>;
  updateKautilyaOperation(id: string, updates: Partial<KautilyaOperation>): Promise<KautilyaOperation | undefined>;

  // Mayajaal Profiles
  createMayajaalProfile(profile: InsertMayajaalProfile): Promise<MayajaalProfile>;
  getMayajaalProfiles(): Promise<MayajaalProfile[]>;
  updateMayajaalProfile(id: string, updates: Partial<MayajaalProfile>): Promise<MayajaalProfile | undefined>;

  // Vajra Actions
  createVajraAction(action: InsertVajraAction): Promise<VajraAction>;
  getVajraActionsByOperation(operationId: string): Promise<VajraAction[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private scamReports: Map<string, ScamReport>;
  private caseInvestigations: Map<string, CaseInvestigation>;
  private threatData: Map<string, ThreatData>;
  private fraudIdentifiers: Map<string, FraudIdentifier>;
  private officerActions: Map<string, OfficerAction>;
  private kautilyaOperations: Map<string, KautilyaOperation>;
  private mayajaalProfiles: Map<string, MayajaalProfile>;
  private vajraActions: Map<string, VajraAction>;

  constructor() {
    this.users = new Map();
    this.scamReports = new Map();
    this.caseInvestigations = new Map();
    this.threatData = new Map();
    this.fraudIdentifiers = new Map();
    this.officerActions = new Map();
    this.kautilyaOperations = new Map();
    this.mayajaalProfiles = new Map();
    this.vajraActions = new Map();
    
    // Initialize with some demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo officer user
    const officerId = randomUUID();
    const officer: User = {
      id: officerId,
      username: "officer.sharma",
      password: "demo123",
      role: "officer",
      createdAt: new Date(),
    };
    this.users.set(officerId, officer);

    // Add some demo threat data for Indore locations
    const locations = [
      { name: "Rajwada", lat: "22.7196", lng: "75.8577" },
      { name: "Vijay Nagar", lat: "22.7532", lng: "75.8937" },
      { name: "Palasia", lat: "22.6934", lng: "75.8703" },
      { name: "MG Road", lat: "22.7278", lng: "75.8723" },
      { name: "Saket", lat: "22.7044", lng: "75.8869" },
    ];

    const scamTypes = ["UPI", "Voice", "Job", "Phishing", "Loan"];
    const severities = ["High", "Medium", "Low"];

    locations.forEach((location, index) => {
      const threatId = randomUUID();
      const threat: ThreatData = {
        id: threatId,
        location: location.name,
        latitude: location.lat,
        longitude: location.lng,
        scamType: scamTypes[index % scamTypes.length],
        severity: severities[index % severities.length],
        reportCount: Math.floor(Math.random() * 25) + 5,
        lastReported: new Date(),
      };
      this.threatData.set(threatId, threat);
    });

    // Add some demo fraud identifiers
    const demoFraudData = [
      { identifier: "+91 9876543210", type: "phone", riskScore: 85, aliases: ["SBI Helper", "KYC Update"] },
      { identifier: "+91 8765432109", type: "phone", riskScore: 92, aliases: ["Bank Manager", "Loan Officer"] },
      { identifier: "scammer@paytm", type: "upi", riskScore: 78, aliases: ["Payment Gateway"] },
      { identifier: "@fakekyc123", type: "telegram", riskScore: 95, aliases: ["KYC Support", "Bank Update"] },
      { identifier: "+91 7654321098", type: "whatsapp", riskScore: 67, aliases: ["Job Consultant"] },
    ];

    demoFraudData.forEach(data => {
      const fraudId = randomUUID();
      const fraud: FraudIdentifier = {
        id: fraudId,
        identifier: data.identifier,
        type: data.type,
        riskScore: data.riskScore,
        reportCount: Math.floor(Math.random() * 50) + 1,
        aliases: data.aliases,
        networkConnections: [],
        isBlocked: data.riskScore > 80,
        firstReported: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        lastActive: new Date(),
      };
      this.fraudIdentifiers.set(fraudId, fraud);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      role: insertUser.role || "citizen",
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async createScamReport(report: InsertScamReport): Promise<ScamReport> {
    const id = randomUUID();
    const scamReport: ScamReport = {
      ...report,
      location: report.location || null,
      evidenceFiles: report.evidenceFiles || [],
      suspiciousNumbers: report.suspiciousNumbers || [],
      suspiciousUPIs: report.suspiciousUPIs || [],
      id,
      status: "new",
      riskLevel: "medium",
      aiAnalysis: null,
      assignedOfficer: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.scamReports.set(id, scamReport);
    return scamReport;
  }

  async getScamReports(): Promise<ScamReport[]> {
    return Array.from(this.scamReports.values());
  }

  async getScamReport(id: string): Promise<ScamReport | undefined> {
    return this.scamReports.get(id);
  }

  async updateScamReport(id: string, updates: Partial<ScamReport>): Promise<ScamReport | undefined> {
    const report = this.scamReports.get(id);
    if (!report) return undefined;
    
    const updated = { ...report, ...updates, updatedAt: new Date() };
    this.scamReports.set(id, updated);
    return updated;
  }

  async getScamReportsByLocation(location: string): Promise<ScamReport[]> {
    return Array.from(this.scamReports.values()).filter(
      report => report.location === location
    );
  }

  async createCaseInvestigation(investigation: InsertCaseInvestigation): Promise<CaseInvestigation> {
    const id = randomUUID();
    const caseInvestigation: CaseInvestigation = {
      ...investigation,
      findings: investigation.findings || null,
      actionsTaken: investigation.actionsTaken || [],
      status: investigation.status || "ongoing",
      priority: investigation.priority || "medium",
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.caseInvestigations.set(id, caseInvestigation);
    return caseInvestigation;
  }

  async getCaseInvestigations(): Promise<CaseInvestigation[]> {
    return Array.from(this.caseInvestigations.values());
  }

  async getCaseInvestigationsByOfficer(officerId: string): Promise<CaseInvestigation[]> {
    return Array.from(this.caseInvestigations.values()).filter(
      investigation => investigation.officerId === officerId
    );
  }

  async updateCaseInvestigation(id: string, updates: Partial<CaseInvestigation>): Promise<CaseInvestigation | undefined> {
    const investigation = this.caseInvestigations.get(id);
    if (!investigation) return undefined;
    
    const updated = { ...investigation, ...updates, updatedAt: new Date() };
    this.caseInvestigations.set(id, updated);
    return updated;
  }

  async createThreatData(threat: InsertThreatData): Promise<ThreatData> {
    const id = randomUUID();
    const threatData: ThreatData = {
      ...threat,
      reportCount: threat.reportCount || 1,
      id,
      lastReported: new Date(),
    };
    this.threatData.set(id, threatData);
    return threatData;
  }

  async getThreatData(): Promise<ThreatData[]> {
    return Array.from(this.threatData.values());
  }

  async getThreatDataByLocation(location: string): Promise<ThreatData[]> {
    return Array.from(this.threatData.values()).filter(
      threat => threat.location === location
    );
  }

  async updateThreatData(id: string, updates: Partial<ThreatData>): Promise<ThreatData | undefined> {
    const threat = this.threatData.get(id);
    if (!threat) return undefined;
    
    const updated = { ...threat, ...updates };
    this.threatData.set(id, updated);
    return updated;
  }

  async createFraudIdentifier(identifier: InsertFraudIdentifier): Promise<FraudIdentifier> {
    const id = randomUUID();
    const fraudIdentifier: FraudIdentifier = {
      ...identifier,
      aliases: identifier.aliases || [],
      networkConnections: identifier.networkConnections || [],
      reportCount: identifier.reportCount || 1,
      riskScore: identifier.riskScore || 50,
      id,
      firstReported: new Date(),
      lastActive: new Date(),
    };
    this.fraudIdentifiers.set(id, fraudIdentifier);
    return fraudIdentifier;
  }

  async getFraudIdentifiers(): Promise<FraudIdentifier[]> {
    return Array.from(this.fraudIdentifiers.values());
  }

  async getFraudIdentifier(identifier: string): Promise<FraudIdentifier | undefined> {
    return Array.from(this.fraudIdentifiers.values()).find(
      fraud => fraud.identifier === identifier
    );
  }

  async updateFraudIdentifier(id: string, updates: Partial<FraudIdentifier>): Promise<FraudIdentifier | undefined> {
    const fraud = this.fraudIdentifiers.get(id);
    if (!fraud) return undefined;
    
    const updated = { ...fraud, ...updates };
    this.fraudIdentifiers.set(id, updated);
    return updated;
  }

  async getFraudIdentifiersByType(type: string): Promise<FraudIdentifier[]> {
    return Array.from(this.fraudIdentifiers.values()).filter(
      fraud => fraud.type === type
    );
  }

  async createOfficerAction(action: InsertOfficerAction): Promise<OfficerAction> {
    const id = randomUUID();
    const timestamp = new Date();
    
    // Create immutable hash
    const hashData = `${action.officerId}-${action.action}-${action.targetId}-${timestamp.toISOString()}`;
    const immutableHash = crypto.createHash('sha256').update(hashData).digest('hex');
    
    const officerAction: OfficerAction = {
      ...action,
      targetId: action.targetId || null,
      details: action.details || null,
      id,
      timestamp,
      immutableHash,
    };
    this.officerActions.set(id, officerAction);
    return officerAction;
  }

  async getOfficerActions(): Promise<OfficerAction[]> {
    return Array.from(this.officerActions.values()).sort(
      (a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0)
    );
  }

  async getOfficerActionsByOfficer(officerId: string): Promise<OfficerAction[]> {
    return Array.from(this.officerActions.values())
      .filter(action => action.officerId === officerId)
      .sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0));
  }

  // Kautilya Operations (6-step workflow)
  async createKautilyaOperation(operation: InsertKautilyaOperation): Promise<KautilyaOperation> {
    const id = randomUUID();
    const kautilyaOperation: KautilyaOperation = {
      ...operation,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      chatLog: operation.chatLog || [],
      scammerDNA: operation.scammerDNA || {},
      networkMatches: operation.networkMatches || [],
      akhantaLedger: operation.akhantaLedger || [],
    };
    this.kautilyaOperations.set(id, kautilyaOperation);
    return kautilyaOperation;
  }

  async getKautilyaOperation(id: string): Promise<KautilyaOperation | undefined> {
    return this.kautilyaOperations.get(id);
  }

  async getKautilyaOperationsByOfficer(officerId: string): Promise<KautilyaOperation[]> {
    return Array.from(this.kautilyaOperations.values())
      .filter(op => op.officerId === officerId)
      .sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0));
  }

  async updateKautilyaOperation(id: string, updates: Partial<KautilyaOperation>): Promise<KautilyaOperation | undefined> {
    const operation = this.kautilyaOperations.get(id);
    if (!operation) return undefined;
    
    const updated = { ...operation, ...updates, updatedAt: new Date() };
    this.kautilyaOperations.set(id, updated);
    return updated;
  }

  // Mayajaal Profiles
  async createMayajaalProfile(profile: InsertMayajaalProfile): Promise<MayajaalProfile> {
    const id = randomUUID();
    const mayajaalProfile: MayajaalProfile = {
      ...profile,
      id,
      createdAt: new Date(),
      isActive: profile.isActive ?? true,
      usageCount: profile.usageCount || 0,
      successRate: profile.successRate || 0,
    };
    this.mayajaalProfiles.set(id, mayajaalProfile);
    return mayajaalProfile;
  }

  async getMayajaalProfiles(): Promise<MayajaalProfile[]> {
    return Array.from(this.mayajaalProfiles.values()).filter(p => p.isActive);
  }

  async updateMayajaalProfile(id: string, updates: Partial<MayajaalProfile>): Promise<MayajaalProfile | undefined> {
    const profile = this.mayajaalProfiles.get(id);
    if (!profile) return undefined;
    
    const updated = { ...profile, ...updates };
    this.mayajaalProfiles.set(id, updated);
    return updated;
  }

  // Vajra Actions
  async createVajraAction(action: InsertVajraAction): Promise<VajraAction> {
    const id = randomUUID();
    const vajraAction: VajraAction = {
      ...action,
      id,
      createdAt: new Date(),
      executedAt: action.status === 'executed' ? new Date() : null,
    };
    this.vajraActions.set(id, vajraAction);
    return vajraAction;
  }

  async getVajraActionsByOperation(operationId: string): Promise<VajraAction[]> {
    return Array.from(this.vajraActions.values())
      .filter(action => action.operationId === operationId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
}

export const storage = new MemStorage();
