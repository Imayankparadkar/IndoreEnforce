import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { Scale, AlertTriangle, CheckCircle, FileText, Clock, Users } from "lucide-react";

export default function TermsOfService() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            These terms govern your use of the Prahaar 360 cybercrime reporting and prevention platform.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Effective Date: January 12, 2025
          </div>
        </div>

        {/* Key Points */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-6 h-6" />
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Scale className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Legal Service</h3>
                <p className="text-sm text-gray-600">Official government platform</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">User Responsibility</h3>
                <p className="text-sm text-gray-600">Accurate information required</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Legal Compliance</h3>
                <p className="text-sm text-gray-600">Follows Indian cyber laws</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                By accessing and using the Prahaar 360 platform, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with 
                these terms, please do not use the platform.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Important Notice</h3>
                <p className="text-blue-700 text-sm">
                  This platform is operated by the Government of Madhya Pradesh for cybercrime reporting and prevention. 
                  All information provided will be used for law enforcement purposes in accordance with Indian laws.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Platform Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Services Provided</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Cybercrime incident reporting through BrahmaNet portal</li>
                  <li>Real-time threat mapping and visualization (Vajra)</li>
                  <li>AI-powered investigation assistance (Kautilya)</li>
                  <li>Web intelligence and digital footprint analysis (MayaJaal)</li>
                  <li>Officer portal for law enforcement personnel</li>
                  <li>Cybersecurity awareness and educational resources</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Platform Purpose</h3>
                <p className="text-gray-700">
                  Prahaar 360 is designed to facilitate cybercrime reporting, enhance investigation capabilities, 
                  and improve cybersecurity awareness among citizens of Indore, Madhya Pradesh. The platform serves 
                  as a bridge between citizens and law enforcement agencies.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Accurate Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Provide truthful and accurate information in all reports</li>
                  <li>Submit evidence that is genuine and unaltered</li>
                  <li>Update information if circumstances change</li>
                  <li>Cooperate with investigating officers when required</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Prohibited Activities</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Filing false or misleading reports</li>
                  <li>Attempting to access unauthorized areas of the platform</li>
                  <li>Interfering with platform operations or security</li>
                  <li>Using the platform for any unlawful purposes</li>
                  <li>Sharing login credentials with unauthorized persons</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Legal Framework</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Applicable Laws</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Information Technology Act, 2000</div>
                    <div className="text-sm text-gray-600">Primary cybercrime legislation</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Indian Penal Code, 1860</div>
                    <div className="text-sm text-gray-600">Criminal offenses and procedures</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Digital Personal Data Protection Act, 2023</div>
                    <div className="text-sm text-gray-600">Data privacy and protection</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">Code of Criminal Procedure, 1973</div>
                    <div className="text-sm text-gray-600">Investigation procedures</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Jurisdiction</h3>
                <p className="text-gray-700">
                  These terms and any disputes arising from the use of this platform shall be governed by Indian law. 
                  The courts in Indore, Madhya Pradesh shall have exclusive jurisdiction over any legal proceedings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Platform Availability and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Availability</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We strive to maintain 24/7 platform availability</li>
                  <li>Scheduled maintenance may cause temporary disruptions</li>
                  <li>Emergency contact numbers remain available even during outages</li>
                  <li>Critical systems have redundancy and backup procedures</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2">Service Limitations</h3>
                <ul className="list-disc pl-6 space-y-1 text-amber-700">
                  <li>Platform cannot guarantee case resolution timelines</li>
                  <li>Fund recovery depends on various factors beyond our control</li>
                  <li>AI analysis provides assistance but does not replace human judgment</li>
                  <li>International cases may require cooperation with other jurisdictions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Platform Ownership</h3>
                <p className="text-gray-700">
                  The Prahaar 360 platform, including its design, functionality, content, and underlying technology, 
                  is owned by the Government of Madhya Pradesh. All rights are reserved under applicable intellectual 
                  property laws.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">User Content</h3>
                <p className="text-gray-700">
                  By submitting reports and evidence through the platform, you grant necessary rights to the government 
                  for investigation, prosecution, and law enforcement purposes. This includes the right to share information 
                  with authorized agencies as required by law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Liability and Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Government Liability</h3>
                <p className="text-gray-700">
                  The Government of Madhya Pradesh provides this platform as a public service. While we make every effort 
                  to ensure accuracy and reliability, the platform is provided "as is" without warranties of any kind.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">User Liability</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Users are responsible for the accuracy of information provided</li>
                  <li>False reporting may result in legal consequences</li>
                  <li>Users must maintain confidentiality of sensitive case information</li>
                  <li>Misuse of the platform may result in account suspension or legal action</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Modifications and Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Terms Updates</h3>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time to reflect changes in law, platform functionality, 
                  or operational requirements. Users will be notified of significant changes through the platform or email.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Account Termination</h3>
                <p className="text-gray-700">
                  We may suspend or terminate user access for violation of these terms, misuse of the platform, or as 
                  required by law. Active investigations will continue regardless of account status.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  For questions about these Terms of Service or platform usage:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">Legal Department</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Email: legal@prahaar360.gov.in<br />
                      Phone: 0731-2530530<br />
                      Office Hours: 9 AM - 6 PM (Mon-Sat)
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">Technical Support</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Email: support@prahaar360.gov.in<br />
                      Emergency Helpline: 1930<br />
                      Available 24/7
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Important Legal Notice</h3>
                <p className="text-red-700 text-sm">
                  These terms constitute a legal agreement between you and the Government of Madhya Pradesh. 
                  Violation of these terms may result in civil and criminal liability under Indian law. 
                  If you have any doubts about your obligations, please seek legal advice before using the platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}