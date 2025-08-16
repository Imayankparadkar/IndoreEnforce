import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// Store crypto analysis results in Firebase
export async function saveCryptoAnalysisToFirebase(ransomNote: string, extractedData: any) {
  try {
    const docRef = await addDoc(collection(db, 'cryptoAnalysis'), {
      ransomNote,
      extractedData,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    });
    console.log('✅ Crypto analysis saved to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving crypto analysis to Firebase:', error);
    throw error;
  }
}

// Store wallet intelligence in Firebase
export async function saveWalletAnalysisToFirebase(walletData: any) {
  try {
    const docRef = await addDoc(collection(db, 'walletIntelligence'), {
      ...walletData,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    });
    console.log('✅ Wallet analysis saved to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving wallet analysis to Firebase:', error);
    throw error;
  }
}

// Get crypto analysis history
export async function getCryptoAnalysisHistory() {
  try {
    const q = query(
      collection(db, 'cryptoAnalysis'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('✅ Retrieved crypto analysis history:', history.length);
    return history;
  } catch (error) {
    console.error('❌ Error getting crypto analysis history:', error);
    return [];
  }
}

// Get wallet intelligence history
export async function getWalletIntelligenceHistory(address?: string) {
  try {
    let q;
    if (address) {
      q = query(
        collection(db, 'walletIntelligence'),
        where('address', '==', address),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'walletIntelligence'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('✅ Retrieved wallet intelligence history:', history.length);
    return history;
  } catch (error) {
    console.error('❌ Error getting wallet intelligence history:', error);
    return [];
  }
}

// Store OSINT results
export async function saveOSINTResultsToFirebase(indicators: any, results: any) {
  try {
    const docRef = await addDoc(collection(db, 'osintResults'), {
      indicators,
      results,
      timestamp: new Date().toISOString(),
      createdAt: new Date()
    });
    console.log('✅ OSINT results saved to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving OSINT results to Firebase:', error);
    throw error;
  }
}