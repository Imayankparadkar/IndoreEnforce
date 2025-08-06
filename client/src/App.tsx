import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import AlertTicker from "@/components/layout/alert-ticker";
import MultilingualChatbot from "@/components/chatbot/multilingual-chatbot";
import Dashboard from "@/pages/dashboard";
import Vajra from "@/pages/vajra";
import Kautilya from "@/pages/kautilya";
import MayaJaal from "@/pages/mayajaal";
import BrahmaNet from "@/pages/brahmanet";
import Officer from "@/pages/officer";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/vajra" component={Vajra} />
      <Route path="/kautilya" component={Kautilya} />
      <Route path="/mayajaal" component={MayaJaal} />
      <Route path="/brahmanet" component={BrahmaNet} />
      <Route path="/officer" component={Officer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 security-pattern">
          <Header />
          <Navigation />
          <AlertTicker />
          <main className="container mx-auto px-4 py-8">
            <Router />
          </main>
          
          {/* Floating Chatbot Button */}
          {!isChatbotOpen && (
            <Button
              onClick={() => setIsChatbotOpen(true)}
              className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          )}
          
          {/* Multilingual Chatbot */}
          <MultilingualChatbot 
            isOpen={isChatbotOpen} 
            onClose={() => setIsChatbotOpen(false)} 
          />
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
