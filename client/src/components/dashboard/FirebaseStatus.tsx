import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Cloud, HardDrive, RefreshCw } from "lucide-react";
import { getReportsFromFirebase, listenToReports } from "../../lib/firebase-integration";
import { getStoredImages } from "../../lib/local-storage";

export function FirebaseStatus() {
  const [firebaseReports, setFirebaseReports] = useState<any[]>([]);
  const [localImages, setLocalImages] = useState<Record<string, any>>({});
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check Firebase connection and load data
    checkFirebaseConnection();
    loadLocalImages();
    
    // Set up real-time listener for Firebase
    const unsubscribe = listenToReports((reports) => {
      setFirebaseReports(reports);
      setIsConnected(true);
    });

    return () => unsubscribe();
  }, []);

  const checkFirebaseConnection = async () => {
    setIsLoading(true);
    try {
      const reports = await getReportsFromFirebase();
      setFirebaseReports(reports);
      setIsConnected(true);
      console.log('✅ Firebase connected, reports:', reports.length);
    } catch (error) {
      console.error('❌ Firebase connection failed:', error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocalImages = () => {
    const images = getStoredImages();
    setLocalImages(images);
    console.log('📁 Local images loaded:', Object.keys(images).length);
  };

  const refreshData = () => {
    checkFirebaseConnection();
    loadLocalImages();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Storage Status
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Firebase Status */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              <span className="font-medium">Firebase Database</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isConnected ? "default" : "destructive"}>
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
              <span className="text-sm text-gray-600">
                {firebaseReports.length} reports
              </span>
            </div>
          </div>

          {/* Local Storage Status */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              <span className="font-medium">Local Image Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Active</Badge>
              <span className="text-sm text-gray-600">
                {Object.keys(localImages).length} images
              </span>
            </div>
          </div>

          {/* Storage Strategy Info */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Storage Strategy</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Report data → Firebase (real-time sync)</li>
              <li>• Images & files → Local storage (privacy)</li>
              <li>• Officer actions → Firebase (audit trail)</li>
              <li>• Threat data → Firebase (live updates)</li>
            </ul>
          </div>

          {/* Recent Firebase Reports */}
          {firebaseReports.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Recent Firebase Reports</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {firebaseReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="text-sm p-2 bg-gray-50 rounded">
                    <div className="font-medium">{report.reporterName}</div>
                    <div className="text-gray-600">{report.scamType} - ₹{report.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}