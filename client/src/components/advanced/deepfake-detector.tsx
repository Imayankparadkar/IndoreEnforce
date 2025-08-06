import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Shield, AlertTriangle, CheckCircle, Eye, Film } from "lucide-react";

interface DeepfakeResult {
  isAuthentic: boolean;
  confidence: number;
  analysis: {
    faceAnalysis?: string;
    audioAnalysis?: string;
    metadata?: string;
    technicalMarkers?: string[];
  };
  riskLevel: 'low' | 'medium' | 'high';
}

export default function DeepfakeDetector() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DeepfakeResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();

  const analysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('media', file);
      
      const response = await apiRequest('POST', '/api/advanced/deepfake-analyze', formData);
      return response.json();
    },
    onSuccess: (data: DeepfakeResult) => {
      setAnalysisResult(data);
      setIsAnalyzing(false);
      toast({
        title: 'Analysis Complete',
        description: data.isAuthentic ? 'Media appears authentic' : 'Potential manipulation detected',
        variant: data.isAuthentic ? 'default' : 'destructive',
      });
    },
    onError: () => {
      setIsAnalyzing(false);
      toast({
        title: 'Analysis Failed',
        description: 'Unable to analyze the media file',
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type and size
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'audio/wav', 'audio/mp3'];
      const maxSize = 100 * 1024 * 1024; // 100MB
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload an image, video, or audio file',
          variant: 'destructive',
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: 'File Too Large',
          description: 'Please upload a file smaller than 100MB',
          variant: 'destructive',
        });
        return;
      }
      
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    
    analysisMutation.mutate(selectedFile);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Eye className="h-5 w-5" />;
    if (file.type.startsWith('video/')) return <Film className="h-5 w-5" />;
    return <Upload className="h-5 w-5" />;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="text-blue-600 mr-2" />
          Deepfake & Synthetic Media Detector
        </CardTitle>
        <p className="text-sm text-gray-600">
          Upload media files to detect AI-generated or manipulated content
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept="image/*,video/*,audio/*"
            onChange={handleFileSelect}
            className="hidden"
            id="media-upload"
          />
          <label htmlFor="media-upload" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium">Upload Media File</p>
            <p className="text-sm text-gray-500">
              Supports images, videos, and audio files (max 100MB)
            </p>
          </label>
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile)}
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </div>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyzing for synthetic content...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                <div className="flex items-center space-x-2">
                  {analysisResult.isAuthentic ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  <Badge
                    variant={analysisResult.isAuthentic ? "default" : "destructive"}
                  >
                    {analysisResult.isAuthentic ? 'Authentic' : 'Suspicious'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Confidence</p>
                  <p className="text-2xl font-bold">{analysisResult.confidence}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Risk Level</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(analysisResult.riskLevel)}`}></div>
                    <span className="capitalize">{analysisResult.riskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-3">
                {analysisResult.analysis.faceAnalysis && (
                  <div>
                    <p className="font-medium text-sm">Face Analysis:</p>
                    <p className="text-sm text-gray-600">{analysisResult.analysis.faceAnalysis}</p>
                  </div>
                )}
                {analysisResult.analysis.audioAnalysis && (
                  <div>
                    <p className="font-medium text-sm">Audio Analysis:</p>
                    <p className="text-sm text-gray-600">{analysisResult.analysis.audioAnalysis}</p>
                  </div>
                )}
                {analysisResult.analysis.technicalMarkers && (
                  <div>
                    <p className="font-medium text-sm">Technical Markers:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysisResult.analysis.technicalMarkers.map((marker, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {marker}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!analysisResult.isAuthentic && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ Potential Manipulation Detected</h4>
                <p className="text-sm text-red-700">
                  This media file shows signs of artificial generation or manipulation. 
                  Consider this evidence carefully and verify through additional sources.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}