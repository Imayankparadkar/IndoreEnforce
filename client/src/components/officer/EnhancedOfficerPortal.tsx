import { useState } from "react";
import { OfficerLogin } from "./OfficerLogin";
import { OfficerDashboard } from "./OfficerDashboard";
import { KautilyaEngagement } from "./KautilyaEngagement";
import { VajraAuthorization } from "./VajraAuthorization";
import { AkhandaLedger } from "./AkhandaLedger";

interface Officer {
  id: string;
  name: string;
  rank: string;
}

export function EnhancedOfficerPortal() {
  const [officer, setOfficer] = useState<Officer | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'kautilya' | 'vajra' | 'ledger'>('dashboard');
  const [operationData, setOperationData] = useState<any>(null);

  const handleLogin = (officerId: string, name: string, rank: string) => {
    setOfficer({ id: officerId, name, rank });
  };

  const handleLogout = () => {
    setOfficer(null);
    setCurrentView('dashboard');
    setOperationData(null);
  };

  const handleStartKautilya = (reportData: any) => {
    setOperationData({
      reportId: reportData.id,
      targetNumber: reportData.suspiciousNumbers[0] || reportData.reporterContact,
      scamType: reportData.scamType
    });
    setCurrentView('kautilya');
  };

  const handleKautilyaComplete = (extractedData: any) => {
    setOperationData(prev => ({ ...prev, ...extractedData }));
    setCurrentView('vajra');
  };

  const handleVajraComplete = (vajraData: any) => {
    setOperationData(prev => ({ ...prev, ...vajraData }));
    setCurrentView('ledger');
  };

  const handleReturnToDashboard = () => {
    setCurrentView('dashboard');
    setOperationData(null);
  };

  if (!officer) {
    return <OfficerLogin onLogin={handleLogin} />;
  }

  return (
    <>
      {currentView === 'dashboard' && (
        <OfficerDashboard 
          officer={officer} 
          onLogout={handleLogout}
          onStartKautilya={handleStartKautilya}
        />
      )}

      {currentView === 'kautilya' && operationData && (
        <KautilyaEngagement
          reportId={operationData.reportId}
          targetNumber={operationData.targetNumber}
          scamType={operationData.scamType}
          onComplete={handleKautilyaComplete}
          onClose={handleReturnToDashboard}
        />
      )}

      {currentView === 'vajra' && operationData && (
        <VajraAuthorization
          operationId={operationData.operationId}
          extractedUPIs={operationData.extractedUPIs}
          scammerDNA={operationData.scammerDNA}
          targetNumber={operationData.targetNumber}
          onComplete={handleVajraComplete}
          onClose={handleReturnToDashboard}
        />
      )}

      {currentView === 'ledger' && operationData && (
        <AkhandaLedger
          operationId={operationData.operationId}
          onClose={handleReturnToDashboard}
        />
      )}
    </>
  );
}