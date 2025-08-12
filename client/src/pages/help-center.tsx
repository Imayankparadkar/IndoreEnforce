import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download
} from "lucide-react";

export default function HelpCenter() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: BookOpen,
      articles: 12,
      description: "Learn the basics of using Prahaar 360"
    },
    {
      id: "reporting",
      name: "Filing Reports",
      icon: FileText,
      articles: 8,
      description: "How to report cybercrime incidents"
    },
    {
      id: "account",
      name: "Account & Login",
      icon: Users,
      articles: 6,
      description: "Account management and login issues"
    },
    {
      id: "security",
      name: "Security & Privacy",
      icon: AlertTriangle,
      articles: 10,
      description: "Platform security and data protection"
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      icon: HelpCircle,
      articles: 15,
      description: "Common issues and solutions"
    },
    {
      id: "features",
      name: "Features Guide",
      icon: Video,
      articles: 20,
      description: "How to use platform features"
    }
  ];

  const popularArticles = [
    {
      title: "How to file a cybercrime report",
      category: "Reporting",
      views: 15420,
      helpful: 98,
      lastUpdated: "2 days ago"
    },
    {
      title: "Understanding the investigation process",
      category: "Getting Started",
      views: 12350,
      helpful: 95,
      lastUpdated: "1 week ago"
    },
    {
      title: "What information do I need to provide?",
      category: "Reporting",
      views: 11200,
      helpful: 97,
      lastUpdated: "3 days ago"
    },
    {
      title: "How to track my case status",
      category: "Features Guide",
      views: 9800,
      helpful: 94,
      lastUpdated: "5 days ago"
    },
    {
      title: "Emergency contact numbers",
      category: "Getting Started",
      views: 8750,
      helpful: 99,
      lastUpdated: "1 day ago"
    },
    {
      title: "Platform security features",
      category: "Security & Privacy",
      views: 7600,
      helpful: 96,
      lastUpdated: "1 week ago"
    }
  ];

  const contactOptions = [
    {
      type: "Emergency",
      method: "Phone",
      contact: "1930",
      description: "24/7 Cybercrime Helpline",
      availability: "Always Available",
      icon: Phone,
      color: "red"
    },
    {
      type: "General Support",
      method: "Phone",
      contact: "0731-2530530",
      description: "General inquiries and support",
      availability: "9 AM - 6 PM (Mon-Sat)",
      icon: Phone,
      color: "blue"
    },
    {
      type: "Email Support",
      method: "Email",
      contact: "support@prahaar360.gov.in",
      description: "Non-urgent questions and feedback",
      availability: "Response within 24 hours",
      icon: Mail,
      color: "green"
    },
    {
      type: "Live Chat",
      method: "Chat",
      contact: "Available on platform",
      description: "Real-time assistance",
      availability: "10 AM - 8 PM (Mon-Fri)",
      icon: MessageCircle,
      color: "purple"
    }
  ];

  const quickActions = [
    {
      title: "File a Report",
      description: "Report a cybercrime incident",
      link: "/brahmanet",
      icon: FileText,
      color: "red"
    },
    {
      title: "Track Case",
      description: "Check your case status",
      link: "/dashboard",
      icon: Search,
      color: "blue"
    },
    {
      title: "User Guide",
      description: "Complete platform guide",
      link: "/user-guide",
      icon: BookOpen,
      color: "green"
    },
    {
      title: "Training Videos",
      description: "Learn through videos",
      link: "/training-videos",
      icon: Video,
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help with Prahaar 360 platform features, reporting procedures, and cybersecurity guidance
          </p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, or ask a question..."
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 justify-start hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 text-${action.color}-600`} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-sm text-gray-600">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <Badge variant="secondary">{category.articles} articles</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Help Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{article.helpful}% helpful</span>
                        <span>•</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 border-l-4 border-l-${option.color}-500 bg-${option.color}-50 rounded-lg`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-${option.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${option.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{option.type}</h3>
                        <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                        <div className={`font-bold text-${option.color}-700 mb-1`}>
                          {option.contact}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{option.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Download className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">User Manual</div>
                  <div className="text-sm text-gray-600">Complete PDF guide</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Video className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Video Tutorials</div>
                  <div className="text-sm text-gray-600">Step-by-step videos</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <MessageCircle className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Community Forum</div>
                  <div className="text-sm text-gray-600">Ask the community</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status & Announcements */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-6 h-6" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Platform Status</span>
                <Badge className="bg-green-600">All Systems Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Response Time</span>
                <span className="font-medium text-green-700">&lt; 2 seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Maintenance</span>
                <span className="text-gray-600">January 10, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}