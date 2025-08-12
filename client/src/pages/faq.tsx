import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MessageCircle,
  FileText,
  Shield,
  Clock,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

export default function FAQ() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = [
    { id: "all", name: "All Categories", count: 45 },
    { id: "reporting", name: "Filing Reports", count: 12 },
    { id: "account", name: "Account & Login", count: 8 },
    { id: "security", name: "Security & Privacy", count: 10 },
    { id: "technical", name: "Technical Issues", count: 7 },
    { id: "platform", name: "Platform Features", count: 8 }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I file a cybercrime report on Prahaar 360?",
      answer: `To file a cybercrime report:
      
      1. Go to BrahmaNet - Citizen Portal
      2. Click "Report New Incident"
      3. Fill out the form with accurate details:
         - Personal information (name, contact)
         - Incident type (UPI fraud, phone scam, etc.)
         - Description of what happened
         - Amount lost (if applicable)
         - Suspicious numbers or UPIs
      4. Upload evidence (screenshots, recordings, documents)
      5. Submit the report and note your case ID
      
      You'll receive a confirmation SMS/email with your case number for tracking.`,
      category: "reporting",
      helpful: 145,
      lastUpdated: "2 days ago",
      popularity: 5
    },
    {
      id: 2,
      question: "What information do I need to provide when reporting a cybercrime?",
      answer: `Essential information includes:
      
      **Personal Details:**
      - Your full name and contact number
      - Email address for updates
      - Location where incident occurred
      
      **Incident Details:**
      - Type of cybercrime (UPI fraud, phone scam, etc.)
      - Detailed description of what happened
      - Date and time of incident
      - Financial loss amount (if any)
      
      **Evidence:**
      - Screenshots of fraudulent messages/websites
      - Audio recordings of suspicious calls
      - Transaction receipts or bank statements
      - Any communication with the fraudster
      
      **Additional Information:**
      - Suspicious phone numbers or UPI IDs
      - Bank account details involved
      - Any other relevant details
      
      Don't worry if you don't have all information - provide what you can and submit additional evidence later.`,
      category: "reporting",
      helpful: 132,
      lastUpdated: "1 week ago",
      popularity: 5
    },
    {
      id: 3,
      question: "How long does it take to process a cybercrime report?",
      answer: `Processing timeline varies by case complexity:
      
      **Initial Response:**
      - Acknowledgment: Within 2-4 hours
      - Case assignment: Within 24 hours
      - Initial assessment: 24-48 hours
      
      **Investigation Timeline:**
      - Simple cases (clear evidence): 7-15 days
      - Complex cases: 30-90 days
      - Cases requiring bank cooperation: 45-120 days
      
      **Regular Updates:**
      - You'll receive updates every 15 days
      - SMS/email notifications for major developments
      - Case status visible on your dashboard
      
      **Priority Cases:**
      - Ongoing fraud: Immediate response
      - Large financial losses: Expedited processing
      - Multiple victim cases: High priority
      
      Remember: Some factors like bank response time, evidence quality, and suspect cooperation can affect timelines.`,
      category: "reporting",
      helpful: 98,
      lastUpdated: "3 days ago",
      popularity: 4
    },
    {
      id: 4,
      question: "Is there a cost for filing a cybercrime report?",
      answer: `No, absolutely free! Prahaar 360 is a government service provided at no cost to citizens.
      
      **What's Free:**
      - Filing cybercrime reports
      - Case tracking and updates
      - Investigation services
      - Evidence analysis
      - Legal assistance coordination
      - Platform access and features
      
      **No Hidden Charges:**
      - No registration fees
      - No processing charges
      - No update fees
      - No final report costs
      
      **Beware of Fraudsters:**
      If anyone asks for payment to "expedite" your case or provide "special" services, it's a scam. Report such attempts immediately.
      
      **Emergency Services:**
      - Cybercrime Helpline (1930): Free
      - Police assistance: Free
      - Legal consultation: Free through government channels`,
      category: "reporting",
      helpful: 156,
      lastUpdated: "1 day ago",
      popularity: 5
    },
    {
      id: 5,
      question: "Can I file a report if I'm not from Indore?",
      answer: `Yes, but with some conditions:
      
      **You Can File If:**
      - The cybercrime occurred in Indore
      - The suspect is based in Indore
      - You're a resident visiting/working in Indore
      - The incident involves Indore-based businesses
      
      **For Other Locations:**
      - File with your local cybercrime cell
      - Use the national cybercrime portal
      - Call 1930 for guidance on jurisdiction
      
      **Multi-Location Crimes:**
      - File where the crime occurred
      - Mention all locations involved
      - We'll coordinate with other jurisdictions
      
      **Contact Information:**
      - Provide local contact in Indore if available
      - Ensure we can reach you for investigation
      
      When in doubt, call 1930 for guidance on where to file your complaint.`,
      category: "reporting",
      helpful: 87,
      lastUpdated: "5 days ago",
      popularity: 3
    },
    {
      id: 6,
      question: "Do I need to create an account to file a report?",
      answer: `No account required for basic reporting, but having one provides benefits:
      
      **Without Account:**
      - Can file reports using basic form
      - Receive case ID for tracking
      - Get SMS/email updates
      
      **With Account Benefits:**
      - Dashboard to track all your cases
      - Upload additional evidence anytime
      - Receive personalized security tips
      - Save draft reports
      - Access your reporting history
      - Faster form filling with saved details
      
      **Creating an Account:**
      - Use your mobile number
      - OTP verification required
      - Basic profile information
      - Optional security preferences
      
      **Account Security:**
      - Your data is encrypted and protected
      - Only you and authorized officers can access
      - Complies with Indian data protection laws`,
      category: "account",
      helpful: 76,
      lastUpdated: "1 week ago",
      popularity: 4
    },
    {
      id: 7,
      question: "How do I track the status of my cybercrime report?",
      answer: `Multiple ways to track your case:
      
      **Online Tracking:**
      1. Visit Prahaar 360 dashboard
      2. Enter your case ID
      3. View current status and updates
      4. See investigation progress
      
      **Case ID Location:**
      - In confirmation SMS/email
      - On report submission receipt
      - Contact support if lost
      
      **Status Updates Include:**
      - Case registered
      - Under investigation
      - Evidence analysis
      - Suspect identification
      - Legal proceedings
      - Case closure
      
      **Notification Methods:**
      - SMS alerts for major updates
      - Email notifications
      - Dashboard notifications
      - Phone calls for urgent matters
      
      **What You'll See:**
      - Current case status
      - Assigned officer details
      - Recent actions taken
      - Next steps in investigation
      - Estimated timeline
      
      If you don't receive updates for 15 days, contact support.`,
      category: "platform",
      helpful: 123,
      lastUpdated: "2 days ago",
      popularity: 5
    },
    {
      id: 8,
      question: "What should I do if I'm currently being scammed?",
      answer: `Immediate action steps:
      
      **Stop the Scam:**
      1. Don't make any more payments
      2. Don't share any more information
      3. Don't download any apps they suggest
      4. End all communication with the scammer
      
      **Protect Your Accounts:**
      1. Change all passwords immediately
      2. Contact your bank to freeze accounts
      3. Inform payment app providers (PhonePe, Google Pay, etc.)
      4. Enable additional security on all accounts
      
      **Preserve Evidence:**
      1. Screenshot all conversations
      2. Save call recordings if possible
      3. Note down all numbers/IDs used
      4. Keep transaction receipts
      
      **Report Immediately:**
      1. Call 1930 (Cybercrime Helpline) first
      2. Contact your bank's fraud helpline
      3. File online report on Prahaar 360
      4. Inform local police if needed
      
      **Follow Up:**
      - Monitor bank statements
      - Check credit reports
      - Watch for identity theft signs
      - Cooperate with investigation
      
      Remember: Time is critical in stopping ongoing fraud!`,
      category: "security",
      helpful: 189,
      lastUpdated: "1 day ago",
      popularity: 5
    },
    {
      id: 9,
      question: "Is my personal information safe on this platform?",
      answer: `Yes, your information is highly protected:
      
      **Technical Security:**
      - AES-256 encryption for stored data
      - TLS 1.3 encryption for data transmission
      - Multi-factor authentication
      - Regular security audits
      - Secure government-grade servers
      
      **Access Controls:**
      - Only authorized officers can view cases
      - Role-based permissions
      - All access logged and monitored
      - Regular access reviews
      
      **Legal Compliance:**
      - Digital Personal Data Protection Act, 2023
      - Information Technology Act, 2000
      - Government security standards
      - ISO 27001 compliance
      
      **Data Usage:**
      - Only for investigation purposes
      - Shared only with authorized agencies
      - Never sold or used commercially
      - Anonymized for statistics only
      
      **Your Rights:**
      - Access your data anytime
      - Request corrections
      - Know who accessed your information
      - Data deletion after legal requirements met
      
      **Data Retention:**
      - Active cases: Until closure + 7 years
      - Evidence: As per court requirements
      - Analytics: 3 years (anonymized)`,
      category: "security",
      helpful: 95,
      lastUpdated: "4 days ago",
      popularity: 4
    },
    {
      id: 10,
      question: "What types of evidence should I upload?",
      answer: `Upload any relevant evidence you have:
      
      **Screenshots/Images:**
      - Fraudulent messages (SMS, WhatsApp, email)
      - Fake websites or apps
      - Social media profiles of scammers
      - QR codes used in scams
      - Bank transaction receipts
      
      **Audio/Video:**
      - Recordings of scam calls
      - Screen recordings of fake apps
      - Video evidence of incidents
      
      **Documents:**
      - Bank statements showing transactions
      - Email headers (technical details)
      - Police complaints (if filed elsewhere)
      - Previous correspondence
      
      **File Requirements:**
      - Maximum 10MB per file
      - Supported formats: PNG, JPG, PDF, MP3, MP4, TXT
      - Clear and readable quality
      - Original files preferred
      
      **Best Practices:**
      - Upload immediately after incident
      - Don't edit or modify evidence
      - Include date/time stamps if visible
      - Provide context for each file
      - Multiple angles/views if applicable
      
      **Privacy Note:**
      - Remove unrelated personal information
      - Black out third-party details if needed
      - Evidence is securely stored and encrypted`,
      category: "reporting",
      helpful: 108,
      lastUpdated: "6 days ago",
      popularity: 4
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleFeedback = (faqId: number, helpful: boolean) => {
    // Handle feedback - in real app, this would update the database
    console.log(`FAQ ${faqId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using Prahaar 360 and reporting cybercrimes
          </p>
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{faqs.length}</div>
                <div className="text-blue-100">FAQ Articles</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{categories.length - 1}</div>
                <div className="text-blue-100">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {Math.round(faqs.reduce((sum, faq) => sum + faq.helpful, 0) / faqs.length)}
                </div>
                <div className="text-blue-100">Avg. Helpful Votes</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Help Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Most Popular FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-600" />
              Most Popular Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {faqs
                .filter(faq => faq.popularity === 5)
                .slice(0, 3)
                .map((faq, index) => (
                <div key={faq.id} className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{faq.question}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{faq.helpful} helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === "all" ? "All Questions" : 
             categories.find(c => c.id === selectedCategory)?.name} 
            ({filteredFAQs.length})
          </h2>
          
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(faq.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 pr-4">{faq.question}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{faq.helpful} helpful</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Updated {faq.lastUpdated}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === faq.category)?.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: faq.popularity }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                    {expandedItems.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedItems.includes(faq.id) && (
                <div className="border-t bg-gray-50">
                  <div className="p-6">
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                      {faq.answer}
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Was this helpful?
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFeedback(faq.id, true)}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Yes
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFeedback(faq.id, false)}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Still Need Help */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Emergency Helpline</h3>
                <div className="text-2xl font-bold text-red-600 mb-1">1930</div>
                <div className="text-sm text-gray-600">24/7 Cybercrime Support</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <div className="text-sm font-medium text-blue-600 mb-1">support@prahaar360.gov.in</div>
                <div className="text-sm text-gray-600">Response within 24 hours</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <div className="text-sm font-medium text-green-600 mb-1">Available Now</div>
                <div className="text-sm text-gray-600">10 AM - 8 PM (Mon-Fri)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggest Question */}
        <Card>
          <CardHeader>
            <CardTitle>Can't Find Your Question?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer to your question, let us know and we'll add it to our FAQ.
            </p>
            <div className="flex gap-4">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Suggest a Question
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Ask the Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}