import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { analyzeScamReport } from "../../lib/gemini";
import { saveReportToFirebase } from "../../lib/firebase-integration";
import { 
  Shield, 
  AlertTriangle, 
  Upload, 
  Phone,
  CreditCard,
  Mail,
  FileText,
  CheckCircle,
  Loader2,
  Brain,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";

interface ScamReportForm {
  reporterName: string;
  reporterContact: string;
  reporterEmail: string;
  scamType: string;
  description: string;
  amount: string;
  location: string;
  suspiciousNumbers: string[];
  suspiciousUPIs: string[];
  evidenceFiles: FileList | null;
}

export function EnhancedBrahmaNet() {
  const { t, currentLanguage } = useLanguage();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ScamReportForm>({
    reporterName: '',
    reporterContact: '',
    reporterEmail: currentUser?.email || '',
    scamType: '',
    description: '',
    amount: '',
    location: 'Indore',
    suspiciousNumbers: [''],
    suspiciousUPIs: [''],
    evidenceFiles: null
  });

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const submitReportMutation = useMutation({
    mutationFn: async (reportData: FormData) => {
      const response = await fetch('/api/scam-reports', {
        method: 'POST',
        body: reportData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: currentLanguage === 'hi' ? "रिपोर्ट सफलतापूर्वक जमा की गई" : "Report Submitted Successfully",
        description: currentLanguage === 'hi' 
          ? "आपकी रिपोर्ट सफलतापूर्वक दर्ज हो गई है। हमारी टीम जल्द ही इसकी जांच करेगी।"
          : "Your report has been successfully registered. Our team will investigate it soon.",
      });
      
      // Reset form
      setFormData({
        reporterName: '',
        reporterContact: '',
        reporterEmail: currentUser?.email || '',
        scamType: '',
        description: '',
        amount: '',
        location: 'Indore',
        suspiciousNumbers: [''],
        suspiciousUPIs: [''],
        evidenceFiles: null
      });
      setAiAnalysis(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      queryClient.invalidateQueries({ queryKey: ['/api/scam-reports'] });
    },
    onError: (error) => {
      toast({
        title: currentLanguage === 'hi' ? "त्रुटि" : "Error",
        description: currentLanguage === 'hi' 
          ? "रिपोर्ट जमा करने में समस्या हुई। कृपया पुनः प्रयास करें।"
          : "There was a problem submitting your report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof ScamReportForm, value: string | FileList | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: 'suspiciousNumbers' | 'suspiciousUPIs', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'suspiciousNumbers' | 'suspiciousUPIs') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'suspiciousNumbers' | 'suspiciousUPIs', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAIAnalysis = async () => {
    if (!formData.description || !formData.scamType) {
      toast({
        title: currentLanguage === 'hi' ? "अधूरी जानकारी" : "Incomplete Information",
        description: currentLanguage === 'hi' 
          ? "कृपया स्कैम का प्रकार और विवरण भरें।"
          : "Please fill in the scam type and description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeScamReport({
        scamType: formData.scamType,
        description: formData.description,
        amount: formData.amount,
        location: formData.location,
        suspiciousNumbers: formData.suspiciousNumbers.filter(n => n.trim()),
        suspiciousUPIs: formData.suspiciousUPIs.filter(u => u.trim())
      });
      
      setAiAnalysis(analysis);
      
      toast({
        title: currentLanguage === 'hi' ? "AI विश्लेषण पूर्ण" : "AI Analysis Complete",
        description: currentLanguage === 'hi' 
          ? "आपकी रिपोर्ट का AI विश्लेषण तैयार है।"
          : "AI analysis of your report is ready.",
      });
    } catch (error) {
      toast({
        title: currentLanguage === 'hi' ? "विश्लेषण त्रुटि" : "Analysis Error",
        description: currentLanguage === 'hi' 
          ? "AI विश्लेषण में समस्या हुई।"
          : "There was a problem with AI analysis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reporterName || !formData.reporterContact || !formData.scamType || !formData.description) {
      toast({
        title: currentLanguage === 'hi' ? "आवश्यक फील्ड गुम" : "Required Fields Missing",
        description: currentLanguage === 'hi' 
          ? "कृपया सभी आवश्यक फील्ड भरें।"
          : "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const reportFormData = new FormData();
    reportFormData.append('reporterName', formData.reporterName);
    reportFormData.append('reporterContact', formData.reporterContact);
    reportFormData.append('reporterEmail', formData.reporterEmail);
    reportFormData.append('scamType', formData.scamType);
    reportFormData.append('description', formData.description);
    reportFormData.append('amount', formData.amount);
    reportFormData.append('location', formData.location);
    reportFormData.append('suspiciousNumbers', JSON.stringify(formData.suspiciousNumbers.filter(n => n.trim())));
    reportFormData.append('suspiciousUPIs', JSON.stringify(formData.suspiciousUPIs.filter(u => u.trim())));
    
    if (formData.evidenceFiles) {
      Array.from(formData.evidenceFiles).forEach(file => {
        reportFormData.append('evidence', file);
      });
    }

    submitReportMutation.mutate(reportFormData);
  };

  const scamTypes = [
    { value: 'upi_fraud', label: currentLanguage === 'hi' ? 'UPI/पेमेंट धोखाधड़ी' : 'UPI/Payment Fraud' },
    { value: 'phone_scam', label: currentLanguage === 'hi' ? 'फोन कॉल घोटाला' : 'Phone Call Scam' },
    { value: 'email_phishing', label: currentLanguage === 'hi' ? 'ईमेल फिशिंग' : 'Email Phishing' },
    { value: 'social_media', label: currentLanguage === 'hi' ? 'सोशल मीडिया फ्रॉड' : 'Social Media Fraud' },
    { value: 'investment_scam', label: currentLanguage === 'hi' ? 'निवेश घोटाला' : 'Investment Scam' },
    { value: 'online_shopping', label: currentLanguage === 'hi' ? 'ऑनलाइन शॉपिंग फ्रॉड' : 'Online Shopping Fraud' },
    { value: 'identity_theft', label: currentLanguage === 'hi' ? 'पहचान चोरी' : 'Identity Theft' },
    { value: 'other', label: currentLanguage === 'hi' ? 'अन्य' : 'Other' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-green-700 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">BrahmaNet</h1>
                <p className="text-green-100 text-lg">{t('citizenReportingPortal')}</p>
                <p className="text-green-200 mt-2">
                  {currentLanguage === 'hi' 
                    ? 'सुरक्षित और तेज साइबर अपराध रिपोर्टिंग सिस्टम'
                    : 'Secure and Fast Cybercrime Reporting System'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-4">
                  <Shield className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">
                    {currentLanguage === 'hi' ? 'सुरक्षित रिपोर्टिंग' : 'Secure Reporting'}
                  </div>
                  <div className="text-xs text-green-300 flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {currentLanguage === 'hi' ? 'ऑनलाइन' : 'Online'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Report Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'साइबर अपराध रिपोर्ट दर्ज करें' : 'File Cybercrime Report'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reporterName">
                        {currentLanguage === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                      </Label>
                      <Input
                        id="reporterName"
                        value={formData.reporterName}
                        onChange={(e) => handleInputChange('reporterName', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reporterContact">
                        {currentLanguage === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                      </Label>
                      <Input
                        id="reporterContact"
                        value={formData.reporterContact}
                        onChange={(e) => handleInputChange('reporterContact', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? '+91-9876543210' : '+91-9876543210'}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reporterEmail">
                        {currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address'}
                      </Label>
                      <Input
                        id="reporterEmail"
                        type="email"
                        value={formData.reporterEmail}
                        onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? 'your@email.com' : 'your@email.com'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">
                        {currentLanguage === 'hi' ? 'स्थान' : 'Location'}
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? 'इंदौर, मध्य प्रदेश' : 'Indore, Madhya Pradesh'}
                      />
                    </div>
                  </div>

                  {/* Incident Details */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="scamType">
                        {currentLanguage === 'hi' ? 'घोटाले का प्रकार *' : 'Type of Scam *'}
                      </Label>
                      <Select value={formData.scamType} onValueChange={(value) => handleInputChange('scamType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={currentLanguage === 'hi' ? 'स्कैम का प्रकार चुनें' : 'Select scam type'} />
                        </SelectTrigger>
                        <SelectContent>
                          {scamTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">
                        {currentLanguage === 'hi' ? 'घटना का विस्तृत विवरण *' : 'Detailed Description of Incident *'}
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder={currentLanguage === 'hi' 
                          ? 'कृपया घटना का विस्तार से वर्णन करें - क्या हुआ, कैसे हुआ, कब हुआ...'
                          : 'Please describe the incident in detail - what happened, how it happened, when it happened...'
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="amount">
                        {currentLanguage === 'hi' ? 'नुकसान की राशि (₹)' : 'Financial Loss Amount (₹)'}
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? 'उदाहरण: 5000' : 'Example: 5000'}
                      />
                    </div>
                  </div>

                  {/* Suspicious Details */}
                  <div className="space-y-4">
                    <div>
                      <Label>
                        {currentLanguage === 'hi' ? 'संदिग्ध फोन नंबर' : 'Suspicious Phone Numbers'}
                      </Label>
                      {formData.suspiciousNumbers.map((number, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <Input
                            value={number}
                            onChange={(e) => handleArrayInputChange('suspiciousNumbers', index, e.target.value)}
                            placeholder={currentLanguage === 'hi' ? '+91-9876543210' : '+91-9876543210'}
                          />
                          {formData.suspiciousNumbers.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => removeArrayField('suspiciousNumbers', index)}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayField('suspiciousNumbers')}
                        className="mt-2"
                      >
                        {currentLanguage === 'hi' ? '+ नंबर जोड़ें' : '+ Add Number'}
                      </Button>
                    </div>

                    <div>
                      <Label>
                        {currentLanguage === 'hi' ? 'संदिग्ध UPI ID' : 'Suspicious UPI IDs'}
                      </Label>
                      {formData.suspiciousUPIs.map((upi, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <Input
                            value={upi}
                            onChange={(e) => handleArrayInputChange('suspiciousUPIs', index, e.target.value)}
                            placeholder={currentLanguage === 'hi' ? 'example@paytm' : 'example@paytm'}
                          />
                          {formData.suspiciousUPIs.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => removeArrayField('suspiciousUPIs', index)}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addArrayField('suspiciousUPIs')}
                        className="mt-2"
                      >
                        {currentLanguage === 'hi' ? '+ UPI जोड़ें' : '+ Add UPI'}
                      </Button>
                    </div>
                  </div>

                  {/* Evidence Upload */}
                  <div>
                    <Label htmlFor="evidence">
                      {currentLanguage === 'hi' ? 'सबूत अपलोड करें' : 'Upload Evidence'}
                    </Label>
                    <Input
                      id="evidence"
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
                      onChange={(e) => handleInputChange('evidenceFiles', e.target.files)}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {currentLanguage === 'hi' 
                        ? 'स्क्रीनशॉट, ऑडियो रिकॉर्डिंग, वीडियो या अन्य सबूत अपलोड करें'
                        : 'Upload screenshots, audio recordings, videos or other evidence'
                      }
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAIAnalysis}
                      disabled={isAnalyzing || !formData.description || !formData.scamType}
                      className="flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Brain className="w-4 h-4" />
                      )}
                      {currentLanguage === 'hi' ? 'AI विश्लेषण' : 'AI Analysis'}
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={submitReportMutation.isPending}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      {submitReportMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      {currentLanguage === 'hi' ? 'रिपोर्ट जमा करें' : 'Submit Report'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Analysis Result */}
          {aiAnalysis && (
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    {currentLanguage === 'hi' ? 'AI विश्लेषण परिणाम' : 'AI Analysis Result'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{currentLanguage === 'hi' ? 'जोखिम स्तर:' : 'Risk Level:'}</Label>
                    <Badge 
                      variant={aiAnalysis.riskLevel === 'High' ? 'destructive' : 
                              aiAnalysis.riskLevel === 'Medium' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {aiAnalysis.riskLevel}
                    </Badge>
                  </div>
                  
                  <div>
                    <Label>{currentLanguage === 'hi' ? 'विश्लेषण:' : 'Analysis:'}</Label>
                    <p className="text-sm text-gray-700 mt-1">{aiAnalysis.analysis}</p>
                  </div>
                  
                  <div>
                    <Label>{currentLanguage === 'hi' ? 'सुझाव:' : 'Recommendations:'}</Label>
                    <ul className="text-sm text-gray-700 mt-1 space-y-1">
                      {aiAnalysis.recommendations?.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Tips */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'महत्वपूर्ण सुझाव' : 'Important Tips'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {currentLanguage === 'hi' ? 'तत्काल कार्रवाई:' : 'Immediate Action:'}
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• {currentLanguage === 'hi' ? 'संदिग्ध नंबर को ब्लॉक करें' : 'Block suspicious numbers'}</li>
                    <li>• {currentLanguage === 'hi' ? 'बैंक खाते की जांच करें' : 'Check bank accounts'}</li>
                    <li>• {currentLanguage === 'hi' ? 'पासवर्ड बदलें' : 'Change passwords'}</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {currentLanguage === 'hi' ? 'आपातकालीन नंबर:' : 'Emergency Numbers:'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">1930</span>
                      <span className="text-sm text-blue-700">
                        {currentLanguage === 'hi' ? '(साइबर हेल्पलाइन)' : '(Cyber Helpline)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">100</span>
                      <span className="text-sm text-blue-700">
                        {currentLanguage === 'hi' ? '(पुलिस)' : '(Police)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {currentLanguage === 'hi' ? 'भविष्य में सुरक्षा:' : 'Future Safety:'}
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• {currentLanguage === 'hi' ? 'OTP कभी शेयर न करें' : 'Never share OTPs'}</li>
                    <li>• {currentLanguage === 'hi' ? 'संदिग्ध लिंक न खोलें' : 'Don\'t click suspicious links'}</li>
                    <li>• {currentLanguage === 'hi' ? 'पहले वेरिफाई करें' : 'Verify first'}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Tracker */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {currentLanguage === 'hi' ? 'आज के आंकड़े' : 'Today\'s Statistics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">23</div>
                    <div className="text-xs text-gray-600">
                      {currentLanguage === 'hi' ? 'नई रिपोर्ट' : 'New Reports'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-xs text-gray-600">
                      {currentLanguage === 'hi' ? 'हल किए गए' : 'Resolved'}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {currentLanguage === 'hi' ? 'औसत रिस्पांस टाइम' : 'Avg Response Time'}
                    </span>
                    <Badge variant="secondary">2.3h</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}