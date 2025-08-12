import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield, Lock, Eye, Database, FileText, Clock } from "lucide-react";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy and data security are fundamental to our mission of protecting citizens from cybercrime.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Last updated: January 12, 2025
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Eye className="w-6 h-6" />
              Privacy at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Data Encryption</h3>
                <p className="text-sm text-gray-600">All data encrypted end-to-end</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Government Grade Security</h3>
                <p className="text-sm text-gray-600">Bank-level security standards</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Limited Access</h3>
                <p className="text-sm text-gray-600">Only authorized officers access data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Name, contact number, and email address when filing reports</li>
                  <li>Location information when reporting incidents</li>
                  <li>Financial details related to cybercrime incidents (amount lost, transaction details)</li>
                  <li>Evidence files (screenshots, documents, audio recordings)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Technical Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Device information and browser type for security purposes</li>
                  <li>IP address for fraud detection and security</li>
                  <li>Session data to maintain platform functionality</li>
                  <li>Platform usage analytics for service improvement</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Law Enforcement Purposes</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Processing and investigating cybercrime reports</li>
                  <li>Coordinating with relevant authorities for case resolution</li>
                  <li>Generating insights for crime prevention and public safety</li>
                  <li>Creating anonymized statistics for policy making</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Platform Improvement</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Enhancing user experience and platform functionality</li>
                  <li>Developing AI models for better threat detection</li>
                  <li>Improving cybersecurity awareness programs</li>
                  <li>Optimizing response times and case management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Security Measures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Technical Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>AES-256 encryption for data at rest</li>
                    <li>TLS 1.3 encryption for data in transit</li>
                    <li>Multi-factor authentication for officers</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Secure cloud infrastructure with government compliance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Access Controls</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Role-based access control system</li>
                    <li>Regular access reviews and audit logs</li>
                    <li>Need-to-know basis data access</li>
                    <li>Automatic session timeouts</li>
                    <li>Data anonymization for analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Authorized Sharing</h3>
                <p className="text-gray-700 mb-3">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Law enforcement agencies for investigation purposes</li>
                  <li>Judicial authorities when required by court orders</li>
                  <li>Financial institutions for fund recovery efforts</li>
                  <li>Government agencies for policy and security purposes</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-lg mb-2 text-red-800">We Never Share Data For:</h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700">
                  <li>Commercial or marketing purposes</li>
                  <li>Non-law enforcement third parties</li>
                  <li>Unauthorized personnel or organizations</li>
                  <li>International entities without proper legal framework</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights and Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Data Rights</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Access your personal data and case information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request case status updates</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Important Notes</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Some data must be retained for legal compliance</li>
                    <li>Ongoing investigations may limit data modification</li>
                    <li>Evidence files are preserved as required by law</li>
                    <li>Anonymous analytics data cannot be removed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Retention Periods</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Active Cases: Indefinite</div>
                    <div className="text-sm text-gray-600">Until case closure and legal requirements are met</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Closed Cases: 7 years</div>
                    <div className="text-sm text-gray-600">As per Indian evidence and legal requirements</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Analytics Data: 3 years</div>
                    <div className="text-sm text-gray-600">Anonymous data for trend analysis and policy making</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Session Data: 90 days</div>
                    <div className="text-sm text-gray-600">Technical logs for security and troubleshooting</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  For privacy-related questions or to exercise your rights, contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">Data Protection Officer</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Email: privacy@prahaar360.gov.in<br />
                      Phone: 0731-2530530<br />
                      Office Hours: 9 AM - 6 PM (Mon-Sat)
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">Cybercrime Cell</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Indore Cybercrime Police Station<br />
                      Near Circuit House, Residency Area<br />
                      Indore, Madhya Pradesh 452001
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Legal Compliance</h3>
                <p className="text-amber-700 text-sm">
                  This privacy policy complies with the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, 
                  and other applicable Indian laws. It may be updated to reflect changes in legal requirements or platform functionality. 
                  Users will be notified of significant changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}