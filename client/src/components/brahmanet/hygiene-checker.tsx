import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function HygieneChecker() {
  const [answers, setAnswers] = useState({
    apk: "",
    otp: "",
    links: "",
  });
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const assessmentMutation = useMutation({
    mutationFn: async (answers: any) => {
      const response = await apiRequest("POST", "/api/cyber-hygiene/assess", { answers });
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      toast({
        title: "Assessment Complete",
        description: `Your cyber hygiene score: ${data.score}/100`,
      });
    },
    onError: () => {
      toast({
        title: "Assessment Failed",
        description: "Unable to calculate hygiene score",
        variant: "destructive",
      });
    },
  });

  const handleCalculate = () => {
    if (!answers.apk || !answers.otp || !answers.links) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions",
        variant: "destructive",
      });
      return;
    }

    assessmentMutation.mutate(answers);
  };

  const getScoreIcon = (level: string) => {
    switch (level) {
      case 'Safe':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'Risky':
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      case 'Dangerous':
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Shield className="h-8 w-8 text-gray-600" />;
    }
  };

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'Safe':
        return 'text-green-800 bg-green-50 border-green-200';
      case 'Risky':
        return 'text-yellow-800 bg-yellow-50 border-yellow-200';
      case 'Dangerous':
        return 'text-red-800 bg-red-50 border-red-200';
      default:
        return 'text-gray-800 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="text-blue-600 mr-2" />
          Cyber Hygiene Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-800 mb-4">
              Do you download APK files from unknown sources?
            </p>
            <RadioGroup
              value={answers.apk}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, apk: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="apk-yes" />
                <Label htmlFor="apk-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="apk-no" />
                <Label htmlFor="apk-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-800 mb-4">
              Have you ever shared OTPs with unknown callers?
            </p>
            <RadioGroup
              value={answers.otp}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, otp: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="otp-yes" />
                <Label htmlFor="otp-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="otp-no" />
                <Label htmlFor="otp-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-800 mb-4">
              Do you click on links in SMS from unknown numbers?
            </p>
            <RadioGroup
              value={answers.links}
              onValueChange={(value) => setAnswers(prev => ({ ...prev, links: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="links-yes" />
                <Label htmlFor="links-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="links-no" />
                <Label htmlFor="links-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={assessmentMutation.isPending}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {assessmentMutation.isPending ? "Calculating..." : "Calculate My Score"}
          </Button>

          {result && (
            <div className={`border rounded-lg p-6 ${getScoreColor(result.level)}`}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getScoreIcon(result.level)}
                </div>
                <div className="text-3xl font-bold mb-2">{result.score}/100</div>
                <Badge 
                  variant={
                    result.level === 'Safe' ? 'default' :
                    result.level === 'Risky' ? 'secondary' : 'destructive'
                  }
                  className="text-lg px-4 py-1 mb-4"
                >
                  {result.level}
                </Badge>
                <div className="space-y-2">
                  {result.feedback && result.feedback.map((item: string, index: number) => (
                    <p key={index} className="text-sm">{item}</p>
                  ))}
                </div>
                {result.recommendations && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Recommendations:</h4>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec: string, index: number) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
