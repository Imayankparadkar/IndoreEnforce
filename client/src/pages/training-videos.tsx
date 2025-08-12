import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star,
  Download,
  BookmarkPlus,
  Share2,
  ExternalLink
} from "lucide-react";

export default function TrainingVideos() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Videos", count: 24 },
    { id: "basics", name: "Cybersecurity Basics", count: 8 },
    { id: "scams", name: "Scam Prevention", count: 6 },
    { id: "platform", name: "Platform Usage", count: 5 },
    { id: "investigation", name: "Investigation Techniques", count: 3 },
    { id: "awareness", name: "Public Awareness", count: 2 }
  ];

  const videos = [
    {
      id: 1,
      title: "Introduction to Cybersecurity - Stay Safe Online",
      description: "Learn the fundamentals of cybersecurity and how to protect yourself from common online threats.",
      duration: "12:45",
      views: "15.2K",
      category: "basics",
      level: "Beginner",
      rating: 4.8,
      instructor: "Dr. Rajesh Kumar",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["basics", "online safety", "beginner"]
    },
    {
      id: 2,
      title: "Recognizing and Avoiding UPI Scams",
      description: "Comprehensive guide to identifying UPI fraud attempts and protecting your financial information.",
      duration: "18:30",
      views: "23.7K",
      category: "scams",
      level: "Intermediate",
      rating: 4.9,
      instructor: "Inspector Priya Sharma",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["UPI", "financial fraud", "prevention"]
    },
    {
      id: 3,
      title: "How to File a Cybercrime Report on Prahaar 360",
      description: "Step-by-step tutorial on using the BrahmaNet portal to report cybercrime incidents effectively.",
      duration: "8:15",
      views: "9.8K",
      category: "platform",
      level: "Beginner",
      rating: 4.7,
      instructor: "Tech Support Team",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["platform", "reporting", "tutorial"]
    },
    {
      id: 4,
      title: "WhatsApp and Social Media Safety",
      description: "Essential tips for staying safe on social media platforms and messaging apps.",
      duration: "15:20",
      views: "31.5K",
      category: "basics",
      level: "Beginner",
      rating: 4.6,
      instructor: "Cyber Safety Expert",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["social media", "WhatsApp", "privacy"]
    },
    {
      id: 5,
      title: "Digital Investigation Techniques for Officers",
      description: "Advanced methods for conducting digital forensics and cybercrime investigations.",
      duration: "45:12",
      views: "5.3K",
      category: "investigation",
      level: "Advanced",
      rating: 4.9,
      instructor: "SP Cybercrime Division",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["investigation", "forensics", "officers"]
    },
    {
      id: 6,
      title: "Community Awareness: Protecting Your Neighborhood",
      description: "How to create awareness and protect your community from cybercrime threats.",
      duration: "22:40",
      views: "12.1K",
      category: "awareness",
      level: "Intermediate",
      rating: 4.8,
      instructor: "Community Outreach Team",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["community", "awareness", "prevention"]
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Training Videos & Tutorials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive video library covering cybersecurity awareness, platform usage, and investigation techniques
          </p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos, topics, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Video */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-4">Featured</Badge>
                <h2 className="text-3xl font-bold mb-4">Cybersecurity Awareness Week 2024</h2>
                <p className="text-blue-100 mb-6">
                  Join our comprehensive cybersecurity awareness program with expert speakers, 
                  real case studies, and interactive sessions to protect yourself and your community.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Live Session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>Expert Level</span>
                  </div>
                </div>
                <Button size="lg" variant="secondary">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Now
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant={
                      video.level === 'Beginner' ? 'default' : 
                      video.level === 'Intermediate' ? 'secondary' : 
                      'destructive'
                    }>
                      {video.level}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>By {video.instructor}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{video.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{video.views} views</span>
                  <div className="flex gap-1">
                    {video.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline">
                    <BookmarkPlus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-6 h-6 text-blue-600" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Download className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Training Materials</div>
                  <div className="text-sm text-gray-600">PDFs, slides, and handouts</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Users className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Live Workshops</div>
                  <div className="text-sm text-gray-600">Interactive training sessions</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <ExternalLink className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">External Resources</div>
                  <div className="text-sm text-gray-600">Government and partner content</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}