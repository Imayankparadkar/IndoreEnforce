import { useQuery } from "@tanstack/react-query";
import MetricsCards from "@/components/dashboard/metrics-cards";
import Charts from "@/components/dashboard/charts";
import FraudNumbers from "@/components/dashboard/fraud-numbers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: recentReports } = useQuery({
    queryKey: ["/api/scam-reports"],
    refetchInterval: 60000, // Refresh every minute
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recentAlerts = Array.isArray(recentReports) ? recentReports.slice(0, 5).map((report: any) => ({
    id: report.id,
    type: report.scamType,
    location: report.location || "Unknown",
    time: new Date(report.createdAt).toLocaleTimeString(),
    severity: report.riskLevel,
  })) : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Indore Cyber Defense Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time cybercrime monitoring and prevention suite
        </p>
      </div>

      {/* Metrics Cards */}
      <MetricsCards analytics={analytics} />

      {/* Charts */}
      <Charts analytics={analytics} />

      {/* Active Fraud Numbers */}
      <FraudNumbers />

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="text-orange-500 mr-2" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.length > 0 ? (
              recentAlerts.map((alert: any) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {alert.type} reported in {alert.location}
                    </p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "high"
                        ? "destructive"
                        : alert.severity === "medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
                <p>No recent alerts</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
