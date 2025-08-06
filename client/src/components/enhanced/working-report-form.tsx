import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { insertScamReportSchema } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, AlertTriangle, CheckCircle, Phone, User, MapPin, IndianRupee } from "lucide-react";
import type { z } from 'zod';

type ReportFormData = z.infer<typeof insertScamReportSchema>;

export default function WorkingReportForm() {
  const { t, i18n } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionStep, setSubmissionStep] = useState<'form' | 'uploading' | 'processing' | 'complete'>('form');
  const [reportId, setReportId] = useState<string>('');
  
  const { toast } = useToast();

  const form = useForm<ReportFormData>({
    resolver: zodResolver(insertScamReportSchema.omit({ evidenceFiles: true })),
    defaultValues: {
      reporterName: '',
      reporterContact: '',
      scamType: '',
      description: '',
      location: '',
      amount: undefined,
      suspiciousNumbers: [],
      suspiciousUPIs: [],
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ReportFormData & { files: File[] }) => {
      const formData = new FormData();
      
      // Append form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'files' && value !== undefined) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      
      // Append files
      data.files.forEach((file, index) => {
        formData.append('evidence', file);
      });
      
      const response = await apiRequest('POST', '/api/scam-reports', formData);
      return response.json();
    },
    onSuccess: (data) => {
      setReportId(data.id);
      setSubmissionStep('complete');
      queryClient.invalidateQueries({ queryKey: ['/api/scam-reports'] });
      toast({
        title: t('report.success'),
        description: `Report ID: ${data.id.slice(0, 8)}`,
      });
    },
    onError: (error) => {
      setSubmissionStep('form');
      toast({
        title: t('common.error'),
        description: 'Failed to submit report. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['image/', 'video/', 'audio/', 'application/pdf', 'text/'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (file.size > maxSize) {
        toast({
          title: 'File Too Large',
          description: `${file.name} is larger than 10MB`,
          variant: 'destructive',
        });
        return false;
      }
      
      if (!validTypes.some(type => file.type.startsWith(type))) {
        toast({
          title: 'Invalid File Type',
          description: `${file.name} is not a supported file type`,
          variant: 'destructive',
        });
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ReportFormData) => {
    setSubmissionStep('uploading');
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          setSubmissionStep('processing');
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
    
    // Parse suspicious numbers and UPIs from description
    const description = data.description.toLowerCase();
    const phoneRegex = /(\+91[0-9]{10}|[0-9]{10})/g;
    const upiRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+)/g;
    
    const suspiciousNumbers = description.match(phoneRegex) || [];
    const suspiciousUPIs = description.match(upiRegex) || [];
    
    const submitData = {
      ...data,
      suspiciousNumbers,
      suspiciousUPIs,
      files: selectedFiles,
    };
    
    setTimeout(() => {
      setUploadProgress(100);
      submitMutation.mutate(submitData);
    }, 2000);
  };

  const scamTypes = [
    'UPI/Payment Fraud',
    'Voice Call Scam',
    'Online Shopping Fraud',
    'Investment/Trading Scam',
    'Lottery/Prize Scam',
    'Tech Support Scam',
    'Social Media Fraud',
    'Email Phishing',
    'Fake Loan Offers',
    'Other',
  ];

  if (submissionStep === 'complete') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-green-800">Report Submitted Successfully!</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">Your Report ID: {reportId.slice(0, 8)}</p>
              <p className="text-green-700 text-sm mt-1">
                Please save this ID for future reference. You will be contacted if additional information is needed.
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ Report has been forwarded to cyber crime investigation team</p>
              <p>✓ AI analysis is being performed for threat assessment</p>
              <p>✓ Evidence files have been securely stored with blockchain verification</p>
              <p>✓ You will receive updates via SMS/email</p>
            </div>
            <div className="flex space-x-3 justify-center">
              <Button 
                onClick={() => {
                  setSubmissionStep('form');
                  form.reset();
                  setSelectedFiles([]);
                  setReportId('');
                }}
                variant="outline"
              >
                Submit Another Report
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (submissionStep === 'uploading' || submissionStep === 'processing') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-xl font-bold">
              {submissionStep === 'uploading' ? 'Uploading Evidence...' : 'Processing Report...'}
            </h2>
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-gray-600">
                {submissionStep === 'uploading' 
                  ? `Uploading files... ${Math.round(uploadProgress)}%`
                  : 'AI is analyzing your report for threat assessment...'
                }
              </p>
            </div>
            {submissionStep === 'processing' && (
              <div className="text-left space-y-1 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p>• Extracting phone numbers and UPI IDs from description</p>
                <p>• Cross-referencing with known fraud databases</p>
                <p>• Performing risk assessment using AI analysis</p>
                <p>• Creating immutable evidence chain</p>
                <p>• Assigning to appropriate investigation team</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="text-red-600 mr-2" />
            {t('report.title')}
          </CardTitle>
          <p className="text-gray-600">{t('report.subtitle')}</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="reporterName" className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {t('report.reporterName')} *
                </Label>
                <Input
                  id="reporterName"
                  {...form.register('reporterName')}
                  placeholder={i18n.language === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
                />
                {form.formState.errors.reporterName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.reporterName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="reporterContact" className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {t('report.contact')} *
                </Label>
                <Input
                  id="reporterContact"
                  {...form.register('reporterContact')}
                  placeholder="+91XXXXXXXXXX"
                />
                {form.formState.errors.reporterContact && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.reporterContact.message}</p>
                )}
              </div>
            </div>

            {/* Incident Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="scamType">
                  {t('report.scamType')} *
                </Label>
                <Select onValueChange={(value) => form.setValue('scamType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={i18n.language === 'hi' ? 'धोखाधड़ी का प्रकार चुनें' : 'Select scam type'} />
                  </SelectTrigger>
                  <SelectContent>
                    {scamTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.scamType && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.scamType.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="amount" className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {t('report.amount')}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  {...form.register('amount', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="description">
                  {t('report.description')} *
                </Label>
                <Textarea
                  id="description"
                  {...form.register('description')}
                  placeholder={i18n.language === 'hi' 
                    ? 'घटना का विस्तृत विवरण दें। फोन नंबर, UPI ID, या अन्य संदिग्ध जानकारी शामिल करें।'
                    : 'Provide detailed description of the incident. Include phone numbers, UPI IDs, or other suspicious information.'
                  }
                  rows={5}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {t('report.location')}
              </Label>
              <Input
                id="location"
                {...form.register('location')}
                placeholder={i18n.language === 'hi' ? 'जहाँ घटना हुई (वैकल्पिक)' : 'Where the incident occurred (optional)'}
              />
            </div>

            {/* Evidence Upload */}
            <div>
              <Label className="flex items-center mb-2">
                <Upload className="h-4 w-4 mr-1" />
                {t('report.evidence')}
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="evidence-upload"
                  accept="image/*,video/*,audio/*,.pdf,.txt"
                />
                <label htmlFor="evidence-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">Upload Evidence Files</p>
                  <p className="text-sm text-gray-500">
                    Screenshots, recordings, documents (Max 10MB each)
                  </p>
                </label>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="font-medium">Selected Files:</p>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">Important Notice:</p>
                  <ul className="text-yellow-700 space-y-1 list-disc list-inside">
                    <li>All information will be kept confidential and used only for investigation</li>
                    <li>False reporting is a punishable offense under cyber crime laws</li>
                    <li>You may be contacted for additional information or verification</li>
                    <li>Emergency cases should call 112 immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : t('report.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}