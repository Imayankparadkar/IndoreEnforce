import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';

interface DynamicMetrics {
  totalScams: number;
  upiScams: number;
  voiceScams: number;
  resolvedCases: number;
  activeFrauds: number;
  threatLocations: number;
  riskDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  trends: {
    scamIncrease: number;
    resolutionRate: number;
    responseTime: number;
  };
  realtimeAlerts: Array<{
    id: string;
    type: string;
    location: string;
    time: string;
    severity: 'high' | 'medium' | 'low';
  }>;
}

export default function DynamicDashboard() {
  const [simulatedMetrics, setSimulatedMetrics] = useState<DynamicMetrics>({
    totalScams: 156,
    upiScams: 89,
    voiceScams: 67,
    resolvedCases: 134,
    activeFrauds: 22,
    threatLocations: 15,
    riskDistribution: { high: 12, medium: 45, low: 99 },
    trends: { scamIncrease: 12.5, resolutionRate: 85.7, responseTime: 8.2 },
    realtimeAlerts: []
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time data updates every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedMetrics(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        const fraudIncrement = Math.floor(Math.random() * 3);
        
        // Generate new alert
        const alertTypes = ['UPI Fraud', 'Voice Call Scam', 'Online Shopping Fraud', 'Phishing'];
        const locations = ['Rajwada', 'Sarafa Bazaar', 'Indore IT Park', 'Vijay Nagar', 'MG Road'];
        const severities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
        
        const newAlert = {
          id: Date.now().toString(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          time: new Date().toLocaleTimeString(),
          severity: severities[Math.floor(Math.random() * severities.length)]
        };

        return {
          ...prev,
          totalScams: prev.totalScams + increment,
          upiScams: prev.upiScams + Math.floor(increment * 0.6),
          voiceScams: prev.voiceScams + Math.floor(increment * 0.4),
          resolvedCases: prev.resolvedCases + Math.floor(increment * 0.8),
          activeFrauds: Math.max(0, prev.activeFrauds + fraudIncrement - 1),
          threatLocations: prev.threatLocations + (Math.random() > 0.7 ? 1 : 0),
          riskDistribution: {
            high: prev.riskDistribution.high + Math.floor(Math.random() * 2),
            medium: prev.riskDistribution.medium + Math.floor(Math.random() * 3),
            low: prev.riskDistribution.low + increment,
          },
          trends: {
            scamIncrease: Math.round((prev.trends.scamIncrease + Math.random() * 2 - 1) * 10) / 10,
            resolutionRate: Math.round((85 + Math.random() * 10) * 10) / 10,
            responseTime: Math.round((8 + Math.random() * 2) * 10) / 10,
          },
          realtimeAlerts: [newAlert, ...prev.realtimeAlerts.slice(0, 4)]
        };
      });
      setLastUpdate(new Date());
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    {
      title: 'Total Scams Reported',
      value: simulatedMetrics.totalScams,
      trend: simulatedMetrics.trends.scamIncrease,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: <AlertTriangle className="h-6 w-6" />,
    },
    {
      title: 'UPI Frauds',
      value: simulatedMetrics.upiScams,
      trend: (simulatedMetrics.upiScams / simulatedMetrics.totalScams) * 100,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: 'Voice Scams',
      value: simulatedMetrics.voiceScams,
      trend: (simulatedMetrics.voiceScams / simulatedMetrics.totalScams) * 100,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: 'Resolved Cases',
      value: simulatedMetrics.resolvedCases,
      trend: simulatedMetrics.trends.resolutionRate,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: 'Active Frauds',
      value: simulatedMetrics.activeFrauds,
      trend: -5.2,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: 'Threat Locations',
      value: simulatedMetrics.threatLocations,
      trend: 8.1,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: <Activity className="h-6 w-6" />,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Live Update Indicator */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Indore Cyber Defense Dashboard
          </h1>
          <p className="text-gray-600">Real-time cybercrime monitoring and prevention suite</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            Live • Updated {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Dynamic Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className={`absolute top-0 right-0 w-16 h-16 ${metric.bgColor} rounded-bl-full opacity-20`}></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                </div>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.trend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${metric.trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-600 ml-1">from last update</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Alerts Ticker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            Live Threat Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {simulatedMetrics.realtimeAlerts.length > 0 ? (
              simulatedMetrics.realtimeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-red-500"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                    <div>
                      <p className="font-medium">{alert.type} reported in {alert.location}</p>
                      <p className="text-sm text-gray-600">Active threat detected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{alert.time}</p>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No recent alerts • System monitoring active</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Level Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">High Risk</span>
              <span className="text-sm text-gray-600">{simulatedMetrics.riskDistribution.high} cases</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(simulatedMetrics.riskDistribution.high / simulatedMetrics.totalScams) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Medium Risk</span>
              <span className="text-sm text-gray-600">{simulatedMetrics.riskDistribution.medium} cases</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(simulatedMetrics.riskDistribution.medium / simulatedMetrics.totalScams) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Low Risk</span>
              <span className="text-sm text-gray-600">{simulatedMetrics.riskDistribution.low} cases</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(simulatedMetrics.riskDistribution.low / simulatedMetrics.totalScams) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}