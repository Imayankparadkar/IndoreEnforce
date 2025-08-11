import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Zap, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Hammer,
  Eye,
  Clock,
  User,
  Fingerprint,
  Server
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VajraAuthorizationProps {
  operationId: string;
  extractedUPIs: string[];
  scammerDNA: any;
  targetNumber: string;
  onComplete: (vajraAction: any) => void;
  onClose: () => void;
}

export function VajraAuthorization({ 
  operationId, 
  extractedUPIs, 
  scammerDNA, 
  targetNumber, 
  onComplete, 
  onClose 
}: VajraAuthorizationProps) {
  const [authStep, setAuthStep] = useState<'review' | 'biometric' | 'otp' | 'confirmed' | 'executing'>('review');
  const [officerOtp, setOfficerOtp] = useState('');
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [blockedAccounts, setBlockedAccounts] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const queryClient = useQueryClient();

  // Create Vajra Action
  const createVajraActionMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/vajra-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (action) => {
      executeVajraStrike(action);
    }
  });

  const simulateBiometricScan = () => {
    const scanSteps = [
      "Initializing biometric scanner...",
      "Place finger on scanner...",
      "Scanning fingerprint...",
      "Analyzing biometric data...",
      "Verifying officer identity...",
      "Biometric verification complete!"
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < scanSteps.length - 1) {
        stepIndex++;
      } else {
        clearInterval(interval);
        setBiometricVerified(true);
        setAuthStep('otp');
      }
    }, 1000);
  };

  const verifyOTP = () => {
    if (officerOtp === '789123') {
      setAuthStep('confirmed');
    } else {
      alert('Invalid OTP. Use: 789123 for demo');
    }
  };

  const executeVajraStrike = (vajraAction: any) => {
    setAuthStep('executing');
    setIsExecuting(true);
    
    // Simulate progressive execution
    const targets = extractedUPIs.concat(scammerDNA.linkedAccounts || []);
    let currentTarget = 0;
    
    const executionInterval = setInterval(() => {
      if (currentTarget < targets.length) {
        setBlockedAccounts(prev => [...prev, targets[currentTarget]]);
        setExecutionProgress(((currentTarget + 1) / targets.length) * 100);
        currentTarget++;
      } else {
        clearInterval(executionInterval);
        setIsExecuting(false);
        
        // Complete the operation
        setTimeout(() => {
          onComplete({
            id: vajraAction.id,
            operationId,
            blockedAccounts,
            executionTime: new Date().toISOString(),
            status: 'completed'
          });
        }, 2000);
      }
    }, 1500);
  };

  const authorizeVajraStrike = () => {
    createVajraActionMutation.mutate({
      operationId,
      actionType: 'account_freeze',
      targetIdentifier: extractedUPIs.join(','),
      authorizedBy: 'IND001', // This would come from auth context
      authorizationHash: generateAuthHash(),
      status: 'authorized'
    });
  };

  const generateAuthHash = () => {
    return 'VJ' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const getSeverityColor = (riskScore: number) => {
    if (riskScore >= 85) return 'text-red-600 bg-red-100';
    if (riskScore >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
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
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600">Vajra Authorization</h2>
                <p className="text-gray-600">Scorched Earth Protocol - Takedown Authorization</p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 px-3 py-1">
              CLASSIFIED OPERATION
            </Badge>
          </div>

          {/* Operation Summary */}
          <Card className="mb-6 border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Target className="w-5 h-5" />
                Operation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Scammer Profile</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Primary Target:</span>
                      <span className="font-mono">{targetNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Score:</span>
                      <Badge className={getSeverityColor(scammerDNA.riskScore)}>
                        {scammerDNA.riskScore}/100
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Size:</span>
                      <span>{scammerDNA.networkSize} linked accounts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Previous Scams:</span>
                      <span className="text-red-600 font-medium">{scammerDNA.previousScams} cases</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Extracted Targets</h4>
                  <div className="space-y-2">
                    {extractedUPIs.map((upi, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-red-500" />
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {upi}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authorization Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Authorization Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Multi-Factor Authorization
                </CardTitle>
              </CardHeader>
              <CardContent>
                {authStep === 'review' && (
                  <div className="space-y-4">
                    <Alert className="border-red-200">
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <strong>WARNING:</strong> This action will permanently block all identified accounts and notify relevant authorities. This action cannot be undone.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Targets for Takedown:</h4>
                      <div className="space-y-2">
                        {extractedUPIs.map((upi, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                            <Zap className="w-4 h-4 text-red-500" />
                            <span className="font-mono text-sm">{upi}</span>
                            <Badge className="bg-red-100 text-red-800 ml-auto">FREEZE</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => setAuthStep('biometric')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Begin Authorization Process
                    </Button>
                  </div>
                )}

                {authStep === 'biometric' && (
                  <div className="space-y-4 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Fingerprint className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Biometric Verification</h3>
                    <p className="text-gray-600">Place your finger on the biometric scanner to verify your identity</p>
                    
                    {!biometricVerified ? (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={simulateBiometricScan}
                      >
                        <Fingerprint className="w-4 h-4 mr-2" />
                        Start Biometric Scan
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>Biometric verified successfully</span>
                      </div>
                    )}
                  </div>
                )}

                {authStep === 'otp' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                      <p className="text-gray-600">Enter the OTP sent to your secure device</p>
                    </div>

                    <div>
                      <Input
                        type="text"
                        value={officerOtp}
                        onChange={(e) => setOfficerOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                      <p className="text-xs text-gray-500 text-center mt-2">Demo OTP: 789123</p>
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={verifyOTP}
                      disabled={officerOtp.length !== 6}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Verify OTP
                    </Button>
                  </div>
                )}

                {authStep === 'confirmed' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Hammer className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-red-600">Final Authorization</h3>
                      <p className="text-gray-600">All security checks passed. Ready to execute Vajra strike.</p>
                    </div>

                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <strong>FINAL WARNING:</strong> You are about to execute a permanent takedown action against {extractedUPIs.length} scammer accounts. This action will be logged in the immutable Akhanda ledger.
                      </AlertDescription>
                    </Alert>

                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg font-bold"
                      onClick={authorizeVajraStrike}
                      disabled={createVajraActionMutation.isPending}
                    >
                      {createVajraActionMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Authorizing...
                        </div>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          EXECUTE VAJRA STRIKE
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {authStep === 'executing' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-red-600">Vajra Strike in Progress</h3>
                      <p className="text-gray-600">Executing takedown operations...</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{executionProgress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div 
                          className="bg-red-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${executionProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {blockedAccounts.map((account, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 p-2 bg-green-50 rounded text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-mono">{account}</span>
                          <Badge className="bg-green-100 text-green-800 ml-auto">BLOCKED</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Panel - Operation Intelligence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Intelligence Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scammer Behavior Pattern</h4>
                    <div className="space-y-2 text-sm">
                      {scammerDNA.patterns.map((pattern: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{pattern}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Network Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">Linked Accounts</div>
                        <div className="text-xl font-bold text-blue-600">{scammerDNA.networkSize}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">Risk Level</div>
                        <div className="text-xl font-bold text-red-600">EXTREME</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Impact Assessment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Estimated Victims:</span>
                        <span className="font-medium">50-100+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Financial Loss:</span>
                        <span className="font-medium">₹5-10 Lakhs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operation Duration:</span>
                        <span className="font-medium">3-6 months</span>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Server className="w-4 h-4" />
                    <AlertDescription>
                      All actions will be recorded in the Akhanda immutable ledger for audit and legal proceedings.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}