import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  PlayCircle, 
  Search, 
  Clock, 
  Eye, 
  Star, 
  Filter,
  Download,
  Share2,
  BookOpen,
  Users,
  Shield,
  Smartphone,
  Globe,
  CreditCard,
  MessageCircle,
  Phone
} from "lucide-react";

export default function TrainingVideos() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: BookOpen },
    { id: "prevention", name: "Cybercrime Prevention", icon: Shield },
    { id: "reporting", name: "How to Report", icon: MessageCircle },
    { id: "mobile-security", name: "Mobile Security", icon: Smartphone },
    { id: "online-banking", name: "Online Banking", icon: CreditCard },
    { id: "social-media", name: "Social Media Safety", icon: Users },
    { id: "phishing", name: "Phishing Awareness", icon: Globe },
    { id: "call-scams", name: "Call Scam Prevention", icon: Phone }
  ];

  const videos = [
    {
      id: 1,
      title: "Complete Guide to UPI Safety",
      description: "Learn how to use UPI payments safely and avoid common fraud tactics",
      duration: "12:45",
      views: "45.2K",
      rating: 4.8,
      category: "online-banking",
      language: "Hindi",
      level: "Beginner",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["UPI Security", "Digital Payments", "Fraud Prevention"]
    },
    {
      id: 2,
      title: "Identifying Phone Call Scams",
      description: "How to recognize and handle fraudulent phone calls claiming to be from banks or officials",
      duration: "8:30",
      views: "32.8K",
      rating: 4.9,
      category: "call-scams",
      language: "English",
      level: "Beginner",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Phone Scams", "Social Engineering", "Voice Fraud"]
    },
    {
      id: 3,
      title: "Mobile App Security Best Practices",
      description: "Essential security tips for downloading and using mobile applications safely",
      duration: "15:20",
      views: "28.1K",
      rating: 4.7,
      category: "mobile-security",
      language: "Hindi",
      level: "Intermediate",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Mobile Security", "App Permissions", "Malware Prevention"]
    },
    {
      id: 4,
      title: "Email Phishing: Recognition and Prevention",
      description: "Learn to identify phishing emails and protect your personal information",
      duration: "10:15",
      views: "38.5K",
      rating: 4.8,
      category: "phishing",
      language: "English",
      level: "Beginner",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Phishing", "Email Security", "Identity Theft"]
    },
    {
      id: 5,
      title: "Social Media Privacy Settings",
      description: "Step-by-step guide to secure your social media accounts and protect personal data",
      duration: "14:30",
      views: "25.7K",
      rating: 4.6,
      category: "social-media",
      language: "Hindi",
      level: "Intermediate",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Social Media", "Privacy Settings", "Data Protection"]
    },
    {
      id: 6,
      title: "How to File a Cybercrime Report",
      description: "Complete walkthrough of the Prahaar 360 reporting process",
      duration: "9:45",
      views: "52.3K",
      rating: 4.9,
      category: "reporting",
      language: "Hindi",
      level: "Beginner",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Reporting Process", "Evidence Collection", "Platform Usage"]
    },
    {
      id: 7,
      title: "Online Shopping Security",
      description: "Safe practices for online shopping and avoiding fake websites",
      duration: "11:20",
      views: "31.4K",
      rating: 4.7,
      category: "prevention",
      language: "English",
      level: "Beginner",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["E-commerce Security", "Website Verification", "Safe Shopping"]
    },
    {
      id: 8,
      title: "Password Security Masterclass",
      description: "Creating strong passwords and using password managers effectively",
      duration: "16:55",
      views: "41.2K",
      rating: 4.8,
      category: "prevention",
      language: "Hindi",
      level: "Intermediate",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Password Security", "Two-Factor Authentication", "Account Protection"]
    },
    {
      id: 9,
      title: "Senior Citizens Digital Safety",
      description: "Cybersecurity guidance specifically designed for elderly users",
      duration: "13:40",
      views: "29.8K",
      rating: 4.9,
      category: "prevention",
      language: "Hindi",
      level: "Beginner",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      topics: ["Senior Citizens", "Digital Literacy", "Basic Security"]
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || video.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const stats = {
    totalVideos: videos.length,
    totalViews: videos.reduce((sum, video) => sum + parseFloat(video.views.replace('K', '')) * 1000, 0),
    averageRating: videos.reduce((sum, video) => sum + video.rating, 0) / videos.length,
    languages: [...new Set(videos.map(v => v.language))].length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Training Videos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive video library for cybersecurity education and platform training
          </p>
        </div>

        {/* Statistics */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{stats.totalVideos}</div>
                <div className="text-purple-100">Training Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{Math.round(stats.totalViews / 1000)}K+</div>
                <div className="text-purple-100">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{stats.averageRating.toFixed(1)}</div>
                <div className="text-purple-100">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{stats.languages}</div>
                <div className="text-purple-100">Languages</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search videos, topics, or descriptions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="all">All Languages</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white border-white/20">
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-white/90 text-gray-800">
                      {video.language}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {video.topics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{video.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {video.level}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Playlists */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Featured Training Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Beginner's Cybersecurity Course</h3>
                <p className="text-gray-600 text-sm mb-3">8 videos • 1.5 hours total</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Hindi/English</Badge>
                  <Button size="sm" variant="outline">View Playlist</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">How to Use Prahaar 360</h3>
                <p className="text-gray-600 text-sm mb-3">5 videos • 45 minutes total</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Hindi</Badge>
                  <Button size="sm" variant="outline">View Playlist</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">For Senior Citizens</h3>
                <p className="text-gray-600 text-sm mb-3">6 videos • 1 hour total</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Hindi</Badge>
                  <Button size="sm" variant="outline">View Playlist</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Paths */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Learning Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                <h3 className="font-semibold text-blue-800 mb-2">For New Users</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Start with basic cybersecurity awareness and platform orientation
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Platform Introduction</Badge>
                  <Badge variant="outline">Basic Security</Badge>
                  <Badge variant="outline">Filing Reports</Badge>
                </div>
              </div>
              
              <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                <h3 className="font-semibold text-green-800 mb-2">For Business Users</h3>
                <p className="text-green-700 text-sm mb-3">
                  Advanced security practices for business and enterprise users
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Enterprise Security</Badge>
                  <Badge variant="outline">Data Protection</Badge>
                  <Badge variant="outline">Incident Response</Badge>
                </div>
              </div>
              
              <div className="p-4 border-l-4 border-l-purple-500 bg-purple-50">
                <h3 className="font-semibold text-purple-800 mb-2">For Educators</h3>
                <p className="text-purple-700 text-sm mb-3">
                  Training materials for teaching cybersecurity awareness
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Student Safety</Badge>
                  <Badge variant="outline">Digital Citizenship</Badge>
                  <Badge variant="outline">Classroom Security</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">Additional Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Download className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Video Transcripts</div>
                  <div className="text-sm text-gray-600">Download text versions</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <BookOpen className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Study Guides</div>
                  <div className="text-sm text-gray-600">Supplementary materials</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Users className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Discussion Forum</div>
                  <div className="text-sm text-gray-600">Ask questions & discuss</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}