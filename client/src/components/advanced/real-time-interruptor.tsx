import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Phone, Shield, AlertTriangle, Mic, MicOff, Volume2 } from "lucide-react";

export default function RealTimeScamInterruptor() {
  const [isListening, setIsListening] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [threatLevel, setThreatLevel] = useState<'safe' | 'suspicious' | 'danger'>('safe');
  const [detectedScamType, setDetectedScamType] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Scam detection keywords in multiple languages
  const scamKeywords = {
    en: [
      'bank account', 'otp', 'cvv', 'pin number', 'transfer money', 'urgent payment',
      'verify account', 'suspended account', 'credit card details', 'refund process',
      'tax refund', 'lottery winner', 'microsoft support', 'tech support',
      'remote access', 'teamviewer', 'anydesk', 'send money now'
    ],
    hi: [
      'बैंक खाता', 'ओटीपी', 'पिन नंबर', 'पैसे भेजें', 'तुरंत भुगतान',
      'खाता सत्यापित', 'खाता बंद', 'क्रेडिट कार्ड', 'रिफंड प्रक्रिया',
      'टैक्स रिफंड', 'लॉटरी विजेता', 'तकनीकी सहायता', 'रिमोट एक्सेस'
    ]
  };

  const warningMessages = {
    en: "⚠️ WARNING: This call has been identified as a high-probability scam. Please disconnect immediately and do not share any personal information.",
    hi: "⚠️ चेतावनी: इस कॉल को उच्च संभावना धोखाधड़ी के रूप में पहचाना गया है। कृपया तुरंत कॉल काटें और कोई व्यक्तिगत जानकारी साझा न करें।"
  };

  const initializeAudioMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(Math.round((average / 255) * 100));
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: 'Microphone Access Required',
        description: 'Please allow microphone access for real-time scam detection',
        variant: 'destructive',
      });
    }
  };

  const initializeSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: 'Speech Recognition Not Supported',
        description: 'Your browser does not support speech recognition',
        variant: 'destructive',
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      
      analyzeTranscript(transcript.toLowerCase());
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  const analyzeTranscript = (transcript: string) => {
    let suspiciousKeywordCount = 0;
    let detectedType = null;
    
    // Check for scam keywords
    const allKeywords = [...scamKeywords.en, ...scamKeywords.hi];
    
    allKeywords.forEach(keyword => {
      if (transcript.includes(keyword.toLowerCase())) {
        suspiciousKeywordCount++;
        
        // Determine scam type
        if (keyword.includes('bank') || keyword.includes('बैंक') || keyword.includes('otp') || keyword.includes('ओटीपी')) {
          detectedType = 'Banking Fraud';
        } else if (keyword.includes('support') || keyword.includes('सहायता') || keyword.includes('tech')) {
          detectedType = 'Tech Support Scam';
        } else if (keyword.includes('lottery') || keyword.includes('लॉटरी') || keyword.includes('winner')) {
          detectedType = 'Lottery Scam';
        } else if (keyword.includes('refund') || keyword.includes('रिफंड')) {
          detectedType = 'Refund Scam';
        }
      }
    });

    // Calculate threat level and confidence
    const newConfidence = Math.min((suspiciousKeywordCount * 25), 100);
    setConfidence(newConfidence);
    setDetectedScamType(detectedType);

    if (newConfidence >= 75) {
      setThreatLevel('danger');
      triggerScamAlert();
    } else if (newConfidence >= 40) {
      setThreatLevel('suspicious');
    } else {
      setThreatLevel('safe');
    }
  };

  const triggerScamAlert = () => {
    // Visual alert
    toast({
      title: '🚨 SCAM ALERT',
      description: 'Suspicious conversation detected! Consider ending this call.',
      variant: 'destructive',
    });

    // Audio alert (text-to-speech)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(warningMessages.en);
      utterance.rate = 1.2;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startMonitoring = () => {
    setIsListening(true);
    initializeAudioMonitoring();
    initializeSpeechRecognition();
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
    
    toast({
      title: 'Monitoring Started',
      description: 'Real-time scam detection is now active',
    });
  };

  const stopMonitoring = () => {
    setIsListening(false);
    setConfidence(0);
    setThreatLevel('safe');
    setDetectedScamType(null);
    setAudioLevel(0);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    toast({
      title: 'Monitoring Stopped',
      description: 'Real-time scam detection has been disabled',
    });
  };

  const getThreatColor = () => {
    switch (threatLevel) {
      case 'danger': return 'bg-red-500';
      case 'suspicious': return 'bg-yellow-500';
      case 'safe': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getThreatBorderColor = () => {
    switch (threatLevel) {
      case 'danger': return 'border-red-500';
      case 'suspicious': return 'border-yellow-500';
      case 'safe': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <Card className={`border-2 ${getThreatBorderColor()}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="text-blue-600 mr-2" />
            Real-Time Scam Call Interruptor
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getThreatColor()}`}></div>
            <span className="text-sm capitalize">{threatLevel}</span>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-600">
          AI-powered real-time conversation analysis to detect and interrupt scam calls
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Control Panel */}
        <div className="flex justify-center">
          <Button
            onClick={isListening ? stopMonitoring : startMonitoring}
            className={`w-32 h-12 ${
              isListening 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-5 w-5" />
                Stop
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                Start
              </>
            )}
          </Button>
        </div>

        {/* Status Display */}
        {isListening && (
          <div className="space-y-4">
            {/* Audio Level */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Audio Level</span>
                <span>{audioLevel}%</span>
              </div>
              <Progress value={audioLevel} className="w-full h-2" />
            </div>

            {/* Threat Confidence */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Scam Probability</span>
                <span>{confidence}%</span>
              </div>
              <Progress 
                value={confidence} 
                className={`w-full h-3 ${
                  confidence >= 75 ? 'bg-red-200' : 
                  confidence >= 40 ? 'bg-yellow-200' : 'bg-green-200'
                }`}
              />
            </div>

            {/* Detected Scam Type */}
            {detectedScamType && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium text-red-800">
                    Detected: {detectedScamType}
                  </span>
                </div>
              </div>
            )}

            {/* Warning Message */}
            {threatLevel === 'danger' && (
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 animate-pulse">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-800 mb-2">
                      🚨 IMMEDIATE ACTION REQUIRED
                    </h4>
                    <p className="text-red-700 text-sm mb-3">
                      {warningMessages.en}
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => window.location.href = 'tel:112'}
                      >
                        <Phone className="mr-1 h-4 w-4" />
                        Call 112
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={stopMonitoring}
                      >
                        End Monitoring
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!isListening && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How It Works:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click "Start" to begin monitoring your conversations</li>
              <li>• AI analyzes speech patterns for scam indicators</li>
              <li>• Immediate alerts when suspicious content is detected</li>
              <li>• Automatic voice warnings for high-risk calls</li>
              <li>• Compatible with phone calls and VoIP conversations</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}