import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Mic, Headphones, AlertCircle, Users, Waveform } from "lucide-react";

interface VoiceprintMatch {
  id: string;
  similarity: number;
  scammerProfile: {
    id: string;
    knownAliases: string[];
    reportCount: number;
    lastActive: string;
    operationRegions: string[];
  };
}

interface VoiceprintAnalysis {
  voiceprintId: string;
  isNewVoice: boolean;
  matches: VoiceprintMatch[];
  audioQuality: number;
  extractedFeatures: {
    pitch: number;
    tone: string;
    accent: string;
    speechPattern: string;
  };
  confidence: number;
}

export default function VoiceprintAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<VoiceprintAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();

  const { data: knownVoiceprints } = useQuery({
    queryKey: ['/api/advanced/voiceprints'],
    refetchInterval: 60000,
  });

  const analysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('audio', file);
      
      const response = await apiRequest('POST', '/api/advanced/voiceprint-analyze', formData);
      return response.json();
    },
    onSuccess: (data: VoiceprintAnalysis) => {
      setAnalysisResult(data);
      setIsAnalyzing(false);
      setProgress(100);
      
      if (data.matches.length > 0) {
        toast({
          title: 'Voiceprint Match Found!',
          description: `Found ${data.matches.length} potential matches with known scammers`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Analysis Complete',
          description: data.isNewVoice ? 'New voice pattern recorded' : 'No matches found',
        });
      }
    },
    onError: () => {
      setIsAnalyzing(false);
      toast({
        title: 'Analysis Failed',
        description: 'Unable to analyze the audio file',
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['audio/wav', 'audio/mp3', 'audio/m4a', 'audio/ogg'];
      const maxSize = 50 * 1024 * 1024; // 50MB
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload an audio file (WAV, MP3, M4A, OGG)',
          variant: 'destructive',
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: 'File Too Large',
          description: 'Please upload an audio file smaller than 50MB',
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
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 800);
    
    analysisMutation.mutate(selectedFile);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Waveform className="text-purple-600 mr-2" />
            Voiceprint Profiling System
          </CardTitle>
          <p className="text-sm text-gray-600">
            Analyze call recordings to identify and cluster voices from known scam operations
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {Array.isArray(knownVoiceprints) ? knownVoiceprints.length : 0}
              </p>
              <p className="text-sm text-gray-600">Known Voiceprints</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {analysisResult?.matches.length || 0}
              </p>
              <p className="text-sm text-gray-600">Current Matches</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {analysisResult?.confidence || 0}%
              </p>
              <p className="text-sm text-gray-600">Analysis Confidence</p>
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
            <Input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
              id="audio-upload"
            />
            <label htmlFor="audio-upload" className="cursor-pointer">
              <Mic className="mx-auto h-12 w-12 text-purple-400 mb-4" />
              <p className="text-lg font-medium">Upload Call Recording</p>
              <p className="text-sm text-gray-500">
                Supports WAV, MP3, M4A, OGG files (max 50MB)
              </p>
            </label>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Headphones className="h-5 w-5 text-purple-600" />
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
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Voice'}
                </Button>
              </div>
            </div>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Extracting voiceprint features...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-500">
                Processing audio quality, pitch analysis, and pattern matching...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-4">
          {/* Voice Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Voice Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Audio Quality</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysisResult.audioQuality} className="flex-1" />
                    <span className="text-sm">{analysisResult.audioQuality}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Analysis Confidence</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysisResult.confidence} className="flex-1" />
                    <span className="text-sm">{analysisResult.confidence}%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Extracted Features</p>
                  <div className="space-y-1 mt-1">
                    <Badge variant="outline">Pitch: {analysisResult.extractedFeatures.pitch}Hz</Badge>
                    <Badge variant="outline">Tone: {analysisResult.extractedFeatures.tone}</Badge>
                    <Badge variant="outline">Accent: {analysisResult.extractedFeatures.accent}</Badge>
                    <Badge variant="outline">Pattern: {analysisResult.extractedFeatures.speechPattern}</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Voice Status</p>
                  <Badge 
                    variant={analysisResult.isNewVoice ? "default" : "destructive"}
                    className="mt-1"
                  >
                    {analysisResult.isNewVoice ? 'New Voice Pattern' : 'Known Voice Pattern'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matches */}
          {analysisResult.matches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertCircle className="mr-2" />
                  Potential Scammer Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.matches.map((match, index) => (
                    <div key={match.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Match #{index + 1}</h4>
                        <Badge variant="destructive">
                          {match.similarity}% similarity
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Known Aliases:</p>
                          <p className="text-gray-600">
                            {match.scammerProfile.knownAliases.join(', ') || 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Report Count:</p>
                          <p className="text-gray-600">{match.scammerProfile.reportCount} reports</p>
                        </div>
                        <div>
                          <p className="font-medium">Last Active:</p>
                          <p className="text-gray-600">
                            {new Date(match.scammerProfile.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Operation Regions:</p>
                          <p className="text-gray-600">
                            {match.scammerProfile.operationRegions.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}