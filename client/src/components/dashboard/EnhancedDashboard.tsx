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
  Activity
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
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';

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
    totalReports: 1247,
    activeThreats: 23,
    casesResolved: 1156,
    officersOnDuty: 45,
    weeklyTrend: 12,
    responseTime: "2.3"
  });

  const [recentReports] = useState<RecentReport[]>([
    {
      id: '1',
      type: 'Phone Scam',
      status: 'investigating',
      location: 'Vijay Nagar',
      timestamp: new Date(),
      severity: 'high'
    },
    {
      id: '2',
      type: 'Email Phishing',
      status: 'resolved',
      location: 'Indore Central',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'medium'
    },
    {
      id: '3',
      type: 'Online Fraud',
      status: 'new',
      location: 'Bhopal Road',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'low'
    }
  ]);

  // Chart data
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Reports Filed',
        data: [12, 19, 8, 15, 22, 18, 25],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Cases Resolved',
        data: [8, 15, 6, 12, 18, 14, 20],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const doughnutData = {
    labels: ['Phone Scams', 'Email Phishing', 'Online Fraud', 'Banking Fraud', 'Social Media'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#ef4444',
          '#f97316',
          '#eab308',
          '#22c55e',
          '#3b82f6'
        ],
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Reports',
        data: [145, 198, 167, 203, 189, 247],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
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
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {t('welcome')}
                </h1>
                <p className="text-blue-100 text-lg">
                  {t('cyberCrimeHub')}
                </p>
                <p className="text-blue-200 mt-2">
                  {currentUser ? `Welcome back, ${currentUser.email}` : 'Guest User'}
                </p>
              </div>
              <Shield className="w-20 h-20 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {[
          {
            title: t('totalReports'),
            value: stats.totalReports,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            trend: '+12%'
          },
          {
            title: t('activeThreats'),
            value: stats.activeThreats,
            icon: AlertTriangle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            trend: '-8%'
          },
          {
            title: t('casesResolved'),
            value: stats.casesResolved,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            trend: '+23%'
          },
          {
            title: t('officersOnDuty'),
            value: stats.officersOnDuty,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            trend: '+5%'
          }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="flex items-center text-sm">
                      {stat.trend.startsWith('+') ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      <CountUp end={stat.value} duration={2.5} />
                    </h3>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Weekly Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={lineChartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
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
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Scam Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <Doughnut data={doughnutData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right' as const,
                  },
                },
              }} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Reports and Monthly Trends */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={containerVariants}>
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {t('recentAlerts')}
                </span>
                <Button variant="outline" size="sm">
                  {t('viewDetails')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <motion.div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        report.severity === 'high' ? 'bg-red-500' :
                        report.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium">{report.type}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        report.status === 'resolved' ? 'text-green-600' :
                        report.status === 'investigating' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {report.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        {report.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={barChartData} options={{
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
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      {userRole === 'citizen' && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: t('reportScam'), icon: FileText, color: 'bg-blue-500' },
                  { label: 'Emergency Contact', icon: Phone, color: 'bg-red-500' },
                  { label: 'Email Support', icon: Mail, color: 'bg-green-500' },
                  { label: 'Track Report', icon: Activity, color: 'bg-purple-500' }
                ].map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className={`w-full h-20 ${action.color} hover:opacity-90 flex flex-col gap-2`}>
                        <IconComponent className="w-6 h-6" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}