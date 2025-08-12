import { Suspense, useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import AlertTicker from "@/components/layout/alert-ticker";
import { Footer } from "@/components/layout/Footer";
import { EnhancedChatbot } from "@/components/chatbot/enhanced-chatbot";
import Dashboard from "@/pages/dashboard";
import Vajra from "@/pages/vajra";
import Kautilya from "@/pages/kautilya";
import MayaJaal from "@/pages/mayajaal";
import BrahmaNet from "@/pages/brahmanet";
import Officer from "@/pages/officer";
import Support from "@/pages/support";
import UserGuide from "@/pages/user-guide";
import TrainingVideos from "@/pages/training-videos";
import FAQ from "@/pages/faq";
import PrivacyPolicy from "@/pages/legal/privacy-policy";
import TermsOfService from "@/pages/legal/terms-of-service";
import CybercrimePreventionPage from "@/pages/resources/cybercrime-prevention";
import SecurityTips from "@/pages/resources/security-tips";
import AwarenessPrograms from "@/pages/resources/awareness-programs";
import HelpCenter from "@/pages/help-center";
import ReportBug from "@/pages/report-bug";
import DataProtection from "@/pages/legal/data-protection";
import NotFound from "@/pages/not-found";
import { MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import './lib/i18n';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/vajra" component={Vajra} />
      <Route path="/kautilya" component={Kautilya} />
      <Route path="/mayajaal" component={MayaJaal} />
      <Route path="/brahmanet" component={BrahmaNet} />
      <Route path="/officer" component={Officer} />
      <Route path="/support" component={Support} />
      <Route path="/user-guide" component={UserGuide} />
      <Route path="/training-videos" component={TrainingVideos} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cybercrime-prevention" component={CybercrimePreventionPage} />
      <Route path="/security-tips" component={SecurityTips} />
      <Route path="/awareness-programs" component={AwarenessPrograms} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/report-bug" component={ReportBug} />
      <Route path="/data-protection" component={DataProtection} />
      <Route component={NotFound} />
    </Switch>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading Prahaar 360...</p>
      </div>
    </div>
  );
}

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <Header />
                <Navigation />
                <AlertTicker />
                <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
                  <Router />
                </main>
                <Footer />
                
                {/* Floating Chatbot Button */}
                {!isChatbotOpen && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 1 
                    }}
                  >
                    <Button
                      onClick={() => setIsChatbotOpen(true)}
                      className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-xl z-40 border-4 border-white hover:scale-110 transition-all duration-300"
                    >
                      <MessageCircle className="h-7 w-7 text-white" />
                    </Button>
                  </motion.div>
                )}
                
                {/* Enhanced Chatbot */}
                <EnhancedChatbot 
                  isOpen={isChatbotOpen} 
                  onClose={() => setIsChatbotOpen(false)} 
                />
                
                <Toaster />
              </div>
            </Suspense>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
