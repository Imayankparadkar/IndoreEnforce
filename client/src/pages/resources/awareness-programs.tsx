import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  GraduationCap,
  PlayCircle,
  FileText,
  Target,
  Award,
  Megaphone,
  School,
  Building2,
  Download,
  ExternalLink
} from "lucide-react";

export default function AwarenessPrograms() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("upcoming");

  const programs = {
    upcoming: [
      {
        id: 1,
        title: "Cybersecurity Awareness Week 2025",
        description: "A comprehensive week-long program covering all aspects of cybersecurity for citizens",
        date: "February 15-21, 2025",
        time: "10:00 AM - 4:00 PM",
        venue: "Indore Municipal Corporation Hall",
        target: "General Public",
        capacity: 500,
        registered: 320,
        type: "Workshop",
        level: "Beginner to Advanced",
        features: ["Expert Speakers", "Live Demos", "Q&A Sessions", "Certificate"]
      },
      {
        id: 2,
        title: "Banking Security for Senior Citizens",
        description: "Special workshop focused on digital banking security for elderly citizens",
        date: "January 25, 2025",
        time: "2:00 PM - 5:00 PM",
        venue: "Senior Citizens Center, Vijay Nagar",
        target: "Senior Citizens (60+)",
        capacity: 100,
        registered: 85,
        type: "Interactive Session",
        level: "Beginner",
        features: ["Hindi/English", "Hands-on Practice", "Family Support", "Printed Materials"]
      },
      {
        id: 3,
        title: "School Cybersecurity Program",
        description: "Educational program for students and teachers on safe internet usage",
        date: "February 1-28, 2025",
        time: "School Hours",
        venue: "Various Schools in Indore",
        target: "Students & Teachers",
        capacity: 2000,
        registered: 1200,
        type: "Educational Campaign",
        level: "Age-appropriate",
        features: ["Interactive Games", "Digital Citizenship", "Teacher Training", "Parent Guides"]
      }
    ],
    ongoing: [
      {
        id: 4,
        title: "Community Ambassador Program",
        description: "Training local leaders to spread cybersecurity awareness in their communities",
        date: "Ongoing",
        time: "Flexible",
        venue: "Various Community Centers",
        target: "Community Leaders",
        capacity: 200,
        registered: 150,
        type: "Training Program",
        level: "Intermediate",
        features: ["Certification", "Training Materials", "Monthly Meetings", "Support Network"]
      },
      {
        id: 5,
        title: "Digital Literacy for Women",
        description: "Empowering women with digital security knowledge and skills",
        date: "Every Saturday",
        time: "10:00 AM - 12:00 PM",
        venue: "Women's Development Center",
        target: "Women",
        capacity: 50,
        registered: 45,
        type: "Weekly Workshop",
        level: "Beginner",
        features: ["Women Trainers", "Childcare Available", "Hindi Language", "Practical Sessions"]
      }
    ],
    completed: [
      {
        id: 6,
        title: "Corporate Cybersecurity Summit 2024",
        description: "Enterprise-focused cybersecurity conference for businesses in Indore",
        date: "December 10-11, 2024",
        time: "Full Day",
        venue: "Radisson Hotel, Indore",
        target: "Business Professionals",
        capacity: 300,
        registered: 300,
        type: "Conference",
        level: "Advanced",
        features: ["Industry Experts", "Networking", "Case Studies", "CPE Credits"],
        feedback: 4.8,
        participants: 285
      },
      {
        id: 7,
        title: "Festive Season Fraud Prevention",
        description: "Special campaign during Diwali season to prevent online shopping frauds",
        date: "October 15 - November 15, 2024",
        time: "Various",
        venue: "Multiple Locations",
        target: "Shoppers",
        capacity: 1000,
        registered: 950,
        type: "Awareness Campaign",
        level: "Beginner",
        features: ["Social Media Campaign", "Street Awareness", "Mall Kiosks", "Press Coverage"],
        feedback: 4.6,
        participants: 920
      }
    ]
  };

  const statistics = {
    totalPrograms: 15,
    totalParticipants: 5420,
    averageRating: 4.7,
    communityReach: 25000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cybersecurity Awareness Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Community-focused programs to enhance cybersecurity awareness and digital literacy across Indore
          </p>
        </div>

        {/* Statistics */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statistics.totalPrograms}</div>
                <div className="text-blue-100">Programs Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statistics.totalParticipants.toLocaleString()}</div>
                <div className="text-blue-100">People Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{statistics.averageRating}</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{(statistics.communityReach / 1000).toFixed(0)}K</div>
                <div className="text-blue-100">Community Reach</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Awareness Videos Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-red-600" />
              Awareness Campaign Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "UPI Fraud Prevention - Hindi",
                  description: "Learn how to identify and prevent UPI-related frauds in Hindi",
                  duration: "5:30",
                  views: "15.2K",
                  language: "Hindi"
                },
                {
                  title: "Senior Citizens Digital Safety",
                  description: "Digital safety tips specially designed for elderly citizens",
                  duration: "8:45",
                  views: "23.1K",
                  language: "Hindi/English"
                },
                {
                  title: "Students Internet Safety",
                  description: "Safe internet practices for school and college students",
                  duration: "6:20",
                  views: "31.5K",
                  language: "English"
                },
                {
                  title: "WhatsApp Scam Prevention",
                  description: "How to identify and avoid WhatsApp-based scams",
                  duration: "4:15",
                  views: "28.7K",
                  language: "Hindi"
                },
                {
                  title: "Online Shopping Safety",
                  description: "Tips for safe online shopping and avoiding fake websites",
                  duration: "7:30",
                  views: "19.8K",
                  language: "English"
                },
                {
                  title: "Banking Security Awareness",
                  description: "Comprehensive guide to secure online banking practices",
                  duration: "10:45",
                  views: "35.2K",
                  language: "Hindi/English"
                }
              ].map((video, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{video.views} views</span>
                      <Button size="sm" variant="outline">
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All Videos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Program Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Community Programs</CardTitle>
              <div className="flex gap-2">
                {Object.keys(programs).map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(tab)}
                    className="capitalize"
                  >
                    {tab} ({programs[tab as keyof typeof programs].length})
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {programs[activeTab as keyof typeof programs].map((program) => (
                <Card key={program.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Program Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                            <Badge 
                              variant={program.type === "Workshop" ? "default" : 
                                      program.type === "Conference" ? "secondary" : "outline"}
                            >
                              {program.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{program.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span>{program.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{program.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span>{program.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-600" />
                            <span>{program.target}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {program.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Registration/Stats */}
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {program.registered}/{program.capacity}
                            </div>
                            <div className="text-sm text-gray-600">Registered/Capacity</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(program.registered / program.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-center text-sm text-gray-600 mb-3">
                          Level: <span className="font-medium">{program.level}</span>
                        </div>

                        {activeTab === "completed" && 'feedback' in program ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{program.feedback}/5.0</span>
                            </div>
                            <div className="text-center text-sm text-gray-600">
                              {program.participants} participants
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                              <FileText className="w-4 h-4 mr-2" />
                              View Report
                            </Button>
                          </div>
                        ) : (
                          <Button className="w-full">
                            <Users className="w-4 h-4 mr-2" />
                            Register Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Audiences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Our Target Audiences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Students",
                  icon: School,
                  description: "Age-appropriate cybersecurity education for school and college students",
                  programs: 8,
                  participants: 2500
                },
                {
                  name: "Senior Citizens",
                  icon: Users,
                  description: "Simplified digital security guidance for elderly citizens",
                  programs: 5,
                  participants: 800
                },
                {
                  name: "Businesses",
                  icon: Building2,
                  description: "Enterprise cybersecurity training and awareness programs",
                  programs: 4,
                  participants: 1200
                },
                {
                  name: "General Public",
                  icon: Megaphone,
                  description: "Community-wide awareness campaigns and workshops",
                  programs: 12,
                  participants: 3500
                }
              ].map((audience, index) => {
                const IconComponent = audience.icon;
                return (
                  <div key={index} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{audience.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{audience.description}</p>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{audience.programs} Programs</div>
                      <div className="text-sm text-gray-500">{audience.participants.toLocaleString()} Participants</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-6 h-6 text-green-600" />
              Program Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <FileText className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Training Materials</div>
                  <div className="text-sm text-gray-600">Presentation slides and handouts</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <GraduationCap className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Trainer Guide</div>
                  <div className="text-sm text-gray-600">Become a certified trainer</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Award className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Certificates</div>
                  <div className="text-sm text-gray-600">Download your certificates</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}