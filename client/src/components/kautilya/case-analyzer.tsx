import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Upload, Bot, Loader2 } from "lucide-react";

interface CaseAnalyzerProps {
  onAnalysisComplete: (results: any) => void;
  onTimelineGenerated: (timeline: any[]) => void;
}

export default function CaseAnalyzer({ onAnalysisComplete, onTimelineGenerated }: CaseAnalyzerProps) {
  const [analysisForm, setAnalysisForm] = useState({
    identifier: "",
    description: "",
    scamType: "UPI/Payment Fraud",
  });
  
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async (data: any) => {
      // Create a scam report first
      const reportResponse = await apiRequest("POST", "/api/scam-reports", {
        reporterName: "System Analysis",
        reporterContact: "system@prahaar360.gov.in",
        scamType: data.scamType,
        description: data.description,
        suspiciousNumbers: data.identifier.includes('+91') ? [data.identifier] : [],
        suspiciousUPIs: data.identifier.includes('@') ? [data.identifier] : [],
        location: "Indore",
      });
      
      return reportResponse.json();
    },
    onSuccess: (data) => {
      // Generate analysis results
      const mockAnalysis = generateMockAnalysis(analysisForm.identifier, analysisForm.description);
      setAnalysisResults(mockAnalysis);
      onAnalysisComplete(mockAnalysis);
      
      // Generate timeline
      const mockTimeline = generateMockTimeline();
      onTimelineGenerated(mockTimeline);
      
      toast({
        title: "Analysis Complete",
        description: "AI investigation results are ready",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Unable to complete AI analysis",
        variant: "destructive",
      });
    },
  });

  const generateMockAnalysis = (identifier: string, description: string) => {
    const riskLevels = ['High', 'Medium', 'Low'];
    const scamTypes = ['KYC Scam', 'UPI Reversal Fraud', 'Loan Scam', 'Job Scam'];
    const origins = ['Rajasthan', 'Delhi', 'Mumbai', 'Bangalore'];
    
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const scamType = scamTypes[Math.floor(Math.random() * scamTypes.length)];
    const matchCount = Math.floor(Math.random() * 8);
    const confidence = Math.floor(Math.random() * 35) + 60;
    const origin = origins[Math.floor(Math.random() * origins.length)];

    return {
      riskLevel,
      scamType,
      matchCount,
      confidence,
      origin,
      identifier,
      recommendations: [
        "Block UPI ID immediately",
        "Contact telecom operator for number suspension", 
        "Issue public alert for this pattern",
        `Coordinate with ${Math.random() > 0.5 ? 'WhatsApp' : 'Banking'} authorities`
      ]
    };
  };

  const generateMockTimeline = () => {
    const cases = [];
    for (let i = 0; i < 4; i++) {
      cases.push({
        id: Math.random().toString(36).substr(2, 8).toUpperCase(),
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: ['Resolved', 'Under Investigation', 'Closed'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 49500) + 500
      });
    }
    return cases;
  };

  const handleAnalyze = () => {
    if (!analysisForm.identifier || !analysisForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in both identifier and case description",
        variant: "destructive",
      });
      return;
    }
    
    analysisMutation.mutate(analysisForm);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Files Uploaded",
        description: `${files.length} evidence file(s) uploaded for analysis`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Investigation Input */}
      <Card>
        <CardHeader>
          <CardTitle>Case Analysis Input</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="identifier">UPI ID / Phone Number</Label>
              <Input
                id="identifier"
                placeholder="Enter UPI ID or phone number"
                value={analysisForm.identifier}
                onChange={(e) =>
                  setAnalysisForm((prev) => ({ ...prev, identifier: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="evidence">Evidence Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Drop screenshots, audio files, or chat logs here
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidenceUpload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('evidenceUpload')?.click()}
                >
                  Choose Files
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Case Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Describe the incident..."
                value={analysisForm.description}
                onChange={(e) =>
                  setAnalysisForm((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={analysisMutation.isPending}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {analysisMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investigation Results */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          {analysisResults ? (
            <div className="space-y-4">
              <div className={`rounded-lg p-4 border ${
                analysisResults.riskLevel === 'High' 
                  ? 'bg-red-50 border-red-200'
                  : analysisResults.riskLevel === 'Medium'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-green-50 border-green-200'
              }`}>
                <h4 className={`font-semibold ${
                  analysisResults.riskLevel === 'High' ? 'text-red-800' :
                  analysisResults.riskLevel === 'Medium' ? 'text-yellow-800' :
                  'text-green-800'
                }`}>
                  Risk Level: {analysisResults.riskLevel}
                </h4>
                <p className={`${
                  analysisResults.riskLevel === 'High' ? 'text-red-700' :
                  analysisResults.riskLevel === 'Medium' ? 'text-yellow-700' :
                  'text-green-700'
                }`}>
                  This appears to be a {analysisResults.scamType} based on pattern analysis
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Analysis Summary</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Found {analysisResults.matchCount} similar cases in database</li>
                  <li>• Pattern matches known {analysisResults.scamType.toLowerCase()} signatures</li>
                  <li>• Confidence score: {analysisResults.confidence}%</li>
                  <li>• Estimated origin: {analysisResults.origin}</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Recommended Actions</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  {analysisResults.recommendations.map((rec: string, index: number) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Bot className="mx-auto h-16 w-16 mb-4" />
              <p>Enter case details and click "Analyze with AI" to start investigation</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
