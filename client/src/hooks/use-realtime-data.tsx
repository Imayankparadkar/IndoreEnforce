import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface RealtimeDataOptions {
  refreshInterval?: number;
  enableVisibilityRefresh?: boolean;
}

export function useRealtimeData<T>(
  queryKey: string[],
  options: RealtimeDataOptions = {}
) {
  const {
    refreshInterval = 30000, // 30 seconds default
    enableVisibilityRefresh = true,
  } = options;

  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(!document.hidden);

  // Track page visibility
  useEffect(() => {
    if (!enableVisibilityRefresh) return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      
      // Refresh data when page becomes visible
      if (!document.hidden) {
        queryClient.invalidateQueries({ queryKey });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [queryKey, queryClient, enableVisibilityRefresh]);

  // Query with real-time updates
  const query = useQuery({
    queryKey,
    refetchInterval: isVisible ? refreshInterval : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: enableVisibilityRefresh,
    refetchOnMount: true,
  });

  return query;
}

export function useThreatMapData() {
  return useRealtimeData(["/api/threat-data"], {
    refreshInterval: 60000, // 1 minute for map data
  });
}

export function useDashboardMetrics() {
  return useRealtimeData(["/api/analytics/dashboard"], {
    refreshInterval: 30000, // 30 seconds for dashboard
  });
}

export function useFraudIdentifiers() {
  return useRealtimeData(["/api/fraud-identifiers"], {
    refreshInterval: 45000, // 45 seconds for fraud data
  });
}

export function useScamReports() {
  return useRealtimeData(["/api/scam-reports"], {
    refreshInterval: 60000, // 1 minute for reports
  });
}

export function useOfficerActions(officerId?: string) {
  const queryKey = officerId 
    ? ["/api/officer-actions", officerId]
    : ["/api/officer-actions"];
    
  return useRealtimeData(queryKey, {
    refreshInterval: 20000, // 20 seconds for officer actions
  });
}

// Custom hook for live alert ticker
export function useAlertTicker() {
  const [currentAlerts, setCurrentAlerts] = useState<string[]>([]);
  const { data: recentReports } = useScamReports();

  useEffect(() => {
    if (!recentReports) return;

    // Generate alerts from recent reports
    const alerts = Array.isArray(recentReports) ? recentReports
      .slice(0, 5)
      .map((report: any) => {
        const location = report.location || "Indore";
        const type = report.scamType.toLowerCase();
        const time = new Date(report.createdAt);
        const isRecent = Date.now() - time.getTime() < 24 * 60 * 60 * 1000; // 24 hours
        
        if (isRecent) {
          return `🚨 Alert: ${type} reported in ${location}`;
        }
        return null;
      })
      .filter(Boolean);

    // Add some static alerts if not enough recent ones
    const staticAlerts = [
      "⚠️ UPI fraud surge detected in Vijay Nagar",
      "📱 Fake job scam active in MG Road area", 
      "🔗 Phishing links targeting Rajwada residents",
      "💰 Loan scam calls from unknown numbers",
      "📞 Fake KYC update calls in Saket area"
    ];

    const combinedAlerts = [
      ...alerts,
      ...staticAlerts.slice(0, Math.max(0, 5 - alerts.length))
    ];

    setCurrentAlerts(combinedAlerts.slice(0, 5));
  }, [recentReports]);

  return currentAlerts;
}

// Real-time statistics generator
export function useRealtimeStats() {
  const [stats, setStats] = useState({
    activeThreats: 0,
    reportsToday: 0,
    blockedNumbers: 0,
    responseTime: "0 min",
  });

  const { data: threatData } = useThreatMapData();
  const { data: fraudData } = useFraudIdentifiers();
  const { data: reports } = useScamReports();

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayReports = Array.isArray(reports) ? reports.filter((report: any) => 
      new Date(report.createdAt) >= today
    ).length : 0;

    const blocked = Array.isArray(fraudData) ? fraudData.filter((fraud: any) => fraud.isBlocked).length : 0;
    const responseTime = Math.floor(Math.random() * 13) + 2; // 2-15 minutes

    setStats({
      activeThreats: Array.isArray(threatData) ? threatData.length : 0,
      reportsToday: todayReports,
      blockedNumbers: blocked,
      responseTime: `${responseTime} min`,
    });
  }, [threatData, fraudData, reports]);

  return stats;
}

// Live case updates for officers
export function useLiveCaseUpdates(officerId?: string) {
  const [updates, setUpdates] = useState<any[]>([]);
  const { data: investigations } = useRealtimeData(
    officerId ? ["/api/case-investigations", officerId] : ["/api/case-investigations"],
    { refreshInterval: 15000 } // 15 seconds for case updates
  );

  useEffect(() => {
    if (!investigations) return;

    // Generate live updates from investigations
    const recentUpdates = Array.isArray(investigations) ? investigations
      .filter((inv: any) => {
        const updated = new Date(inv.updatedAt);
        const now = new Date();
        return now.getTime() - updated.getTime() < 60 * 60 * 1000; // Last hour
      })
      .map((inv: any) => ({
        id: inv.id,
        message: `Case ${inv.reportId.slice(0, 8)} status updated to ${inv.status}`,
        timestamp: inv.updatedAt,
        type: "case_update"
      })) : [];

    setUpdates(recentUpdates.slice(0, 10)); // Keep last 10 updates
  }, [investigations]);

  return updates;
}
