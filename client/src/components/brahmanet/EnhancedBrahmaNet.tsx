import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { analyzeScamReport } from "../../lib/gemini";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle,
  CheckCircle,
  Upload,
  Bot,
  Users,
  Clock
} from "lucide-react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface ReportForm {
  reporterName: string;
  reporterContact: string;
  scamType: string;
  description: string;
  amount: string;
  location: string;
  suspiciousNumbers: string;
  suspiciousUPIs: string;
  evidenceFiles: File[];
}

export function EnhancedBrahmaNet() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [reportForm, setReportForm] = useState<ReportForm>({
    reporterName: '',
    reporterContact: '',
    scamType: '',
    description: '',
    amount: '',
    location: '',
    suspiciousNumbers: '',
    suspiciousUPIs: '',
    evidenceFiles: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const scamTypes = [
    { value: 'phoneScam', label: t('phoneScam') },
    { value: 'emailPhishing', label: t('emailPhishing') },
    { value: 'socialMediaFraud', label: t('socialMediaFraud') },
    { value: 'onlineShopping', label: t('onlineShopping') },
    { value: 'bankingFraud', label: t('bankingFraud') },
    { value: 'cryptoScam', label: t('cryptoScam') },
    { value: 'jobFraud', label: 'Job Fraud' },
    { value: 'loanFraud', label: 'Loan Fraud' },
    { value: 'matrimonialFraud', label: 'Matrimonial Fraud' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field: keyof ReportForm, value: string) => {
    setReportForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setReportForm(prev => ({
        ...prev,
        evidenceFiles: Array.from(files)
      }));
    }
  };

  const handleAIAnalysis = async () => {
    if (!reportForm.description || !reportForm.scamType) {
      toast({
        title: "Incomplete Information",
        description: "Please provide scam type and description for AI analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeScamReport({
        scamType: reportForm.scamType,
        description: reportForm.description,
        amount: reportForm.amount ? parseInt(reportForm.amount) : null,
        location: reportForm.location,
        suspiciousNumbers: reportForm.suspiciousNumbers.split(',').filter(n => n.trim()),
        suspiciousUPIs: reportForm.suspiciousUPIs.split(',').filter(u => u.trim())
      });
      setAiAnalysis(analysis);
      toast({
        title: "AI Analysis Complete",
        description: "Your report has been analyzed for risk assessment and recommendations."
      });
    } catch (error) {
      console.error('AI Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze with AI. Report will be processed manually.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!reportForm.reporterName || !reportForm.reporterContact || !reportForm.scamType || !reportForm.description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to Firebase Firestore
      const reportData = {
        ...reportForm,
        suspiciousNumbers: reportForm.suspiciousNumbers.split(',').filter(n => n.trim()),
        suspiciousUPIs: reportForm.suspiciousUPIs.split(',').filter(u => u.trim()),
        amount: reportForm.amount ? parseInt(reportForm.amount) : null,
        status: 'new',
        riskLevel: aiAnalysis?.riskLevel || 'medium',
        aiAnalysis: aiAnalysis || null,
        reporterId: currentUser?.uid || 'anonymous',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'scamReports'), reportData);

      toast({
        title: "Report Submitted Successfully",
        description: `Your report has been submitted with ID: ${docRef.id.slice(-6).toUpperCase()}. You will receive updates on your registered contact.`
      });

      // Reset form
      setReportForm({
        reporterName: '',
        reporterContact: '',
        scamType: '',
        description: '',
        amount: '',
        location: '',
        suspiciousNumbers: '',
        suspiciousUPIs: '',
        evidenceFiles: []
      });
      setAiAnalysis(null);
      setCurrentStep(1);

    } catch (error) {
      console.error('Report submission failed:', error);
      toast({
        title: "Submission Failed",
        description: "Unable to submit report. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Card className="bg-gradient-to-r from-green-600 to-blue-700 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">BrahmaNet</h1>
                <p className="text-green-100 text-lg">Citizen Engagement & Reporting Portal</p>
                <p className="text-green-200 mt-2">
                  Secure platform for reporting cybercrimes and getting help
                </p>
              </div>
              <Shield className="w-20 h-20 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {[
          { title: "Reports Submitted Today", value: 24, icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
          { title: "Average Response Time", value: "2.5", suffix: "hrs", icon: Clock, color: "text-green-600", bgColor: "bg-green-50" },
          { title: "Cases Resolved", value: 156, icon: CheckCircle, color: "text-purple-600", bgColor: "bg-purple-50" }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {stat.value}{stat.suffix || ''}
                      </h3>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Form */}
        <div className="lg:col-span-2">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {t('reportScam')} - Step {currentStep} of 3
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full ${
                          step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reporterName">{t('reporterName')} *</Label>
                        <Input
                          id="reporterName"
                          value={reportForm.reporterName}
                          onChange={(e) => handleInputChange('reporterName', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reporterContact">{t('contactNumber')} *</Label>
                        <Input
                          id="reporterContact"
                          value={reportForm.reporterContact}
                          onChange={(e) => handleInputChange('reporterContact', e.target.value)}
                          placeholder="Enter phone/email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scamType">{t('scamType')} *</Label>
                        <Select 
                          value={reportForm.scamType} 
                          onValueChange={(value) => handleInputChange('scamType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select scam type" />
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
                        <Label htmlFor="location">{t('location')}</Label>
                        <Input
                          id="location"
                          value={reportForm.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Enter location (optional)"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="amount">{t('amount')}</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={reportForm.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        placeholder="Amount lost (if any)"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Incident Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="description">{t('description')} *</Label>
                      <Textarea
                        id="description"
                        value={reportForm.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe the incident in detail..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="suspiciousNumbers">{t('suspiciousNumbers')}</Label>
                      <Input
                        id="suspiciousNumbers"
                        value={reportForm.suspiciousNumbers}
                        onChange={(e) => handleInputChange('suspiciousNumbers', e.target.value)}
                        placeholder="Enter phone numbers separated by commas"
                      />
                    </div>

                    <div>
                      <Label htmlFor="suspiciousUPIs">Suspicious UPI IDs / Bank Details</Label>
                      <Input
                        id="suspiciousUPIs"
                        value={reportForm.suspiciousUPIs}
                        onChange={(e) => handleInputChange('suspiciousUPIs', e.target.value)}
                        placeholder="Enter UPI IDs, account numbers separated by commas"
                      />
                    </div>

                    <div>
                      <Label htmlFor="evidence">{t('uploadEvidence')}</Label>
                      <Input
                        id="evidence"
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload screenshots, videos, documents as evidence (Max 10MB each)
                      </p>
                    </div>

                    <Button 
                      onClick={handleAIAnalysis}
                      disabled={isAnalyzing}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      {isAnalyzing ? 'Analyzing...' : 'Get AI Risk Analysis'}
                    </Button>
                  </motion.div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">Review Your Report</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p><strong>Reporter:</strong> {reportForm.reporterName}</p>
                      <p><strong>Contact:</strong> {reportForm.reporterContact}</p>
                      <p><strong>Scam Type:</strong> {scamTypes.find(t => t.value === reportForm.scamType)?.label}</p>
                      <p><strong>Location:</strong> {reportForm.location || 'Not specified'}</p>
                      {reportForm.amount && <p><strong>Amount:</strong> ₹{parseInt(reportForm.amount).toLocaleString()}</p>}
                      <p><strong>Description:</strong> {reportForm.description}</p>
                      {reportForm.evidenceFiles.length > 0 && (
                        <p><strong>Evidence Files:</strong> {reportForm.evidenceFiles.length} files uploaded</p>
                      )}
                    </div>

                    {aiAnalysis && (
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                        <h4 className="font-semibold text-purple-800 mb-2">AI Risk Assessment</h4>
                        <Badge className={`mb-2 ${
                          aiAnalysis.riskLevel === 'High' ? 'bg-red-500' :
                          aiAnalysis.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        } text-white`}>
                          Risk Level: {aiAnalysis.riskLevel}
                        </Badge>
                        <p className="text-purple-700 text-sm">{aiAnalysis.analysis}</p>
                      </div>
                    )}

                    <Button 
                      onClick={handleSubmitReport}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    disabled={currentStep === 3}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Help & Emergency Contacts */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">Cybercrime Helpline</p>
                      <p className="text-2xl font-bold text-red-600">1930</p>
                    </div>
                  </div>
                  <p className="text-red-700 text-sm">24/7 National Cybercrime Helpline</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-800">Email Support</p>
                      <p className="text-sm text-blue-600">cybercrime@indorepolice.mp.gov.in</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Visit Office</p>
                      <p className="text-sm text-green-600">Cyber Crime Cell, Indore</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Never share OTP, PIN, or passwords with anyone
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Verify caller identity before sharing information
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Be cautious of 'too good to be true' offers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Report suspicious activity immediately
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}