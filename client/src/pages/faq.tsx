import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MessageCircle, 
  Phone,
  Mail,
  HelpCircle,
  Shield,
  Users,
  FileText,
  Clock
} from "lucide-react";

export default function FAQ() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle, count: 28 },
    { id: "reporting", name: "Reporting Crimes", icon: FileText, count: 8 },
    { id: "platform", name: "Platform Usage", icon: Users, count: 6 },
    { id: "security", name: "Security & Privacy", icon: Shield, count: 7 },
    { id: "investigation", name: "Investigation Process", icon: Search, count: 4 },
    { id: "technical", name: "Technical Support", icon: MessageCircle, count: 3 }
  ];

  const faqs = [
    {
      id: "1",
      category: "reporting",
      question: "How do I report a cybercrime on Prahaar 360?",
      answer: "To report a cybercrime, navigate to the BrahmaNet module and click 'File New Report'. Fill in all required details including the incident description, financial loss (if any), suspicious phone numbers or UPI IDs, and upload any evidence such as screenshots or documents. Our AI system will analyze your report and assign a priority level.",
      tags: ["reporting", "brahmanet", "file report"],
      popular: true
    },
    {
      id: "2",
      category: "reporting",
      question: "What information should I include in my cybercrime report?",
      answer: "Include as much detail as possible: exact date and time of incident, description of what happened, financial loss amount, suspicious phone numbers or UPI IDs, screenshots of conversations or transactions, bank details if money was transferred, and any other relevant evidence. The more information you provide, the better we can investigate.",
      tags: ["evidence", "details", "information"],
      popular: true
    },
    {
      id: "3",
      category: "investigation",
      question: "How long does it take to investigate a cybercrime case?",
      answer: "Investigation timelines vary based on case complexity. Simple cases like UPI fraud with clear evidence may be resolved within 7-15 days. Complex cases involving multiple victims or jurisdictions may take 30-90 days. You'll receive regular updates on your case status through the platform.",
      tags: ["timeline", "investigation", "status"],
      popular: true
    },
    {
      id: "4",
      category: "platform",
      question: "How do I track the status of my reported case?",
      answer: "After filing a report, you'll receive a unique case ID. Log into your account and navigate to 'My Reports' to view the current status, investigation updates, and any messages from investigating officers. You'll also receive email notifications for important updates.",
      tags: ["tracking", "status", "updates"],
      popular: false
    },
    {
      id: "5",
      category: "security",
      question: "Is my personal information safe on Prahaar 360?",
      answer: "Yes, we employ bank-grade security measures including end-to-end encryption, secure data storage, and strict access controls. Your personal information is only accessible to authorized investigating officers and is protected according to government data protection standards.",
      tags: ["privacy", "security", "data protection"],
      popular: true
    },
    {
      id: "6",
      category: "reporting",
      question: "Can I report a cybercrime anonymously?",
      answer: "While we encourage providing contact information for investigation purposes, you can file anonymous reports. However, anonymous reports may limit our ability to investigate effectively and provide updates. For sensitive cases, you can request enhanced privacy protection.",
      tags: ["anonymous", "privacy", "confidential"],
      popular: false
    },
    {
      id: "7",
      category: "investigation",
      question: "What happens after I file a cybercrime report?",
      answer: "After filing, your report is automatically analyzed by our AI system for risk assessment. It's then assigned to an investigating officer based on the crime type and severity. The officer will review the evidence, conduct preliminary investigation, and may contact you for additional information if needed.",
      tags: ["process", "workflow", "next steps"],
      popular: true
    },
    {
      id: "8",
      category: "platform",
      question: "How do I upload evidence files to my report?",
      answer: "During the report filing process, you'll find an 'Upload Evidence' section. You can upload screenshots, documents, videos, or audio files up to 10MB each. Supported formats include JPG, PNG, PDF, MP4, and MP3. Ensure files are clear and relevant to your case.",
      tags: ["evidence", "upload", "files"],
      popular: false
    },
    {
      id: "9",
      category: "security",
      question: "What should I do if I've been scammed?",
      answer: "Immediately: 1) Stop all communication with the scammer, 2) Don't send any more money, 3) Report to your bank if money was transferred, 4) File a report on Prahaar 360, 5) Call the Cybercrime Helpline 1930, 6) Save all evidence including screenshots and call logs.",
      tags: ["scammed", "immediate action", "steps"],
      popular: true
    },
    {
      id: "10",
      category: "technical",
      question: "I'm having trouble accessing my account. What should I do?",
      answer: "If you're unable to log in, try resetting your password using the 'Forgot Password' link. If you're still having issues, contact our technical support at support@prahaar360.gov.in or call our helpline. Provide your registered email ID and describe the specific problem you're facing.",
      tags: ["login", "account", "technical support"],
      popular: false
    },
    {
      id: "11",
      category: "investigation",
      question: "Can I get my money back if I've been scammed?",
      answer: "Recovery depends on several factors including how quickly you report the crime, cooperation from banks/payment platforms, and the investigation outcome. Report immediately to maximize chances of recovery. Our officers work with financial institutions to freeze accounts and recover funds where possible.",
      tags: ["money recovery", "refund", "financial loss"],
      popular: true
    },
    {
      id: "12",
      category: "security",
      question: "How can I protect myself from UPI fraud?",
      answer: "Never share your UPI PIN, don't click on suspicious links, verify payment requests independently, check transaction details before confirming, use only official banking apps, enable transaction alerts, and be wary of 'reversed payment' scams where scammers claim to have sent money by mistake.",
      tags: ["UPI fraud", "prevention", "safety tips"],
      popular: true
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqs.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about cybercrime reporting, platform usage, and investigation process
          </p>
        </div>

        {/* Quick Contact */}
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold">Emergency Helpline</h3>
                <p className="text-2xl font-bold">1930</p>
                <p className="text-sm opacity-90">24/7 Available</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold">Live Chat Support</h3>
                <Button variant="secondary" size="sm" className="mt-2">
                  Start Chat
                </Button>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm">support@prahaar360.gov.in</p>
                <p className="text-sm opacity-90">Response within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Categories */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for questions, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.name} ({category.count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular FAQs */}
        {selectedCategory === "all" && !searchTerm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                Most Popular Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularFAQs.slice(0, 5).map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Popular
                        </Badge>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    {expandedFAQ === faq.id && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-gray-600">{faq.answer}</p>
                        <div className="flex gap-2 mt-3">
                          {faq.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All FAQs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === "all" ? "All Questions" : 
             categories.find(c => c.id === selectedCategory)?.name || "Questions"}
            <span className="text-gray-500 text-lg ml-2">
              ({filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'})
            </span>
          </h2>
          
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse different categories
                </p>
                <Button onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}>
                  View All Questions
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex gap-2">
                            {faq.popular && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                Popular
                              </Badge>
                            )}
                            <Badge variant="outline">
                              {categories.find(c => c.id === faq.category)?.name}
                            </Badge>
                          </div>
                          <span className="font-medium text-gray-900 flex-1">{faq.question}</span>
                        </div>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      {expandedFAQ === faq.id && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still need help?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Helpline
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}