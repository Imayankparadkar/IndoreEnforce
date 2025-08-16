import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ThreatMap from "@/components/vajra/threat-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Map, MapPin, BarChart3, Clock, Shield, AlertTriangle, CheckCircle, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PoliceStation {
  id: string;
  name: string;
  location: [number, number];
  contact: string;
  notified: boolean;
  lastAlert: Date | null;
}

interface HeatZone {
  id: string;
  center: [number, number];
  radius: number;
  intensity: 'low' | 'medium' | 'high';
  scamCount: number;
  lastUpdated: Date;
}

export default function Vajra() {
  const [filters, setFilters] = useState({
    scamType: "all",
    timeframe: "24h",
    riskLevel: "all",
  });
  
  const [policeAlerts, setPoliceAlerts] = useState<Array<{
    id: string;
    station: string;
    location: string;
    threat: string;
    timestamp: Date;
    status: 'sent' | 'acknowledged' | 'responded';
  }>>([]);
  
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

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

  // Mock police stations data
  const policeStations: PoliceStation[] = [
    {
      id: "ps1",
      name: "Vijay Nagar Police Station",
      location: [22.7196, 75.8577],
      contact: "0731-2530530",
      notified: true,
      lastAlert: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      id: "ps2", 
      name: "Palasia Police Station",
      location: [22.7074, 75.8561],
      contact: "0731-2530531",
      notified: false,
      lastAlert: null
    },
    {
      id: "ps3",
      name: "MIG Police Station", 
      location: [22.6868, 75.8630],
      contact: "0731-2530532",
      notified: true,
      lastAlert: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
    }
  ];

  // Mock heat zones data
  const heatZones: HeatZone[] = [
    {
      id: "hz1",
      center: [22.7196, 75.8577],
      radius: 2000,
      intensity: 'high',
      scamCount: 15,
      lastUpdated: new Date()
    },
    {
      id: "hz2", 
      center: [22.7074, 75.8561],
      radius: 1500,
      intensity: 'medium',
      scamCount: 8,
      lastUpdated: new Date()
    },
    {
      id: "hz3",
      center: [22.6868, 75.8630],
      radius: 1000,
      intensity: 'low',
      scamCount: 3,
      lastUpdated: new Date()
    }
  ];

  // Generate police alerts
  useEffect(() => {
    const generateAlert = () => {
      const alerts = [
        {
          id: Date.now().toString(),
          station: "Vijay Nagar Police Station",
          location: "Vijay Nagar Area",
          threat: "High UPI fraud activity detected",
          timestamp: new Date(),
          status: 'sent' as const
        }
      ];
      setPoliceAlerts(prev => [...alerts, ...prev].slice(0, 10));
    };

    // Generate initial alerts and periodic updates
    generateAlert();
    const interval = setInterval(generateAlert, 120000); // Every 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg">
          <Map className="text-white mr-3" />
          TRINETRA - Real-Time Threat Map
        </h1>
        <p className="text-white">
          Visualize cybercrime patterns across Indore in real-time with police notifications and heat zones
        </p>
      </div>

      {/* Police Alert System */}
      <AnimatePresence>
        {policeAlerts.slice(0, 3).map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <Alert className="border-orange-200 bg-orange-50">
              <Bell className="h-4 w-4 text-orange-600" />
              <AlertDescription className="ml-2">
                <div className="flex items-center justify-between">
                  <div>
                    <strong>Police Notification:</strong> {alert.threat} in {alert.location}
                    <div className="text-xs text-gray-600 mt-1">
                      Sent to {alert.station} at {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <Badge 
                    variant={alert.status === 'sent' ? 'destructive' : alert.status === 'acknowledged' ? 'secondary' : 'default'}
                    className="ml-4"
                  >
                    {alert.status === 'sent' ? 'Police Notified' : alert.status === 'acknowledged' ? 'Acknowledged' : 'Responding'}
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>

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

      {/* Police Stations Status Panel */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Police Station Alert Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policeStations.map((station) => (
              <div key={station.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    station.notified ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{station.name}</div>
                    <div className="text-xs text-gray-600">{station.contact}</div>
                  </div>
                </div>
                <div className="text-right">
                  {station.notified ? (
                    <Badge variant="destructive" className="text-xs">
                      Alert Sent
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Standby
                    </Badge>
                  )}
                  {station.lastAlert && (
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.floor((Date.now() - station.lastAlert.getTime()) / 60000)}m ago
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Heat Zones Legend */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Threat Heat Zones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heatZones.map((zone) => (
              <div key={zone.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    zone.intensity === 'high' ? 'bg-red-500' :
                    zone.intensity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <div className="font-medium text-sm capitalize">{zone.intensity} Risk Zone</div>
                    <div className="text-xs text-gray-600">{zone.scamCount} active reports</div>
                  </div>
                </div>
                <Badge 
                  variant={zone.intensity === 'high' ? 'destructive' : 
                         zone.intensity === 'medium' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {zone.intensity.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Interactive Threat Map with Police Notifications</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleUpdateMap}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Refresh Data
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ThreatMap 
            threatData={threatData} 
            filters={filters}
            policeStations={policeStations}
            heatZones={heatZones}
            onMarkerClick={setSelectedMarker}
          />
        </CardContent>
      </Card>
      
      {/* Selected Marker Details */}
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Incident Details</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedMarker(null)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">Scam Type</div>
                  <div className="text-lg font-semibold">{selectedMarker.scamType}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Risk Level</div>
                  <Badge 
                    variant={selectedMarker.riskLevel === 'high' ? 'destructive' : 
                           selectedMarker.riskLevel === 'medium' ? 'secondary' : 'outline'}
                  >
                    {selectedMarker.riskLevel?.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Location</div>
                  <div>{selectedMarker.location}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Reports</div>
                  <div>{selectedMarker.reportCount} incidents</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

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
