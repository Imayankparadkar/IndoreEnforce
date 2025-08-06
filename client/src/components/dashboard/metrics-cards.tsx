import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Smartphone, Phone, Shield } from "lucide-react";

interface MetricsCardsProps {
  analytics: any;
}

export default function MetricsCards({ analytics }: MetricsCardsProps) {
  const metrics = [
    {
      title: "Total Scams (30d)",
      value: analytics?.totalScams || 0,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "UPI Frauds",
      value: analytics?.upiScams || 0,
      icon: Smartphone,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Voice Scams",
      value: analytics?.voiceScams || 0,
      icon: Phone,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Cases Resolved",
      value: analytics?.resolvedCases || 0,
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={index} 
            className={`shadow-lg ${index === 0 ? 'glow-effect' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${metric.bgColor} ${metric.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
