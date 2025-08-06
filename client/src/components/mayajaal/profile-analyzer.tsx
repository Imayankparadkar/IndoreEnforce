import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Loader2 } from "lucide-react";

interface ProfileAnalyzerProps {
  onAnalysisComplete: (results: any[]) => void;
}

export default function ProfileAnalyzer({ onAnalysisComplete }: ProfileAnalyzerProps) {
  const [analyzers, setAnalyzers] = useState({
    upi: "",
    whatsapp: "",
    telegram: "",
  });

  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async ({ identifier, type }: { identifier: string; type: string }) => {
      const response = await apiRequest("POST", "/api/fraud-identifiers/analyze", {
        identifier,
        type,
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      onAnalysisComplete((prev: any) => [...prev, {
        type: `${variables.type.toUpperCase()} Analysis`,
        result: data
      }]);
      
      toast({
        title: "Analysis Complete",
        description: `${variables.type} identifier analyzed successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze identifier",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (type: 'upi' | 'whatsapp' | 'telegram') => {
    const identifier = analyzers[type];
    if (!identifier) {
      toast({
        title: "Missing Input",
        description: `Please enter a ${type} identifier`,
        variant: "destructive",
      });
      return;
    }

    analysisMutation.mutate({ identifier, type });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scammer Profile Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="upi">UPI ID Analysis</Label>
            <div className="flex space-x-2">
              <Input
                id="upi"
                placeholder="Enter UPI ID"
                value={analyzers.upi}
                onChange={(e) =>
                  setAnalyzers((prev) => ({ ...prev, upi: e.target.value }))
                }
              />
              <Button
                onClick={() => handleAnalyze('upi')}
                disabled={analysisMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {analysisMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp Number Check</Label>
            <div className="flex space-x-2">
              <Input
                id="whatsapp"
                placeholder="Enter WhatsApp number"
                value={analyzers.whatsapp}
                onChange={(e) =>
                  setAnalyzers((prev) => ({ ...prev, whatsapp: e.target.value }))
                }
              />
              <Button
                onClick={() => handleAnalyze('whatsapp')}
                disabled={analysisMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {analysisMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="telegram">Telegram Handle Lookup</Label>
            <div className="flex space-x-2">
              <Input
                id="telegram"
                placeholder="Enter Telegram handle"
                value={analyzers.telegram}
                onChange={(e) =>
                  setAnalyzers((prev) => ({ ...prev, telegram: e.target.value }))
                }
              />
              <Button
                onClick={() => handleAnalyze('telegram')}
                disabled={analysisMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {analysisMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
