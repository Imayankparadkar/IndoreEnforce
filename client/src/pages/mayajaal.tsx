import { useState } from "react";
import ProfileAnalyzer from "@/components/mayajaal/profile-analyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NetworkIcon, Upload, Search } from "lucide-react";

export default function MayaJaal() {
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate fake app detection
      setTimeout(() => {
        const result = {
          filename: file.name,
          detected: Math.random() > 0.5,
          appType: Math.random() > 0.5 ? "Fake Banking App" : "Legitimate App",
          confidence: Math.floor(Math.random() * 40) + 60,
        };
        
        setAnalysisResults(prev => [...prev, {
          type: "Fake App Detection",
          result
        }]);
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg">
          <NetworkIcon className="text-white mr-3" />
          MAYAJAAL - Web Intelligence System
        </h1>
        <p className="text-gray-600">
          Build digital footprints and track scammer networks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Profile Analyzer */}
        <ProfileAnalyzer onAnalysisComplete={setAnalysisResults} />

        {/* Fake App Detector */}
        <Card>
          <CardHeader>
            <CardTitle>Fake App UI Detector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Upload screen recording of suspicious app</p>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="videoUpload"
              />
              <Button 
                type="button" 
                onClick={() => document.getElementById('videoUpload')?.click()}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Upload Video
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Analysis Results */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Footprint Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisResults.length > 0 ? (
              analysisResults.map((analysis, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">{analysis.type}</h4>
                  <div className="space-y-2 text-sm">
                    {analysis.result && (
                      <>
                        <p><strong>Identifier:</strong> {analysis.result.identifier || 'N/A'}</p>
                        <p><strong>Risk Score:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            (analysis.result.riskScore || 0) > 70 
                              ? 'bg-red-100 text-red-800'
                              : (analysis.result.riskScore || 0) > 40
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {analysis.result.riskScore || 'Unknown'}/100
                          </span>
                        </p>
                        {analysis.result.reportCount && (
                          <p><strong>Reports:</strong> {analysis.result.reportCount}</p>
                        )}
                        {analysis.result.aliases && (
                          <p><strong>Known Aliases:</strong> {analysis.result.aliases.join(', ')}</p>
                        )}
                        {analysis.result.confidence && (
                          <p><strong>Confidence:</strong> {analysis.result.confidence}%</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No analysis results yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Use the analyzers above to start investigating
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
