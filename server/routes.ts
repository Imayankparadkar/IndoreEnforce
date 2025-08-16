import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertScamReportSchema, 
  insertCaseInvestigationSchema,
  insertThreatDataSchema,
  insertFraudIdentifierSchema,
  insertOfficerActionSchema,
  insertKautilyaOperationSchema,
  insertVajraActionSchema
} from "@shared/schema";
import { analyzeScamReport, generateChatResponse, investigationAssistant } from "./gemini";
import { extractCryptoData, analyzeWallet, generateIntelligenceReport } from "./cryptotrace";
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
      console.log('Received report data:', req.body);
      
      // Transform form data to match schema
      const transformedData = {
        ...req.body,
        amount: req.body.amount ? parseInt(req.body.amount) : null,
        suspiciousNumbers: req.body.suspiciousNumbers ? 
          (typeof req.body.suspiciousNumbers === 'string' ? 
            (req.body.suspiciousNumbers.startsWith('[') ? 
              JSON.parse(req.body.suspiciousNumbers).filter((s: string) => s.trim().length > 0) :
              req.body.suspiciousNumbers.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0)) : 
            req.body.suspiciousNumbers) : [],
        suspiciousUPIs: req.body.suspiciousUPIs ? 
          (typeof req.body.suspiciousUPIs === 'string' ? 
            (req.body.suspiciousUPIs.startsWith('[') ? 
              JSON.parse(req.body.suspiciousUPIs).filter((s: string) => s.trim().length > 0) :
              req.body.suspiciousUPIs.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0)) : 
            req.body.suspiciousUPIs) : []
      };
      
      console.log('Transformed data:', transformedData);
      
      // Parse and validate the data
      const reportData = insertScamReportSchema.parse(transformedData);
      
      // Handle file uploads
      const files = req.files as Express.Multer.File[];
      const evidenceFiles = files ? files.map(file => file.originalname) : [];
      
      const report = await storage.createScamReport({
        ...reportData,
        evidenceFiles,
      });

      // Perform AI analysis
      try {
        const analysis = await analyzeScamReport({
          description: reportData.description,
          scamType: reportData.scamType,
          suspiciousNumbers: reportData.suspiciousNumbers || [],
          suspiciousUPIs: reportData.suspiciousUPIs || [],
          amount: reportData.amount,
          location: reportData.location
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
      console.error('Report submission error:', error);
      res.status(400).json({ 
        message: "Invalid report data",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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

      // Perform AI analysis (simplified for demo)
      try {
        const analysis = {
          riskScore: Math.floor(Math.random() * 100),
          aliases: [`${identifier}_variant1`, `${identifier}_variant2`],
          networkConnections: [`connected_${identifier}_1`, `connected_${identifier}_2`]
        };
        
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

  // Gemini AI API endpoints
  app.post("/api/gemini/analyze-scam", async (req, res) => {
    try {
      const { reportData } = req.body;
      const analysis = await analyzeScamReport(reportData);
      res.json({ analysis });
    } catch (error) {
      console.error("Gemini analysis error:", error);
      res.status(500).json({ 
        error: "AI analysis failed",
        fallback: {
          riskLevel: "Medium",
          analysis: "Unable to process with AI at the moment. Please review manually.",
          recommendations: ["Manual review required", "Contact cybercrime cell"],
          indicators: ["Suspicious communication patterns"],
          prevention: "Exercise caution with unknown contacts"
        }
      });
    }
  });



  app.post("/api/gemini/investigate", async (req, res) => {
    try {
      const { caseData } = req.body;
      const analysis = await investigationAssistant(caseData);
      res.json({ analysis });
    } catch (error) {
      console.error("Investigation AI error:", error);
      res.status(500).json({ 
        error: "Investigation AI failed",
        fallback: {
          keyEvidence: ["Manual evidence collection required"],
          investigationSteps: ["Standard investigation procedure"],
          leads: ["Follow up on provided information"],
          forensics: ["Basic digital evidence preservation"],
          legal: ["Standard legal compliance"]
        }
      });
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

  // Advanced Features - Deepfake Detection
  app.post("/api/advanced/deepfake-analyze", upload.single('media'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No media file provided" });
      }

      // Simulate deepfake analysis with AI
      const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
      const isAuthentic = Math.random() > 0.3; // 70% chance of being authentic

      const result = {
        isAuthentic,
        confidence,
        analysis: {
          faceAnalysis: isAuthentic ? "Natural facial movements detected" : "Inconsistent facial mapping detected",
          audioAnalysis: file.mimetype.startsWith('audio') ? 
            (isAuthentic ? "Natural voice patterns" : "Synthetic audio artifacts detected") : undefined,
          metadata: "File metadata analyzed for tampering indicators",
          technicalMarkers: isAuthentic ? 
            ["Natural compression", "Consistent lighting"] : 
            ["Unusual compression artifacts", "Inconsistent pixel patterns", "Temporal anomalies"]
        },
        riskLevel: isAuthentic ? 'low' : (confidence > 80 ? 'high' : 'medium')
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze media file" });
    }
  });

  // Gemini AI Chat endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, language } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      console.log('Processing chat message:', message, 'Language:', language);
      const response = await generateChatResponse(message, language || 'en');
      console.log('Generated response:', response);
      res.json({ response });
    } catch (error) {
      console.error('Chat API Error:', error);
      const { language: lang } = req.body;
      const fallback = lang === 'hi' 
        ? "क्षमा करें, मैं अभी उपलब्ध नहीं हूँ। कृपया बाद में प्रयास करें।"
        : "Sorry, I'm not available right now. Please try again later.";
      res.status(500).json({ error: "Chat failed", response: fallback });
    }
  });

  // Advanced Features - Voiceprint Analysis
  app.get("/api/advanced/voiceprints", async (req, res) => {
    try {
      // Return mock voiceprint database
      const voiceprints = Array.from({ length: 25 }, (_, i) => ({
        id: `vp-${i + 1}`,
        reportCount: Math.floor(Math.random() * 20) + 1,
        lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        regions: ['Indore', 'Bhopal', 'Ujjain'][Math.floor(Math.random() * 3)]
      }));
      res.json(voiceprints);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch voiceprints" });
    }
  });

  app.post("/api/advanced/voiceprint-analyze", upload.single('audio'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No audio file provided" });
      }

      const hasMatch = Math.random() > 0.7; // 30% chance of finding a match
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
      const audioQuality = Math.floor(Math.random() * 20) + 80; // 80-100%

      const result = {
        voiceprintId: `vp-${Date.now()}`,
        isNewVoice: !hasMatch,
        matches: hasMatch ? [{
          id: `match-${Date.now()}`,
          similarity: Math.floor(Math.random() * 20) + 80,
          scammerProfile: {
            id: `scammer-${Math.floor(Math.random() * 100)}`,
            knownAliases: ['Tech Support', 'Bank Officer', 'Government Official'],
            reportCount: Math.floor(Math.random() * 50) + 10,
            lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            operationRegions: ['Indore', 'Rajwada Area', 'Sarafa Bazaar']
          }
        }] : [],
        audioQuality,
        extractedFeatures: {
          pitch: Math.floor(Math.random() * 200) + 100, // 100-300 Hz
          tone: ['Deep', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          accent: ['Hindi', 'English', 'Regional'][Math.floor(Math.random() * 3)],
          speechPattern: ['Fast', 'Moderate', 'Slow'][Math.floor(Math.random() * 3)]
        },
        confidence
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze voiceprint" });
    }
  });

  // Advanced Features - Legal Document Generation
  app.post("/api/advanced/generate-legal-document", async (req, res) => {
    try {
      const { reportId, documentType, additionalDetails } = req.body;
      
      // Get report details
      const reports = await storage.getScamReports();
      const report = reports.find((r: any) => r.id === reportId);
      
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      // Generate document content based on type
      let content = "";
      let title = "";

      switch (documentType) {
        case 'complaint':
          title = "Police Complaint - Cybercrime Report";
          content = `POLICE COMPLAINT

To: Station House Officer
${report.location || 'Local Police Station'}

Subject: Cybercrime Complaint - ${report.scamType}

Date: ${new Date().toLocaleDateString()}

Sir/Madam,

I, ${report.reporterName}, resident of ${report.location || '[Address]'}, hereby file this complaint regarding a cybercrime incident.

INCIDENT DETAILS:
- Type of Crime: ${report.scamType}
- Date of Incident: ${new Date(report.createdAt || Date.now()).toLocaleDateString()}
- Financial Loss: Rs. ${report.amount || 'N/A'}
- Contact Number: ${report.reporterContact}

DESCRIPTION:
${report.description}

${additionalDetails ? `ADDITIONAL DETAILS:\n${additionalDetails}\n\n` : ''}

I request you to kindly register an FIR and investigate this matter. I am ready to provide any additional information required.

Evidence submitted:
${report.evidenceFiles && report.evidenceFiles.length > 0 ? 
  report.evidenceFiles.map((file: string) => `- ${file}`).join('\n') : 
  '- Digital evidence attached'
}

Thank you for your prompt action.

Yours sincerely,
${report.reporterName}
Contact: ${report.reporterContact}`;
          break;

        case 'fir_draft':
          title = "FIR Draft - Cybercrime Report";
          content = `FIRST INFORMATION REPORT DRAFT

Station: ${report.location || '[Police Station]'}
FIR No: [To be assigned]
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Complainant: ${report.reporterName}
Contact: ${report.reporterContact}
Address: ${report.location || '[Address]'}

Accused: Unknown (To be investigated)

Details of Occurrence:
Nature of Crime: ${report.scamType} under IT Act 2000
Place of Occurrence: Online/Digital Platform
Date & Time: ${new Date(report.createdAt || Date.now()).toLocaleDateString()}

Brief Facts:
${report.description}

${additionalDetails ? `Additional Information:\n${additionalDetails}\n\n` : ''}

Sections of Law: 
- IT Act 2000 Section 66C (Identity theft)
- IT Act 2000 Section 66D (Cheating by personation using computer resource)
- IPC Section 420 (Cheating)

Property/Loss: Rs. ${report.amount || '0'}

Evidence: Digital evidence collected and preserved`;
          break;

        default:
          content = `LEGAL DOCUMENT

Document Type: ${documentType.toUpperCase()}
Generated for: ${report.reporterName}
Report ID: ${reportId}
Date: ${new Date().toLocaleDateString()}

[Document content would be generated based on the specific type requested]

This is an auto-generated draft. Please review and modify as needed.`;
      }

      const document = {
        id: `doc-${Date.now()}`,
        type: documentType,
        title,
        content,
        generatedAt: new Date().toISOString(),
        caseDetails: {
          reportId,
          scamType: report.scamType,
          amount: report.amount || 0,
          evidence: report.evidenceFiles || []
        }
      };

      res.json(document);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate legal document" });
    }
  });

  // Six-Step Cyber Investigation & Takedown Workflow

  // Step 1: REPORT - Prahaar Kavach (handled by existing scam reports endpoint)
  
  // Step 2: TRIAGE & DEPLOY - LEA Dashboard
  app.post("/api/workflow/deploy-kautilya", async (req, res) => {
    try {
      const { reportId, officerId } = req.body;
      
      const report = await storage.getScamReport(reportId);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      // Create Kautilya operation
      const operationData = insertKautilyaOperationSchema.parse({
        reportId,
        officerId,
        status: "initiated",
        targetNumber: report.suspiciousNumbers?.[0] || null,
      });
      
      const operation = await storage.createKautilyaOperation({
        ...operationData,
        chatLog: [],
        scammerDNA: {},
        networkMatches: [],
        vajraAuthorized: false,
        vajraExecuted: false,
        akhantaLedger: [{
          action: "Operation Initiated",
          timestamp: new Date().toISOString(),
          hash: `init_${Date.now()}`
        }]
      });

      res.json(operation);
    } catch (error) {
      res.status(500).json({ message: "Failed to deploy Kautilya" });
    }
  });

  // Step 3: ENGAGE - MayaJaal + Kautilya 2.0
  app.post("/api/workflow/engage-scammer", async (req, res) => {
    try {
      const { operationId, profileId, initialMessage } = req.body;
      
      // Simulate AI persona engagement
      const personas = [
        "Interested buyer looking for great deals",
        "Young professional seeking investment opportunities", 
        "Tech-savvy individual interested in online services"
      ];
      
      const selectedPersona = personas[Math.floor(Math.random() * personas.length)];
      
      // Simulate scammer response with delay
      setTimeout(async () => {
        const chatLog = [
          {
            role: "mayajaal",
            message: initialMessage || "Hello, I saw your offer. Can you tell me more about it?",
            timestamp: new Date().toISOString()
          },
          {
            role: "scammer", 
            message: "Hello! Yes, this is genuine offer. We are giving 50% discount. You need to pay advance amount for confirmation.",
            timestamp: new Date(Date.now() + 2000).toISOString()
          }
        ];

        await storage.updateKautilyaOperation(operationId, {
          status: "engaging",
          chatLog,
          akhantaLedger: [{
            action: "Engagement Started",
            timestamp: new Date().toISOString(), 
            hash: `engage_${Date.now()}`
          }]
        });
      }, 3000);

      res.json({ 
        status: "engagement_started",
        persona: selectedPersona,
        message: "AI persona is engaging with target..."
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to engage scammer" });
    }
  });

  // Step 4: EXTRACT & ANALYZE - Scammer DNA Fingerprinting  
  app.post("/api/workflow/extract-upi", async (req, res) => {
    try {
      const { operationId } = req.body;
      
      // Simulate UPI extraction
      const extractedUPI = `scammer${Math.floor(Math.random() * 1000)}@paytm`;
      
      // Simulate DNA analysis
      const scammerDNA = {
        upiPattern: extractedUPI,
        communicationStyle: "Urgent pressure tactics",
        paymentMethods: ["UPI", "Bank Transfer"],
        operatingHours: "9 AM - 6 PM IST",
        responseTime: "2-5 minutes",
        linguisticMarkers: ["Broken English", "Hindi mixed"]
      };

      // Find network matches (simulated)
      const networkMatches = [
        `related_${Math.floor(Math.random() * 100)}@gpay`,
        `connected_${Math.floor(Math.random() * 100)}@phonepe`
      ];

      await storage.updateKautilyaOperation(operationId, {
        status: "extracting",
        extractedUPI,
        scammerDNA,
        networkMatches,
        akhantaLedger: [{
          action: "UPI Extracted & DNA Analyzed",
          timestamp: new Date().toISOString(),
          hash: `extract_${Date.now()}`
        }]
      });

      res.json({
        extractedUPI,
        scammerDNA,
        networkMatches,
        message: "UPI extracted and scammer DNA analyzed successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to extract UPI" });
    }
  });

  // Step 5: AUTHORIZE - Vajra (The Hammer)
  app.post("/api/workflow/authorize-vajra", async (req, res) => {
    try {
      const { operationId, officerId, authCode } = req.body;
      
      // Simulate 2FA verification
      if (authCode !== "123456") { // Simple demo auth
        return res.status(401).json({ message: "Invalid authorization code" });
      }

      const authHash = `vajra_auth_${Date.now()}_${officerId}`;
      
      await storage.updateKautilyaOperation(operationId, {
        vajraAuthorized: true,
        akhantaLedger: [{
          action: "Vajra Authorization Granted",
          timestamp: new Date().toISOString(),
          hash: authHash
        }]
      });

      res.json({
        authorized: true,
        authHash,
        message: "Vajra Strike authorized. Ready for takedown."
      });
    } catch (error) {
      res.status(500).json({ message: "Authorization failed" });
    }
  });

  // Step 6: STRIKE & SECURE - Vajra + Akhanda
  app.post("/api/workflow/execute-vajra", async (req, res) => {
    try {
      const { operationId } = req.body;
      
      const operation = await storage.getKautilyaOperation(operationId);
      if (!operation?.vajraAuthorized) {
        return res.status(403).json({ message: "Vajra not authorized" });
      }

      // Simulate takedown actions
      const takedownActions = [
        {
          type: "freeze_upi",
          target: operation.extractedUPI,
          status: "executed",
          timestamp: new Date().toISOString()
        },
        {
          type: "block_number", 
          target: operation.targetNumber,
          status: "executed",
          timestamp: new Date().toISOString()
        },
        {
          type: "alert_banks",
          target: "all_partner_banks",
          status: "executed", 
          timestamp: new Date().toISOString()
        }
      ];

      // Create Vajra action records
      for (const action of takedownActions) {
        await storage.createVajraAction({
          operationId,
          actionType: action.type,
          targetIdentifier: action.target || "",
          status: "executed",
          authorizedBy: operation.officerId,
          authorizationHash: `exec_${Date.now()}`
        });
      }

      // Update operation with final ledger
      await storage.updateKautilyaOperation(operationId, {
        status: "completed",
        vajraExecuted: true,
        akhantaLedger: [
          ...(operation.akhantaLedger || []),
          {
            action: "Vajra Strike Executed",
            timestamp: new Date().toISOString(),
            hash: `strike_${Date.now()}`
          },
          {
            action: "Operation Completed",
            timestamp: new Date().toISOString(), 
            hash: `complete_${Date.now()}`
          }
        ]
      });

      res.json({
        executed: true,
        takedownActions,
        message: "Vajra strike completed. All targets neutralized.",
        ledgerHash: `complete_${Date.now()}`
      });
    } catch (error) {
      res.status(500).json({ message: "Vajra execution failed" });
    }
  });

  // Get operation status
  app.get("/api/workflow/operation/:id", async (req, res) => {
    try {
      const operation = await storage.getKautilyaOperation(req.params.id);
      if (!operation) {
        return res.status(404).json({ message: "Operation not found" });
      }
      res.json(operation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch operation" });
    }
  });

  // Get all operations for an officer
  app.get("/api/workflow/operations", async (req, res) => {
    try {
      const { officerId } = req.query;
      const operations = await storage.getKautilyaOperationsByOfficer(officerId as string);
      res.json(operations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch operations" });
    }
  });

  // MayaJaal Profiles endpoints for Kautilya 2.0
  app.get("/api/mayajaal-profiles", async (req, res) => {
    try {
      const profiles = [
        {
          id: "profile-1",
          profileName: "Shalini - Army Wife",
          persona: "Army officer's wife from Indore",
          backstory: "Married to Colonel Sharma, looking to buy army equipment",
          communicationStyle: "Polite, trusting, uses military terminology"
        },
        {
          id: "profile-2", 
          profileName: "Rajesh - Business Owner",
          persona: "Small business owner needing urgent loan",
          backstory: "Owns a medical shop, needs quick loan for expansion",
          communicationStyle: "Professional, time-pressed, willing to pay fees"
        },
        {
          id: "profile-3",
          profileName: "Priya - Job Seeker",
          persona: "Fresh graduate looking for employment",
          backstory: "Recently graduated, eager to get a government job",
          communicationStyle: "Enthusiastic, naive, ready to pay registration fees"
        }
      ];
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MayaJaal profiles" });
    }
  });

  // Kautilya Operations endpoints
  app.post("/api/kautilya-operations", async (req, res) => {
    try {
      const operationData = {
        id: 'KAU-' + Date.now().toString(36),
        reportId: req.body.reportId,
        officerId: req.body.officerId,
        targetNumber: req.body.targetNumber,
        status: req.body.status,
        createdAt: new Date().toISOString()
      };
      
      res.json(operationData);
    } catch (error) {
      res.status(500).json({ message: "Failed to create Kautilya operation" });
    }
  });

  // Vajra Actions endpoints
  app.post("/api/vajra-actions", async (req, res) => {
    try {
      const vajraAction = {
        id: 'VAJ-' + Date.now().toString(36),
        operationId: req.body.operationId,
        actionType: req.body.actionType,
        targetIdentifier: req.body.targetIdentifier,
        authorizedBy: req.body.authorizedBy,
        authorizationHash: req.body.authorizationHash,
        status: req.body.status,
        createdAt: new Date().toISOString()
      };

      res.json(vajraAction);
    } catch (error) {
      res.status(500).json({ message: "Failed to create Vajra action" });
    }
  });

  // CryptoTrace Routes
  app.post('/api/cryptotrace/extract', async (req, res) => {
    try {
      const { ransomNote } = req.body;
      
      if (!ransomNote) {
        return res.status(400).json({ error: 'Ransom note text is required' });
      }

      const extractedData = extractCryptoData(ransomNote);
      res.json(extractedData);
    } catch (error) {
      console.error('Error extracting crypto data:', error);
      res.status(500).json({ error: 'Failed to extract crypto data' });
    }
  });

  app.post('/api/cryptotrace/analyze-wallet', async (req, res) => {
    try {
      const { address } = req.body;
      
      if (!address) {
        return res.status(400).json({ error: 'Wallet address is required' });
      }

      const analysis = await analyzeWallet(address);
      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing wallet:', error);
      res.status(500).json({ error: 'Failed to analyze wallet' });
    }
  });

  app.post('/api/cryptotrace/generate-report', async (req, res) => {
    try {
      const { walletData, extractedData } = req.body;
      const report = await generateIntelligenceReport(walletData);
      
      // In a real implementation, this would generate an actual PDF
      // For now, we simulate PDF generation and provide downloadable content
      if (req.query.download === 'true') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="intel-pack-${report.reportId}.pdf"`);
        
        // Generate mock PDF content
        const pdfContent = generatePDFContent(report, walletData, extractedData);
        res.send(pdfContent);
      } else {
        res.json(report);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ error: 'Failed to generate intelligence report' });
    }
  });
  
  // New endpoint for PDF download
  app.get('/api/cryptotrace/download-report/:reportId', async (req, res) => {
    try {
      const { reportId } = req.params;
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="intel-pack-${reportId}.pdf"`);
      
      // In a real implementation, retrieve and send the actual PDF file
      const mockPdfContent = Buffer.from(`Mock PDF Report ${reportId}`, 'utf-8');
      res.send(mockPdfContent);
    } catch (error) {
      console.error('Error downloading report:', error);
      res.status(500).json({ error: 'Failed to download report' });
    }
  });

  // Helper function to generate PDF content
  function generatePDFContent(report: any, walletData: any, extractedData: any) {
    // In a real implementation, this would use html-pdf-node or puppeteer
    // to generate a proper PDF from HTML template
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>CRYPTOTRACE Intelligence Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
        .classification { color: red; font-weight: bold; text-align: center; }
        .section { margin-bottom: 30px; }
        .risk-high { background-color: #ffebee; padding: 10px; border-left: 4px solid #f44336; }
        .risk-medium { background-color: #fff3e0; padding: 10px; border-left: 4px solid #ff9800; }
        .risk-low { background-color: #f1f8e9; padding: 10px; border-left: 4px solid #4caf50; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        .timestamp { font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>CRYPTOTRACE INTELLIGENCE REPORT</h1>
        <div class="classification">RESTRICTED - LAW ENFORCEMENT ONLY</div>
        <p><strong>Report ID:</strong> ${report.reportId}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Agency:</strong> Prahaar 360 - Cyber Crime Unit, Indore</p>
    </div>

    <div class="section">
        <h2>EXECUTIVE SUMMARY</h2>
        <p><strong>Target Wallet:</strong> ${walletData?.address || 'N/A'}</p>
        <p><strong>Blockchain:</strong> ${walletData?.type || 'Unknown'}</p>
        <p><strong>Current Balance:</strong> ${walletData?.balance || '0'} ETH</p>
        
        <div class="${walletData?.riskScore > 70 ? 'risk-high' : walletData?.riskScore > 40 ? 'risk-medium' : 'risk-low'}">
            <h3>RISK ASSESSMENT: ${walletData?.riskScore || 0}/100</h3>
            <p><strong>Risk Level:</strong> ${walletData?.riskScore > 70 ? 'HIGH' : walletData?.riskScore > 40 ? 'MEDIUM' : 'LOW'}</p>
        </div>
    </div>

    <div class="section">
        <h2>TECHNICAL ANALYSIS</h2>
        <p><strong>Total Transactions:</strong> ${walletData?.transactions?.length || 0}</p>
        <p><strong>Internal Transactions:</strong> ${walletData?.internalTransactions?.length || 0}</p>
        <p><strong>Token Transactions:</strong> ${walletData?.tokenTransactions?.length || 0}</p>
        <p><strong>Last Activity:</strong> ${walletData?.lastActivity || 'Unknown'}</p>
        
        <h3>Risk Factors Identified:</h3>
        <ul>
            ${walletData?.riskFactors?.map((factor: string) => `<li>${factor}</li>`).join('') || '<li>No risk factors identified</li>'}
        </ul>
    </div>

    <div class="section">
        <h2>ATTRIBUTION INTELLIGENCE</h2>
        ${extractedData ? `
        <h3>Extracted Entities:</h3>
        <table>
            <tr><th>Type</th><th>Value</th><th>Source</th></tr>
            ${extractedData.aliases?.map((alias: string) => `<tr><td>Alias</td><td>${alias}</td><td>Ransom Note</td></tr>`).join('') || ''}
            ${extractedData.emails?.map((email: string) => `<tr><td>Email</td><td>${email}</td><td>Ransom Note</td></tr>`).join('') || ''}
            ${extractedData.ips?.map((ip: string) => `<tr><td>IP Address</td><td>${ip}</td><td>Ransom Note</td></tr>`).join('') || ''}
            ${extractedData.domains?.map((domain: string) => `<tr><td>Domain</td><td>${domain}</td><td>Ransom Note</td></tr>`).join('') || ''}
        </table>
        ` : '<p>No attribution data available</p>'}
    </div>

    <div class="section">
        <h2>FLOW ANALYSIS</h2>
        ${walletData?.flowAnalysis ? `
        <p><strong>Total Inflow:</strong> ${walletData.flowAnalysis.totalInflow.toFixed(6)} ETH</p>
        <p><strong>Total Outflow:</strong> ${walletData.flowAnalysis.totalOutflow.toFixed(6)} ETH</p>
        <p><strong>Net Flow:</strong> ${walletData.flowAnalysis.netFlow.toFixed(6)} ETH</p>
        <p><strong>Average Transaction Value:</strong> ${walletData.flowAnalysis.averageTxValue.toFixed(6)} ETH</p>
        ` : '<p>Flow analysis data not available</p>'}
    </div>

    <div class="section">
        <h2>RECOMMENDATIONS</h2>
        ${walletData?.riskScore > 80 ? `
        <ul>
            <li>IMMEDIATE ACTION: Freeze associated accounts</li>
            <li>Coordinate with exchange compliance teams</li>
            <li>Issue lookout notices for associated identities</li>
            <li>Request enhanced transaction monitoring</li>
        </ul>
        ` : walletData?.riskScore > 50 ? `
        <ul>
            <li>Enhanced monitoring recommended</li>
            <li>Cross-reference with known fraud databases</li>
            <li>Monitor for future suspicious activity</li>
        </ul>
        ` : `
        <ul>
            <li>Standard monitoring sufficient</li>
            <li>Periodic review recommended</li>
        </ul>
        `}
    </div>

    <div class="section">
        <h2>LEGAL BASIS</h2>
        <p><strong>Applicable Laws:</strong></p>
        <ul>
            <li>IT Act 2000 - Section 66C (Identity Theft)</li>
            <li>IT Act 2000 - Section 66D (Cheating by Personation)</li>
            <li>IPC Section 420 (Cheating)</li>
        </ul>
        <p><strong>Jurisdiction:</strong> Applicable under Indian Cyber Laws</p>
    </div>

    <div class="section">
        <h2>EVIDENCE INTEGRITY</h2>
        <p><strong>Report Hash:</strong> ${randomUUID()}</p>
        <p><strong>Data Sources:</strong> Etherscan API, Internal Analysis</p>
        <p class="timestamp">This report was generated automatically by Prahaar 360 Cryptotrace system.</p>
    </div>
</body>
</html>
    `;
    
    // In a real implementation, convert HTML to PDF here
    // For now, return the HTML content as a simulation
    return Buffer.from(htmlContent, 'utf-8');
  }

  const httpServer = createServer(app);
  return httpServer;
}
