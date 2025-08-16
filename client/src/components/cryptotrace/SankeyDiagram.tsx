import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Info } from "lucide-react";
import Plot from 'react-plotly.js';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  isIncoming: boolean;
  type?: string;
}

interface FlowAnalysis {
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
  dailyFlows: { [key: string]: { inflow: number; outflow: number } };
  averageTxValue: number;
}

interface SankeyDiagramProps {
  transactions: Transaction[];
  internalTransactions?: Transaction[];
  flowAnalysis?: FlowAnalysis;
}

export default function SankeyDiagram({ transactions, internalTransactions = [], flowAnalysis }: SankeyDiagramProps) {
  // Process all transactions for comprehensive flow analysis
  const prepareSankeyData = () => {
    const allTxs = [...transactions, ...internalTransactions];
    if (!allTxs.length) return { nodes: [], links: [] };

    // Analyze both incoming and outgoing flows
    const incomingTxs = allTxs.filter(tx => tx.isIncoming);
    const outgoingTxs = allTxs.filter(tx => !tx.isIncoming);
    
    const senderCounts: { [key: string]: { count: number; totalValue: number } } = {};
    const receiverCounts: { [key: string]: { count: number; totalValue: number } } = {};
    
    // Process incoming transactions
    incomingTxs.forEach(tx => {
      if (!senderCounts[tx.from]) {
        senderCounts[tx.from] = { count: 0, totalValue: 0 };
      }
      senderCounts[tx.from].count += 1;
      senderCounts[tx.from].totalValue += parseFloat(tx.value);
    });
    
    // Process outgoing transactions
    outgoingTxs.forEach(tx => {
      if (!receiverCounts[tx.to]) {
        receiverCounts[tx.to] = { count: 0, totalValue: 0 };
      }
      receiverCounts[tx.to].count += 1;
      receiverCounts[tx.to].totalValue += parseFloat(tx.value);
    });

    // Get top 5 senders and receivers
    const topSenders = Object.entries(senderCounts)
      .sort(([,a], [,b]) => b.totalValue - a.totalValue)
      .slice(0, 5);
      
    const topReceivers = Object.entries(receiverCounts)
      .sort(([,a], [,b]) => b.totalValue - a.totalValue)
      .slice(0, 5);

    // Create nodes
    const nodes = [
      ...topSenders.map(([address], index) => `Sender ${index + 1}`),
      'Target Wallet',
      ...topReceivers.map(([address], index) => `Receiver ${index + 1}`)
    ];

    // Create links
    const links = [
      // Incoming flows
      ...topSenders.map(([address, data], index) => ({
        source: index,
        target: topSenders.length, // Target wallet index
        value: data.totalValue,
        label: `${data.totalValue.toFixed(4)} ETH`
      })),
      // Outgoing flows
      ...topReceivers.map(([address, data], index) => ({
        source: topSenders.length, // Target wallet index
        target: topSenders.length + 1 + index,
        value: data.totalValue,
        label: `${data.totalValue.toFixed(4)} ETH`
      }))
    ];

    return { nodes, links, topSenders, topReceivers };
  };

  const { nodes, links, topSenders, topReceivers } = prepareSankeyData();

  const plotData = [{
    type: "sankey" as const,
    node: {
      pad: 15,
      thickness: 20,
      line: {
        color: "black",
        width: 0.5
      },
      label: nodes,
      color: nodes.map((_, index) => {
        if (index < (topSenders?.length || 0)) return "#10b981"; // Green for senders
        if (index === (topSenders?.length || 0)) return "#ef4444"; // Red for target
        return "#f59e0b"; // Orange for receivers
      })
    },
    link: {
      source: links.map(l => l.source),
      target: links.map(l => l.target),
      value: links.map(l => l.value),
      color: links.map((link, index) => 
        index < (topSenders?.length || 0) ? 
          "rgba(16, 185, 129, 0.3)" : // Green for incoming
          "rgba(245, 158, 11, 0.3)"   // Orange for outgoing
      )
    }
  }];

  const layout = {
    title: {
      text: "ETH Flow Analysis"
    },
    font: {
      size: 10
    },
    height: 400,
    margin: {
      l: 20,
      r: 20,
      t: 40,
      b: 20
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Ethereum Flow Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transaction data available for flow analysis</p>
          </div>
        ) : nodes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No incoming transactions found</p>
          </div>
        ) : (
          <div className="w-full">
            <Plot
              data={plotData}
              layout={layout}
              config={{
                displayModeBar: false,
                responsive: true
              }}
              style={{ width: '100%', height: '400px' }}
            />
            <div className="mt-4 space-y-4">
              {flowAnalysis && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-green-800">Total Inflow</div>
                    <div className="text-lg font-bold text-green-900">
                      {flowAnalysis.totalInflow.toFixed(4)} ETH
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-orange-800">Total Outflow</div>
                    <div className="text-lg font-bold text-orange-900">
                      {flowAnalysis.totalOutflow.toFixed(4)} ETH
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-blue-800">Net Flow</div>
                    <div className={`text-lg font-bold ${
                      flowAnalysis.netFlow > 0 ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {flowAnalysis.netFlow > 0 ? '+' : ''}{flowAnalysis.netFlow.toFixed(4)} ETH
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-800">Avg Transaction</div>
                    <div className="text-lg font-bold text-gray-900">
                      {flowAnalysis.averageTxValue.toFixed(6)} ETH
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Incoming Flows</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Target Wallet</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span>Outgoing Flows</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                  <div>
                    <p><strong>Flow Analysis:</strong> Comprehensive visualization of ETH movement patterns.</p>
                    <p>Large incoming flows may indicate funding sources, while outgoing patterns reveal distribution strategies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}