import { useEffect, useRef } from "react";

interface ThreatMapProps {
  threatData: any[];
  filters: {
    scamType: string;
    timeframe: string;
    riskLevel: string;
  };
}

export default function ThreatMap({ threatData, filters }: ThreatMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.L && mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const indoreCenter = [22.7196, 75.8577];
      mapInstanceRef.current = window.L.map(mapRef.current).setView(indoreCenter, 12);

      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && threatData && window.L) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof window.L.Circle) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Filter threat data based on filters
      let filteredData = threatData;
      
      if (filters.scamType !== 'all') {
        filteredData = filteredData.filter((threat: any) => 
          threat.scamType === filters.scamType
        );
      }
      
      if (filters.riskLevel !== 'all') {
        filteredData = filteredData.filter((threat: any) => 
          threat.severity === filters.riskLevel
        );
      }

      // Add threat markers
      filteredData.forEach((threat: any) => {
        const radius = threat.reportCount * 20;
        const color = getColorByScamType(threat.scamType);
        
        window.L.circle([parseFloat(threat.latitude), parseFloat(threat.longitude)], {
          color: color,
          fillColor: color,
          fillOpacity: 0.3,
          radius: radius
        }).addTo(mapInstanceRef.current).bindPopup(`
          <b>${threat.location}</b><br>
          ${threat.reportCount} ${threat.scamType} scams<br>
          <small>Severity: ${threat.severity}</small>
        `);
      });
    }
  }, [threatData, filters]);

  const getColorByScamType = (scamType: string) => {
    switch (scamType) {
      case 'UPI': return '#f97316';
      case 'Voice': return '#ef4444';
      case 'Job': return '#22c55e';
      case 'Phishing': return '#3b82f6';
      case 'Loan': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-lg border border-gray-200"
      style={{ minHeight: '400px' }}
    />
  );
}
