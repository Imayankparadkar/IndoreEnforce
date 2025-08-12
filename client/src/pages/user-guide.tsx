import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  BookOpen, 
  Shield, 
  Search, 
  Eye, 
  Users, 
  ChevronRight,
  Play,
  Download,
  ExternalLink,
  CheckCircle
} from "lucide-react";

export default function UserGuide() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      items: [
        "Platform Overview",
        "Account Registration",
        "First Login",
        "Dashboard Navigation"
      ]
    },
    {
      id: "brahmanet",
      title: "BrahmaNet - Citizen Portal",
      icon: Users,
      items: [
        "Filing a Cybercrime Report",
        "Uploading Evidence",
        "Tracking Report Status",
        "Communication with Officers"
      ]
    },
    {
      id: "vajra",
      title: "Vajra - Threat Mapping",
      icon: Eye,
      items: [
        "Understanding Threat Maps",
        "Real-time Alerts",
        "Location-based Filtering",
        "Threat Level Indicators"
      ]
    },
    {
      id: "kautilya",
      title: "Kautilya - Investigation Tools",
      icon: Search,
      items: [
        "AI-Powered Analysis",
        "Case Investigation",
        "Evidence Management",
        "Report Generation"
      ]
    },
    {
      id: "security",
      title: "Security Best Practices",
      icon: Shield,
      items: [
        "Account Security",
        "Data Protection",
        "Safe Reporting",
        "Privacy Guidelines"
      ]
    }
  ];

  const tutorials = [
    {
      title: "How to File Your First Cybercrime Report",
      duration: "5 min",
      level: "Beginner",
      thumbnail: "/api/placeholder/300/200",
      description: "Step-by-step guide to reporting cybercrime using BrahmaNet"
    },
    {
      title: "Understanding Threat Maps in Vajra",
      duration: "3 min",
      level: "Beginner",
      thumbnail: "/api/placeholder/300/200",
      description: "Learn to read and interpret real-time threat visualizations"
    },
    {
      title: "Advanced Investigation Techniques",
      duration: "8 min",
      level: "Advanced",
      thumbnail: "/api/placeholder/300/200",
      description: "Using Kautilya's AI tools for comprehensive case analysis"
    },
    {
      title: "Cybersecurity Best Practices",
      duration: "6 min",
      level: "Intermediate",
      thumbnail: "/api/placeholder/300/200",
      description: "Essential security measures for citizens and officers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Guide & Tutorials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guides and video tutorials to help you master the Prahaar 360 platform
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="secondary" className="h-auto p-4 justify-start">
                <Download className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Download PDF Guide</div>
                  <div className="text-sm opacity-80">Complete user manual</div>
                </div>
              </Button>
              <Button variant="secondary" className="h-auto p-4 justify-start">
                <Play className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Video Tutorials</div>
                  <div className="text-sm opacity-80">Interactive learning</div>
                </div>
              </Button>
              <Button variant="secondary" className="h-auto p-4 justify-start">
                <ExternalLink className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Live Training</div>
                  <div className="text-sm opacity-80">Join webinars</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Guide Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                          activeSection === section.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-5 h-5 ${
                            activeSection === section.id ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                          <span className={`font-medium ${
                            activeSection === section.id ? 'text-blue-900' : 'text-gray-700'
                          }`}>
                            {section.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const section = sections.find(s => s.id === activeSection);
                    const IconComponent = section?.icon || BookOpen;
                    return <IconComponent className="w-6 h-6 text-blue-600" />;
                  })()}
                  {sections.find(s => s.id === activeSection)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sections.find(s => s.id === activeSection)?.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">{item}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-6 h-6 text-purple-600" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white bg-black/50 rounded-full p-3 cursor-pointer hover:bg-black/70 transition-colors" />
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant={tutorial.level === 'Beginner' ? 'default' : tutorial.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                            {tutorial.level}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="outline" className="bg-black/70 text-white border-white/20">
                            {tutorial.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                        <p className="text-gray-600 text-sm">{tutorial.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step-by-Step Guide Example */}
            {activeSection === "getting-started" && (
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Welcome to Prahaar 360</h3>
                      <p className="text-gray-600 mb-4">
                        Prahaar 360 is a comprehensive cybercrime reporting and prevention platform designed 
                        specifically for Indore, Madhya Pradesh. The platform consists of four main modules:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-blue-600 mb-2">🛡️ Vajra</h4>
                          <p className="text-sm text-gray-600">Real-time threat mapping and visualization</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-green-600 mb-2">🔍 Kautilya</h4>
                          <p className="text-sm text-gray-600">AI-powered investigation assistance</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-purple-600 mb-2">🕸️ MayaJaal</h4>
                          <p className="text-sm text-gray-600">Web intelligence and digital footprint analysis</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-orange-600 mb-2">👥 BrahmaNet</h4>
                          <p className="text-sm text-gray-600">Citizen engagement and reporting portal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}