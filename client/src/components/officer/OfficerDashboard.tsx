import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Phone,
  FileText,
  MapPin,
  IndianRupee,
  Play,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Activity,
  LogOut,
  Bell
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Officer {
  id: string;
  name: string;
  rank: string;
}

interface OfficerDashboardProps {
  officer: Officer;
  onLogout: () => void;
  onStartKautilya: (reportData: any) => void;
}

interface ScamReport {
  id: string;
  reporterName: string;
  reporterContact: string;
  scamType: string;
  description: string;
  amount?: number;
  location?: string;
  suspiciousNumbers: string[];
  suspiciousUPIs: string[];
  status: string;
  riskLevel: string;
  aiAnalysis?: any;
  assignedOfficer?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function OfficerDashboard({ officer, onLogout, onStartKautilya }: OfficerDashboardProps) {
  const [selectedReport, setSelectedReport] = useState<ScamReport | null>(null);
  const [activeTab, setActiveTab] = useState("reports");
  const [notifications, setNotifications] = useState<number>(0);

  // Fetch all scam reports
  const { data: reports = [], refetch: refetchReports, isLoading } = useQuery<ScamReport[]>({
    queryKey: ["/api/scam-reports"],
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  // Simulate live notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => prev + Math.floor(Math.random() * 2));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const priorityReports = reports
    .filter(r => r.riskLevel === 'high' && r.status === 'new')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const myAssignedReports = reports
    .filter(r => r.assignedOfficer === officer.id)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const allReports = reports
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const startKautilyaOperation = (report: ScamReport) => {
    // This will be implemented in the next step
    console.log('Starting Kautilya 2.0 operation for report:', report.id);
    alert(`Starting Kautilya 2.0 engagement for case: ${report.id.slice(0, 8)}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Prahaar 360 - Officer Portal</h1>
              <p className="text-sm text-gray-600">{officer.rank} {officer.name} ({officer.id})</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{notifications}</span>
                  </div>
                )}
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{priorityReports.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Cases</p>
                  <p className="text-2xl font-bold text-blue-600">{myAssignedReports.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-yellow-600">{allReports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {allReports.filter(r => r.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Priority Reports
            </TabsTrigger>
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Cases
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              All Reports
            </TabsTrigger>
          </TabsList>

          {/* Priority Reports */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  High Priority Reports - Immediate Action Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                {priorityReports.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No high priority reports at the moment</p>
                ) : (
                  <div className="space-y-4">
                    {priorityReports.map((report) => (
                      <ReportCard 
                        key={report.id} 
                        report={report} 
                        onSelect={setSelectedReport}
                        onStartKautilya={startKautilyaOperation}
                        showActions={true}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Assigned Cases */}
          <TabsContent value="assigned">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  My Assigned Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                {myAssignedReports.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No cases assigned to you</p>
                ) : (
                  <div className="space-y-4">
                    {myAssignedReports.map((report) => (
                      <ReportCard 
                        key={report.id} 
                        report={report} 
                        onSelect={setSelectedReport}
                        onStartKautilya={startKautilyaOperation}
                        showActions={true}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Reports */}
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  All Reports ({allReports.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading reports...</div>
                ) : (
                  <div className="space-y-4">
                    {allReports.map((report) => (
                      <ReportCard 
                        key={report.id} 
                        report={report} 
                        onSelect={setSelectedReport}
                        onStartKautilya={startKautilyaOperation}
                        showActions={false}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Details Modal */}
      <AnimatePresence>
        {selectedReport && (
          <ReportDetailsModal 
            report={selectedReport} 
            onClose={() => setSelectedReport(null)}
            onStartKautilya={startKautilyaOperation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Report Card Component
interface ReportCardProps {
  report: ScamReport;
  onSelect: (report: ScamReport) => void;
  onStartKautilya: (report: ScamReport) => void;
  showActions: boolean;
}

function ReportCard({ report, onSelect, onStartKautilya, showActions }: ReportCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={() => onSelect(report)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Badge className={getRiskColor(report.riskLevel)}>
            {report.riskLevel.toUpperCase()} RISK
          </Badge>
          <Badge variant="outline" className={getStatusColor(report.status)}>
            {report.status.toUpperCase()}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(report.createdAt), 'MMM dd, HH:mm')}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-gray-900">{report.scamType}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {report.reporterContact}
          </div>
          {report.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {report.location}
            </div>
          )}
          {report.amount && (
            <div className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              {report.amount.toLocaleString()}
            </div>
          )}
        </div>

        {(report.suspiciousNumbers.length > 0 || report.suspiciousUPIs.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {report.suspiciousNumbers.map((number, idx) => (
              <Badge key={idx} variant="destructive" className="text-xs">
                📱 {number}
              </Badge>
            ))}
            {report.suspiciousUPIs.map((upi, idx) => (
              <Badge key={idx} variant="destructive" className="text-xs">
                💳 {upi}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {showActions && report.status === 'new' && (
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              onStartKautilya(report);
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            Deploy Kautilya 2.0
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(report);
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Full Details
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// Report Details Modal
interface ReportDetailsModalProps {
  report: ScamReport;
  onClose: () => void;
  onStartKautilya: (report: ScamReport) => void;
}

function ReportDetailsModal({ report, onClose, onStartKautilya }: ReportDetailsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Case Details</h2>
            <Button variant="outline" onClick={onClose}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Case ID</label>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{report.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Scam Type</label>
                  <p>{report.scamType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Reporter</label>
                  <p>{report.reporterName} ({report.reporterContact})</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p>{report.location || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p>{report.amount ? `₹${report.amount.toLocaleString()}` : 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Description and Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>Case Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{report.description}</p>
              </CardContent>
            </Card>

            {/* Suspicious Identifiers */}
            <Card>
              <CardHeader>
                <CardTitle>Suspicious Identifiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.suspiciousNumbers.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Numbers</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {report.suspiciousNumbers.map((number, idx) => (
                        <Badge key={idx} variant="destructive">{number}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {report.suspiciousUPIs.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">UPI IDs</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {report.suspiciousUPIs.map((upi, idx) => (
                        <Badge key={idx} variant="destructive">{upi}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Analysis */}
            {report.aiAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Risk Score</span>
                      <Badge className={`${report.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 
                        report.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                        {report.riskLevel}
                      </Badge>
                    </div>
                    {report.aiAnalysis.recommendations && (
                      <div>
                        <span className="text-sm font-medium">Recommendations</span>
                        <p className="text-sm text-gray-600 mt-1">{report.aiAnalysis.recommendations}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onStartKautilya(report)}
            >
              <Zap className="w-4 h-4 mr-2" />
              Deploy Kautilya 2.0
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Assign to Me
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}