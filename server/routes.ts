import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertScamReportSchema, 
  insertCaseInvestigationSchema,
  insertThreatDataSchema,
  insertFraudIdentifierSchema,
  insertOfficerActionSchema
} from "@shared/schema";
import { analyzeScamCase, analyzeFraudIdentifier } from "./services/gemini";
import multer from "multer";
import { randomUUID } from "crypto";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Scam Reports endpoints
  app.get("/api/scam-reports", async (req, res) => {
    try {
      const reports = await storage.getScamReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scam reports" });
    }
  });

  app.post("/api/scam-reports", upload.array('evidence'), async (req, res) => {
    try {
      const reportData = insertScamReportSchema.parse(req.body);
      
      // Handle file uploads
      const files = req.files as Express.Multer.File[];
      const evidenceFiles = files ? files.map(file => file.originalname) : [];
      
      const report = await storage.createScamReport({
        ...reportData,
        evidenceFiles,
      });

      // Perform AI analysis
      try {
        const analysis = await analyzeScamCase({
          description: reportData.description,
          scamType: reportData.scamType,
          suspiciousNumbers: reportData.suspiciousNumbers || [],
          suspiciousUPIs: reportData.suspiciousUPIs || [],
        });

        await storage.updateScamReport(report.id, {
          aiAnalysis: analysis,
          riskLevel: analysis.riskLevel || "medium",
        });
      } catch (aiError) {
        console.error("AI analysis failed:", aiError);
      }

      res.json(report);
    } catch (error) {
      res.status(400).json({ message: "Invalid report data" });
    }
  });

  app.get("/api/scam-reports/:id", async (req, res) => {
    try {
      const report = await storage.getScamReport(req.params.id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  app.patch("/api/scam-reports/:id", async (req, res) => {
    try {
      const updates = req.body;
      const updated = await storage.updateScamReport(req.params.id, updates);
      if (!updated) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update report" });
    }
  });

  // Case Investigations endpoints
  app.get("/api/case-investigations", async (req, res) => {
    try {
      const { officerId } = req.query;
      let investigations;
      
      if (officerId) {
        investigations = await storage.getCaseInvestigationsByOfficer(officerId as string);
      } else {
        investigations = await storage.getCaseInvestigations();
      }
      
      res.json(investigations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch investigations" });
    }
  });

  app.post("/api/case-investigations", async (req, res) => {
    try {
      const investigationData = insertCaseInvestigationSchema.parse(req.body);
      const investigation = await storage.createCaseInvestigation(investigationData);
      res.json(investigation);
    } catch (error) {
      res.status(400).json({ message: "Invalid investigation data" });
    }
  });

  // Threat Data endpoints
  app.get("/api/threat-data", async (req, res) => {
    try {
      const { location } = req.query;
      let threats;
      
      if (location) {
        threats = await storage.getThreatDataByLocation(location as string);
      } else {
        threats = await storage.getThreatData();
      }
      
      res.json(threats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch threat data" });
    }
  });

  app.post("/api/threat-data", async (req, res) => {
    try {
      const threatData = insertThreatDataSchema.parse(req.body);
      const threat = await storage.createThreatData(threatData);
      res.json(threat);
    } catch (error) {
      res.status(400).json({ message: "Invalid threat data" });
    }
  });

  // Fraud Identifiers endpoints
  app.get("/api/fraud-identifiers", async (req, res) => {
    try {
      const { type } = req.query;
      let identifiers;
      
      if (type) {
        identifiers = await storage.getFraudIdentifiersByType(type as string);
      } else {
        identifiers = await storage.getFraudIdentifiers();
      }
      
      res.json(identifiers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fraud identifiers" });
    }
  });

  app.post("/api/fraud-identifiers/analyze", async (req, res) => {
    try {
      const { identifier, type } = req.body;
      
      if (!identifier || !type) {
        return res.status(400).json({ message: "Identifier and type are required" });
      }

      // Check if identifier already exists
      let existingFraud = await storage.getFraudIdentifier(identifier);
      
      if (!existingFraud) {
        // Create new fraud identifier
        existingFraud = await storage.createFraudIdentifier({
          identifier,
          type,
          riskScore: 0,
          reportCount: 0,
          aliases: [],
          networkConnections: [],
          isBlocked: false,
        });
      }

      // Perform AI analysis
      try {
        const analysis = await analyzeFraudIdentifier(identifier, type);
        
        await storage.updateFraudIdentifier(existingFraud.id, {
          riskScore: analysis.riskScore,
          aliases: analysis.aliases,
          networkConnections: analysis.networkConnections,
          lastActive: new Date(),
        });

        const updated = await storage.getFraudIdentifier(identifier);
        res.json({ ...updated, analysis });
      } catch (aiError) {
        console.error("AI analysis failed:", aiError);
        res.json({ ...existingFraud, analysis: { error: "AI analysis unavailable" } });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze identifier" });
    }
  });

  // Officer Actions endpoints
  app.get("/api/officer-actions", async (req, res) => {
    try {
      const { officerId } = req.query;
      let actions;
      
      if (officerId) {
        actions = await storage.getOfficerActionsByOfficer(officerId as string);
      } else {
        actions = await storage.getOfficerActions();
      }
      
      res.json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch officer actions" });
    }
  });

  app.post("/api/officer-actions", async (req, res) => {
    try {
      const actionData = insertOfficerActionSchema.parse(req.body);
      const action = await storage.createOfficerAction(actionData);
      res.json(action);
    } catch (error) {
      res.status(400).json({ message: "Invalid action data" });
    }
  });

  // Authentication endpoints
  app.post("/api/auth/officer-login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.role !== "officer") {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Log the login action
      await storage.createOfficerAction({
        officerId: user.id,
        action: "Officer Login",
        details: { timestamp: [new Date().toISOString()] },
        immutableHash: "", // Will be generated in storage
      });

      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const reports = await storage.getScamReports();
      const threats = await storage.getThreatData();
      const frauds = await storage.getFraudIdentifiers();

      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const recentReports = reports.filter(r => r.createdAt && r.createdAt > thirtyDaysAgo);
      
      const analytics = {
        totalScams: recentReports.length,
        upiScams: recentReports.filter(r => r.scamType === "UPI/Payment Fraud").length,
        voiceScams: recentReports.filter(r => r.scamType === "Voice Call Scam").length,
        resolvedCases: recentReports.filter(r => r.status === "resolved").length,
        activeFrauds: frauds.filter(f => !f.isBlocked).length,
        threatLocations: threats.length,
        riskDistribution: {
          high: recentReports.filter(r => r.riskLevel === "high").length,
          medium: recentReports.filter(r => r.riskLevel === "medium").length,
          low: recentReports.filter(r => r.riskLevel === "low").length,
        }
      };

      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Cyber Hygiene Assessment endpoint
  app.post("/api/cyber-hygiene/assess", async (req, res) => {
    try {
      const { answers } = req.body;
      
      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ message: "Answers object is required" });
      }

      let score = 100;
      const feedback = [];

      // APK downloads
      if (answers.apk === 'yes') {
        score -= 30;
        feedback.push("Avoid downloading APK files from unknown sources");
      }

      // OTP sharing
      if (answers.otp === 'yes') {
        score -= 40;
        feedback.push("Never share OTPs with anyone, including bank officials");
      }

      // Clicking suspicious links
      if (answers.links === 'yes') {
        score -= 30;
        feedback.push("Don't click on links in messages from unknown numbers");
      }

      const level = score >= 80 ? 'Safe' : score >= 50 ? 'Risky' : 'Dangerous';
      
      res.json({
        score,
        level,
        feedback,
        recommendations: level === 'Safe' ? 
          ["Keep up the good work!", "Stay updated on latest scam trends"] :
          level === 'Risky' ?
          ["Be more cautious with digital activities", "Enable 2FA on all accounts"] :
          ["Immediate security review needed", "Consider cybersecurity training"]
      });
    } catch (error) {
      res.status(500).json({ message: "Assessment failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
