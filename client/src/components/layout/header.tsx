import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, Search, Shield, Menu, UserCheck, MapPin, AlertTriangle, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LoginModal } from "../auth/LoginModal";
import { GoogleTranslate } from "./GoogleTranslate";
import { NotificationSystem } from "../notifications/notification-system";
import { Link } from "wouter";
import logoImage from "@assets/IMC_LOGO-removebg-preview_1755234932251.png";

export default function Header() {
  const { currentUser, logout, userRole } = useAuth();
  const { t } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Mock data for search results - in real app, this would come from API
  const mockSearchData = [
    { id: 1, title: "UPI Scam Report - Vijay Nagar", type: "report", category: "Financial Fraud", link: "/cases/1" },
    { id: 2, title: "Voice Call Scam - Palasia", type: "report", category: "Voice Scam", link: "/cases/2" },
    { id: 3, title: "VAJRA Threat Map", type: "feature", category: "Tools", link: "/vajra" },
    { id: 4, title: "KAUTILYA AI Assistant", type: "feature", category: "Tools", link: "/kautilya" },
    { id: 5, title: "Help Center", type: "page", category: "Support", link: "/help-center" },
    { id: 6, title: "Training Videos", type: "page", category: "Resources", link: "/training-videos" },
    { id: 7, title: "Cyber Crime Prevention Tips", type: "resource", category: "Education", link: "/cybercrime-prevention" },
  ];

  // Search functionality
  useEffect(() => {
    if (searchTerm.length > 2) {
      const filtered = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Show max 5 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSearchIcon = (type: string) => {
    switch (type) {
      case 'report': return <FileText className="w-4 h-4" />;
      case 'feature': return <Shield className="w-4 h-4" />;
      case 'page': return <Users className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* IMC Logo */}
              <img 
                src={logoImage} 
                alt="IMC Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-2 rounded-lg font-bold text-xl flex items-center gap-2">
                <Shield className="w-6 h-6" />
                प्रहार 360
              </div>
            </motion.div>
            
            {/* Desktop Navigation & Search */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-center max-w-lg">
              <div className="relative w-full" ref={searchRef}>
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`${t('search')} threats, cases, reports...`}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.length > 2 && setShowSearchResults(true)}
                />
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50 max-h-80 overflow-y-auto"
                    >
                      {searchResults.map((result) => (
                        <Link key={result.id} href={result.link}>
                          <div 
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setShowSearchResults(false);
                              setSearchTerm("");
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                {getSearchIcon(result.type)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{result.title}</div>
                                <div className="text-sm text-gray-600">{result.category}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Right Side Actions */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Google Translate */}
              <GoogleTranslate />
              
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Officer Portal */}
              <Link href="/officer">
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                  <UserCheck className="h-4 w-4" />
                  {t('officerPortal')}
                </Button>
              </Link>
              
              {/* Real-time Notifications */}
              <NotificationSystem />
              
              {/* User Menu */}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
                      <User className="h-5 w-5" />
                      <span className="hidden md:inline text-sm">
                        {currentUser.email?.split('@')[0]}
                      </span>
                      {userRole && (
                        <Badge variant="outline" className="text-xs">
                          {userRole}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      {t('logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => setIsLoginModalOpen(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {t('login')}
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Search - Only visible when mobile menu is open */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t"
            >
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`${t('search')} threats, cases, reports...`}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}