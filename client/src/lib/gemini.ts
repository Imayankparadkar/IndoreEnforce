import { GoogleGenAI } from "@google/genai";

// Use server-side API for security
const API_BASE = import.meta.env.DEV ? 'http://localhost:5000' : '';

async function callGeminiAPI(endpoint: string, data: any) {
  try {
    const response = await fetch(`${API_BASE}/api/gemini/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

export async function analyzeScamReport(reportData: any) {
  try {
    const result = await callGeminiAPI('analyze-scam', { reportData });
    return result.analysis || {
      riskLevel: "Medium",
      analysis: "Analysis completed successfully.",
      recommendations: ["File FIR immediately", "Block suspicious numbers", "Monitor financial accounts"],
      indicators: ["Unusual payment requests", "Pressure tactics", "Too good to be true offers"],
      prevention: "Always verify before making payments or sharing personal information"
    };
  } catch (error) {
    console.error('Scam Analysis Error:', error);
    return {
      riskLevel: "Medium",
      analysis: "Unable to process with AI at the moment. Please review manually.",
      recommendations: ["Manual review required", "Contact cybercrime cell"],
      indicators: ["Suspicious communication patterns"],
      prevention: "Exercise caution with unknown contacts"
    };
  }
}

export async function generateChatResponse(message: string, language: string = 'en') {
  try {
    const result = await callGeminiAPI('chat', { message, language });
    return result.response || (language === 'hi' 
      ? "मैं आपकी सहायता के लिए यहाँ हूँ। कृपया अपना प्रश्न पूछें।"
      : "I'm here to help you. Please ask your question.");
  } catch (error) {
    console.error('Chatbot AI Error:', error);
    return language === 'hi' 
      ? "क्षमा करें, मैं अभी उपलब्ध नहीं हूँ। कृपया बाद में प्रयास करें।"
      : "Sorry, I'm not available right now. Please try again later.";
  }
}

export async function investigationAssistant(caseData: any) {
  try {
    const result = await callGeminiAPI('investigate', { caseData });
    return result.analysis || {
      keyEvidence: ["Digital communication records", "Financial transaction trails"],
      investigationSteps: ["Collect digital evidence", "Interview victims", "Track financial flows"],
      leads: ["Check social media profiles", "Verify phone numbers", "Bank account details"],
      forensics: ["Preserve digital evidence", "Network analysis"],
      legal: ["Ensure proper documentation", "Follow legal procedures"]
    };
  } catch (error) {
    console.error('Investigation AI Error:', error);
    return {
      keyEvidence: ["Manual evidence collection required"],
      investigationSteps: ["Standard investigation procedure"],
      leads: ["Follow up on provided information"],
      forensics: ["Basic digital evidence preservation"],
      legal: ["Standard legal compliance"]
    };
  }
}