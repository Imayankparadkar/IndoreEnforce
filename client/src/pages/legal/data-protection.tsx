import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield, Lock, Database, File, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react";

export default function DataProtection() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Data Protection Framework
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Comprehensive data protection measures ensuring the security and privacy of citizen information on Prahaar 360
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Last updated: January 12, 2025
          </div>
        </div>

        {/* Key Principles */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Shield className="w-6 h-6" />
              Data Protection Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Lawfulness & Fairness</h3>
                    <p className="text-sm text-gray-700">Data processed only for legitimate law enforcement purposes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Purpose Limitation</h3>
                    <p className="text-sm text-gray-700">Data used only for cybercrime investigation and prevention</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Data Minimization</h3>
                    <p className="text-sm text-gray-700">Only necessary information collected and processed</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Accuracy</h3>
                    <p className="text-sm text-gray-700">Data kept accurate and up-to-date throughout investigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Storage Limitation</h3>
                    <p className="text-sm text-gray-700">Data retained only as long as legally required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Security</h3>
                    <p className="text-sm text-gray-700">Robust technical and organizational security measures</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Safeguards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-green-600" />
              Technical Safeguards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Encryption & Access</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• AES-256 encryption for data at rest</li>
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• Multi-factor authentication for all users</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• Regular security audits and vulnerability assessments</li>
                  <li>• Automated threat detection and response</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Infrastructure Security</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Government-grade cloud infrastructure</li>
                  <li>• Geographic data residency in India</li>
                  <li>• Redundant backup systems</li>
                  <li>• Network segmentation and firewalls</li>
                  <li>• Intrusion detection and prevention systems</li>
                  <li>• 24/7 security monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-purple-600" />
              Data Categories & Protection Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-l-4 border-l-red-500 bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">Highly Sensitive</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Financial transaction details</li>
                    <li>• Identity documents (Aadhaar, PAN)</li>
                    <li>• Biometric information</li>
                    <li>• Medical records</li>
                  </ul>
                  <div className="mt-3 text-xs text-red-600">
                    <strong>Protection:</strong> End-to-end encryption, restricted access
                  </div>
                </div>
                <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50">
                  <h3 className="font-semibold text-orange-800 mb-2">Sensitive</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Contact information</li>
                    <li>• Location data</li>
                    <li>• Communication metadata</li>
                    <li>• Investigation notes</li>
                  </ul>
                  <div className="mt-3 text-xs text-orange-600">
                    <strong>Protection:</strong> Encryption, access logging
                  </div>
                </div>
                <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">General</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Anonymous analytics</li>
                    <li>• Public awareness content</li>
                    <li>• Aggregated statistics</li>
                    <li>• System logs</li>
                  </ul>
                  <div className="mt-3 text-xs text-green-600">
                    <strong>Protection:</strong> Standard encryption, regular audits
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Access Control Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">User Roles & Permissions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Citizens</div>
                      <div className="text-sm text-gray-600">Can file reports, view own case status</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Investigating Officers</div>
                      <div className="text-sm text-gray-600">Access assigned cases, evidence, investigation tools</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">Senior Officers</div>
                      <div className="text-sm text-gray-600">Case assignment, resource allocation, reports</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">System Administrators</div>
                      <div className="text-sm text-gray-600">System maintenance, user management, audit logs</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Access Monitoring</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• All data access logged with timestamps</li>
                    <li>• User authentication tracked</li>
                    <li>• Suspicious activity alerts</li>
                    <li>• Regular access reviews</li>
                    <li>• Automated privilege escalation detection</li>
                    <li>• Data export and download monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <File className="w-6 h-6 text-yellow-600" />
              Data Retention & Disposal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Retention Periods</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Active Investigation Data</span>
                      <span className="text-sm text-gray-600">Until case closure + 7 years</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Evidence Files</span>
                      <span className="text-sm text-gray-600">As per court requirements</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">User Session Logs</span>
                      <span className="text-sm text-gray-600">90 days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Analytics Data</span>
                      <span className="text-sm text-gray-600">3 years (anonymized)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Secure Disposal</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Cryptographic erasure for encrypted data</li>
                    <li>• Multi-pass overwrite for sensitive files</li>
                    <li>• Physical destruction of storage media</li>
                    <li>• Certificate of destruction for compliance</li>
                    <li>• Audit trail of disposal activities</li>
                    <li>• Regular disposal schedule enforcement</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident Response */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Data Breach Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-2">72 Hours</div>
                  <div className="text-sm text-red-800">Authority notification timeline</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-2">24 Hours</div>
                  <div className="text-sm text-orange-800">Internal assessment and containment</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Immediate</div>
                  <div className="text-sm text-blue-800">Affected user notification</div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Response Procedures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Immediate incident detection and alerting</li>
                    <li>• Rapid containment and damage assessment</li>
                    <li>• Forensic investigation and evidence preservation</li>
                    <li>• Stakeholder communication and reporting</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Remediation and system restoration</li>
                    <li>• Regulatory compliance and documentation</li>
                    <li>• Post-incident review and improvements</li>
                    <li>• Regular incident response training</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Indian Laws</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Digital Personal Data Protection Act, 2023</li>
                  <li>• Information Technology Act, 2000</li>
                  <li>• Indian Evidence Act, 1872</li>
                  <li>• Constitution of India (Article 21)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Standards & Frameworks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• ISO 27001:2013 Information Security</li>
                  <li>• CERT-In Cyber Security Guidelines</li>
                  <li>• MEITY Cyber Security Framework</li>
                  <li>• Government of India IT Security Standards</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Data Protection Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-blue-700">
                For data protection queries, concerns, or to exercise your rights under the 
                Digital Personal Data Protection Act, 2023:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium">Data Protection Officer</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Email: dpo@prahaar360.gov.in<br />
                    Phone: 0731-2530530 (Ext. 101)<br />
                    Office: Mon-Sat, 9 AM - 6 PM
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium">Legal Department</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Email: legal@prahaar360.gov.in<br />
                    Address: Indore Cybercrime Police Station<br />
                    Residency Area, Indore - 452001
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}