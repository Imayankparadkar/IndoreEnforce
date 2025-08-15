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

  // Search data for all pages and features
  const searchData = [
    // Core Features
    { id: 1, title: "VAJRA Threat Map", type: "feature", category: "Security Tools", link: "/vajra", description: "Real-time threat mapping and police notifications" },
    { id: 2, title: "KAUTILYA AI Assistant", type: "feature", category: "AI Tools", link: "/kautilya", description: "AI-powered investigation assistance" },
    { id: 3, title: "MAYAJAAL Web Intelligence", type: "feature", category: "Intelligence", link: "/mayajaal", description: "Web intelligence and digital footprint analysis" },
    { id: 4, title: "BRAHMANET Network Analysis", type: "feature", category: "Network Tools", link: "/brahmanet", description: "Citizen engagement and reporting portal" },
    
    // Main Pages
    { id: 5, title: "Dashboard", type: "page", category: "Main", link: "/", description: "Central control and analytics dashboard" },
    { id: 6, title: "Officer Portal", type: "page", category: "Officer Tools", link: "/officer", description: "Law enforcement officer interface" },
    
    // Support & Help Pages
    { id: 7, title: "Help Center", type: "page", category: "Support", link: "/help-center", description: "Comprehensive help and support documentation" },
    { id: 8, title: "User Guide", type: "page", category: "Support", link: "/user-guide", description: "Step-by-step user guide and tutorials" },
    { id: 9, title: "Training Videos", type: "page", category: "Training", link: "/training-videos", description: "Video tutorials and training materials" },
    { id: 10, title: "Report Bug", type: "page", category: "Support", link: "/report-bug", description: "Report technical issues and bugs" },
    { id: 11, title: "FAQ", type: "page", category: "Support", link: "/faq", description: "Frequently asked questions" },
    
    // Legal & Policy Pages
    { id: 12, title: "Privacy Policy", type: "page", category: "Legal", link: "/privacy-policy", description: "Privacy policy and data handling practices" },
    { id: 13, title: "Terms of Service", type: "page", category: "Legal", link: "/terms-of-service", description: "Terms of service and usage conditions" },
    { id: 14, title: "Data Protection", type: "page", category: "Legal", link: "/data-protection", description: "Data protection guidelines and compliance" },
    
    // Educational Resources
    { id: 15, title: "Cybercrime Prevention", type: "resource", category: "Education", link: "/cybercrime-prevention", description: "Cybercrime prevention tips and best practices" },
    { id: 16, title: "Security Tips", type: "resource", category: "Education", link: "/security-tips", description: "Digital security tips and guidelines" },
    { id: 17, title: "Awareness Programs", type: "resource", category: "Education", link: "/awareness-programs", description: "Cybercrime awareness programs and initiatives" },
    { id: 18, title: "Incident Response", type: "resource", category: "Emergency", link: "/incident-response", description: "Emergency incident response procedures" },
    { id: 19, title: "Downloads", type: "resource", category: "Resources", link: "/downloads", description: "Downloadable resources and documents" },
  ];

  // Search functionality
  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 8)); // Show max 8 results
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
      case 'feature': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'page': return <FileText className="w-4 h-4 text-green-600" />;
      case 'resource': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return <Search className="w-4 h-4 text-gray-600" />;
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
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                            onClick={() => {
                              setShowSearchResults(false);
                              setSearchTerm("");
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                {getSearchIcon(result.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 truncate">{result.title}</div>
                                <div className="text-sm text-gray-600 mb-1">{result.category}</div>
                                <div className="text-xs text-gray-500 line-clamp-2">{result.description}</div>
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