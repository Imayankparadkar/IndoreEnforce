import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, User, Search, Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LoginModal } from "../auth/LoginModal";

export default function Header() {
  const { currentUser, logout, userRole } = useAuth();
  const { t } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
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
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-2 rounded-lg font-bold text-xl flex items-center gap-2">
                <Shield className="w-6 h-6" />
                प्रहार 360
              </div>
              <div className="hidden md:block text-sm text-gray-600">
                {t('cyberCrimeHub')}
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-center max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`${t('search')} threats, cases, reports...`}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Right Side Actions */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[1.2rem] h-5">
                  12
                </Badge>
              </Button>
              
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