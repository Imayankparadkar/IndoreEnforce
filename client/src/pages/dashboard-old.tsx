import { useTranslation } from "react-i18next";
import DynamicDashboard from "@/components/enhanced/dynamic-dashboard";

export default function Dashboard() {
  const { t } = useTranslation();

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
