import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { generateChatResponse } from "../../lib/gemini";
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Phone,
  Shield,
  AlertTriangle,
  CheckCircle,
  Square,
  ArrowDown
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Check if SpeechRecognition is available
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export function EnhancedChatbot({ isOpen, onClose }: ChatbotProps) {
  const { t, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: currentLanguage === 'hi' 
        ? "नमस्ते! मैं प्रहार 360 की AI सहायक हूं। मैं साइबर अपराध की रिपोर्टिंग और सुरक्षा के बारे में जानकारी दे सकती हूं। आपकी कैसे सहायता कर सकती हूं?"
        : "Hello! I'm Prahaar 360's AI assistant. I can help you with cybercrime reporting and security information. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll effect
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Monitor scroll position to show/hide scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Create abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      text: currentLanguage === 'hi' ? 'टाइप कर रही हूं...' : 'Typing...',
      isUser: false,
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await generateChatResponse(inputValue, currentLanguage);
      
      // Check if the request was aborted
      if (controller.signal.aborted) {
        setMessages(prev => prev.filter(m => m.id !== 'typing'));
        return;
      }

      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing');
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        }];
      });

      // Text-to-speech for bot response
      if (isSpeechEnabled && 'speechSynthesis' in window && !controller.signal.aborted) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      if (controller.signal.aborted) {
        setMessages(prev => prev.filter(m => m.id !== 'typing'));
        return;
      }
      
      console.error('Chat error:', error);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing');
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          text: currentLanguage === 'hi' 
            ? "क्षमा करें, मुझे कुछ तकनीकी समस्या हो रही है। कृपया बाद में प्रयास करें।"
            : "Sorry, I'm experiencing some technical issues. Please try again later.",
          isUser: false,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const stopResponse = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    
    // Stop speech synthesis if active
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    // Remove typing indicator
    setMessages(prev => prev.filter(m => m.id !== 'typing'));
    setIsLoading(false);
  };

  const toggleSpeech = () => {
    const newSpeechState = !isSpeechEnabled;
    setIsSpeechEnabled(newSpeechState);
    
    // If disabling speech, stop any current speech
    if (!newSpeechState && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { 
      text: currentLanguage === 'hi' ? "साइबर अपराध कैसे रिपोर्ट करें?" : "How to report cybercrime?", 
      icon: Shield 
    },
    { 
      text: currentLanguage === 'hi' ? "आपातकालीन नंबर" : "Emergency numbers", 
      icon: Phone 
    },
    { 
      text: currentLanguage === 'hi' ? "स्कैम से बचाव" : "Scam prevention tips", 
      icon: CheckCircle 
    },
    { 
      text: currentLanguage === 'hi' ? "संदिग्ध गतिविधि" : "Suspicious activity", 
      icon: AlertTriangle 
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed bottom-20 right-4 w-96 h-[500px] z-50 shadow-2xl"
      >
        <Card className="h-full flex flex-col border-2 border-blue-200 bg-white dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI सहायक</CardTitle>
                  <p className="text-blue-100 text-sm">
                    {currentLanguage === 'hi' ? 'ऑनलाइन' : 'Online'}
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSpeech}
                  className="text-white hover:bg-white/20"
                  title={isSpeechEnabled ? 
                    (currentLanguage === 'hi' ? 'आवाज़ बंद करें' : 'Turn off voice') : 
                    (currentLanguage === 'hi' ? 'आवाज़ चालू करें' : 'Turn on voice')
                  }
                >
                  {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 relative">
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth max-h-96"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 #f7fafc' }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl p-3 ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      )}
                      <p className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to Bottom Button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-20 right-4 z-10"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={scrollToBottom}
                    className="w-8 h-8 p-0 rounded-full bg-white shadow-lg border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
                    title={currentLanguage === 'hi' ? 'नीचे स्क्रॉल करें' : 'Scroll to bottom'}
                  >
                    <ArrowDown className="w-4 h-4 text-blue-600 animate-bounce" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {currentLanguage === 'hi' ? 'त्वरित सहायता:' : 'Quick help:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputValue(action.text)}
                        className="text-xs h-auto p-2 justify-start"
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        <span className="truncate">{action.text}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {/* Stop Button - shown when loading */}
              {isLoading && (
                <div className="mb-3 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopResponse}
                      className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2 animate-pulse"
                    >
                      <Square className="w-3 h-3" />
                      {currentLanguage === 'hi' ? 'खोज रोकें' : 'Stop Search'}
                    </Button>
                  </motion.div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentLanguage === 'hi' ? "अपना संदेश टाइप करें..." : "Type your message..."}
                    disabled={isLoading}
                    className="pr-12"
                  />
                  {SpeechRecognition && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={isListening ? stopListening : startListening}
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
                        isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={isLoading ? stopResponse : handleSendMessage}
                  disabled={isLoading ? false : !inputValue.trim()}
                  className={`transition-colors duration-200 ${
                    isLoading ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  title={isLoading ? 
                    (currentLanguage === 'hi' ? 'खोज रोकें' : 'Stop search') : 
                    (currentLanguage === 'hi' ? 'संदेश भेजें' : 'Send message')
                  }
                >
                  {isLoading ? <Square className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-sm"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  {currentLanguage === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}