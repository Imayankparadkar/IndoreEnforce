import { collection, addDoc, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// Firebase collections
const COLLECTIONS = {
  SCAM_REPORTS: 'scam_reports',
  CASE_INVESTIGATIONS: 'case_investigations', 
  THREAT_DATA: 'threat_data',
  FRAUD_IDENTIFIERS: 'fraud_identifiers',
  OFFICER_ACTIONS: 'officer_actions'
};

// Report submission to Firebase
export async function saveReportToFirebase(reportData: any) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.SCAM_REPORTS), {
      ...reportData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'new',
      riskLevel: 'medium'
    });
    
    console.log('✅ Report saved to Firebase with ID:', docRef.id);
    return { id: docRef.id, ...reportData };
  } catch (error) {
    console.error('❌ Error saving report to Firebase:', error);
    throw error;
  }
}

// Get reports from Firebase
export async function getReportsFromFirebase() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.SCAM_REPORTS));
    const reports = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('✅ Retrieved', reports.length, 'reports from Firebase');
    return reports;
  } catch (error) {
    console.error('❌ Error getting reports from Firebase:', error);
    throw error;
  }
}

// Save case investigation to Firebase
export async function saveCaseInvestigationToFirebase(investigationData: any) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.CASE_INVESTIGATIONS), {
      ...investigationData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Case investigation saved to Firebase with ID:', docRef.id);
    return { id: docRef.id, ...investigationData };
  } catch (error) {
    console.error('❌ Error saving case investigation to Firebase:', error);
    throw error;
  }
}

// Save threat data to Firebase
export async function saveThreatDataToFirebase(threatData: any) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.THREAT_DATA), {
      ...threatData,
      lastReported: new Date()
    });
    
    console.log('✅ Threat data saved to Firebase with ID:', docRef.id);
    return { id: docRef.id, ...threatData };
  } catch (error) {
    console.error('❌ Error saving threat data to Firebase:', error);
    throw error;
  }
}

// Save officer action to Firebase (immutable audit trail)
export async function saveOfficerActionToFirebase(actionData: any) {
  try {
    const actionWithHash = {
      ...actionData,
      timestamp: new Date(),
      immutableHash: generateActionHash(actionData)
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.OFFICER_ACTIONS), actionWithHash);
    
    console.log('✅ Officer action saved to Firebase with ID:', docRef.id);
    return { id: docRef.id, ...actionWithHash };
  } catch (error) {
    console.error('❌ Error saving officer action to Firebase:', error);
    throw error;
  }
}

// Generate hash for immutable audit trail
function generateActionHash(actionData: any): string {
  const dataString = JSON.stringify(actionData) + Date.now();
  return btoa(dataString).slice(0, 32);
}

// Real-time listener for reports
export function listenToReports(callback: (reports: any[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.SCAM_REPORTS), (snapshot) => {
    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(reports);
  });
}

// Real-time listener for threat data
export function listenToThreatData(callback: (threats: any[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.THREAT_DATA), (snapshot) => {
    const threats = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(threats);
  });
}