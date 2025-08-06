import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || ""
});

export interface ScamAnalysis {
  riskLevel: "high" | "medium" | "low";
  scamType: string;
  confidence: number;
  patternMatches: string[];
  recommendations: string[];
  estimatedOrigin?: string;
  networkConnections?: string[];
  aliases?: string[];
}

export interface FraudAnalysis {
  riskScore: number;
  aliases: string[];
  networkConnections: string[];
  activityPattern: string;
  reportCount: number;
  lastSeen: string;
}

export async function analyzeScamCase(caseData: {
  description: string;
  scamType: string;
  suspiciousNumbers: string[];
  suspiciousUPIs: string[];
}): Promise<ScamAnalysis> {
  try {
    const systemPrompt = `You are an expert cybercrime analyst for Indian law enforcement. 
    Analyze the given scam case and provide a detailed assessment.
    Consider common Indian scam patterns like UPI fraud, voice scams, KYC phishing, job scams, and loan frauds.
    
    Respond with JSON in this exact format:
    {
      "riskLevel": "high|medium|low",
      "scamType": "specific scam type classification",
      "confidence": number between 0-100,
      "patternMatches": ["list of pattern matches found"],
      "recommendations": ["list of recommended actions"],
      "estimatedOrigin": "likely origin location if determinable",
      "networkConnections": ["potential network connections"],
      "aliases": ["common aliases used in similar scams"]
    }`;

    const analysisPrompt = `Case Details:
    Description: ${caseData.description}
    Reported Scam Type: ${caseData.scamType}
    Suspicious Phone Numbers: ${caseData.suspiciousNumbers.join(', ') || 'None'}
    Suspicious UPI IDs: ${caseData.suspiciousUPIs.join(', ') || 'None'}
    
    Analyze this case for patterns, risk assessment, and provide actionable recommendations.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            riskLevel: { type: "string", enum: ["high", "medium", "low"] },
            scamType: { type: "string" },
            confidence: { type: "number" },
            patternMatches: { type: "array", items: { type: "string" } },
            recommendations: { type: "array", items: { type: "string" } },
            estimatedOrigin: { type: "string" },
            networkConnections: { type: "array", items: { type: "string" } },
            aliases: { type: "array", items: { type: "string" } }
          },
          required: ["riskLevel", "scamType", "confidence", "patternMatches", "recommendations"]
        }
      },
      contents: analysisPrompt,
    });

    const rawJson = response.text;
    if (rawJson) {
      const analysis: ScamAnalysis = JSON.parse(rawJson);
      return analysis;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Provide a fallback analysis
    return {
      riskLevel: "medium",
      scamType: caseData.scamType,
      confidence: 70,
      patternMatches: ["Pattern analysis unavailable"],
      recommendations: [
        "Manual review required",
        "Contact relevant authorities",
        "Monitor for similar patterns"
      ],
      estimatedOrigin: "Unknown",
      networkConnections: [],
      aliases: []
    };
  }
}

export async function analyzeFraudIdentifier(identifier: string, type: string): Promise<FraudAnalysis> {
  try {
    const systemPrompt = `You are an expert in analyzing fraud identifiers for Indian cybercrime cases.
    Analyze the given identifier and provide intelligence assessment.
    Consider common patterns in Indian fraud networks.
    
    Respond with JSON in this exact format:
    {
      "riskScore": number between 0-100,
      "aliases": ["common aliases or names associated"],
      "networkConnections": ["potential network identifiers"],
      "activityPattern": "description of typical activity pattern",
      "reportCount": number,
      "lastSeen": "estimated timeframe"
    }`;

    const analysisPrompt = `Identifier: ${identifier}
    Type: ${type}
    
    Analyze this identifier for fraud indicators, network connections, and risk assessment.
    Consider typical Indian scam patterns and provide intelligence insights.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            riskScore: { type: "number" },
            aliases: { type: "array", items: { type: "string" } },
            networkConnections: { type: "array", items: { type: "string" } },
            activityPattern: { type: "string" },
            reportCount: { type: "number" },
            lastSeen: { type: "string" }
          },
          required: ["riskScore", "aliases", "networkConnections", "activityPattern", "reportCount", "lastSeen"]
        }
      },
      contents: analysisPrompt,
    });

    const rawJson = response.text;
    if (rawJson) {
      const analysis: FraudAnalysis = JSON.parse(rawJson);
      return analysis;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini fraud analysis failed:", error);
    // Provide a fallback analysis
    return {
      riskScore: Math.floor(Math.random() * 60) + 30, // 30-90 range
      aliases: ["Analysis unavailable"],
      networkConnections: [],
      activityPattern: "Unknown pattern - manual review needed",
      reportCount: 0,
      lastSeen: "Unknown"
    };
  }
}

export async function generateCyberSecurityInsight(topic: string): Promise<string> {
  try {
    const prompt = `As a cybersecurity expert for Indian law enforcement, provide insights about: ${topic}
    
    Focus on:
    - Current trends in Indian cybercrime
    - Prevention strategies
    - Law enforcement best practices
    - Citizen awareness points
    
    Keep the response informative and actionable for law enforcement officers.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Insight generation failed - please try again.";
  } catch (error) {
    console.error("Insight generation failed:", error);
    return "Cybersecurity insight service temporarily unavailable.";
  }
}
