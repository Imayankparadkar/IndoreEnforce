import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "vajra": "Vajra - Threat Mapping",
      "kautilya": "Kautilya - Investigation",
      "mayajaal": "MayaJaal - Web Intelligence", 
      "brahmanet": "BrahmaNet - Citizen Portal",
      "officer": "Officer Portal",
      
      // Dashboard
      "welcome": "Welcome to Prahaar 360",
      "cyberCrimeHub": "Unified Cyber Enforcement Suite for Indore",
      "totalReports": "Total Reports",
      "activeThreats": "Active Threats",
      "casesResolved": "Cases Resolved",
      "officersOnDuty": "Officers on Duty",
      "recentAlerts": "Recent Security Alerts",
      "threatMap": "Live Threat Map",
      "reportScam": "Report Scam",
      "viewDetails": "View Details",
      
      // Common
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "submit": "Submit",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete",
      "edit": "Edit",
      "loading": "Loading...",
      "search": "Search",
      "filter": "Filter",
      "export": "Export",
      "print": "Print",
      
      // Scam Types
      "phoneScam": "Phone Scam",
      "emailPhishing": "Email Phishing",
      "socialMediaFraud": "Social Media Fraud",
      "onlineShopping": "Online Shopping Fraud",
      "bankingFraud": "Banking Fraud",
      "cryptoScam": "Cryptocurrency Scam",
      
      // Forms
      "reporterName": "Reporter Name",
      "contactNumber": "Contact Number",
      "scamType": "Scam Type",
      "description": "Description",
      "amount": "Amount Lost",
      "location": "Location",
      "suspiciousNumbers": "Suspicious Numbers",
      "uploadEvidence": "Upload Evidence",
      
      // Chatbot
      "chatWithAI": "Chat with AI Assistant",
      "typeMessage": "Type your message...",
      "send": "Send",
      "howCanIHelp": "How can I help you today?",
      
      // Footer
      "aboutPrahaar": "About Prahaar 360",
      "contactUs": "Contact Us",
      "privacyPolicy": "Privacy Policy",
      "termsOfService": "Terms of Service",
      "helpCenter": "Help Center",
      
      // Additional Navigation
      "officerPortal": "Officer Portal",
      "support": "Support",
      "userGuide": "User Guide",
      "trainingVideos": "Training Videos",
      "faq": "FAQ",
      "notifications": "Notifications",
      
      // Support Page
      "welcomeToPrahaar": "Welcome to Prahaar 360",
      "cyberSafetyForIndore": "Your gateway to cyber safety and security for Indore",
      
      // Additional content pages
      "dataProtection": "Data Protection",
      "compliance": "Compliance",
      "accessibility": "Accessibility",
      "cybercrimePreventionPage": "Cybercrime Prevention",
      "securityTips": "Security Tips",
      "incidentResponse": "Incident Response",
      "awarenessPrograms": "Awareness Programs",
      "downloads": "Downloads",
      "reportBug": "Report Bug",
      "legal": "Legal"
    }
  },
  hi: {
    translation: {
      // Navigation
      "dashboard": "डैशबोर्ड",
      "vajra": "वज्र - खतरा मैपिंग",
      "kautilya": "कौटिल्य - जांच",
      "mayajaal": "मायाजाल - वेब इंटेलिजेंस",
      "brahmanet": "ब्रह्मनेट - नागरिक पोर्टल",
      "officer": "अधिकारी पोर्टल",
      
      // Dashboard
      "welcome": "प्रहार 360 में आपका स्वागत है",
      "cyberCrimeHub": "इंदौर के लिए एकीकृत साइबर प्रवर्तन सूट",
      "totalReports": "कुल रिपोर्ट",
      "activeThreats": "सक्रिय खतरे",
      "casesResolved": "मामले हल",
      "officersOnDuty": "ड्यूटी पर अधिकारी",
      "recentAlerts": "हाल की सुरक्षा अलर्ट",
      "threatMap": "लाइव खतरा मैप",
      "reportScam": "घोटाला रिपोर्ट करें",
      "viewDetails": "विवरण देखें",
      
      // Common
      "login": "लॉग इन",
      "register": "पंजीकरण",
      "logout": "लॉग आउट",
      "submit": "जमा करें",
      "cancel": "रद्द करें",
      "save": "सेव करें",
      "delete": "हटाएं",
      "edit": "संपादित करें",
      "loading": "लोड हो रहा है...",
      "search": "खोजें",
      "filter": "फ़िल्टर",
      "export": "निर्यात",
      "print": "प्रिंट",
      
      // Scam Types
      "phoneScam": "फोन घोटाला",
      "emailPhishing": "ईमेल फिशिंग",
      "socialMediaFraud": "सोशल मीडिया धोखाधड़ी",
      "onlineShopping": "ऑनलाइन शॉपिंग धोखाधड़ी",
      "bankingFraud": "बैंकिंग धोखाधड़ी",
      "cryptoScam": "क्रिप्टोकरेंसी घोटाला",
      
      // Forms
      "reporterName": "रिपोर्टर का नाम",
      "contactNumber": "संपर्क नंबर",
      "scamType": "घोटाला प्रकार",
      "description": "विवरण",
      "amount": "खोई गई राशि",
      "location": "स्थान",
      "suspiciousNumbers": "संदिग्ध नंबर",
      "uploadEvidence": "साक्ष्य अपलोड करें",
      
      // Chatbot
      "chatWithAI": "AI सहायक से चैट करें",
      "typeMessage": "अपना संदेश टाइप करें...",
      "send": "भेजें",
      "howCanIHelp": "आज मैं आपकी कैसे सहायता कर सकता हूं?",
      
      // Footer
      "aboutPrahaar": "प्रहार 360 के बारे में",
      "contactUs": "संपर्क करें",
      "privacyPolicy": "गोपनीयता नीति",
      "termsOfService": "सेवा की शर्तें",
      "helpCenter": "सहायता केंद्र",
      
      // Additional Navigation
      "officerPortal": "अधिकारी पोर्टल",
      "support": "सहायता",
      "userGuide": "उपयोगकर्ता गाइड",
      "trainingVideos": "प्रशिक्षण वीडियो",
      "faq": "सामान्य प्रश्न",
      "notifications": "सूचनाएं",
      
      // Support Page
      "welcomeToPrahaar": "प्रहार 360 में आपका स्वागत है",
      "cyberSafetyForIndore": "इंदौर के लिए साइबर सुरक्षा और सुरक्षा का आपका प्रवेश द्वार",
      
      // Additional content pages
      "dataProtection": "डेटा सुरक्षा",
      "compliance": "अनुपालन",
      "accessibility": "पहुंच",
      "cybercrimePreventionPage": "साइबर अपराध रोकथाम",
      "securityTips": "सुरक्षा सुझाव",
      "incidentResponse": "घटना प्रतिक्रिया",
      "awarenessPrograms": "जागरूकता कार्यक्रम",
      "downloads": "डाउनलोड",
      "reportBug": "बग रिपोर्ट करें",
      "legal": "कानूनी"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;