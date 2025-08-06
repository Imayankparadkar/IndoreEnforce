import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ban, Phone } from "lucide-react";

export default function FraudNumbers() {
  const { data: fraudIdentifiers } = useQuery({
    queryKey: ["/api/fraud-identifiers"],
    refetchInterval: 60000,
  });

  const activeFrauds = Array.isArray(fraudIdentifiers) ? fraudIdentifiers.filter((fraud: any) => 
    fraud.type === 'phone' && fraud.riskScore > 50
  ).slice(0, 6) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Ban className="text-red-500 mr-2" />
          Active Fraud Numbers (Live Blacklist)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeFrauds.length > 0 ? (
            activeFrauds.map((fraud: any) => (
              <div 
                key={fraud.id}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{fraud.identifier}</span>
                  <Badge 
                    variant={
                      fraud.riskScore > 80 
                        ? "destructive" 
                        : fraud.riskScore > 60 
                        ? "default" 
                        : "secondary"
                    }
                  >
                    {fraud.riskScore > 80 ? 'High' : fraud.riskScore > 60 ? 'Medium' : 'Low'} Risk
                  </Badge>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="mr-3">📱 {fraud.type}</span>
                  <span>📊 {fraud.reportCount} reports</span>
                </div>
                {fraud.aliases && fraud.aliases.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Aliases: {fraud.aliases.slice(0, 2).join(', ')}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <Phone className="mx-auto h-12 w-12 mb-4" />
              <p>No active fraud numbers detected</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
