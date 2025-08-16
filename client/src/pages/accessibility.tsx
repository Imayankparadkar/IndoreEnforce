import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Volume2, MousePointer, Keyboard, Accessibility, CheckCircle } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Accessibility className="mr-3 h-8 w-8 text-purple-600" />
          Accessibility Features
        </h1>
        <p className="text-gray-600">
          Prahaar 360 is designed to be accessible to users with disabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Eye className="mr-2 h-5 w-5" />
              Visual Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">High contrast color schemes</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Scalable fonts and UI elements</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Screen reader compatible</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Alternative text for images</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Volume2 className="mr-2 h-5 w-5" />
              Audio Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Text-to-speech support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Audio alerts and notifications</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Captions for video content</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Volume controls</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Keyboard className="mr-2 h-5 w-5" />
              Keyboard Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Full keyboard navigation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Visible focus indicators</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Skip navigation links</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Keyboard shortcuts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <MousePointer className="mr-2 h-5 w-5" />
              Motor Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Large clickable areas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Drag and drop alternatives</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Timeout extensions</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-sm">Voice input support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WCAG 2.1 Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Prahaar 360 is designed to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Perceivable</h3>
                <p className="text-sm text-gray-600">
                  Information and UI components must be presentable to users in ways they can perceive
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Operable</h3>
                <p className="text-sm text-gray-600">
                  User interface components and navigation must be operable
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Understandable</h3>
                <p className="text-sm text-gray-600">
                  Information and operation of UI must be understandable
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="p-4 h-auto flex flex-col items-start">
                <div className="flex items-center mb-2">
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="font-medium">High Contrast Mode</span>
                </div>
                <span className="text-sm text-gray-600">Toggle high contrast colors</span>
              </Button>
              
              <Button variant="outline" className="p-4 h-auto flex flex-col items-start">
                <div className="flex items-center mb-2">
                  <Volume2 className="mr-2 h-4 w-4" />
                  <span className="font-medium">Screen Reader</span>
                </div>
                <span className="text-sm text-gray-600">Enable text-to-speech</span>
              </Button>
              
              <Button variant="outline" className="p-4 h-auto flex flex-col items-start">
                <div className="flex items-center mb-2">
                  <Keyboard className="mr-2 h-4 w-4" />
                  <span className="font-medium">Keyboard Help</span>
                </div>
                <span className="text-sm text-gray-600">View keyboard shortcuts</span>
              </Button>
              
              <Button variant="outline" className="p-4 h-auto flex flex-col items-start">
                <div className="flex items-center mb-2">
                  <MousePointer className="mr-2 h-4 w-4" />
                  <span className="font-medium">Font Size</span>
                </div>
                <span className="text-sm text-gray-600">Adjust text size</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-3">Navigation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Skip to main content</span>
                  <Badge variant="outline">Alt + M</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Open navigation menu</span>
                  <Badge variant="outline">Alt + N</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Search</span>
                  <Badge variant="outline">Ctrl + /</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Actions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Submit form</span>
                  <Badge variant="outline">Ctrl + Enter</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Cancel action</span>
                  <Badge variant="outline">Escape</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Help</span>
                  <Badge variant="outline">F1</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback and Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            We are committed to making Prahaar 360 accessible to everyone. If you encounter any accessibility 
            barriers or have suggestions for improvements, please contact us.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">
              Report Accessibility Issue
            </Button>
            <Button variant="outline">
              Request Assistance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}