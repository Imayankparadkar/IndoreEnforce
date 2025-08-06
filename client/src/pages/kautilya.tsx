import { useState } from "react";
import CaseAnalyzer from "@/components/kautilya/case-analyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

export default function Kautilya() {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [caseTimeline, setCaseTimeline] = useState<any[]>([]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Brain className="text-blue-600 mr-3" />
          KAUTILYA - AI Investigation Assistant
        </h1>
        <p className="text-gray-600">
          Advanced AI-powered cybercrime case analysis and investigation
        </p>
      </div>

      {/* Case Analyzer */}
      <CaseAnalyzer 
        onAnalysisComplete={setAnalysisResults}
        onTimelineGenerated={setCaseTimeline}
      />

      {/* Case Timeline */}
      {caseTimeline.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Similar Cases Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseTimeline.map((case_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Case #{case_.id}</p>
                        <p className="text-sm text-gray-600">{case_.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{case_.amount?.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          case_.status === 'Resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : case_.status === 'Under Investigation'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {case_.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
