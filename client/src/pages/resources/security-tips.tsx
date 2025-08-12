import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  Shield, 
  Lock, 
  Eye, 
  Smartphone, 
  Wifi, 
  Mail,
  CreditCard,
  Download,
  CheckCircle,
  AlertTriangle,
  Star,
  Lightbulb,
  PlayCircle
} from "lucide-react";

export default function SecurityTips() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("essential");

  const categories = [
    { id: "essential", name: "Essential Tips", icon: Star, count: 12 },
    { id: "passwords", name: "Password Security", icon: Lock, count: 8 },
    { id: "mobile", name: "Mobile Security", icon: Smartphone, count: 10 },
    { id: "wifi", name: "WiFi & Network", icon: Wifi, count: 6 },
    { id: "email", name: "Email Security", icon: Mail, count: 7 },
    { id: "banking", name: "Online Banking", icon: CreditCard, count: 9 }
  ];

  const securityTips = {
    essential: [
      {
        title: "Keep Software Updated",
        description: "Always use the latest versions of operating systems, apps, and browsers",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Enable automatic updates for your operating system",
          "Update mobile apps regularly from official stores",
          "Use latest versions of browsers like Chrome, Firefox",
          "Install security patches immediately when available"
        ]
      },
      {
        title: "Use Strong Authentication",
        description: "Enable two-factor authentication (2FA) on all important accounts",
        priority: "High", 
        difficulty: "Easy",
        tips: [
          "Enable 2FA on banking, email, and social media accounts",
          "Use authenticator apps instead of SMS when possible",
          "Keep backup codes in a secure location",
          "Never share 2FA codes with anyone"
        ]
      },
      {
        title: "Be Cautious with Links",
        description: "Think twice before clicking links in emails, messages, or ads",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Hover over links to see the actual URL before clicking",
          "Type URLs directly instead of clicking suspicious links",
          "Be extra careful with shortened URLs",
          "Verify sender authenticity before clicking any links"
        ]
      },
      {
        title: "Secure Your Personal Information",
        description: "Protect sensitive data like PAN, Aadhaar, and banking details",
        priority: "High",
        difficulty: "Medium",
        tips: [
          "Never share personal details on social media",
          "Use privacy settings on social platforms",
          "Shred physical documents with sensitive information",
          "Monitor your digital footprint regularly"
        ]
      },
      {
        title: "Regular Backups",
        description: "Keep regular backups of important data and files",
        priority: "Medium",
        difficulty: "Medium",
        tips: [
          "Use cloud storage for automatic backups",
          "Maintain offline backups for critical data",
          "Test backup restoration regularly",
          "Encrypt sensitive backup data"
        ]
      },
      {
        title: "Safe Browsing Habits",
        description: "Develop secure web browsing practices",
        priority: "Medium",
        difficulty: "Easy",
        tips: [
          "Look for HTTPS (lock icon) on websites",
          "Avoid downloading software from unknown sources",
          "Use reputable antivirus software",
          "Be cautious of pop-up warnings and ads"
        ]
      }
    ],
    passwords: [
      {
        title: "Create Strong Passwords",
        description: "Use complex, unique passwords for all accounts",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Use at least 12 characters with mix of letters, numbers, symbols",
          "Avoid common words, dates, or personal information",
          "Use different passwords for different accounts",
          "Consider passphrases with random words"
        ]
      },
      {
        title: "Use Password Managers",
        description: "Let software handle complex password generation and storage",
        priority: "High",
        difficulty: "Medium",
        tips: [
          "Use reputable password managers like Bitwarden, 1Password",
          "Enable password manager browser extensions",
          "Use the password generator feature",
          "Secure your password manager with a strong master password"
        ]
      },
      {
        title: "Regular Password Updates",
        description: "Change passwords periodically and after security breaches",
        priority: "Medium",
        difficulty: "Easy",
        tips: [
          "Change passwords every 6-12 months",
          "Immediately change passwords if a service is breached",
          "Never reuse old passwords",
          "Monitor breach notifications from services you use"
        ]
      }
    ],
    mobile: [
      {
        title: "App Download Safety",
        description: "Only download apps from official stores and verified sources",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Use Google Play Store or Apple App Store only",
          "Read app reviews and check developer credibility",
          "Avoid sideloading APK files from unknown sources",
          "Check app permissions before installing"
        ]
      },
      {
        title: "Screen Lock Security",
        description: "Secure your device with proper lock methods",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Use PIN, pattern, fingerprint, or face unlock",
          "Set automatic screen lock after short timeout",
          "Don't use easily guessable patterns or PINs",
          "Enable remote wipe capability for lost devices"
        ]
      },
      {
        title: "App Permissions",
        description: "Carefully manage what apps can access on your device",
        priority: "Medium",
        difficulty: "Medium",
        tips: [
          "Review app permissions before granting access",
          "Regularly audit and revoke unnecessary permissions",
          "Be cautious of apps requesting excessive permissions",
          "Use app-specific permissions when available"
        ]
      }
    ],
    wifi: [
      {
        title: "Public WiFi Caution",
        description: "Protect yourself when using public wireless networks",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Avoid accessing sensitive accounts on public WiFi",
          "Use VPN when connecting to public networks",
          "Turn off auto-connect to WiFi networks",
          "Verify network names with venue staff"
        ]
      },
      {
        title: "Home Network Security",
        description: "Secure your home WiFi and router properly",
        priority: "High",
        difficulty: "Medium",
        tips: [
          "Change default router admin passwords",
          "Use WPA3 or WPA2 encryption for WiFi",
          "Hide your network name (SSID) if possible",
          "Regularly update router firmware"
        ]
      }
    ],
    email: [
      {
        title: "Phishing Email Recognition",
        description: "Learn to identify and avoid malicious emails",
        priority: "High",
        difficulty: "Medium",
        tips: [
          "Check sender email addresses carefully",
          "Be suspicious of urgent or threatening language",
          "Don't click links or download attachments from unknown senders",
          "Verify requests through official channels"
        ]
      },
      {
        title: "Email Account Security",
        description: "Protect your email accounts from unauthorized access",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Enable 2FA on all email accounts",
          "Use strong, unique passwords for email",
          "Regularly review account activity logs",
          "Be cautious when accessing email on shared devices"
        ]
      }
    ],
    banking: [
      {
        title: "Online Banking Safety",
        description: "Secure practices for internet banking and digital payments",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Always log out completely after banking sessions",
          "Use official bank apps or type URLs manually",
          "Never save banking passwords in browsers",
          "Monitor account statements regularly"
        ]
      },
      {
        title: "UPI Transaction Security",
        description: "Safe practices for UPI and digital wallet usage",
        priority: "High",
        difficulty: "Easy",
        tips: [
          "Never share UPI PIN with anyone",
          "Verify recipient details before sending money",
          "Set transaction limits on UPI apps",
          "Report suspicious transactions immediately"
        ]
      }
    ]
  };

  const currentTips = securityTips[selectedCategory as keyof typeof securityTips] || securityTips.essential;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cybersecurity Tips & Best Practices
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Essential security practices to protect yourself in the digital world
          </p>
        </div>

        {/* Security Score Card */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Security Score</h2>
                <p className="text-green-100">Complete our security assessment to get personalized tips</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">--</div>
                <div className="text-sm">Not Assessed</div>
                <Button variant="secondary" className="mt-2" size="sm">
                  Take Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              Quick Security Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">Security Checklist</div>
                  <div className="text-sm text-gray-600">Check your security status</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <Download className="w-5 h-5 mr-3 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold">Download Guide</div>
                  <div className="text-sm text-gray-600">PDF security handbook</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <PlayCircle className="w-5 h-5 mr-3 text-purple-600" />
                <div className="text-left">
                  <div className="font-semibold">Video Tutorials</div>
                  <div className="text-sm text-gray-600">Step-by-step guides</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <AlertTriangle className="w-5 h-5 mr-3 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold">Report Incident</div>
                  <div className="text-sm text-gray-600">Report security issues</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Security Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                          selectedCategory === category.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                            <span className={`font-medium ${
                              selectedCategory === category.id ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {category.name}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Tips Content */}
          <div className="lg:col-span-3 space-y-6">
            {currentTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{tip.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Badge 
                        variant={tip.priority === 'High' ? 'destructive' : 'secondary'}
                        className="whitespace-nowrap"
                      >
                        {tip.priority} Priority
                      </Badge>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {tip.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tipItem}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Videos Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-purple-600" />
              Security Awareness Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Password Security Masterclass",
                  duration: "8:45",
                  description: "Learn to create and manage strong passwords effectively"
                },
                {
                  title: "Mobile Security Essentials",
                  duration: "12:30",
                  description: "Secure your smartphone against common threats"
                },
                {
                  title: "Email Security Best Practices",
                  duration: "6:20",
                  description: "Identify and avoid phishing emails and scams"
                },
                {
                  title: "Safe Online Banking",
                  duration: "10:15",
                  description: "Protect yourself while banking online"
                },
                {
                  title: "WiFi Security Guide",
                  duration: "7:55",
                  description: "Stay safe on public and private networks"
                },
                {
                  title: "Social Media Privacy",
                  duration: "9:40",
                  description: "Manage your privacy settings and digital footprint"
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
                    />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Additional Security Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <Download className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Security Toolkit</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download our comprehensive security toolkit with checklists and guides
                </p>
                <Button size="sm" variant="outline">Download</Button>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <Eye className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold mb-2">Security Assessment</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Take our free security assessment to identify vulnerabilities
                </p>
                <Button size="sm" variant="outline">Start Assessment</Button>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <Shield className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Expert Consultation</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Schedule a consultation with our cybersecurity experts
                </p>
                <Button size="sm" variant="outline">Book Session</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}