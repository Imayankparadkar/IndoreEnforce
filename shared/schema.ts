import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("citizen"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scamReports = pgTable("scam_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reporterName: text("reporter_name").notNull(),
  reporterContact: text("reporter_contact").notNull(),
  scamType: text("scam_type").notNull(),
  description: text("description").notNull(),
  evidenceFiles: jsonb("evidence_files").$type<string[]>().default([]),
  location: text("location"),
  amount: integer("amount"),
  suspiciousNumbers: jsonb("suspicious_numbers").$type<string[]>().default([]),
  suspiciousUPIs: jsonb("suspicious_upis").$type<string[]>().default([]),
  status: text("status").notNull().default("new"),
  riskLevel: text("risk_level").notNull().default("medium"),
  aiAnalysis: jsonb("ai_analysis").$type<Record<string, any>>(),
  assignedOfficer: text("assigned_officer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const caseInvestigations = pgTable("case_investigations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reportId: text("report_id").notNull(),
  officerId: text("officer_id").notNull(),
  findings: text("findings"),
  actionsTaken: jsonb("actions_taken").$type<string[]>().default([]),
  status: text("status").notNull().default("ongoing"),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const threatData = pgTable("threat_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  scamType: text("scam_type").notNull(),
  severity: text("severity").notNull(),
  reportCount: integer("report_count").notNull().default(1),
  lastReported: timestamp("last_reported").defaultNow(),
});

export const fraudIdentifiers = pgTable("fraud_identifiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  identifier: text("identifier").notNull().unique(),
  type: text("type").notNull(), // 'phone', 'upi', 'telegram', 'whatsapp'
  riskScore: integer("risk_score").notNull().default(0),
  reportCount: integer("report_count").notNull().default(0),
  aliases: jsonb("aliases").$type<string[]>().default([]),
  networkConnections: jsonb("network_connections").$type<string[]>().default([]),
  isBlocked: boolean("is_blocked").notNull().default(false),
  firstReported: timestamp("first_reported").defaultNow(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const officerActions = pgTable("officer_actions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  officerId: text("officer_id").notNull(),
  action: text("action").notNull(),
  targetId: text("target_id"), // can be report ID, case ID, etc.
  details: jsonb("details").$type<Record<string, any>>(),
  timestamp: timestamp("timestamp").defaultNow(),
  immutableHash: text("immutable_hash").notNull(),
});

// New tables for 6-step workflow
export const kautilyaOperations = pgTable("kautilya_operations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reportId: text("report_id").notNull(),
  officerId: text("officer_id").notNull(),
  status: text("status").notNull().default("initiated"), // initiated, engaging, extracting, analyzing, authorized, completed
  targetNumber: text("target_number"),
  extractedUPI: text("extracted_upi"),
  chatLog: jsonb("chat_log").$type<Array<{role: string, message: string, timestamp: string}>>().default([]),
  scammerDNA: jsonb("scammer_dna").$type<Record<string, any>>(),
  networkMatches: jsonb("network_matches").$type<string[]>().default([]),
  vajraAuthorized: boolean("vajra_authorized").default(false),
  vajraExecuted: boolean("vajra_executed").default(false),
  akhantaLedger: jsonb("akhanta_ledger").$type<Array<{action: string, timestamp: string, hash: string}>>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mayajaalProfiles = pgTable("mayajaal_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileName: text("profile_name").notNull(),
  persona: text("persona").notNull(),
  backstory: text("backstory").notNull(),
  communicationStyle: text("communication_style").notNull(),
  isActive: boolean("is_active").default(true),
  usageCount: integer("usage_count").default(0),
  successRate: integer("success_rate").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vajraActions = pgTable("vajra_actions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  operationId: text("operation_id").notNull(),
  actionType: text("action_type").notNull(), // freeze_upi, block_number, alert_banks
  targetIdentifier: text("target_identifier").notNull(),
  status: text("status").notNull().default("pending"), // pending, executed, failed
  authorizedBy: text("authorized_by").notNull(),
  authorizationHash: text("authorization_hash").notNull(),
  executedAt: timestamp("executed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertScamReportSchema = createInsertSchema(scamReports).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  riskLevel: true,
  aiAnalysis: true,
  assignedOfficer: true,
});

export const insertCaseInvestigationSchema = createInsertSchema(caseInvestigations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertThreatDataSchema = createInsertSchema(threatData).omit({
  id: true,
  lastReported: true,
});

export const insertFraudIdentifierSchema = createInsertSchema(fraudIdentifiers).omit({
  id: true,
  firstReported: true,
  lastActive: true,
});

export const insertOfficerActionSchema = createInsertSchema(officerActions).omit({
  id: true,
  timestamp: true,
});

export const insertKautilyaOperationSchema = createInsertSchema(kautilyaOperations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMayajaalProfileSchema = createInsertSchema(mayajaalProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertVajraActionSchema = createInsertSchema(vajraActions).omit({
  id: true,
  createdAt: true,
  executedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ScamReport = typeof scamReports.$inferSelect;
export type InsertScamReport = z.infer<typeof insertScamReportSchema>;
export type CaseInvestigation = typeof caseInvestigations.$inferSelect;
export type InsertCaseInvestigation = z.infer<typeof insertCaseInvestigationSchema>;
export type ThreatData = typeof threatData.$inferSelect;
export type InsertThreatData = z.infer<typeof insertThreatDataSchema>;
export type FraudIdentifier = typeof fraudIdentifiers.$inferSelect;
export type InsertFraudIdentifier = z.infer<typeof insertFraudIdentifierSchema>;
export type OfficerAction = typeof officerActions.$inferSelect;
export type InsertOfficerAction = z.infer<typeof insertOfficerActionSchema>;
export type KautilyaOperation = typeof kautilyaOperations.$inferSelect;
export type InsertKautilyaOperation = z.infer<typeof insertKautilyaOperationSchema>;
export type MayajaalProfile = typeof mayajaalProfiles.$inferSelect;
export type InsertMayajaalProfile = z.infer<typeof insertMayajaalProfileSchema>;
export type VajraAction = typeof vajraActions.$inferSelect;
export type InsertVajraAction = z.infer<typeof insertVajraActionSchema>;
