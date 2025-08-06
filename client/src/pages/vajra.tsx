import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ThreatMap from "@/components/vajra/threat-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin, BarChart3, Clock } from "lucide-react";

export default function Vajra() {
  const [filters, setFilters] = useState({
    scamType: "all",
    timeframe: "24h",
    riskLevel: "all",
  });

  const { data: threatData, refetch } = useQuery({
    queryKey: ["/api/threat-data"],
    refetchInterval: 30000,
  });

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
  });

  const handleUpdateMap = () => {
    refetch();
  };

  const topAreas = Array.isArray(threatData) ? threatData.sort((a: any, b: any) => b.reportCount - a.reportCount).slice(0, 5) : [];

  const realtimeStats = [
    { label: "Active Threats", value: Array.isArray(threatData) ? threatData.length : 0, icon: "⚠️" },
    { label: "Reports Today", value: Math.floor(Math.random() * 50) + 10, icon: "📊" },
    { label: "Blocked Numbers", value: Math.floor(Math.random() * 500) + 100, icon: "🚫" },
    { label: "Response Time", value: `${Math.floor(Math.random() * 15) + 2} min`, icon: "⏱️" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Map className="text-blue-600 mr-3" />
          VAJRA - Real-Time Threat Map
        </h1>
        <p className="text-gray-600">
          Visualize cybercrime patterns across Indore in real-time
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scam Type
              </label>
              <Select 
                value={filters.scamType}
                onValueChange={(value) => setFilters(prev => ({ ...prev, scamType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="UPI">UPI Fraud</SelectItem>
                  <SelectItem value="Voice">Voice Call Scam</SelectItem>
                  <SelectItem value="Job">Job Scam</SelectItem>
                  <SelectItem value="Loan">Loan Scam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <Select 
                value={filters.timeframe}
                onValueChange={(value) => setFilters(prev => ({ ...prev, timeframe: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Level
              </label>
              <Select 
                value={filters.riskLevel}
                onValueChange={(value) => setFilters(prev => ({ ...prev, riskLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleUpdateMap} className="w-full bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="mr-2 h-4 w-4" />
                Update Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card>
        <CardContent className="pt-6">
          <ThreatMap threatData={threatData} filters={filters} />
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Scam Areas */}
        <Card>
          <CardHeader>
            <CardTitle>Top Scam-Prone Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAreas.map((area: any, index: number) => (
                <div
                  key={area.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-blue-600 mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{area.location}</p>
                      <p className="text-sm text-gray-600">{area.scamType} scams</p>
                    </div>
                  </div>
                  <Badge variant="destructive">
                    {area.reportCount} cases
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {realtimeStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-xl">{stat.icon}</span>
                    <span className="font-medium">{stat.label}</span>
                  </div>
                  <span className="font-bold text-blue-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
