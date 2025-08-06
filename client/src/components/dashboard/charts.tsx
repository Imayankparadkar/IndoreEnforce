import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartsProps {
  analytics: any;
}

export default function Charts({ analytics }: ChartsProps) {
  const trendsChartRef = useRef<HTMLCanvasElement>(null);
  const typesChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Chart && trendsChartRef.current) {
      const ctx = trendsChartRef.current.getContext('2d');
      if (ctx) {
        new window.Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Scam Reports',
              data: [12, 19, 3, 5, 2, 3, 9],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Chart && typesChartRef.current) {
      const ctx = typesChartRef.current.getContext('2d');
      if (ctx) {
        new window.Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['UPI Fraud', 'Voice Scam', 'Phishing', 'Job Scam', 'Other'],
            datasets: [{
              data: [45, 25, 15, 10, 5],
              backgroundColor: [
                '#f97316',
                '#3b82f6', 
                '#ef4444',
                '#22c55e',
                '#6b7280'
              ]
            }]
          },
          options: {
            responsive: true
          }
        });
      }
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Scam Trends (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas ref={trendsChartRef} width="400" height="200"></canvas>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scam Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas ref={typesChartRef} width="400" height="200"></canvas>
        </CardContent>
      </Card>
    </div>
  );
}
