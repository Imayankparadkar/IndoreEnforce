import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Activity,
  Eye,
  AlertCircle
} from "lucide-react";
import CountUp from 'react-countup';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
// Firebase imports for data fetching (optional)
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface DashboardStats {
  totalReports: number;
  activeThreats: number;
  casesResolved: number;
  officersOnDuty: number;
  weeklyTrend: number;
  responseTime: string;
}

interface RecentReport {
  id: string;
  type: string;
  status: string;
  location: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export function EnhancedDashboard() {
  const { t } = useLanguage();
  const { currentUser, userRole } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    activeThreats: 0,
    casesResolved: 0,
    officersOnDuty: 8,
    weeklyTrend: 12,
    responseTime: "2.3"
  });
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time data fetching with auto-refresh every 3 minutes
  const { data: realTimeData, refetch } = useQuery({
    queryKey: ['/api/analytics/dashboard'],
    refetchInterval: 3 * 60 * 1000, // 3 minutes
    refetchIntervalInBackground: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Generate demo data for reports
  const generateDemoReports = () => {
    const demoReports = [
      {
        id: '1',
        type: 'UPI Fraud',
        status: 'investigating',
        location: 'Vijay Nagar, Indore',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        severity: 'high' as const
      },
      {
        id: '2', 
        type: 'WhatsApp Scam',
        status: 'new',
        location: 'Palasia, Indore',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        severity: 'medium' as const
      },
      {
        id: '3',
        type: 'Email Phishing',
        status: 'resolved',
        location: 'Rau, Indore',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        severity: 'low' as const
      }
    ];
    setRecentReports(demoReports);
  };

  // Auto-increment stats for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalReports: prev.totalReports + Math.floor(Math.random() * 3),
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.6 ? 1 : -1)),
        casesResolved: prev.casesResolved + Math.floor(Math.random() * 2)
      }));
      setLastUpdate(new Date());
    }, 180000); // Update every 3 minutes

    return () => clearInterval(interval);
  }, []);

  // Initial data setup
  useEffect(() => {
    generateDemoReports();
    // Set initial stats
    setStats(prev => ({
      ...prev,
      totalReports: 1247,
      activeThreats: 23,
      casesResolved: 1156
    }));
  }, []);

  // Update stats when real-time data changes
  useEffect(() => {
    if (realTimeData) {
      setStats(prev => ({
        ...prev,
        totalReports: realTimeData.totalScams + 1200,
        activeThreats: realTimeData.activeFrauds + 15,
        casesResolved: realTimeData.resolvedCases + 1100
      }));
    }
  }, [realTimeData]);

  const scrollingAlerts = [
    { text: "High Priority: UPI Fraud spike detected in Vijay Nagar area", severity: "high" },
    { text: "Alert: New WhatsApp investment scam variant identified", severity: "medium" },
    { text: "Update: 5 fraud numbers blocked in last hour", severity: "low" },
    { text: "Warning: Fake bank OTP calls reported from +91-9876543210", severity: "high" },
    { text: "Info: Cybercrime awareness session scheduled for tomorrow", severity: "low" }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Reports',
        data: [12, 19, 15, 25, 22, 18, 24],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ['UPI Fraud', 'Phone Scam', 'Email Phishing', 'Social Media', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
        ],
        borderWidth: 0,
      },
    ],
  };

  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Resolved Cases',
        data: [45, 52, 38, 64],
        backgroundColor: '#10B981',
        borderRadius: 6,
      },
    ],
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
        <Card className="bg-blue-900 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">PRAHAAR 360</h1>
                <p className="text-blue-200 text-lg">{t('cyberCrimeHub')}</p>
                <p className="text-blue-300 mt-2">
                  {t('welcome')}, {currentUser?.email?.split('@')[0] || 'User'} | 
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-4">
                  <Shield className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">System Status</div>
                  <div className="text-xs text-green-300 flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Operational
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Live Alert Ticker */}
      <motion.div variants={itemVariants}>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 animate-pulse" />
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  {scrollingAlerts.map((alert, index) => (
                    <span key={index} className={`inline-block mr-8 ${
                      alert.severity === 'high' ? 'text-red-700 font-semibold' :
                      alert.severity === 'medium' ? 'text-orange-700' : 'text-blue-700'
                    }`}>
                      🚨 {alert.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {[
          { 
            title: t('totalReports'), 
            value: stats.totalReports, 
            icon: FileText, 
            color: "text-blue-600", 
            bgColor: "bg-blue-50",
            trend: "+12%",
            trendUp: true
          },
          { 
            title: t('activeThreats'), 
            value: stats.activeThreats, 
            icon: AlertTriangle, 
            color: "text-red-600", 
            bgColor: "bg-red-50",
            trend: "-5%",
            trendUp: false
          },
          { 
            title: t('casesResolved'), 
            value: stats.casesResolved, 
            icon: CheckCircle, 
            color: "text-green-600", 
            bgColor: "bg-green-50",
            trend: "+18%",
            trendUp: true
          },
          { 
            title: t('officersOnDuty'), 
            value: stats.officersOnDuty, 
            icon: Users, 
            color: "text-purple-600", 
            bgColor: "bg-purple-50",
            trend: "100%",
            trendUp: true
          }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      <CountUp end={stat.value} duration={2.5} />
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Security Alerts
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentReports.map((report) => (
                    <motion.div
                      key={report.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{report.type}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.severity === 'high' ? 'bg-red-100 text-red-800' :
                            report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {report.severity.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {recentReports.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>No recent reports available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Row */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Line data={lineChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Threat Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
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
                  <p className="text-red-700 text-sm">24/7 National Helpline</p>
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
        </div>
      </div>
    </motion.div>
  );
}