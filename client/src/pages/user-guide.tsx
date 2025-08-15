import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  BookOpen, 
  ChevronRight, 
  ChevronDown,
  Shield,
  Map,
  Brain,
  Network,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Search,
  Download,
  Play,
  Clock,
  Star
} from "lucide-react";
import { Link } from "wouter";

export default function UserGuide() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const guideProgress = 65; // User's progress through the guide

  const guideStructure = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      duration: "10 min",
      difficulty: "Beginner",
      completed: true,
      subsections: [
        { id: "account-setup", title: "Account Setup", completed: true },
        { id: "first-login", title: "First Time Login", completed: true },
        { id: "dashboard-overview", title: "Dashboard Overview", completed: false }
      ]
    },
    {
      id: "reporting-crimes",
      title: "Reporting Cybercrimes",
      icon: FileText,
      duration: "15 min",
      difficulty: "Beginner",
      completed: true,
      subsections: [
        { id: "file-report", title: "Filing a New Report", completed: true },
        { id: "evidence-upload", title: "Uploading Evidence", completed: true },
        { id: "track-status", title: "Tracking Report Status", completed: false }
      ]
    },
    {
      id: "vajra-system",
      title: "Using VAJRA Threat Map",
      icon: Map,
      duration: "12 min",
      difficulty: "Intermediate",
      completed: false,
      subsections: [
        { id: "threat-visualization", title: "Understanding Threat Visualization", completed: false },
        { id: "heat-zones", title: "Interpreting Heat Zones", completed: false },
        { id: "real-time-alerts", title: "Setting Up Real-time Alerts", completed: false }
      ]
    },
    {
      id: "kautilya-ai",
      title: "KAUTILYA AI Assistant",
      icon: Brain,
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false,
      subsections: [
        { id: "ai-chat", title: "Chatting with AI Assistant", completed: false },
        { id: "case-analysis", title: "Getting Case Analysis", completed: false },
        { id: "prevention-tips", title: "Personalized Prevention Tips", completed: false }
      ]
    },
    {
      id: "mayajaal-intel",
      title: "MAYAJAAL Web Intelligence",
      icon: Network,
      duration: "18 min",
      difficulty: "Advanced",
      completed: false,
      subsections: [
        { id: "web-monitoring", title: "Web Monitoring Tools", completed: false },
        { id: "digital-footprint", title: "Digital Footprint Analysis", completed: false },
        { id: "intelligence-reports", title: "Understanding Intelligence Reports", completed: false }
      ]
    },
    {
      id: "officer-portal",
      title: "Officer Portal Features",
      icon: Shield,
      duration: "25 min",
      difficulty: "Advanced",
      completed: false,
      subsections: [
        { id: "case-management", title: "Case Management System", completed: false },
        { id: "investigation-workflow", title: "Investigation Workflow", completed: false },
        { id: "collaboration-tools", title: "Collaboration Tools", completed: false }
      ]
    }
  ];

  const quickStart = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up with your email or phone number",
      link: "/register",
      icon: Users,
      completed: true
    },
    {
      step: 2,
      title: "Complete Profile Setup",
      description: "Add your basic information and preferences",
      link: "/profile",
      icon: FileText,
      completed: true
    },
    {
      step: 3,
      title: "Explore the Dashboard",
      description: "Get familiar with the main interface",
      link: "/dashboard",
      icon: Map,
      completed: false
    },
    {
      step: 4,
      title: "File Your First Report",
      description: "Learn how to report a cybercrime incident",
      link: "/brahmanet",
      icon: AlertTriangle,
      completed: false
    }
  ];

  const popularTopics = [
    { title: "How to file a UPI fraud report", views: 2847, category: "Reporting" },
    { title: "Understanding VAJRA threat levels", views: 1923, category: "VAJRA" },
    { title: "Using KAUTILYA for case insights", views: 1654, category: "AI Assistant" },
    { title: "Tracking your report status", views: 1432, category: "Reporting" },
    { title: "Setting up security alerts", views: 1287, category: "Security" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to use all features of Prahaar 360 platform effectively
          </p>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Learning Progress</h3>
              <Badge variant="secondary">{guideProgress}% Complete</Badge>
            </div>
            <Progress value={guideProgress} className="mb-2" />
            <p className="text-sm text-gray-600">
              You've completed 4 of 6 major sections. Keep going!
            </p>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search the guide..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickStart.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.step} href={item.link}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{item.step}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-600">{item.description}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularTopics.map((topic, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium text-sm mb-1">{topic.title}</div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{topic.category}</span>
                        <span>{topic.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
                {guideStructure.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <TabsTrigger 
                      key={section.id} 
                      value={section.id}
                      className="text-xs flex items-center gap-1"
                    >
                      <IconComponent className="w-3 h-3" />
                      <span className="hidden sm:inline">{section.title.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {guideStructure.map((section) => {
                const IconComponent = section.icon;
                return (
                  <TabsContent key={section.id} value={section.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            section.completed ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              section.completed ? 'text-green-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h2 className="text-xl">{section.title}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {section.duration}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {section.difficulty}
                              </Badge>
                              {section.completed && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {section.subsections.map((subsection) => (
                            <div 
                              key={subsection.id}
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    subsection.completed ? 'bg-green-100' : 'bg-gray-100'
                                  }`}>
                                    {subsection.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                    )}
                                  </div>
                                  <span className="font-medium">{subsection.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Play className="w-4 h-4 mr-1" />
                                    Start
                                  </Button>
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                          <Button className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            Start Section
                          </Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}