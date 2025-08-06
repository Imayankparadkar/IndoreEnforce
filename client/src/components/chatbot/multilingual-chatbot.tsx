import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, X, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MultilingualChatbot({ isOpen, onClose }: ChatbotProps) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      const greeting = {
        id: Date.now().toString(),
        text: t('chatbot.greeting'),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, t]);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Scam reporting keywords
    if (lowerMessage.includes('report') || lowerMessage.includes('scam') || lowerMessage.includes('fraud') || 
        lowerMessage.includes('रिपोर्ट') || lowerMessage.includes('धोखाधड़ी') || lowerMessage.includes('स्कैम')) {
      return t('chatbot.reportHelp');
    }
    
    // Prevention/tips keywords
    if (lowerMessage.includes('tip') || lowerMessage.includes('prevent') || lowerMessage.includes('safe') ||
        lowerMessage.includes('सुझाव') || lowerMessage.includes('सुरक्षा') || lowerMessage.includes('बचाव')) {
      return t('chatbot.preventionTips') + ':\n\n• Never share OTP or passwords\n• Verify caller identity\n• Don\'t click suspicious links\n• Report immediately if suspicious';
    }
    
    // Emergency keywords
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help') ||
        lowerMessage.includes('आपातकाल') || lowerMessage.includes('मदद') || lowerMessage.includes('तुरंत')) {
      return t('chatbot.emergency');
    }
    
    // UPI/Payment fraud
    if (lowerMessage.includes('upi') || lowerMessage.includes('payment') || lowerMessage.includes('money') ||
        lowerMessage.includes('पैसे') || lowerMessage.includes('भुगतान')) {
      return 'UPI frauds are common. Never share your UPI PIN, and always verify the recipient before sending money. Would you like to report a UPI fraud?';
    }
    
    // Voice call scams
    if (lowerMessage.includes('call') || lowerMessage.includes('voice') || lowerMessage.includes('phone') ||
        lowerMessage.includes('कॉल') || lowerMessage.includes('फोन')) {
      return 'Be cautious of unknown callers asking for personal information. Legitimate organizations won\'t ask for passwords over phone. Would you like to report a suspicious call?';
    }
    
    // Default responses based on current language
    const defaultResponses = i18n.language === 'hi' ? [
      'मैं आपकी साइबर सुरक्षा में मदद करने के लिए यहां हूं। कृपया अधिक विवरण साझा करें।',
      'मुझे और जानकारी दें ताकि मैं बेहतर सहायता कर सकूं।',
      'क्या आप किसी विशिष्ट साइबर अपराध के बारे में पूछना चाहते हैं?'
    ] : [
      'I\'m here to help with cyber safety. Could you provide more details?',
      'Let me know more information so I can assist you better.',
      'Are you looking to report a specific type of cybercrime?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50">
      <Card className="h-full flex flex-col shadow-2xl border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <Bot className="mr-2 h-5 w-5" />
              Cyber Safety Assistant
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={i18n.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-20 h-8 bg-white/20 border-white/30 text-white">
                  <SelectValue>
                    <Globe className="h-4 w-4" />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {!message.isBot && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={i18n.language === 'hi' ? 'अपना संदेश टाइप करें...' : 'Type your message...'}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge 
                variant="secondary" 
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setInputMessage(t('chatbot.reportHelp'))}
              >
                {i18n.language === 'hi' ? 'रिपोर्ट करें' : 'Report Scam'}
              </Badge>
              <Badge 
                variant="secondary" 
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setInputMessage('Safety tips')}
              >
                {i18n.language === 'hi' ? 'सुरक्षा सुझाव' : 'Safety Tips'}
              </Badge>
              <Badge 
                variant="secondary" 
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setInputMessage('Emergency help')}
              >
                {i18n.language === 'hi' ? 'आपातकालीन सहायता' : 'Emergency'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}