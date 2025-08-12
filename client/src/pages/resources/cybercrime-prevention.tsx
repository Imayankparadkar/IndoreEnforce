import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  Shield, 
  Phone, 
  CreditCard, 
  Mail, 
  MessageCircle, 
  Globe,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lock,
  Download,
  PlayCircle,
  ExternalLink
} from "lucide-react";

export default function CybercrimePreventionPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const preventionCategories = [
    {
      id: "overview",
      name: "Overview",
      icon: Shield,
      color: "blue"
    },
    {
      id: "upi-fraud",
      name: "UPI & Payment Fraud",
      icon: CreditCard,
      color: "green"
    },
    {
      id: "phone-scams",
      name: "Phone Scams",
      icon: Phone,
      color: "orange"
    },
    {
      id: "email-phishing",
      name: "Email Phishing",
      icon: Mail,
      color: "purple"
    },
    {
      id: "social-media",
      name: "Social Media Fraud",
      icon: MessageCircle,
      color: "pink"
    },
    {
      id: "online-shopping",
      name: "Online Shopping",
      icon: Globe,
      color: "indigo"
    }
  ];

  const quickTips = [
    "Never share OTP with anyone, even bank officials",
    "Verify before making any online payments",
    "Don't click suspicious links in messages",
    "Use strong, unique passwords for all accounts",
    "Enable two-factor authentication",
    "Keep software and apps updated"
  ];

  const emergencyNumbers = [
    { name: "Cybercrime Helpline", number: "1930", available: "24/7" },
    { name: "Women Helpline", number: "1091", available: "24/7" },
    { name: "Police Emergency", number: "100", available: "24/7" },
    { name: "Consumer Helpline", number: "1915", available: "24/7" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Cybercrime Impact in India</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">1.4 Lakh</div>
                    <div className="text-sm opacity-90">Cases in 2023</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">₹11,000 Cr</div>
                    <div className="text-sm opacity-90">Total Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">65%</div>
                    <div className="text-sm opacity-90">Payment Frauds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">85%</div>
                    <div className="text-sm opacity-90">Preventable</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Threats */}
            <Card>
              <CardHeader>
                <CardTitle>Most Common Cybercrime Types in Indore</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "UPI/Payment Fraud", percentage: 45, description: "Fake payment links, QR codes, and fund transfer scams" },
                    { name: "Phone Call Scams", percentage: 25, description: "Impersonation of bank officials, police, or government agencies" },
                    { name: "Online Shopping Fraud", percentage: 15, description: "Fake websites, non-delivery of goods, and counterfeit products" },
                    { name: "Social Media Fraud", percentage: 10, description: "Romance scams, fake investment schemes, and identity theft" },
                    { name: "Email Phishing", percentage: 5, description: "Malicious attachments, fake invoices, and credential theft" }
                  ].map((threat, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{threat.name}</span>
                        <span className="text-sm text-gray-500">{threat.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${threat.percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{threat.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prevention Video */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-red-600" />
                  Featured Prevention Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Cybercrime Prevention Guide"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-lg">Cyber Safety Awareness - Stay Protected Online</h4>
                  <p className="text-gray-600 mt-2">
                    Learn essential cybersecurity practices to protect yourself from online frauds and scams. 
                    This comprehensive guide covers the most common threats and how to prevent them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "upi-fraud":
        return (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">UPI & Payment Fraud Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">✅ Do's</h3>
                    <ul className="space-y-2 text-green-700">
                      <li>• Always verify recipient details before payment</li>
                      <li>• Use only official bank apps</li>
                      <li>• Set daily transaction limits</li>
                      <li>• Enable transaction alerts</li>
                      <li>• Check QR codes before scanning</li>
                      <li>• Keep UPI PIN secret and unique</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">❌ Don'ts</h3>
                    <ul className="space-y-2 text-red-700">
                      <li>• Never share OTP or UPI PIN</li>
                      <li>• Don't click on payment links in SMS/WhatsApp</li>
                      <li>• Avoid downloading APK files</li>
                      <li>• Don't accept money from unknown sources</li>
                      <li>• Never provide bank details on calls</li>
                      <li>• Don't use public WiFi for transactions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common UPI Scam Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Fake Payment Confirmation",
                      description: "Scammer sends fake screenshot claiming money transfer",
                      prevention: "Always check your bank app for actual credit"
                    },
                    {
                      title: "QR Code Scam",
                      description: "Malicious QR codes that steal money instead of receiving",
                      prevention: "Verify QR code destination before scanning"
                    },
                    {
                      title: "Wrong Transaction Scam",
                      description: "Claiming money sent by mistake and asking for refund",
                      prevention: "Block and report such numbers immediately"
                    },
                    {
                      title: "Reward/Cashback Scam",
                      description: "Fake offers requiring payment to claim rewards",
                      prevention: "No legitimate reward requires advance payment"
                    }
                  ].map((scam, index) => (
                    <div key={index} className="p-4 border-l-4 border-orange-500 bg-orange-50">
                      <h4 className="font-semibold text-orange-800">{scam.title}</h4>
                      <p className="text-orange-700 text-sm mt-1">{scam.description}</p>
                      <p className="text-green-700 text-sm mt-2 font-medium">
                        Prevention: {scam.prevention}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* UPI Security Video */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-green-600" />
                  UPI Security Awareness Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="UPI Security Tips"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "phone-scams":
        return (
          <div className="space-y-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Phone Scam Recognition & Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Bank Officials</h3>
                      <p className="text-sm text-gray-600">Fake calls claiming account issues</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Police/CBI</h3>
                      <p className="text-sm text-gray-600">Threatening calls about fake cases</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Credit Card</h3>
                      <p className="text-sm text-gray-600">Fake offers and penalties</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Red Flags in Phone Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-red-600">⚠️ Warning Signs</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Immediate action required urgency</li>
                      <li>• Asking for OTP, PIN, or passwords</li>
                      <li>• Threatening consequences for non-compliance</li>
                      <li>• Requesting remote access to devices</li>
                      <li>• Asking for money transfer or payments</li>
                      <li>• Poor call quality or background noise</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-600">✅ Safe Response</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Hang up and call bank directly</li>
                      <li>• Never share personal information</li>
                      <li>• Ask for caller's details and verify</li>
                      <li>• Report suspicious calls to 1930</li>
                      <li>• Block unknown numbers</li>
                      <li>• Record call if possible</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone Scam Awareness Video */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-orange-600" />
                  Phone Scam Awareness Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Phone Scam Prevention"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">
              Content for {preventionCategories.find(c => c.id === activeTab)?.name} coming soon...
            </h3>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cybercrime Prevention Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guide to protect yourself from cyber threats and online frauds
          </p>
        </div>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">🛡️ Quick Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-200" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Numbers */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Emergency Helplines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {emergencyNumbers.map((contact, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg">
                  <div className="font-bold text-2xl text-red-600">{contact.number}</div>
                  <div className="font-semibold text-gray-900">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.available}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Prevention Topics</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {preventionCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                          activeTab === category.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-5 h-5 text-${category.color}-600`} />
                          <span className={`font-medium ${
                            activeTab === category.id ? 'text-blue-900' : 'text-gray-700'
                          }`}>
                            {category.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
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
                  <div className="font-semibold">Prevention Checklist</div>
                  <div className="text-sm text-gray-600">Downloadable security checklist</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <ExternalLink className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Government Resources</div>
                  <div className="text-sm text-gray-600">Official cybersecurity guidelines</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <PlayCircle className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Video Library</div>
                  <div className="text-sm text-gray-600">Educational video collection</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}