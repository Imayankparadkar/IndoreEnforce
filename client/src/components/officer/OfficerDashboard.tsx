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
  Bell,
  AlertCircle,
  Database,
  UserCheck,
  User,
  History,
  Share2,
  CreditCard,
  Target,
  Search
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
  const [liveReports, setLiveReports] = useState<ScamReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState<Array<{
    id: string;
    message: string;
    time: string;
    type: 'new_report' | 'operation_update' | 'alert';
    read: boolean;
  }>>([]);
  const [realtimeStats, setRealtimeStats] = useState({
    todayReports: 0,
    activeOperations: 0,
    successfulTakedowns: 0
  });

  // Fetch all scam reports with more frequent updates for live demo
  const { data: reports = [], refetch: refetchReports, isLoading } = useQuery<ScamReport[]>({
    queryKey: ["/api/scam-reports"],
    refetchInterval: 5000, // More frequent updates for live engagement
  });

  // Enhanced live notification system - simulates real complaints coming in
  useEffect(() => {
    const generateLiveComplaint = () => {
      const demoComplaints = [
        {
          id: Date.now().toString(),
          reporterName: "Priya Sharma",
          reporterContact: "+91-9876543210",
          reporterEmail: "priya.sharma@email.com",
          scamType: "Army Equipment Scam",
          description: "Received WhatsApp message about discounted army surplus equipment. Scammer claiming to be Army officer selling equipment cheap. Asked to pay ₹15,000 advance through UPI.",
          amount: 15000,
          location: "Vijay Nagar, Indore",
          suspiciousNumbers: ["+91-8765432109"],
          suspiciousUPIs: ["fauji47@okbank"],
          status: "new",
          riskLevel: "high",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: (Date.now() + 1).toString(),
          reporterName: "Sunita Jain", 
          reporterContact: "+91-7654321098",
          reporterEmail: "sunita.jain@email.com",
          scamType: "Loan Fraud",
          description: "Got call about instant personal loan approval without documents. Caller asked for processing fee payment of ₹5,000 via UPI before loan disbursement.",
          amount: 5000,
          location: "Palasia, Indore",
          suspiciousNumbers: ["+91-6543210987"],
          suspiciousUPIs: ["quickloan123@phonepe"],
          status: "new",
          riskLevel: "medium", 
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: (Date.now() + 2).toString(),
          reporterName: "Rajesh Patel",
          reporterContact: "+91-9988776655",
          reporterEmail: "rajesh.patel@email.com",
          scamType: "Job Fraud",
          description: "Fake government job posting on WhatsApp demanding registration fee and documents. Promised Railway TC job in exchange for ₹8,000 processing fee.",
          amount: 8000,
          location: "MG Road, Indore",
          suspiciousNumbers: ["+91-7766554433"],
          suspiciousUPIs: ["govt_jobs@gpay"],
          status: "new", 
          riskLevel: "high",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      const randomComplaint = demoComplaints[Math.floor(Math.random() * demoComplaints.length)];
      randomComplaint.id = Date.now().toString();
      randomComplaint.createdAt = new Date();
      
      setLiveReports(prev => [randomComplaint, ...prev.slice(0, 4)]); // Keep only last 5
      setNotifications(prev => prev + 1);
      setRealtimeStats(prev => ({
        ...prev,
        todayReports: prev.todayReports + 1
      }));

      // Add to notification list
      const newNotification = {
        id: Date.now().toString(),
        message: `New ${randomComplaint.riskLevel} priority complaint from ${randomComplaint.reporterName}`,
        time: new Date().toLocaleTimeString(),
        type: 'new_report' as const,
        read: false
      };
      setNotificationList(prev => [newNotification, ...prev.slice(0, 9)]); // Keep last 10

      // Show enhanced notification toast with action buttons
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl shadow-2xl z-50 border border-red-500 max-w-sm';
      notification.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="w-3 h-3 bg-white rounded-full animate-ping mt-1"></div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <strong class="text-sm">🚨 NEW COMPLAINT</strong>
              <span class="bg-white/20 px-2 py-0.5 rounded text-xs">${randomComplaint.riskLevel.toUpperCase()}</span>
            </div>
            <div class="text-sm font-medium">${randomComplaint.reporterName}</div>
            <div class="text-xs text-red-100 mt-1">${randomComplaint.scamType} - ₹${randomComplaint.amount?.toLocaleString()}</div>
            <div class="text-xs text-red-200 mt-1">${randomComplaint.location}</div>
            <div class="flex gap-2 mt-2">
              <button class="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">View</button>
              <button class="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">Deploy Kautilya</button>
            </div>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="text-white/70 hover:text-white text-lg leading-none">&times;</button>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 8000);

      // Trigger reports refetch
      refetchReports();
    };

    // Generate first complaint after 10 seconds
    const initialTimeout = setTimeout(generateLiveComplaint, 10000);
    
    // Then generate complaints every 3 minutes for live demo
    const interval = setInterval(generateLiveComplaint, 180000); // 3 minutes

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [refetchReports]);

  // Update realtime stats periodically for dashboard
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeStats(prev => ({
        todayReports: prev.todayReports + Math.floor(Math.random() * 2), // 0-1 new reports
        activeOperations: Math.floor(Math.random() * 8) + 2, // 2-9 active ops
        successfulTakedowns: prev.successfulTakedowns + (Math.random() > 0.8 ? 1 : 0) // Occasional takedown
      }));
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter and search reports
  const filteredReports = reports.filter(report => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      report.reporterName.toLowerCase().includes(searchLower) ||
      report.scamType.toLowerCase().includes(searchLower) ||
      report.description.toLowerCase().includes(searchLower) ||
      report.suspiciousNumbers.some(num => num.includes(searchTerm)) ||
      report.suspiciousUPIs.some(upi => upi.toLowerCase().includes(searchLower)) ||
      (report.location && report.location.toLowerCase().includes(searchLower))
    );
  });

  const priorityReports = [...filteredReports, ...liveReports]
    .filter(r => r.riskLevel === 'high' && (r.status === 'new' || !r.status))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const myAssignedReports = [...filteredReports, ...liveReports]
    .filter(r => r.assignedOfficer === officer.id || (Math.random() > 0.7 && r.riskLevel === 'high'))
    .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());

  const allReports = [...filteredReports, ...liveReports]
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
    // Check if number is already part of ongoing operation
    const existingOperation = checkExistingOperation(report);
    
    if (existingOperation) {
      alert(`⚠️ LINKED OPERATION DETECTED\n\nThis number is already part of operation: ${existingOperation}\n\nLinking new report to existing Kautilya sting...`);
      // Auto-link to existing operation
      setTimeout(() => {
        setSelectedReport(report);
        setActiveTab("timeline");
      }, 2000);
    } else {
      // Start new Kautilya 2.0 operation
      console.log('🎯 Starting NEW Kautilya 2.0 operation for report:', report.id);
      
      // Show operation confirmation
      const confirmStart = confirm(`🚀 DEPLOY KAUTILYA 2.0?\n\nTarget: ${report.suspiciousNumbers[0]}\nScam Type: ${report.scamType}\nLocation: ${report.location}\n\nThis will initiate AI engagement with MayaJaal persona. Continue?`);
      
      if (confirmStart) {
        // Call the parent function to start Kautilya engagement
        onStartKautilya(report);
      }
    }
  };

  const checkExistingOperation = (report: ScamReport) => {
    // Simulate checking for existing operations
    const targetNumber = report.suspiciousNumbers[0];
    if (targetNumber && Math.random() > 0.7) {
      return `KAU-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    }
    return null;
  };

  const deployKautilya = (report: ScamReport) => {
    startKautilyaOperation(report);
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
            {/* Live Stats Ticker */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Today: {realtimeStats.todayReports + reports.filter(r => 
                  new Date(r.createdAt).toDateString() === new Date().toDateString()
                ).length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Active Ops: {realtimeStats.activeOperations}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Takedowns: {realtimeStats.successfulTakedowns}</span>
              </div>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xs text-white">{notifications}</span>
                  </div>
                )}
              </Button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setNotifications(0);
                          setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
                        }}
                      >
                        Mark All Read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notificationList.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    ) : (
                      notificationList.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'new_report' ? 'bg-red-500' :
                              notification.type === 'operation_update' ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
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

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports by name, type, phone, UPI, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              Found {allReports.length} reports matching "{searchTerm}"
            </p>
          )}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Priority Reports ({priorityReports.length})
            </TabsTrigger>
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Cases ({myAssignedReports.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              All Reports ({allReports.length})
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
  const [activeTab, setActiveTab] = useState('overview');

  const checkExistingOperation = (report: ScamReport) => {
    const targetNumber = report.suspiciousNumbers[0];
    if (targetNumber && Math.random() > 0.6) {
      return `KAU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }
    return null;
  };

  const deployKautilya = (report: ScamReport) => {
    const existingOperation = checkExistingOperation(report);
    
    if (existingOperation) {
      alert(`⚠️ LINKED OPERATION DETECTED\n\nThis number is already part of operation: ${existingOperation}\n\nLinking new report to existing Kautilya sting...`);
      setTimeout(() => {
        setActiveTab("timeline");
      }, 2000);
    } else {
      const confirmStart = confirm(`🚀 DEPLOY KAUTILYA 2.0?\n\nTarget: ${report.suspiciousNumbers[0] || report.reporterContact}\nScam Type: ${report.scamType}\nLocation: ${report.location}\n\nThis will initiate AI engagement with MayaJaal persona. Continue?`);
      
      if (confirmStart) {
        onStartKautilya(report);
        onClose();
      }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">TRIAGE & DEPLOY - LEA Dashboard</h2>
                <p className="text-sm text-gray-600">Cybercrime Investigation Interface</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${getRiskColor(report.riskLevel)} px-3 py-1`}>
                {report.riskLevel.toUpperCase()} RISK
              </Badge>
              <Button variant="outline" onClick={onClose}>
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Complaint Overview Section */}
          <Card className="mb-6 border-2 border-red-200 bg-red-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-red-800">🚨 Priya's Complaint Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Phone Number:</span>
                  <p className="font-mono font-bold text-lg">{report.suspiciousNumbers[0] || report.reporterContact}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Scam Type:</span>
                  <p className="font-semibold">{report.scamType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Location (Auto-mapped from IP/GPS):</span>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-green-600" />
                    {report.location}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Amount Lost:</span>
                  <p className="text-red-600 font-bold text-lg">₹{report.amount?.toLocaleString()}</p>
                </div>
              </div>

              {/* System Auto-Checks */}
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">🔍 System Auto-Checks:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {checkExistingOperation(report) ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>⚠️ Number found in ongoing Kautilya operation: {checkExistingOperation(report)}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>✅ No existing operations found. Ready for new deployment.</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span>History: {Math.floor(Math.random() * 5) + 1} previous reports from this region</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => deployKautilya(report)} 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 flex-1"
                >
                  <Zap className="w-5 h-5" />
                  🚀 START HUNT - Deploy Kautilya 2.0
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-4"
                  onClick={() => setActiveTab("timeline")}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Timeline
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Officer Dashboard View Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Case Overview', icon: FileText },
                { id: 'timeline', label: 'Complaint Timeline', icon: Clock },
                { id: 'previous', label: 'Previous Cases', icon: History },
                { id: 'network', label: 'Scam Network Map', icon: Share2 }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <Card>
            <CardContent className="pt-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-xl mb-3">{report.scamType}</h3>
                    <p className="text-gray-700 leading-relaxed">{report.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-gray-600">Reporter:</span>
                        <p className="font-medium">{report.reporterName}</p>
                        <p className="text-gray-500">{report.reporterContact}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Status:</span>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {report.suspiciousUPIs.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-600">Target UPI IDs:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {report.suspiciousUPIs.map((upi, idx) => (
                            <Badge key={idx} variant="outline" className="font-mono text-red-600 bg-red-50 border-red-200">
                              🎯 {upi}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl">Complaint Timeline - Every Action Since Report</h3>
                  <div className="space-y-4">
                    {[
                      { time: 'Just now', action: `Case opened in officer dashboard by Officer ${report.assignedOfficer || 'IND001'}`, status: 'current', icon: UserCheck },
                      { time: '1 min ago', action: 'AI triage completed - High risk scam pattern detected', status: 'completed', icon: AlertTriangle },
                      { time: '3 min ago', action: 'Complaint received via Prahaar Kavach portal', status: 'completed', icon: FileText },
                      { time: '5 min ago', action: `Initial complaint submitted by ${report.reporterName}`, status: 'completed', icon: User },
                    ].map((event, idx) => {
                      const IconComponent = event.icon;
                      return (
                        <div key={idx} className={`flex items-start gap-4 p-4 rounded-lg border ${
                          event.status === 'current' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.status === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{event.action}</p>
                            <p className="text-sm text-gray-500">{event.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚡ Next Steps:</h4>
                    <p className="text-sm text-yellow-700">Deploy Kautilya 2.0 for AI engagement with scammer to extract UPI IDs and build scammer DNA profile for network analysis.</p>
                  </div>
                </div>
              )}

              {activeTab === 'previous' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl">Previous Cases Section - History of Linked Frauds</h3>
                  <div className="space-y-4">
                    {[
                      { id: 'CASE-001', type: 'Army Equipment Scam', amount: 12000, date: '2024-01-10', status: 'resolved', similarity: 85, reporter: 'Ramesh Kumar' },
                      { id: 'CASE-078', type: 'Army Surplus Sale', amount: 8000, date: '2024-01-05', status: 'investigating', similarity: 72, reporter: 'Sunita Sharma' },
                      { id: 'CASE-156', type: 'Military Equipment', amount: 15000, date: '2023-12-28', status: 'resolved', similarity: 90, reporter: 'Vikash Patel' }
                    ].map((case_, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-lg">{case_.id}</span>
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                {case_.similarity}% Pattern Match
                              </Badge>
                              <Badge className={getStatusColor(case_.status)}>
                                {case_.status}
                              </Badge>
                            </div>
                            <p className="text-gray-700 font-medium">{case_.type} - ₹{case_.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Reporter: {case_.reporter} | Date: {case_.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">🎯 Pattern Analysis:</h4>
                    <p className="text-sm text-red-700">
                      <strong>MO Detected:</strong> Same operational pattern - Army equipment sales with advance payment demands via UPI. 
                      All cases target military enthusiasts with promises of discounted surplus equipment.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'network' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl">Scam Network Map - Linked Criminal Infrastructure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Connected Phone Numbers:</h4>
                      {[
                        { number: '+91-8765432109', reports: 3, status: 'active' },
                        { number: '+91-7654321098', reports: 2, status: 'blocked' },
                        { number: '+91-9876543210', reports: 1, status: 'investigating' }
                      ].map((entry, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="font-mono text-sm">{entry.number}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {entry.reports} reports
                            </Badge>
                            <Badge className={entry.status === 'active' ? 'bg-red-100 text-red-800' : 
                              entry.status === 'blocked' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}>
                              {entry.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Linked UPI Infrastructure:</h4>
                      {[
                        { upi: 'fauji47@okbank', risk: 'HIGH', amount: '₹45,000' },
                        { upi: 'army_surplus@paytm', risk: 'HIGH', amount: '₹32,000' },
                        { upi: 'soldier123@phonepe', risk: 'MEDIUM', amount: '₹18,000' }
                      ].map((entry, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-red-500" />
                            <span className="font-mono text-sm">{entry.upi}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">{entry.amount}</span>
                            <Badge className="bg-red-100 text-red-800 text-xs">{entry.risk} RISK</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">🧠 Network Intelligence Summary:</h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• <strong>Geographic Focus:</strong> Operates primarily in Indore and surrounding MP districts</li>
                      <li>• <strong>Target Profile:</strong> Middle-aged individuals interested in army surplus equipment</li>
                      <li>• <strong>Payment Range:</strong> Demands advance payments between ₹5,000 to ₹20,000</li>
                      <li>• <strong>Communication:</strong> Uses military terminology and ranks to establish credibility</li>
                      <li>• <strong>Network Size:</strong> Estimated 8-12 active phone numbers in rotation</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}