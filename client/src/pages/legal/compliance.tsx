import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileCheck, Shield } from "lucide-react";

export default function Compliance() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <FileCheck className="mr-3 h-8 w-8 text-green-600" />
          Compliance Framework
        </h1>
        <p className="text-gray-600">
          Regulatory compliance and adherence to cybersecurity standards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="mr-2 h-5 w-5" />
              IT Act 2000 Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Full compliance with Information Technology Act, 2000 and its amendments
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-green-50">Section 66 - Computer Related Offences</Badge>
              <Badge variant="outline" className="bg-green-50">Section 67 - Publishing Obscene Information</Badge>
              <Badge variant="outline" className="bg-green-50">Section 69 - Interception Powers</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Shield className="mr-2 h-5 w-5" />
              Data Security Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Implementation of national and international security standards
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-blue-50">ISO 27001 Aligned</Badge>
              <Badge variant="outline" className="bg-blue-50">NIST Framework</Badge>
              <Badge variant="outline" className="bg-blue-50">GDPR Ready</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regulatory Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Legal Compliance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Information Technology Act, 2000</h4>
                  <p className="text-sm text-gray-600">
                    Primary legislation governing cybercrime investigation and digital evidence handling
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Indian Evidence Act, 1872</h4>
                  <p className="text-sm text-gray-600">
                    Digital evidence collection and presentation in legal proceedings
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Shield className="mr-2 h-4 w-4 text-blue-600" />
                Security Standards
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="font-medium">Data Encryption</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">AES-256 Implemented</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="font-medium">Access Control</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">RBAC Implemented</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="font-medium">Audit Logging</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Comprehensive Logs</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="font-medium">Incident Response</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">24/7 Monitoring</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-orange-600" />
                Privacy Compliance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Data Minimization</h4>
                  <p className="text-sm text-gray-600">
                    Only collect data necessary for cybercrime investigation
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Purpose Limitation</h4>
                  <p className="text-sm text-gray-600">
                    Data used solely for law enforcement purposes
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Data Retention</h4>
                  <p className="text-sm text-gray-600">
                    Retention periods as per legal requirements
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Subject Rights</h4>
                  <p className="text-sm text-gray-600">
                    Mechanism for data subject requests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit and Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div>
                <span className="font-medium">Last Security Audit</span>
                <p className="text-sm text-gray-600">Comprehensive security assessment</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">December 2024</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div>
                <span className="font-medium">Compliance Review</span>
                <p className="text-sm text-gray-600">Legal and regulatory compliance check</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">January 2025</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
              <div>
                <span className="font-medium">Next Assessment</span>
                <p className="text-sm text-gray-600">Scheduled compliance verification</p>
              </div>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">June 2025</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}