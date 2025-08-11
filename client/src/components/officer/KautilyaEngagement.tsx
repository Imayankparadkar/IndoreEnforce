import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Phone, 
  Target, 
  Brain, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  User,
  Bot,
  ArrowRight,
  Zap,
  Eye,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

interface KautilyaEngagementProps {
  reportId: string;
  targetNumber: string;
  scamType: string;
  onComplete: (extractedData: any) => void;
  onClose: () => void;
}

interface ChatMessage {
  role: 'officer' | 'kautilya' | 'scammer' | 'system';
  message: string;
  timestamp: string;
  typing?: boolean;
}

interface MayajaalProfile {
  id: string;
  profileName: string;
  persona: string;
  backstory: string;
  communicationStyle: string;
}

export function KautilyaEngagement({ reportId, targetNumber, scamType, onComplete, onClose }: KautilyaEngagementProps) {
  const [currentStep, setCurrentStep] = useState<'setup' | 'engaging' | 'extracting' | 'analyzing' | 'complete'>('setup');
  const [selectedProfile, setSelectedProfile] = useState<MayajaalProfile | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [manualMessage, setManualMessage] = useState("");
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [extractedUPIs, setExtractedUPIs] = useState<string[]>([]);
  const [scammerDNA, setScammerDNA] = useState<any>(null);
  const [operationId, setOperationId] = useState<string>("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch available MayaJaal profiles
  const { data: profiles = [] } = useQuery<MayajaalProfile[]>({
    queryKey: ["/api/mayajaal-profiles"],
  });

  // Create Kautilya operation
  const createOperationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/kautilya-operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (operation) => {
      setOperationId(operation.id);
      setCurrentStep('engaging');
      startEngagement();
    }
  });

  // Start the engagement process
  const startEngagement = () => {
    if (!selectedProfile) return;

    // Add system message
    const systemMsg: ChatMessage = {
      role: 'system',
      message: `Operation initiated with ${selectedProfile.profileName}. Target: ${targetNumber}`,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([systemMsg]);

    // Simulate initial contact
    setTimeout(() => {
      const initialMsg: ChatMessage = {
        role: 'kautilya',
        message: generateInitialMessage(),
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, initialMsg]);

      // Start scammer response simulation
      simulateScammerResponse(initialMsg.message);
    }, 2000);
  };

  const generateInitialMessage = () => {
    const messages = {
      "Army Scam": "Hi, I saw your ad for army equipment. I'm interested in buying some items for my husband who's posted in Kashmir. Can you help?",
      "Loan Fraud": "Hello, I need urgent loan of 50,000 for medical emergency. Someone gave me your number saying you provide quick loans?",
      "Job Fraud": "Hi, I'm calling about the job posting. I'm very interested in the position and can pay the registration fee immediately.",
      "OLX Scam": "Hello, I'm interested in buying the item you posted on OLX. Can we proceed with the payment?",
    };
    return messages[scamType as keyof typeof messages] || "Hello, I'm interested in your services. Can you help me?";
  };

  const simulateScammerResponse = (previousMessage: string) => {
    setTimeout(() => {
      // Show typing indicator
      setChatMessages(prev => [...prev, {
        role: 'scammer',
        message: '',
        timestamp: new Date().toISOString(),
        typing: true
      }]);

      setTimeout(() => {
        // Remove typing indicator and add real message
        setChatMessages(prev => prev.filter(msg => !msg.typing));
        
        const responses = generateScammerResponse(previousMessage);
        setChatMessages(prev => [...prev, {
          role: 'scammer',
          message: responses.message,
          timestamp: new Date().toISOString()
        }]);

        // Check for UPI extraction
        const upiMatch = responses.message.match(/[\w.-]+@[\w.-]+/g);
        if (upiMatch) {
          setExtractedUPIs(prev => [...prev, ...upiMatch]);
          setCurrentStep('extracting');
          
          // Add system notification
          setTimeout(() => {
            setChatMessages(prev => [...prev, {
              role: 'system',
              message: `🎯 UPI ID EXTRACTED: ${upiMatch.join(', ')} - Starting Scammer DNA Analysis...`,
              timestamp: new Date().toISOString()
            }]);
            
            performScammerDNAAnalysis(upiMatch);
          }, 1000);
        } else if (isAutoMode) {
          // Continue conversation
          setTimeout(() => {
            continueConversation();
          }, 3000);
        }
      }, Math.random() * 3000 + 2000); // Random typing delay
    }, 1000);
  };

  const generateScammerResponse = (lastMessage: string) => {
    const step = chatMessages.filter(msg => msg.role !== 'system').length;
    
    if (step <= 2) {
      return {
        message: "Yes yes, I can help you. Very good quality items available. First you need to pay 50% advance through UPI. My UPI ID is fauji47@okbank",
        extractUPI: true
      };
    } else if (step <= 4) {
      return {
        message: "Send money to scammer123@paytm also. Both accounts needed for security. Total 5000 rupees advance payment.",
        extractUPI: true
      };
    } else {
      return {
        message: "Sir please send payment fast. Items in high demand. Send to fraudster789@phonepay immediately.",
        extractUPI: true
      };
    }
  };

  const continueConversation = () => {
    const followUpMessages = [
      "That sounds perfect! How much advance do I need to pay?",
      "Can you show me some pictures of the items first?",
      "What's the total cost? And when will you deliver?",
      "I'm ready to pay. What's your UPI ID?",
      "Can you also provide your bank details as backup?"
    ];

    const randomMessage = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];
    
    setChatMessages(prev => [...prev, {
      role: 'kautilya',
      message: randomMessage,
      timestamp: new Date().toISOString()
    }]);

    simulateScammerResponse(randomMessage);
  };

  const performScammerDNAAnalysis = async (upis: string[]) => {
    setCurrentStep('analyzing');
    
    // Simulate DNA analysis
    setTimeout(() => {
      const dnaAnalysis = {
        primaryUPI: upis[0],
        linkedAccounts: upis,
        networkSize: Math.floor(Math.random() * 10) + 3,
        previousScams: Math.floor(Math.random() * 5) + 1,
        riskScore: 85 + Math.floor(Math.random() * 15),
        locations: ['Indore', 'Mumbai', 'Delhi'],
        devices: ['Android-SM-G973F', 'iPhone-12'],
        patterns: [
          'Uses military terminology',
          'Demands advance payments',
          'Changes UPI IDs frequently',
          'Active during evening hours'
        ]
      };

      setScammerDNA(dnaAnalysis);
      
      setChatMessages(prev => [...prev, {
        role: 'system',
        message: `🧬 SCAMMER DNA ANALYSIS COMPLETE
Primary UPI: ${dnaAnalysis.primaryUPI}
Network Size: ${dnaAnalysis.networkSize} linked accounts
Previous Scams: ${dnaAnalysis.previousScams} cases
Risk Score: ${dnaAnalysis.riskScore}/100

Ready for Vajra Authorization!`,
        timestamp: new Date().toISOString()
      }]);

      setCurrentStep('complete');
    }, 4000);
  };

  const sendManualMessage = () => {
    if (!manualMessage.trim()) return;

    setChatMessages(prev => [...prev, {
      role: 'officer',
      message: manualMessage,
      timestamp: new Date().toISOString()
    }]);

    simulateScammerResponse(manualMessage);
    setManualMessage("");
  };

  const handleComplete = () => {
    onComplete({
      operationId,
      extractedUPIs,
      scammerDNA,
      chatLog: chatMessages,
      selectedProfile
    });
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'setup': return <User className="w-5 h-5" />;
      case 'engaging': return <MessageSquare className="w-5 h-5" />;
      case 'extracting': return <Target className="w-5 h-5" />;
      case 'analyzing': return <Brain className="w-5 h-5" />;
      case 'complete': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStepColor = (step: string) => {
    if (currentStep === step) return 'text-blue-600 bg-blue-100';
    if (['setup', 'engaging', 'extracting', 'analyzing'].indexOf(step) < ['setup', 'engaging', 'extracting', 'analyzing'].indexOf(currentStep)) {
      return 'text-green-600 bg-green-100';
    }
    return 'text-gray-400 bg-gray-100';
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
        {/* Left Panel - Operation Control */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Kautilya 2.0 Operation</h2>
            <p className="text-sm text-gray-600">Target: {targetNumber}</p>
          </div>

          {/* Step Progress */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Operation Steps</h3>
            <div className="space-y-3">
              {[
                { key: 'setup', label: 'Profile Setup' },
                { key: 'engaging', label: 'Target Engagement' },
                { key: 'extracting', label: 'Data Extraction' },
                { key: 'analyzing', label: 'DNA Analysis' },
                { key: 'complete', label: 'Complete' }
              ].map((step) => (
                <div key={step.key} className={`flex items-center gap-3 p-2 rounded-lg ${getStepColor(step.key)}`}>
                  {getStepIcon(step.key)}
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Selection */}
          {currentStep === 'setup' && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Select MayaJaal Profile</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProfile?.id === profile.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProfile(profile)}
                  >
                    <div className="font-medium text-sm">{profile.profileName}</div>
                    <div className="text-xs text-gray-600 mt-1">{profile.persona}</div>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                disabled={!selectedProfile || createOperationMutation.isPending}
                onClick={() => createOperationMutation.mutate({
                  reportId,
                  officerId: "IND001", // This would come from auth context
                  targetNumber,
                  status: "initiated"
                })}
              >
                {createOperationMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Initiating...
                  </div>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Start Operation
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Extracted Data */}
          {extractedUPIs.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-semibold mb-3 text-green-700">Extracted UPI IDs</h3>
              <div className="space-y-2">
                {extractedUPIs.map((upi, idx) => (
                  <Badge key={idx} className="bg-green-100 text-green-800 block text-center py-1">
                    🎯 {upi}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* DNA Analysis Results */}
          {scammerDNA && (
            <div className="p-4 border-t border-gray-200 flex-1 overflow-y-auto">
              <h3 className="font-semibold mb-3 text-purple-700">Scammer DNA</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Risk Score:</span>
                  <Badge className="ml-2 bg-red-100 text-red-800">{scammerDNA.riskScore}/100</Badge>
                </div>
                <div>
                  <span className="font-medium">Network Size:</span>
                  <span className="ml-2">{scammerDNA.networkSize} accounts</span>
                </div>
                <div>
                  <span className="font-medium">Previous Scams:</span>
                  <span className="ml-2">{scammerDNA.previousScams} cases</span>
                </div>
                <div>
                  <span className="font-medium">Patterns:</span>
                  <ul className="mt-1 space-y-1">
                    {scammerDNA.patterns.map((pattern: string, idx: number) => (
                      <li key={idx} className="text-xs text-gray-600">• {pattern}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {currentStep === 'complete' && (
                <Button 
                  className="w-full mt-4 bg-red-600 hover:bg-red-700"
                  onClick={handleComplete}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Authorize Vajra Strike
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Live Conversation</h3>
                <p className="text-sm text-gray-600">
                  {selectedProfile && `Acting as: ${selectedProfile.profileName}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isAutoMode ? "default" : "outline"}>
                  {isAutoMode ? "Auto Mode" : "Manual Mode"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoMode(!isAutoMode)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <AnimatePresence>
              {chatMessages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'kautilya' || message.role === 'officer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'system' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : message.role === 'kautilya' || message.role === 'officer'
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === 'system' && <AlertTriangle className="w-4 h-4" />}
                      {message.role === 'kautilya' && <Bot className="w-4 h-4" />}
                      {message.role === 'officer' && <User className="w-4 h-4" />}
                      {message.role === 'scammer' && <Phone className="w-4 h-4" />}
                      <span className="text-xs font-medium capitalize">{message.role}</span>
                    </div>
                    {message.typing ? (
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs ml-2">typing...</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {format(new Date(message.timestamp), 'HH:mm:ss')}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Manual Message Input */}
          {!isAutoMode && currentStep === 'engaging' && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  placeholder="Type your message as the fake persona..."
                  onKeyPress={(e) => e.key === 'Enter' && sendManualMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendManualMessage}
                  disabled={!manualMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}