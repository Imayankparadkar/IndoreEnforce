import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

// Test API key on startup
async function testGeminiConnection() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is not set!');
    return false;
  }
  
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello, test connection",
    });
    console.log('✅ Gemini API connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Gemini API connection failed:', error);
    return false;
  }
}

// Test connection immediately
testGeminiConnection();

export async function analyzeScamReport(reportData: any) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const prompt = `
    Analyze this cybercrime report and provide insights:
    
    Report Type: ${reportData.scamType}
    Description: ${reportData.description}
    Amount: ${reportData.amount || 'Not specified'}
    Location: ${reportData.location || 'Not specified'}
    Suspicious Numbers: ${reportData.suspiciousNumbers?.join(', ') || 'None'}
    Suspicious UPIs: ${reportData.suspiciousUPIs?.join(', ') || 'None'}
    
    Please provide:
    1. Risk assessment (Low/Medium/High)
    2. Analysis of the scam pattern
    3. Recommended actions (array)
    4. Similar scam indicators to watch for (array)
    5. Prevention advice
    
    Format as JSON with keys: riskLevel, analysis, recommendations, indicators, prevention
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    const text = response.text || "";
    
    try {
      return JSON.parse(text);
    } catch {
      return {
        riskLevel: "Medium",
        analysis: text,
        recommendations: ["File FIR immediately", "Block suspicious numbers", "Monitor financial accounts"],
        indicators: ["Unusual payment requests", "Pressure tactics", "Too good to be true offers"],
        prevention: "Always verify before making payments or sharing personal information"
      };
    }
  } catch (error) {
    console.error('Gemini AI Error:', error);
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
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const prompt = `
    You are an AI assistant for Prahaar 360, a cybercrime reporting platform for Indore, Madhya Pradesh. 
    
    User message: "${message}"
    Response language: ${language === 'hi' ? 'Hindi' : language === 'en' ? 'English' : 'English'}
    
    Provide helpful information about:
    - Cybercrime reporting procedures
    - Scam prevention tips
    - How to use the platform
    - General cybersecurity advice
    - Emergency contact information (Cybercrime Helpline: 1930)
    
    Keep responses concise, helpful, and relevant to cybercrime prevention.
    ${language === 'hi' ? 'Respond in Hindi (Devanagari script).' : ''}
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || (language === 'hi' 
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
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const prompt = `
    As an AI investigation assistant for cybercrime cases in Indore, analyze this case:
    
    Case Details: ${JSON.stringify(caseData, null, 2)}
    
    Provide investigation insights including:
    1. Key evidence points to focus on (array)
    2. Recommended investigation steps (array)
    3. Potential leads to pursue (array)
    4. Digital forensic considerations (array)
    5. Legal considerations (array)
    
    Format as JSON with keys: keyEvidence, investigationSteps, leads, forensics, legal
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    const text = response.text || "";
    
    try {
      return JSON.parse(text);
    } catch {
      return {
        keyEvidence: ["Digital communication records", "Financial transaction trails"],
        investigationSteps: ["Collect digital evidence", "Interview victims", "Track financial flows"],
        leads: ["Check social media profiles", "Verify phone numbers", "Bank account details"],
        forensics: ["Preserve digital evidence", "Network analysis"],
        legal: ["Ensure proper documentation", "Follow legal procedures"]
      };
    }
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