import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.vajra': 'VAJRA - Threat Map',
      'nav.kautilya': 'KAUTILYA - Investigation',
      'nav.mayajaal': 'MAYAJAAL - Intelligence',
      'nav.brahmanet': 'BRAHMANET - Citizen Portal',
      'nav.officer': 'Officer Dashboard',
      
      // Dashboard
      'dashboard.title': 'Indore Cyber Defense Dashboard',
      'dashboard.subtitle': 'Real-time cybercrime monitoring and prevention suite',
      'dashboard.totalScams': 'Total Scams',
      'dashboard.upiScams': 'UPI Frauds',
      'dashboard.voiceScams': 'Voice Scams',
      'dashboard.resolvedCases': 'Resolved Cases',
      'dashboard.activeFrauds': 'Active Frauds',
      'dashboard.threatLocations': 'Threat Locations',
      
      // Report Fraud
      'report.title': 'Report Cybercrime',
      'report.subtitle': 'Help protect your community by reporting suspicious activities',
      'report.reporterName': 'Your Name',
      'report.contact': 'Contact Number',
      'report.scamType': 'Type of Scam',
      'report.description': 'Describe the incident',
      'report.location': 'Location (Optional)',
      'report.amount': 'Amount Lost (if any)',
      'report.evidence': 'Upload Evidence',
      'report.submit': 'Submit Report',
      'report.success': 'Report submitted successfully',
      
      // Officer Portal
      'officer.title': 'Officer Dashboard',
      'officer.login': 'Secure Login',
      'officer.username': 'Username',
      'officer.password': 'Password',
      'officer.otp': 'OTP (Optional)',
      'officer.loginButton': 'Login',
      'officer.assignedCases': 'Assigned Cases',
      'officer.quickActions': 'Quick Actions',
      'officer.immutableChain': 'Immutable Action Chain',
      
      // Chatbot
      'chatbot.greeting': 'Hello! I am your cyber safety assistant. How can I help you today?',
      'chatbot.reportHelp': 'I can help you report a cybercrime. What type of scam did you encounter?',
      'chatbot.preventionTips': 'Here are some tips to stay safe online',
      'chatbot.emergency': 'If this is an emergency, please call 112 immediately',
      
      // Common
      'common.submit': 'Submit',
      'common.cancel': 'Cancel',
      'common.loading': 'Loading...',
      'common.error': 'An error occurred',
      'common.success': 'Success',
      'common.close': 'Close',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.export': 'Export',
      'common.print': 'Print',
      
      // Deepfake Detection
      'deepfake.title': 'Deepfake & Media Detector',
      'deepfake.upload': 'Upload Media for Analysis',
      'deepfake.analyzing': 'Analyzing for synthetic content...',
      'deepfake.genuine': 'Content appears genuine',
      'deepfake.suspicious': 'Potential synthetic/manipulated content detected',
      
      // Voiceprint
      'voiceprint.title': 'Voice Analysis',
      'voiceprint.upload': 'Upload Call Recording',
      'voiceprint.analyzing': 'Analyzing voice patterns...',
      'voiceprint.match': 'Voice pattern matches known scammer',
      'voiceprint.new': 'New voice pattern detected',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.vajra': 'वज्र - खतरा मानचित्र',
      'nav.kautilya': 'कौटिल्य - जांच',
      'nav.mayajaal': 'मायाजाल - खुफिया',
      'nav.brahmanet': 'ब्रह्मनेट - नागरिक पोर्टल',
      'nav.officer': 'अधिकारी डैशबोर्ड',
      
      // Dashboard
      'dashboard.title': 'इंदौर साइबर रक्षा डैशबोर्ड',
      'dashboard.subtitle': 'वास्तविक समय साइबर अपराध निगरानी और रोकथाम सूट',
      'dashboard.totalScams': 'कुल धोखाधड़ी',
      'dashboard.upiScams': 'UPI धोखाधड़ी',
      'dashboard.voiceScams': 'वॉयस स्कैम',
      'dashboard.resolvedCases': 'सुलझे मामले',
      'dashboard.activeFrauds': 'सक्रिय धोखाधड़ी',
      'dashboard.threatLocations': 'खतरा स्थान',
      
      // Report Fraud
      'report.title': 'साइबर अपराध की रिपोर्ट करें',
      'report.subtitle': 'संदिग्ध गतिविधियों की रिपोर्ट करके अपने समुदाय की सुरक्षा में मदद करें',
      'report.reporterName': 'आपका नाम',
      'report.contact': 'संपर्क नंबर',
      'report.scamType': 'धोखाधड़ी का प्रकार',
      'report.description': 'घटना का वर्णन करें',
      'report.location': 'स्थान (वैकल्पिक)',
      'report.amount': 'हानि की राशि (यदि कोई हो)',
      'report.evidence': 'सबूत अपलोड करें',
      'report.submit': 'रिपोर्ट जमा करें',
      'report.success': 'रिपोर्ट सफलतापूर्वक जमा की गई',
      
      // Officer Portal
      'officer.title': 'अधिकारी डैशबोर्ड',
      'officer.login': 'सुरक्षित लॉगिन',
      'officer.username': 'उपयोगकर्ता नाम',
      'officer.password': 'पासवर्ड',
      'officer.otp': 'OTP (वैकल्पिक)',
      'officer.loginButton': 'लॉगिन',
      'officer.assignedCases': 'सौंपे गए मामले',
      'officer.quickActions': 'त्वरित कार्य',
      'officer.immutableChain': 'अपरिवर्तनीय कार्य श्रृंखला',
      
      // Chatbot
      'chatbot.greeting': 'नमस्ते! मैं आपका साइबर सुरक्षा सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      'chatbot.reportHelp': 'मैं आपको साइबर अपराध की रिपोर्ट करने में मदद कर सकता हूं। आपको किस प्रकार की धोखाधड़ी का सामना करना पड़ा?',
      'chatbot.preventionTips': 'ऑनलाइन सुरक्षित रहने के लिए यहां कुछ सुझाव हैं',
      'chatbot.emergency': 'यदि यह एक आपातकाल है, तो कृपया तुरंत 112 पर कॉल करें',
      
      // Common
      'common.submit': 'जमा करें',
      'common.cancel': 'रद्द करें',
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'एक त्रुटि हुई',
      'common.success': 'सफलता',
      'common.close': 'बंद करें',
      'common.search': 'खोजें',
      'common.filter': 'फ़िल्टर',
      'common.export': 'निर्यात',
      'common.print': 'प्रिंट',
      
      // Deepfake Detection
      'deepfake.title': 'डीपफेक और मीडिया डिटेक्टर',
      'deepfake.upload': 'विश्लेषण के लिए मीडिया अपलोड करें',
      'deepfake.analyzing': 'सिंथेटिक सामग्री के लिए विश्लेषण कर रहे हैं...',
      'deepfake.genuine': 'सामग्री वास्तविक लगती है',
      'deepfake.suspicious': 'संभावित सिंथेटिक/हेराफेरी सामग्री का पता चला',
      
      // Voiceprint
      'voiceprint.title': 'आवाज विश्लेषण',
      'voiceprint.upload': 'कॉल रिकॉर्डिंग अपलोड करें',
      'voiceprint.analyzing': 'आवाज पैटर्न का विश्लेषण कर रहे हैं...',
      'voiceprint.match': 'आवाज पैटर्न ज्ञात स्कैमर से मेल खाता है',
      'voiceprint.new': 'नया आवाज पैटर्न का पता चला',
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
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;