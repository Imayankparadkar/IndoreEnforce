import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { generateChatResponse } from "../../lib/gemini";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Bot, 
  User, 
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface EnhancedChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnhancedChatbot({ isOpen, onClose }: EnhancedChatbotProps) {
  const { t, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('howCanIHelp'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick action buttons
  const quickActions = [
    { text: "How to report a scam?", icon: "📋" },
    { text: "Check suspicious number", icon: "📞" },
    { text: "Cybercrime prevention tips", icon: "🛡️" },
    { text: "Emergency contacts", icon: "🚨" }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputMessage.trim();
    if (!messageContent || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await generateChatResponse(messageContent, currentLanguage);
      
      // Remove typing indicator and add real response
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.id !== 'typing');
        return [...filteredMessages, {
          id: Date.now().toString(),
          content: response,
          sender: 'bot',
          timestamp: new Date()
        }];
      });

      // Optional: Read aloud the response
      if ('speechSynthesis' in window && response) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        // speechSynthesis.speak(utterance); // Uncomment to enable auto-speak
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.id !== 'typing');
        return [...filteredMessages, {
          id: Date.now().toString(),
          content: currentLanguage === 'hi' 
            ? 'क्षमा करें, कुछ त्रुटि हुई है। कृपया पुनः प्रयास करें।'
            : 'Sorry, something went wrong. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      handleSendMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const speakMessage = (content: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="fixed bottom-4 right-4 w-96 h-[500px] z-50 shadow-2xl"
      >
        <Card className="w-full h-full flex flex-col bg-white/95 backdrop-blur-md border-2 border-blue-200">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" />
                {t('chatWithAI')}
                <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                  Online
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area - Hide when minimized */}
          {!isMinimized && (
            <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    } rounded-2xl px-4 py-2 relative`}>
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          {message.isTyping ? (
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                        {message.sender === 'bot' && !message.isTyping && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakMessage(message.content)}
                            className="p-1 h-6 w-6 hover:bg-gray-200"
                          >
                            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          </Button>
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(action.text)}
                        className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        disabled={isLoading}
                      >
                        <span className="mr-1">{action.icon}</span>
                        {action.text}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={t('typeMessage')}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isLoading}
                      className="pr-10"
                    />
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                    className={`${isListening ? 'bg-red-100 text-red-600' : 'hover:bg-blue-50'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>

                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}