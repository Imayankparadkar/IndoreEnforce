import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Link, 
  Hash, 
  Clock, 
  CheckCircle, 
  FileText,
  Download,
  Eye,
  Server,
  Lock,
  Verified
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

interface AkhandaLedgerProps {
  operationId: string;
  onClose: () => void;
}

interface LedgerEntry {
  id: string;
  action: string;
  timestamp: string;
  hash: string;
  previousHash: string;
  officerId: string;
  details: any;
  verified: boolean;
}

export function AkhandaLedger({ operationId, onClose }: AkhandaLedgerProps) {
  const [selectedEntry, setSelectedEntry] = useState<LedgerEntry | null>(null);
  
  // In a real app, this would fetch from the API
  const mockLedgerEntries: LedgerEntry[] = [
    {
      id: "AK001",
      action: "COMPLAINT_RECEIVED",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      hash: "0x4f3d2a1b8c9e7f6a5d4c3b2a1f9e8d7c6b5a4f3e2d1c",
      previousHash: "0x0000000000000000000000000000000000000000",
      officerId: "IND001",
      details: {
        reportId: operationId,
        complainant: "Priya Sharma",
        scamType: "Army Equipment Scam",
        targetNumber: "+91-9876543210"
      },
      verified: true
    },
    {
      id: "AK002", 
      action: "KAUTILYA_DEPLOYED",
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      hash: "0x7a9b3c5d2e8f4g6h1i9j0k2l3m4n5o6p7q8r9s0t",
      previousHash: "0x4f3d2a1b8c9e7f6a5d4c3b2a1f9e8d7c6b5a4f3e2d1c",
      officerId: "IND001",
      details: {
        operationId: operationId,
        profileUsed: "Shalini - Army Wife",
        engagementStart: new Date(Date.now() - 3000000).toISOString()
      },
      verified: true
    },
    {
      id: "AK003",
      action: "UPI_EXTRACTED", 
      timestamp: new Date(Date.now() - 2400000).toISOString(),
      hash: "0x2c8e4f6a9b1d3g5h7i0j2k4l6m8n0o2p4q6r8s0t2u",
      previousHash: "0x7a9b3c5d2e8f4g6h1i9j0k2l3m4n5o6p7q8r9s0t",
      officerId: "IND001", 
      details: {
        extractedUPIs: ["fauji47@okbank", "scammer123@paytm"],
        extractionMethod: "Social Engineering",
        conversationDuration: "45 minutes"
      },
      verified: true
    },
    {
      id: "AK004",
      action: "DNA_ANALYSIS_COMPLETE",
      timestamp: new Date(Date.now() - 1800000).toISOString(), 
      hash: "0x8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p",
      previousHash: "0x2c8e4f6a9b1d3g5h7i0j2k4l6m8n0o2p4q6r8s0t2u",
      officerId: "IND001",
      details: {
        riskScore: 95,
        networkSize: 12,
        linkedScams: 4,
        patterns: ["Military terminology", "Advance payments", "Multiple UPIs"]
      },
      verified: true
    },
    {
      id: "AK005",
      action: "VAJRA_AUTHORIZED",
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      hash: "0x1a3c5e7g9i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m", 
      previousHash: "0x8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p",
      officerId: "IND001",
      details: {
        authorizationType: "Scorched Earth Protocol",
        biometricHash: "BIO_789ABC123DEF",
        otpVerified: true,
        targetAccounts: ["fauji47@okbank", "scammer123@paytm"]
      },
      verified: true
    },
    {
      id: "AK006",
      action: "VAJRA_EXECUTED",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      hash: "0x5f7h9j1l3n5p7r9t1v3x5z7b9d1f3h5j7l9n1p3r",
      previousHash: "0x1a3c5e7g9i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m",
      officerId: "IND001", 
      details: {
        blockedAccounts: ["fauji47@okbank", "scammer123@paytm"],
        executionTime: "2.3 seconds",
        bankNotified: true,
        caseStatus: "CLOSED"
      },
      verified: true
    }
  ];

  const verifyChainIntegrity = () => {
    for (let i = 1; i < mockLedgerEntries.length; i++) {
      if (mockLedgerEntries[i].previousHash !== mockLedgerEntries[i - 1].hash) {
        return false;
      }
    }
    return true;
  };

  const chainIntegrityVerified = verifyChainIntegrity();

  const getActionColor = (action: string) => {
    switch (action) {
      case 'COMPLAINT_RECEIVED': return 'bg-blue-100 text-blue-800';
      case 'KAUTILYA_DEPLOYED': return 'bg-purple-100 text-purple-800';
      case 'UPI_EXTRACTED': return 'bg-green-100 text-green-800';
      case 'DNA_ANALYSIS_COMPLETE': return 'bg-yellow-100 text-yellow-800';
      case 'VAJRA_AUTHORIZED': return 'bg-orange-100 text-orange-800';
      case 'VAJRA_EXECUTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'COMPLAINT_RECEIVED': return <FileText className="w-4 h-4" />;
      case 'KAUTILYA_DEPLOYED': return <Shield className="w-4 h-4" />;
      case 'UPI_EXTRACTED': return <CheckCircle className="w-4 h-4" />;
      case 'DNA_ANALYSIS_COMPLETE': return <Eye className="w-4 h-4" />;
      case 'VAJRA_AUTHORIZED': return <Lock className="w-4 h-4" />;
      case 'VAJRA_EXECUTED': return <Shield className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const downloadLedgerReport = () => {
    const report = {
      operationId,
      generated: new Date().toISOString(),
      chainIntegrity: chainIntegrityVerified,
      entries: mockLedgerEntries,
      summary: {
        totalActions: mockLedgerEntries.length,
        operationDuration: "4.5 hours",
        finalStatus: "SUCCESSFUL_TAKEDOWN",
        officersInvolved: ["IND001"]
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akhanda-ledger-${operationId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Chain Visualization */}
        <div className="w-96 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <Link className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-indigo-600">Akhanda Ledger</h2>
                <p className="text-sm text-gray-600">Immutable Operation Chain</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {chainIntegrityVerified ? (
                  <>
                    <Verified className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Chain Verified</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Chain Compromised</span>
                  </>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {mockLedgerEntries.length} Blocks
              </Badge>
            </div>
          </div>

          {/* Chain Visualization */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {mockLedgerEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedEntry?.id === entry.id 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getActionColor(entry.action)}>
                      {getActionIcon(entry.action)}
                      <span className="ml-1 text-xs">{entry.id}</span>
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {format(new Date(entry.timestamp), 'HH:mm')}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-1">
                    {entry.action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </h4>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    Officer: {entry.officerId}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Hash className="w-3 h-3" />
                    <span className="font-mono">
                      {entry.hash.slice(0, 8)}...{entry.hash.slice(-8)}
                    </span>
                  </div>

                  {index > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Link className="w-3 h-3" />
                      <span className="font-mono">
                        {entry.previousHash.slice(0, 8)}...{entry.previousHash.slice(-8)}
                      </span>
                    </div>
                  )}

                  {/* Chain connector */}
                  {index < mockLedgerEntries.length - 1 && (
                    <div className="flex justify-center mt-3">
                      <div className="w-0.5 h-6 bg-gray-300"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              onClick={downloadLedgerReport}
              className="w-full mb-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Ledger Report
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Close Viewer
            </Button>
          </div>
        </div>

        {/* Right Panel - Entry Details */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold">
              {selectedEntry ? 'Block Details' : 'Select a block to view details'}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedEntry ? (
              <div className="space-y-6">
                {/* Block Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getActionIcon(selectedEntry.action)}
                      {selectedEntry.action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Block ID:</span>
                        <p className="font-mono">{selectedEntry.id}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Timestamp:</span>
                        <p>{format(new Date(selectedEntry.timestamp), 'PPpp')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Officer ID:</span>
                        <p className="font-mono">{selectedEntry.officerId}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Status:</span>
                        <Badge className={selectedEntry.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedEntry.verified ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cryptographic Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="w-5 h-5" />
                      Cryptographic Hash
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-600">Current Hash:</span>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">
                          {selectedEntry.hash}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Previous Hash:</span>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">
                          {selectedEntry.previousHash}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Action Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(selectedEntry.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          {Array.isArray(value) ? (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {value.map((item, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {typeof item === 'string' ? item : JSON.stringify(item)}
                                </Badge>
                              ))}
                            </div>
                          ) : typeof value === 'object' && value !== null ? (
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            <p className="text-sm mt-1">{String(value)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Chain Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Hash Integrity:</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Verified</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Chain Linkage:</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Valid</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Digital Signature:</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Authenticated</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Timestamp Integrity:</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Confirmed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Server className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a Block</p>
                  <p className="text-sm">Click on any block in the chain to view detailed information</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}