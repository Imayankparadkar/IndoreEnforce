import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Bug, 
  AlertTriangle, 
  Camera, 
  Upload, 
  Send,
  CheckCircle,
  Info,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  Star
} from "lucide-react";

export default function ReportBug() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bugType: "",
    priority: "",
    title: "",
    description: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    browser: "",
    operatingSystem: "",
    screenResolution: "",
    contactEmail: "",
    allowContact: false
  });

  const bugTypes = [
    { value: "ui-issue", label: "User Interface Issue" },
    { value: "functionality", label: "Feature Not Working" },
    { value: "performance", label: "Performance Issue" },
    { value: "security", label: "Security Concern" },
    { value: "data-issue", label: "Data/Information Error" },
    { value: "login-issue", label: "Login/Authentication Problem" },
    { value: "mobile-issue", label: "Mobile App Issue" },
    { value: "other", label: "Other" }
  ];

  const priorityLevels = [
    { value: "critical", label: "Critical - System unusable", color: "red" },
    { value: "high", label: "High - Major feature broken", color: "orange" },
    { value: "medium", label: "Medium - Minor issue", color: "yellow" },
    { value: "low", label: "Low - Cosmetic issue", color: "green" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Bug Report Submitted",
        description: "Thank you for reporting this issue. We'll investigate and get back to you soon.",
      });

      // Reset form
      setFormData({
        bugType: "",
        priority: "",
        title: "",
        description: "",
        stepsToReproduce: "",
        expectedBehavior: "",
        actualBehavior: "",
        browser: "",
        operatingSystem: "",
        screenResolution: "",
        contactEmail: "",
        allowContact: false
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your bug report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Report a Bug
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us improve Prahaar 360 by reporting bugs, issues, or suggesting improvements
          </p>
        </div>

        {/* Guidelines */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Info className="w-6 h-6" />
              Before You Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">✅ Do Include</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Clear, descriptive title</li>
                  <li>• Step-by-step reproduction instructions</li>
                  <li>• Browser and device information</li>
                  <li>• Screenshots if applicable</li>
                  <li>• Expected vs actual behavior</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">❌ Avoid</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Vague descriptions like "it's broken"</li>
                  <li>• Including personal/sensitive information</li>
                  <li>• Reporting the same issue multiple times</li>
                  <li>• Feature requests (use feedback form)</li>
                  <li>• Questions (use help center instead)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bug Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-6 h-6 text-red-600" />
                Bug Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bug Type *
                  </label>
                  <Select value={formData.bugType} onValueChange={(value) => handleInputChange('bugType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bug type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bugTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-${priority.color}-500`} />
                            {priority.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bug Title *
                </label>
                <Input
                  type="text"
                  placeholder="Brief, descriptive title of the bug"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  placeholder="Describe the bug in detail. What went wrong?"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Reproduction Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Reproduction Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Steps to Reproduce *
                </label>
                <Textarea
                  placeholder="1. Go to... &#10;2. Click on... &#10;3. Enter... &#10;4. See error"
                  rows={5}
                  value={formData.stepsToReproduce}
                  onChange={(e) => handleInputChange('stepsToReproduce', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Behavior
                  </label>
                  <Textarea
                    placeholder="What should have happened?"
                    rows={3}
                    value={formData.expectedBehavior}
                    onChange={(e) => handleInputChange('expectedBehavior', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual Behavior
                  </label>
                  <Textarea
                    placeholder="What actually happened?"
                    rows={3}
                    value={formData.actualBehavior}
                    onChange={(e) => handleInputChange('actualBehavior', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-6 h-6 text-blue-600" />
                Technical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Browser
                  </label>
                  <Select value={formData.browser} onValueChange={(value) => handleInputChange('browser', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select browser" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chrome">Google Chrome</SelectItem>
                      <SelectItem value="firefox">Mozilla Firefox</SelectItem>
                      <SelectItem value="safari">Safari</SelectItem>
                      <SelectItem value="edge">Microsoft Edge</SelectItem>
                      <SelectItem value="opera">Opera</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating System
                  </label>
                  <Select value={formData.operatingSystem} onValueChange={(value) => handleInputChange('operatingSystem', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select OS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="windows">Windows</SelectItem>
                      <SelectItem value="macos">macOS</SelectItem>
                      <SelectItem value="linux">Linux</SelectItem>
                      <SelectItem value="android">Android</SelectItem>
                      <SelectItem value="ios">iOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Screen Resolution
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 1920x1080"
                    value={formData.screenResolution}
                    onChange={(e) => handleInputChange('screenResolution', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-green-600" />
                Screenshots & Files (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-600">
                  <p className="text-lg font-medium mb-2">Upload Screenshots or Error Logs</p>
                  <p className="text-sm">Drag and drop files here, or click to browse</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PNG, JPG, GIF, PDF, TXT (Max 10MB)
                  </p>
                </div>
                <Button variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">
                  We'll use this to follow up on your report if needed
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowContact"
                  checked={formData.allowContact}
                  onCheckedChange={(checked) => handleInputChange('allowContact', checked)}
                />
                <label htmlFor="allowContact" className="text-sm text-gray-700">
                  I'm available for follow-up questions about this bug
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>• All fields marked with * are required</p>
                  <p>• Your report will be reviewed within 24-48 hours</p>
                  <p>• Critical issues are prioritized for immediate attention</p>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.title || !formData.description}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Bug Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Recent Bug Reports Status */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-6 h-6" />
              Recent Bug Fixes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Login timeout issue on mobile", status: "Fixed", date: "Jan 10, 2025" },
                { title: "Report form validation errors", status: "Fixed", date: "Jan 8, 2025" },
                { title: "Dashboard loading performance", status: "Fixed", date: "Jan 5, 2025" }
              ].map((fix, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="font-medium">{fix.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-green-700 font-medium">{fix.status}</span>
                    <span className="text-gray-600 text-sm">{fix.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}