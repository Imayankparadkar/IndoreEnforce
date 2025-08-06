import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Scale, Stamp } from "lucide-react";

interface LegalDocument {
  id: string;
  type: 'complaint' | 'notice' | 'affidavit' | 'fir_draft';
  title: string;
  content: string;
  generatedAt: string;
  caseDetails: {
    reportId: string;
    scamType: string;
    amount: number;
    evidence: string[];
  };
}

interface GenerateDocumentRequest {
  reportId: string;
  documentType: string;
  additionalDetails?: string;
}

export default function AutoLegalGenerator() {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('complaint');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState<LegalDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (request: GenerateDocumentRequest) => {
      const response = await apiRequest('POST', '/api/advanced/generate-legal-document', request);
      return response.json();
    },
    onSuccess: (data: LegalDocument) => {
      setGeneratedDocument(data);
      setIsGenerating(false);
      toast({
        title: 'Document Generated',
        description: `${data.type.toUpperCase()} has been generated successfully`,
      });
    },
    onError: () => {
      setIsGenerating(false);
      toast({
        title: 'Generation Failed',
        description: 'Unable to generate the legal document',
        variant: 'destructive',
      });
    },
  });

  const handleGenerate = () => {
    if (!selectedReport || !documentType) {
      toast({
        title: 'Missing Information',
        description: 'Please select a report and document type',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    generateMutation.mutate({
      reportId: selectedReport,
      documentType,
      additionalDetails,
    });
  };

  const downloadDocument = () => {
    if (!generatedDocument) return;
    
    const element = document.createElement('a');
    const file = new Blob([generatedDocument.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedDocument.type}_${generatedDocument.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Download Started',
      description: 'Legal document is being downloaded',
    });
  };

  const documentTypes = [
    {
      id: 'complaint',
      title: 'Police Complaint',
      description: 'Formal complaint to file with local police',
      icon: <Scale className="h-5 w-5" />,
    },
    {
      id: 'fir_draft',
      title: 'FIR Draft',
      description: 'First Information Report draft',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 'notice',
      title: 'Legal Notice',
      description: 'Notice to the accused party',
      icon: <Stamp className="h-5 w-5" />,
    },
    {
      id: 'affidavit',
      title: 'Affidavit',
      description: 'Sworn statement of facts',
      icon: <Eye className="h-5 w-5" />,
    },
  ];

  // Mock recent reports for selection
  const recentReports = [
    { id: 'RPT-001', type: 'UPI Fraud', amount: 25000, date: '2024-01-15' },
    { id: 'RPT-002', type: 'Voice Call Scam', amount: 50000, date: '2024-01-14' },
    { id: 'RPT-003', type: 'Online Shopping Fraud', amount: 15000, date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="text-green-600 mr-2" />
            Auto-Generated Legal Document Draft
          </CardTitle>
          <p className="text-sm text-gray-600">
            Generate pre-filled legal documents ready for submission to authorities
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Report Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Report
            </label>
            <div className="grid gap-2">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedReport === report.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{report.id}</p>
                      <p className="text-sm text-gray-600">{report.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{report.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{report.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {documentTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    documentType === type.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDocumentType(type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-green-600">{type.icon}</div>
                    <div>
                      <h4 className="font-medium">{type.title}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details (Optional)
            </label>
            <Textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Add any specific details, witness information, or special circumstances..."
              rows={4}
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedReport || !documentType}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? 'Generating...' : 'Generate Legal Document'}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Document */}
      {generatedDocument && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <FileText className="text-green-600 mr-2" />
                {generatedDocument.title}
              </CardTitle>
              <div className="flex space-x-2">
                <Badge variant="outline">
                  {generatedDocument.type.toUpperCase()}
                </Badge>
                <Button
                  onClick={downloadDocument}
                  size="sm"
                  variant="outline"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Generated on {new Date(generatedDocument.generatedAt).toLocaleDateString()}
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                {generatedDocument.content}
              </pre>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                ⚠️ Important Disclaimer
              </h4>
              <p className="text-sm text-yellow-700">
                This is an auto-generated draft document. Please review carefully and 
                consult with a legal professional before submission. Verify all details 
                for accuracy and completeness. This platform is not responsible for 
                legal outcomes.
              </p>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Case Details:</p>
                <p>Report ID: {generatedDocument.caseDetails.reportId}</p>
                <p>Scam Type: {generatedDocument.caseDetails.scamType}</p>
                <p>Amount: ₹{generatedDocument.caseDetails.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Evidence Files:</p>
                <ul className="list-disc list-inside">
                  {generatedDocument.caseDetails.evidence.map((item, index) => (
                    <li key={index} className="truncate">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}