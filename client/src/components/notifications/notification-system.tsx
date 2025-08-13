import { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationSystemProps {
  onNotificationUpdate?: (notifications: Notification[]) => void;
}

export function NotificationSystem({ onNotificationUpdate }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random notifications based on realistic cybercrime scenarios
      const notificationTypes = [
        {
          type: 'warning' as const,
          title: 'New Phishing Campaign Detected',
          message: 'Increase in fake bank SMS reports in Indore region',
          priority: 'high' as const
        },
        {
          type: 'info' as const,
          title: 'Weekly Threat Summary',
          message: '15 new scam reports processed this week',
          priority: 'medium' as const
        },
        {
          type: 'error' as const,
          title: 'High-Risk UPI Found',
          message: 'Suspicious UPI ID reported by multiple victims',
          priority: 'high' as const
        },
        {
          type: 'success' as const,
          title: 'Case Resolved',
          message: 'Cybercrime case #12345 successfully resolved',
          priority: 'low' as const
        },
        {
          type: 'warning' as const,
          title: 'Fraud Pattern Alert',
          message: 'New voice call scam technique identified',
          priority: 'medium' as const
        }
      ];

      // 20% chance to generate a notification every 30 seconds
      if (Math.random() < 0.2) {
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          ...randomNotification,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => {
          const updated = [newNotification, ...prev].slice(0, 50); // Keep only last 50
          onNotificationUpdate?.(updated);
          return updated;
        });
      }
    }, 30000); // Check every 30 seconds

    // Generate initial notifications
    const initialNotifications: Notification[] = [
      {
        id: 'init-1',
        type: 'info',
        title: 'System Online',
        message: 'Prahaar 360 monitoring system is active',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
        priority: 'low'
      },
      {
        id: 'init-2',
        type: 'warning',
        title: 'Active Threat Detected',
        message: 'Suspicious activity in digital payment fraud category',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        read: false,
        priority: 'high'
      }
    ];

    setNotifications(initialNotifications);
    onNotificationUpdate?.(initialNotifications);

    return () => clearInterval(interval);
  }, [onNotificationUpdate]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-200';
      case 'medium': return 'bg-orange-100 border-orange-200';
      default: return 'bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-hidden bg-white rounded-lg shadow-lg border z-50"
          >
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    } ${getPriorityColor(notification.priority)}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium text-sm ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                          <Badge
                            variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {notification.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}