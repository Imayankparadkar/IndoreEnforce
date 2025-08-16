import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  Users, 
  Download, 
  FileText,
  Video,
  MessageSquare
} from "lucide-react";

export default function Resources() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
          Resources Center
        </h1>
        <p className="text-gray-600">
          Comprehensive resources for cybersecurity awareness and cybercrime prevention
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/cybercrime-prevention">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-600" />
                Cybercrime Prevention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Learn how to protect yourself from various cyber threats and scams
              </p>
              <Badge variant="outline" className="mt-2">Essential Reading</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/security-tips">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                Security Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Practical security tips for online safety and digital hygiene
              </p>
              <Badge variant="outline" className="mt-2">Daily Tips</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/incident-response">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                Incident Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                What to do if you become a victim of cybercrime
              </p>
              <Badge variant="outline" className="mt-2">Emergency Guide</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/awareness-programs">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-600" />
                Awareness Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Community awareness programs and educational initiatives
              </p>
              <Badge variant="outline" className="mt-2">Community</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/downloads">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 h-5 w-5 text-blue-600" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download guides, forms, and educational materials
              </p>
              <Badge variant="outline" className="mt-2">Documents</Badge>
            </CardContent>
          </Card>
        </Link>

        <Link href="/training-videos">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-indigo-600" />
                Training Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Video tutorials and training materials for officers and citizens
              </p>
              <Badge variant="outline" className="mt-2">Video Library</Badge>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              Quick Reference Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <span className="font-medium">Phishing Identification Guide</span>
                <Badge variant="outline">PDF</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <span className="font-medium">Password Security Checklist</span>
                <Badge variant="outline">PDF</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                <span className="font-medium">Social Media Safety Tips</span>
                <Badge variant="outline">PDF</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <span className="font-medium">Digital Payment Security</span>
                <Badge variant="outline">PDF</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-green-600" />
              Latest Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">New Cybercrime Trends Alert</h4>
                <p className="text-sm text-gray-600">Updated guidance on latest scam techniques</p>
                <span className="text-xs text-gray-500">January 15, 2025</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Security Protocol Update</h4>
                <p className="text-sm text-gray-600">Enhanced security measures for digital transactions</p>
                <span className="text-xs text-gray-500">January 10, 2025</span>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Training Material Release</h4>
                <p className="text-sm text-gray-600">New video series on ransomware prevention</p>
                <span className="text-xs text-gray-500">January 5, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Prevention</h3>
              <p className="text-sm text-gray-600">Protective measures</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold">Detection</h3>
              <p className="text-sm text-gray-600">Threat identification</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Response</h3>
              <p className="text-sm text-gray-600">Incident handling</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Education</h3>
              <p className="text-sm text-gray-600">Awareness training</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}