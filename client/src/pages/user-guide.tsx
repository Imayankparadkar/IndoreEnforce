import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  FileText, 
  User,
  Shield,
  Phone,
  MessageCircle,
  Database,
  Settings,
  HelpCircle,
  Star,
  Clock,
  Download
} from "lucide-react";

export default function UserGuide() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: Play,
      articles: 5,
      description: "Basic platform introduction and setup"
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
      name: "Account Management",
      icon: User,
      articles: 6,
      description: "Managing your profile and settings"
    },
    {
      id: "security",
      name: "Security Features",
      icon: Shield,
      articles: 7,
      description: "Platform security and privacy features"
    },
    {
      id: "support",
      name: "Getting Help",
      icon: HelpCircle,
      articles: 4,
      description: "Support resources and contact information"
    }
  ];

  const guideContent = {
    "getting-started": [
      {
        title: "Welcome to Prahaar 360",
        content: `
        <h3>What is Prahaar 360?</h3>
        <p>Prahaar 360 is a comprehensive cybercrime reporting and prevention platform for Indore, Madhya Pradesh. It provides citizens with tools to report cybercrimes, access security resources, and stay informed about digital threats.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li><strong>BrahmaNet:</strong> Citizen reporting portal for filing cybercrime complaints</li>
          <li><strong>Vajra:</strong> Real-time threat mapping and visualization</li>
          <li><strong>Kautilya:</strong> AI-powered investigation assistance</li>
          <li><strong>MayaJaal:</strong> Web intelligence and digital footprint analysis</li>
          <li><strong>Officer Portal:</strong> Law enforcement tools and case management</li>
        </ul>
        
        <h3>Who Can Use This Platform?</h3>
        <ul>
          <li>Citizens of Indore to report cybercrimes</li>
          <li>Law enforcement officers for investigation</li>
          <li>General public for cybersecurity awareness</li>
          <li>Businesses for security resources</li>
        </ul>
        
        <div class="bg-blue-50 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-blue-800">Quick Start</h4>
          <p class="text-blue-700">For immediate cybercrime assistance, call <strong>1930</strong> - the national cybercrime helpline available 24/7.</p>
        </div>
        `,
        tags: ["overview", "introduction", "features"],
        difficulty: "Beginner",
        time: "5 min read"
      },
      {
        title: "Platform Navigation",
        content: `
        <h3>Main Navigation Menu</h3>
        <p>The platform navigation is organized into main modules accessible from the top menu:</p>
        
        <div class="space-y-3">
          <div class="p-3 bg-gray-50 rounded-lg">
            <h4 class="font-semibold">Dashboard</h4>
            <p>Overview of platform statistics, recent alerts, and key metrics</p>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <h4 class="font-semibold">Vajra - Threat Mapping</h4>
            <p>Interactive map showing cyberthreat locations and patterns</p>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <h4 class="font-semibold">Kautilya - Investigation</h4>
            <p>AI-powered tools for case analysis and investigation assistance</p>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <h4 class="font-semibold">MayaJaal - Web Intelligence</h4>
            <p>Digital footprint analysis and web-based threat detection</p>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <h4 class="font-semibold">BrahmaNet - Citizen Portal</h4>
            <p>Primary reporting interface for citizens to file cybercrime complaints</p>
          </div>
        </div>
        
        <h3>Additional Resources</h3>
        <p>Access help, training materials, and support through the footer links:</p>
        <ul>
          <li>Help Center - Comprehensive FAQ and support articles</li>
          <li>Training Videos - Step-by-step tutorials</li>
          <li>User Guide - This comprehensive guide</li>
          <li>Support - Contact information and assistance</li>
        </ul>
        `,
        tags: ["navigation", "menu", "modules"],
        difficulty: "Beginner",
        time: "3 min read"
      }
    ],
    "reporting": [
      {
        title: "How to File a Cybercrime Report",
        content: `
        <h3>Step-by-Step Reporting Process</h3>
        
        <h4>Step 1: Access BrahmaNet Portal</h4>
        <ol>
          <li>Click on "BrahmaNet - Citizen Portal" in the main navigation</li>
          <li>You'll see the reporting dashboard with recent alerts</li>
          <li>Click "Report New Incident" or the prominent report button</li>
        </ol>
        
        <h4>Step 2: Fill Out the Report Form</h4>
        <p>Provide the following information:</p>
        <ul>
          <li><strong>Personal Details:</strong> Your name, contact number, email</li>
          <li><strong>Incident Type:</strong> Select from categories like UPI fraud, phone scam, etc.</li>
          <li><strong>Description:</strong> Detailed explanation of what happened</li>
          <li><strong>Financial Loss:</strong> Amount lost (if applicable)</li>
          <li><strong>Location:</strong> Where the incident occurred</li>
          <li><strong>Suspicious Numbers/UPIs:</strong> Any fraudulent contact details</li>
        </ul>
        
        <h4>Step 3: Upload Evidence</h4>
        <ul>
          <li>Screenshots of fraudulent messages or websites</li>
          <li>Audio recordings of suspicious calls</li>
          <li>Transaction receipts or bank statements</li>
          <li>Any other relevant documents</li>
        </ul>
        
        <h4>Step 4: Submit and Track</h4>
        <ul>
          <li>Review all information before submission</li>
          <li>Note down your case ID for future reference</li>
          <li>You'll receive confirmation via SMS/email</li>
          <li>Track case progress through the dashboard</li>
        </ul>
        
        <div class="bg-red-50 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-red-800">Emergency Situations</h4>
          <p class="text-red-700">For ongoing fraud or immediate threats, call <strong>1930</strong> first, then file the online report for documentation.</p>
        </div>
        `,
        tags: ["reporting", "brahmanet", "step-by-step"],
        difficulty: "Beginner",
        time: "8 min read"
      },
      {
        title: "Types of Cybercrimes You Can Report",
        content: `
        <h3>Supported Cybercrime Categories</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border rounded-lg">
            <h4 class="font-semibold text-blue-600">UPI/Payment Fraud</h4>
            <ul class="text-sm mt-2 space-y-1">
              <li>• Fake payment requests</li>
              <li>• QR code scams</li>
              <li>• Wrong transaction claims</li>
              <li>• Digital wallet fraud</li>
            </ul>
          </div>
          
          <div class="p-4 border rounded-lg">
            <h4 class="font-semibold text-green-600">Phone Call Scams</h4>
            <ul class="text-sm mt-2 space-y-1">
              <li>• Fake bank official calls</li>
              <li>• Police/CBI impersonation</li>
              <li>• Lottery/prize scams</li>
              <li>• Technical support fraud</li>
            </ul>
          </div>
          
          <div class="p-4 border rounded-lg">
            <h4 class="font-semibold text-purple-600">Email Phishing</h4>
            <ul class="text-sm mt-2 space-y-1">
              <li>• Fake bank emails</li>
              <li>• Malicious attachments</li>
              <li>• Credential theft attempts</li>
              <li>• Business email compromise</li>
            </ul>
          </div>
          
          <div class="p-4 border rounded-lg">
            <h4 class="font-semibold text-orange-600">Social Media Fraud</h4>
            <ul class="text-sm mt-2 space-y-1">
              <li>• Romance scams</li>
              <li>• Fake investment schemes</li>
              <li>• Identity theft</li>
              <li>• Profile cloning</li>
            </ul>
          </div>
          
          <div class="p-4 border rounded-lg">
            <h4 class="font-semibold text-red-600">Online Shopping Fraud</h4>
            <ul class="text-sm mt-2 space-y-1">
              <li>• Fake e-commerce sites</li>
              <li>• Non-delivery of goods</li>
              <li>• Counterfeit products</li>
              <li>• Payment gateway fraud</li>
            </ul>
          </div>
          
          <div class="p-4 border rounded-lg">
            <h4 class="font-semibold text-indigo-600">Other Cybercrimes</h4>
            <ul class="text-sm mt-2 space-y-1">
              <li>• Cryptocurrency fraud</li>
              <li>• Job/employment scams</li>
              <li>• Ransomware attacks</li>
              <li>• Cyberbullying/harassment</li>
            </ul>
          </div>
        </div>
        
        <h3>What Information to Collect</h3>
        <p>Before filing a report, gather the following evidence:</p>
        <ul>
          <li><strong>Communication Records:</strong> Screenshots, call logs, email headers</li>
          <li><strong>Financial Information:</strong> Transaction IDs, amounts, bank details</li>
          <li><strong>Technical Details:</strong> IP addresses, URLs, app names</li>
          <li><strong>Timeline:</strong> When the incident occurred and was discovered</li>
          <li><strong>Impact:</strong> Financial loss, data compromised, services affected</li>
        </ul>
        `,
        tags: ["cybercrime-types", "evidence", "categories"],
        difficulty: "Beginner",
        time: "6 min read"
      }
    ],
    "account": [
      {
        title: "Creating and Managing Your Account",
        content: `
        <h3>Account Registration</h3>
        <p>While basic reporting doesn't require an account, creating one provides additional benefits:</p>
        
        <h4>Benefits of Having an Account</h4>
        <ul>
          <li>Track your case status and updates</li>
          <li>Receive notifications about your reports</li>
          <li>Access personalized security recommendations</li>
          <li>Save draft reports and evidence</li>
          <li>View your reporting history</li>
        </ul>
        
        <h4>Registration Process</h4>
        <ol>
          <li>Click "Login/Register" in the top navigation</li>
          <li>Choose "Create New Account"</li>
          <li>Provide your mobile number for OTP verification</li>
          <li>Fill in basic profile information</li>
          <li>Set up security preferences</li>
        </ol>
        
        <h3>Profile Management</h3>
        <p>Keep your profile updated for better service:</p>
        <ul>
          <li><strong>Contact Information:</strong> Ensure phone and email are current</li>
          <li><strong>Notification Preferences:</strong> Choose how you want to receive updates</li>
          <li><strong>Privacy Settings:</strong> Control what information is shared</li>
          <li><strong>Security Options:</strong> Enable two-factor authentication</li>
        </ul>
        
        <div class="bg-yellow-50 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-yellow-800">Privacy Note</h4>
          <p class="text-yellow-700">Your personal information is protected under Indian data protection laws. We only use it for investigation and communication purposes.</p>
        </div>
        `,
        tags: ["account", "registration", "profile"],
        difficulty: "Beginner",
        time: "4 min read"
      }
    ],
    "security": [
      {
        title: "Platform Security Features",
        content: `
        <h3>Data Protection</h3>
        <p>Prahaar 360 implements multiple layers of security to protect your information:</p>
        
        <h4>Encryption</h4>
        <ul>
          <li><strong>Data in Transit:</strong> All communication uses TLS 1.3 encryption</li>
          <li><strong>Data at Rest:</strong> AES-256 encryption for stored information</li>
          <li><strong>Evidence Files:</strong> Secure upload and storage with checksums</li>
        </ul>
        
        <h4>Access Controls</h4>
        <ul>
          <li><strong>Role-Based Access:</strong> Different permissions for citizens vs officers</li>
          <li><strong>Multi-Factor Authentication:</strong> Additional security for sensitive operations</li>
          <li><strong>Session Management:</strong> Automatic logout for inactive sessions</li>
          <li><strong>Audit Logging:</strong> All actions are tracked for security</li>
        </ul>
        
        <h3>Your Security Responsibilities</h3>
        <h4>When Using the Platform</h4>
        <ul>
          <li>Use strong, unique passwords</li>
          <li>Log out when using shared devices</li>
          <li>Don't share your login credentials</li>
          <li>Report suspicious activity immediately</li>
          <li>Keep your contact information updated</li>
        </ul>
        
        <h4>When Sharing Information</h4>
        <ul>
          <li>Only provide accurate, truthful information</li>
          <li>Don't include unnecessary personal details</li>
          <li>Verify file uploads before submission</li>
          <li>Be cautious when sharing case details publicly</li>
        </ul>
        
        <div class="bg-green-50 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-green-800">Security Compliance</h4>
          <p class="text-green-700">The platform complies with:</p>
          <ul class="text-green-700 mt-2">
            <li>• Digital Personal Data Protection Act, 2023</li>
            <li>• Information Technology Act, 2000</li>
            <li>• Government security standards</li>
            <li>• ISO 27001 security framework</li>
          </ul>
        </div>
        `,
        tags: ["security", "encryption", "privacy"],
        difficulty: "Intermediate",
        time: "7 min read"
      }
    ],
    "support": [
      {
        title: "Getting Help and Support",
        content: `
        <h3>Support Channels</h3>
        
        <div class="space-y-4">
          <div class="p-4 border-l-4 border-l-red-500 bg-red-50">
            <h4 class="font-semibold text-red-800">Emergency Support</h4>
            <p class="text-red-700">For ongoing fraud or immediate threats:</p>
            <ul class="text-red-700 mt-2">
              <li>• <strong>Call 1930</strong> - National Cybercrime Helpline (24/7)</li>
              <li>• <strong>Call 100</strong> - Police Emergency</li>
              <li>• <strong>Call 1091</strong> - Women Helpline</li>
            </ul>
          </div>
          
          <div class="p-4 border-l-4 border-l-blue-500 bg-blue-50">
            <h4 class="font-semibold text-blue-800">General Support</h4>
            <ul class="text-blue-700 mt-2">
              <li>• <strong>Phone:</strong> 0731-2530530 (9 AM - 6 PM, Mon-Sat)</li>
              <li>• <strong>Email:</strong> support@prahaar360.gov.in</li>
              <li>• <strong>Response Time:</strong> Within 24 hours</li>
            </ul>
          </div>
          
          <div class="p-4 border-l-4 border-l-green-500 bg-green-50">
            <h4 class="font-semibold text-green-800">Online Resources</h4>
            <ul class="text-green-700 mt-2">
              <li>• Help Center - FAQ and common issues</li>
              <li>• Training Videos - Step-by-step tutorials</li>
              <li>• User Guide - This comprehensive guide</li>
              <li>• Community Forum - User discussions</li>
            </ul>
          </div>
        </div>
        
        <h3>Frequently Asked Questions</h3>
        
        <div class="space-y-3">
          <details class="p-3 border rounded-lg">
            <summary class="font-semibold cursor-pointer">How long does it take to process a report?</summary>
            <p class="mt-2 text-gray-700">Initial assessment happens within 24-48 hours. Investigation timeline depends on case complexity but you'll receive regular updates.</p>
          </details>
          
          <details class="p-3 border rounded-lg">
            <summary class="font-semibold cursor-pointer">Can I file a report anonymously?</summary>
            <p class="mt-2 text-gray-700">While contact information is required for investigation purposes, your identity is protected and only shared with authorized law enforcement.</p>
          </details>
          
          <details class="p-3 border rounded-lg">
            <summary class="font-semibold cursor-pointer">What if I don't have all the required information?</summary>
            <p class="mt-2 text-gray-700">Provide whatever information you have. Incomplete reports are still processed, and you can submit additional evidence later.</p>
          </details>
          
          <details class="p-3 border rounded-lg">
            <summary class="font-semibold cursor-pointer">Is there a cost for filing reports?</summary>
            <p class="mt-2 text-gray-700">No, the Prahaar 360 platform is completely free for citizens to use. All reporting and support services are provided at no cost.</p>
          </details>
        </div>
        `,
        tags: ["support", "help", "contact"],
        difficulty: "Beginner",
        time: "5 min read"
      }
    ]
  };

  const currentContent = guideContent[activeSection as keyof typeof guideContent] || guideContent["getting-started"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete User Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using Prahaar 360 effectively and securely
          </p>
        </div>

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Guide Sections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      activeSection === section.id 
                        ? 'bg-blue-100 border-blue-500 border-2' 
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`w-5 h-5 ${
                        activeSection === section.id ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <span className={`font-semibold ${
                        activeSection === section.id ? 'text-blue-900' : 'text-gray-700'
                      }`}>
                        {section.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{section.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {section.articles} articles
                    </Badge>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">In This Section</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {currentContent.map((article, index) => (
                    <a
                      key={index}
                      href={`#article-${index}`}
                      className="block p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-700 mb-1">{article.title}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{article.time}</span>
                        <Badge variant="outline" className="text-xs">{article.difficulty}</Badge>
                      </div>
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {currentContent.map((article, index) => (
              <Card key={index} id={`article-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{article.time}</span>
                        <Badge variant="outline">{article.difficulty}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  <div className="flex flex-wrap gap-2 mt-6">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Help */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Need Immediate Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-red-600">1930</div>
                <div className="text-sm text-gray-600">Emergency Cybercrime Helpline</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">Live Chat</div>
                <div className="text-sm text-gray-600">Available 10 AM - 8 PM</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <HelpCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">Help Center</div>
                <div className="text-sm text-gray-600">FAQ & Support Articles</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}