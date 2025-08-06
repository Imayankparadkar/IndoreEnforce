import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { investigationAssistant, analyzeScamReport } from "../../lib/gemini";
import { 
  Shield, 
  Search, 
  FileText, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  UserCheck,
  Activity,
  Database,
  TrendingUp,
  MapPin,
  Phone,
  Bot
} from "lucide-react";
import CountUp from 'react-countup';
import { Line, Bar } from 'react-chartjs-2';

interface CaseData {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  reporterName: string;
  assignedOfficer: string;
  createdAt: Date;
  lastUpdated: Date;
  scamType: string;
  amount?: number;
  location?: string;
}

export function EnhancedOfficerPortal() {
  const { currentUser, userRole } = useAuth();
  const { t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [officerStats] = useState({
    totalCases: 247,
    activeCases: 45,
    resolvedCases: 189,
    pendingReports: 13,
    todayReports: 8,
    responseTime: "2.3"
  });

  const [mockCases] = useState<CaseData[]>([
    {
      id: '1',
      title: 'UPI Fraud - Rs 50,000',
      description: 'Victim received fake UPI payment request and transferred money',
      status: 'investigating',
      priority: 'high',
      reporterName: 'Rajesh Kumar',
      assignedOfficer: 'Officer Singh',
      createdAt: new Date(),
      lastUpdated: new Date(),
      scamType: 'UPI Fraud',
      amount: 50000,
      location: 'Vijay Nagar, Indore'
    },
    {
      id: '2',
      title: 'Social Media Investment Scam',
      description: 'WhatsApp investment group fraud targeting senior citizens',
      status: 'new',
      priority: 'medium',
      reporterName: 'Mrs. Sharma',
      assignedOfficer: 'Officer Patel',
      createdAt: new Date(Date.now() - 86400000),
      lastUpdated: new Date(Date.now() - 86400000),
      scamType: 'Investment Fraud',
      amount: 25000,
      location: 'Indore Central'
    },
    {
      id: '3',
      title: 'Email Phishing Attack',
      description: 'Fake bank email requesting OTP and card details',
      status: 'resolved',
      priority: 'low',
      reporterName: 'Amit Jain',
      assignedOfficer: 'Officer Verma',
      createdAt: new Date(Date.now() - 172800000),
      lastUpdated: new Date(Date.now() - 86400000),
      scamType: 'Phishing',
      location: 'Bhopal Road'
    }
  ]);

  const handleAnalyzeCase = async (caseData: CaseData) => {
    setIsAnalyzing(true);
    try {
      const analysis = await investigationAssistant({
        caseId: caseData.id,
        scamType: caseData.scamType,
        description: caseData.description,
        amount: caseData.amount,
        location: caseData.location,
        reporterName: caseData.reporterName
      });
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('AI Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'investigating': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.reporterName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cases Handled',
        data: [8, 12, 6, 15, 9, 11, 8],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      }
    ],
  };

  if (userRole !== 'officer') {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
            <p className="text-gray-600">This portal is only accessible to law enforcement officers.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">PRAHAAR ZONE - Officer Portal</h1>
            <p className="text-blue-100">
              Welcome, {currentUser?.email?.split('@')[0]} | Badge: MP-{Math.floor(Math.random() * 10000)}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-4">
              <UserCheck className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">On Duty</div>
              <div className="text-xs opacity-75">Since 9:00 AM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Cases", value: officerStats.totalCases, icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
          { title: "Active Cases", value: officerStats.activeCases, icon: AlertTriangle, color: "text-orange-600", bgColor: "bg-orange-50" },
          { title: "Resolved Cases", value: officerStats.resolvedCases, icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
          { title: "Avg Response Time", value: officerStats.responseTime, icon: Clock, color: "text-purple-600", bgColor: "bg-purple-50", suffix: "hrs" }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div key={index} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      <CountUp end={typeof stat.value === 'string' ? parseFloat(stat.value) : stat.value} duration={2.5} decimals={stat.suffix ? 1 : 0} />
                      {stat.suffix}
                    </h3>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Case Management Dashboard
                </span>
                <Badge variant="outline">{filteredCases.length} Cases</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search cases, victims, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cases List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredCases.map((case_) => (
                  <motion.div
                    key={case_.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedCase?.id === case_.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedCase(case_)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{case_.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(case_.priority)}>
                          {case_.priority.toUpperCase()}
                        </Badge>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(case_.status)}`} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{case_.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {case_.reporterName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {case_.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {case_.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Details & AI Analysis */}
        <div className="space-y-6">
          {selectedCase ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Case Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedCase.title}</h3>
                    <p className="text-gray-600 mt-2">{selectedCase.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge className={`ml-2 ${getStatusColor(selectedCase.status)} text-white`}>
                        {selectedCase.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span>
                      <Badge className={`ml-2 ${getPriorityColor(selectedCase.priority)}`}>
                        {selectedCase.priority}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Reporter:</span>
                      <p>{selectedCase.reporterName}</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p>{selectedCase.location}</p>
                    </div>
                    {selectedCase.amount && (
                      <div className="col-span-2">
                        <span className="font-medium">Amount:</span>
                        <p className="text-red-600 font-bold">₹{selectedCase.amount.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleAnalyzeCase(selectedCase)}
                    disabled={isAnalyzing}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    {isAnalyzing ? 'Analyzing...' : 'AI Case Analysis'}
                  </Button>
                </CardContent>
              </Card>

              {/* AI Analysis Results */}
              {aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-600" />
                        AI Investigation Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Evidence Points:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {aiAnalysis.keyEvidence?.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recommended Steps:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {aiAnalysis.investigationSteps?.map((step: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Potential Leads:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {aiAnalysis.leads?.map((lead: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                              {lead}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Case</h3>
                <p className="text-gray-600">Choose a case from the list to view details and AI analysis</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Weekly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={chartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }} />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}