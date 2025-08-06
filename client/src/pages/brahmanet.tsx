import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Phone, FileText, Upload, Shield, AlertTriangle, Scale, Zap } from "lucide-react";
import WorkingReportForm from "@/components/enhanced/working-report-form";
import DeepfakeDetector from "@/components/advanced/deepfake-detector";
import VoiceprintAnalyzer from "@/components/advanced/voiceprint-analyzer";
import RealTimeScamInterruptor from "@/components/advanced/real-time-interruptor";
import AutoLegalGenerator from "@/components/advanced/auto-legal-generator";

export default function BrahmaNet() {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900">
          {t('nav.brahmanet')} - Citizen Engagement Portal
        </h1>
        <p className="text-gray-600 mt-2">
          Advanced AI-powered cybercrime reporting and prevention tools for citizens
        </p>
      </div>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="report" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Report Crime</span>
          </TabsTrigger>
          <TabsTrigger value="deepfake" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Deepfake Detector</span>
          </TabsTrigger>
          <TabsTrigger value="voiceprint" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Voice Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Call Guardian</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center space-x-2">
            <Scale className="h-4 w-4" />
            <span>Legal Docs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="text-red-600 mr-2" />
                {t('report.title')}
              </CardTitle>
              <p className="text-gray-600">
                Complete cybercrime reporting with AI-powered analysis and evidence processing
              </p>
            </CardHeader>
          </Card>
          <WorkingReportForm />
        </TabsContent>

        <TabsContent value="deepfake" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="text-blue-600 mr-2" />
                AI-Powered Media Authentication
              </CardTitle>
              <p className="text-gray-600">
                Detect deepfakes, synthetic media, and manipulated content using advanced AI
              </p>
            </CardHeader>
          </Card>
          <DeepfakeDetector />
        </TabsContent>

        <TabsContent value="voiceprint" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="text-purple-600 mr-2" />
                Voice Pattern Analysis
              </CardTitle>
              <p className="text-gray-600">
                Identify and track scammers through unique voice fingerprinting technology
              </p>
            </CardHeader>
          </Card>
          <VoiceprintAnalyzer />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="text-yellow-600 mr-2" />
                Real-Time Call Protection
              </CardTitle>
              <p className="text-gray-600">
                Live conversation monitoring with instant scam detection and intervention
              </p>
            </CardHeader>
          </Card>
          <RealTimeScamInterruptor />
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="text-green-600 mr-2" />
                Automated Legal Documentation
              </CardTitle>
              <p className="text-gray-600">
                Generate pre-filled legal documents ready for submission to authorities
              </p>
            </CardHeader>
          </Card>
          <AutoLegalGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}