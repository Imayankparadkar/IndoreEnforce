import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, DollarSign, Activity, Clock } from "lucide-react";

interface WalletAnalysisProps {
  analysis?: {
    address: string;
    type: 'BTC' | 'ETH';
    balance: string;
    transactions: any[];
    riskScore: number;
    riskFactors: string[];
    lastActivity: string;
  };
}

export default function WalletAnalysis({ analysis }: WalletAnalysisProps) {
  if (!analysis) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No wallet analysis available</p>
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 60) return "bg-orange-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getRiskBadgeColor = (score: number) => {
    if (score >= 80) return "destructive";
    if (score >= 60) return "secondary";
    if (score >= 40) return "outline";
    return "default";
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Wallet Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Address Type</p>
              <Badge variant="outline" className="mt-1">{analysis.type}</Badge>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-lg font-semibold">{analysis.balance} {analysis.type}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-lg font-semibold">{analysis.transactions.length}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last Activity
              </p>
              <p className="text-sm font-medium">{analysis.lastActivity}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Address:</p>
            <code className="text-xs bg-gray-100 p-2 rounded block break-all">
              {analysis.address}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Risk Score</span>
              <Badge variant={getRiskBadgeColor(analysis.riskScore)}>
                {analysis.riskScore}/100
              </Badge>
            </div>
            
            <Progress 
              value={analysis.riskScore} 
              className={`w-full h-3 ${getRiskColor(analysis.riskScore)}`}
            />

            <div className="space-y-2">
              <h4 className="font-medium">Risk Factors:</h4>
              {analysis.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <span>{factor}</span>
                </div>
              ))}
            </div>

            {analysis.riskScore >= 70 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm font-medium text-red-800">High Risk Wallet</span>
                </div>
                <p className="text-xs text-red-600 mt-1">
                  This wallet shows multiple suspicious patterns. Proceed with caution.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}