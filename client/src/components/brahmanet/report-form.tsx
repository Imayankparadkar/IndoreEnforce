import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Upload, Send, CheckCircle } from "lucide-react";

export default function ReportForm() {
  const [reportForm, setReportForm] = useState({
    reporterName: "",
    reporterContact: "",
    scamType: "",
    description: "",
    location: "",
    amount: "",
    suspiciousNumbers: "",
    suspiciousUPIs: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const reportMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      
      // Add form fields
      Object.keys(data).forEach(key => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });

      // Add files
      uploadedFiles.forEach(file => {
        formData.append('evidence', file);
      });

      const response = await fetch('/api/scam-reports', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/scam-reports"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/dashboard"] });
      
      toast({
        title: "Report Submitted Successfully",
        description: `Your report has been assigned ID: ${data.id.slice(0, 8)}`,
      });

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setReportForm({
          reporterName: "",
          reporterContact: "",
          scamType: "",
          description: "",
          location: "",
          amount: "",
          suspiciousNumbers: "",
          suspiciousUPIs: "",
        });
        setUploadedFiles([]);
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Unable to submit report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    if (files.length > 0) {
      toast({
        title: "Files Added",
        description: `${files.length} evidence file(s) added to report`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportForm.reporterName || !reportForm.reporterContact || !reportForm.scamType || !reportForm.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Process phone numbers and UPI IDs
    const suspiciousNumbers = reportForm.suspiciousNumbers
      .split(',')
      .map(num => num.trim())
      .filter(num => num.length > 0);

    const suspiciousUPIs = reportForm.suspiciousUPIs
      .split(',')
      .map(upi => upi.trim())
      .filter(upi => upi.length > 0);

    const reportData = {
      ...reportForm,
      suspiciousNumbers,
      suspiciousUPIs,
      amount: reportForm.amount ? parseInt(reportForm.amount) : null,
      location: reportForm.location || "Indore",
    };

    reportMutation.mutate(reportData);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-8">
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Report Submitted Successfully
            </h3>
            <p className="text-gray-600 mb-4">
              Your cybercrime report has been received and is being processed by our AI systems.
            </p>
            <p className="text-sm text-gray-500">
              You will receive updates on the investigation progress.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="text-red-500 mr-2" />
          Report Cybercrime
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reporterName">Your Name *</Label>
            <Input
              id="reporterName"
              placeholder="Enter your full name"
              value={reportForm.reporterName}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, reporterName: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="reporterContact">Contact Number *</Label>
            <Input
              id="reporterContact"
              type="tel"
              placeholder="Enter your mobile number"
              value={reportForm.reporterContact}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, reporterContact: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="scamType">Scam Type *</Label>
            <Select
              value={reportForm.scamType}
              onValueChange={(value) =>
                setReportForm(prev => ({ ...prev, scamType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select scam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UPI/Payment Fraud">UPI/Payment Fraud</SelectItem>
                <SelectItem value="Voice Call Scam">Voice Call Scam</SelectItem>
                <SelectItem value="Phishing/Fake Websites">Phishing/Fake Websites</SelectItem>
                <SelectItem value="Job Scam">Job Scam</SelectItem>
                <SelectItem value="Loan Scam">Loan Scam</SelectItem>
                <SelectItem value="KYC/Banking Fraud">KYC/Banking Fraud</SelectItem>
                <SelectItem value="Investment Scam">Investment Scam</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Area/locality in Indore (optional)"
              value={reportForm.location}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, location: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount Lost (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount if money was lost"
              value={reportForm.amount}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, amount: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="suspiciousNumbers">Suspicious Phone Numbers</Label>
            <Input
              id="suspiciousNumbers"
              placeholder="Enter phone numbers (comma separated)"
              value={reportForm.suspiciousNumbers}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, suspiciousNumbers: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="suspiciousUPIs">Suspicious UPI IDs</Label>
            <Input
              id="suspiciousUPIs"
              placeholder="Enter UPI IDs (comma separated)"
              value={reportForm.suspiciousUPIs}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, suspiciousUPIs: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="description">Incident Description *</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe what happened in detail..."
              value={reportForm.description}
              onChange={(e) =>
                setReportForm(prev => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="evidence">Evidence Files</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload screenshots, audio files, or documents
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidenceFiles"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('evidenceFiles')?.click()}
                >
                  Choose Files
                </Button>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Files ({uploadedFiles.length}):
                  </p>
                  <div className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-xs bg-gray-100 p-2 rounded">
                        <span>{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={reportMutation.isPending}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            {reportMutation.isPending ? (
              "Submitting Report..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Report
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            * Required fields. Your report will be analyzed by AI and assigned to appropriate officers.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
