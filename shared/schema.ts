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
