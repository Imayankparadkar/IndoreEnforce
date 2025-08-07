import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TestTube, Database, Cloud, HardDrive } from "lucide-react";
import { saveReportToFirebase, getReportsFromFirebase } from "../../lib/firebase-integration";
import { saveImageToLocal, getStoredImages } from "../../lib/local-storage";

export function StorageTest() {
  const [isTestingFirebase, setIsTestingFirebase] = useState(false);
  const [isTestingLocal, setIsTestingLocal] = useState(false);
  const [testResults, setTestResults] = useState<any>({});
  const { toast } = useToast();

  const testFirebaseStorage = async () => {
    setIsTestingFirebase(true);
    try {
      // Test Firebase write
      const testReport = {
        reporterName: "Firebase Test User",
        reporterContact: "9999999999",
        scamType: "Test Scam",
        description: "Testing Firebase integration",
        location: "Indore",
        amount: 1000,
        suspiciousNumbers: ["test123"],
        suspiciousUPIs: ["test@firebase"],
        status: "new",
        riskLevel: "low",
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const savedReport = await saveReportToFirebase(testReport);
      console.log('✅ Firebase write test successful:', savedReport);

      // Test Firebase read
      const reports = await getReportsFromFirebase();
      console.log('✅ Firebase read test successful:', reports.length, 'reports');

      setTestResults(prev => ({
        ...prev,
        firebase: {
          status: 'success',
          writtenId: savedReport.id,
          totalReports: reports.length
        }
      }));

      toast({
        title: "Firebase Test Successful",
        description: `Saved report with ID: ${savedReport.id}. Total reports: ${reports.length}`,
      });

    } catch (error) {
      console.error('❌ Firebase test failed:', error);
      setTestResults(prev => ({
        ...prev,
        firebase: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));

      toast({
        title: "Firebase Test Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsTestingFirebase(false);
    }
  };

  const testLocalStorage = async () => {
    setIsTestingLocal(true);
    try {
      // Create a test image blob
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('TEST', 25, 55);
      }

      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      // Create File object
      const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
      const testReportId = 'test-report-' + Date.now();

      // Test local storage
      const imageId = await saveImageToLocal(testFile, testReportId);
      console.log('✅ Local storage write test successful:', imageId);

      // Test local storage read
      const storedImages = getStoredImages();
      console.log('✅ Local storage read test successful:', Object.keys(storedImages).length, 'images');

      setTestResults(prev => ({
        ...prev,
        localStorage: {
          status: 'success',
          imageId: imageId,
          totalImages: Object.keys(storedImages).length
        }
      }));

      toast({
        title: "Local Storage Test Successful",
        description: `Saved image with ID: ${imageId}. Total images: ${Object.keys(storedImages).length}`,
      });

    } catch (error) {
      console.error('❌ Local storage test failed:', error);
      setTestResults(prev => ({
        ...prev,
        localStorage: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));

      toast({
        title: "Local Storage Test Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsTestingLocal(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Storage Integration Tests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Firebase Test */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span className="font-medium">Firebase Database Test</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={testFirebaseStorage}
              disabled={isTestingFirebase}
              size="sm"
            >
              {isTestingFirebase ? 'Testing...' : 'Test Firebase'}
            </Button>
            {testResults.firebase && (
              <Badge variant={testResults.firebase.status === 'success' ? "default" : "destructive"}>
                {testResults.firebase.status}
              </Badge>
            )}
          </div>
        </div>

        {/* Local Storage Test */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span className="font-medium">Local Image Storage Test</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={testLocalStorage}
              disabled={isTestingLocal}
              size="sm"
            >
              {isTestingLocal ? 'Testing...' : 'Test Local Storage'}
            </Button>
            {testResults.localStorage && (
              <Badge variant={testResults.localStorage.status === 'success' ? "default" : "destructive"}>
                {testResults.localStorage.status}
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        {Object.keys(testResults).length > 0 && (
          <div className="p-3 bg-gray-50 border rounded-lg">
            <h4 className="font-medium mb-2">Test Results</h4>
            <div className="space-y-2 text-sm">
              {testResults.firebase && (
                <div>
                  <strong>Firebase:</strong> {testResults.firebase.status === 'success' 
                    ? `✅ Success - ${testResults.firebase.totalReports} reports total`
                    : `❌ Failed - ${testResults.firebase.error}`
                  }
                </div>
              )}
              {testResults.localStorage && (
                <div>
                  <strong>Local Storage:</strong> {testResults.localStorage.status === 'success' 
                    ? `✅ Success - ${testResults.localStorage.totalImages} images total`
                    : `❌ Failed - ${testResults.localStorage.error}`
                  }
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-blue-50 border border-blue-200 rounded">
          <strong>Note:</strong> This tests the hybrid storage approach where reports go to Firebase for real-time sync, 
          while images are stored locally for privacy and performance.
        </div>
      </CardContent>
    </Card>
  );
}