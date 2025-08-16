import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Scale, FileText, Shield, Eye } from "lucide-react";

export default function Legal() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Scale className="mr-3 h-8 w-8 text-blue-600" />
          Legal Information
        </h1>
        <p className="text-gray-600">
          Legal framework, policies, and compliance information for Prahaar 360
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/privacy-policy">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5 text-green-600" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                How we collect, use, and protect your personal information
              </p>
              <Badge variant="outline" className="mt-2">Updated January 2025</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/terms-of-service">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Terms and conditions for using Prahaar 360 platform
              </p>
              <Badge variant="outline" className="mt-2">Updated January 2025</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/data-protection">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-red-600" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Information security and data protection measures
              </p>
              <Badge variant="outline" className="mt-2">GDPR Compliant</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/compliance">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-5 w-5 text-purple-600" />
                Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Regulatory compliance and legal framework
              </p>
              <Badge variant="outline" className="mt-2">IT Act 2000</Badge>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Legal Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Applicable Laws</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Information Technology Act, 2000</li>
                <li>Indian Penal Code (IPC) - Sections related to cybercrime</li>
                <li>Personal Data Protection Bill</li>
                <li>Digital India Act (Proposed)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Jurisdictional Authority</h3>
              <p className="text-gray-600">
                This platform operates under the jurisdiction of Indore Police, Madhya Pradesh, India. 
                All legal matters are subject to Indian law and the courts of Indore.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Contact Legal Department</h3>
              <p className="text-gray-600">
                For legal inquiries: <strong>legal@indorepolice.gov.in</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}