import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Shield,
  ExternalLink,
  Download,
  FileText,
  Users
} from "lucide-react";

export default function Support() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support & Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help with cybercrime reporting, platform usage, and security guidance. 
            Our support team is here to assist you 24/7.
          </p>
        </div>

        {/* Emergency Contacts */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Shield className="w-6 h-6" />
              Emergency Cybercrime Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">National Helpline</h3>
                <p className="text-2xl font-bold text-red-600">1930</p>
                <p className="text-sm text-gray-600">24/7 Available</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Indore Cybercrime</h3>
                <p className="text-xl font-bold text-blue-600">0731-2530530</p>
                <p className="text-sm text-gray-600">9 AM - 6 PM</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Email Support</h3>
                <p className="text-sm font-bold text-green-600">cybercrime.indore@mp.gov.in</p>
                <p className="text-sm text-gray-600">Response within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Chat with our support team instantly</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">User Guide</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Step-by-step platform tutorials</p>
              <Button variant="outline" className="w-full">View Guide</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Download className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Downloads</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Forms, guides, and resources</p>
              <Button variant="outline" className="w-full">Download</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Training</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Cybersecurity awareness training</p>
              <Button variant="outline" className="w-full">Join Training</Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Center */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Operating Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-red-600">Emergency Only</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Emergency Helpline:</span>
                <span className="font-semibold text-red-600">24/7 Available</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Cybercrime Cell Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Indore Cybercrime Police Station</p>
                <p className="text-gray-600">
                  Near Circuit House, Residency Area<br />
                  Indore, Madhya Pradesh 452001
                </p>
              </div>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Map
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Common Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">How do I report a cybercrime?</h3>
                <p className="text-gray-600">
                  Use the BrahmaNet module to file a detailed report with evidence. Ensure you provide 
                  all relevant information including phone numbers, UPI IDs, and screenshots.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What information should I include in my report?</h3>
                <p className="text-gray-600">
                  Include date and time of incident, financial loss amount, suspicious phone numbers or 
                  UPI IDs, screenshots of conversations, and any other relevant evidence.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">How long does investigation take?</h3>
                <p className="text-gray-600">
                  Investigation timeline varies based on case complexity. Simple cases may be resolved 
                  within 7-15 days, while complex cases may take longer. You'll receive regular updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}