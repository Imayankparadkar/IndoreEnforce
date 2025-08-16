import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Plot from 'react-plotly.js';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  isIncoming: boolean;
}

interface SankeyDiagramProps {
  transactions: Transaction[];
}

export default function SankeyDiagram({ transactions }: SankeyDiagramProps) {
  // Process transactions for Sankey diagram
  const prepareSankeyData = () => {
    if (!transactions.length) return { nodes: [], links: [] };

    // Get top 5 senders to this wallet
    const incomingTxs = transactions.filter(tx => tx.isIncoming);
    const senderCounts: { [key: string]: { count: number; totalValue: number } } = {};
    
    incomingTxs.forEach(tx => {
      if (!senderCounts[tx.from]) {
        senderCounts[tx.from] = { count: 0, totalValue: 0 };
      }
      senderCounts[tx.from].count += 1;
      senderCounts[tx.from].totalValue += parseFloat(tx.value);
    });

    // Sort by total value and get top 5
    const topSenders = Object.entries(senderCounts)
      .sort(([,a], [,b]) => b.totalValue - a.totalValue)
      .slice(0, 5);

    // Create nodes and links
    const nodes = [
      ...topSenders.map(([address], index) => `Sender ${index + 1}`),
      'Target Wallet'
    ];

    const links = topSenders.map(([address, data], index) => ({
      source: index,
      target: topSenders.length, // Target wallet index
      value: data.totalValue,
      label: `${data.totalValue.toFixed(4)} ETH`
    }));

    return { nodes, links };
  };

  const { nodes, links } = prepareSankeyData();

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
      color: nodes.map((_, index) => 
        index === nodes.length - 1 ? "#ef4444" : "#3b82f6"
      )
    },
    link: {
      source: links.map(l => l.source),
      target: links.map(l => l.target),
      value: links.map(l => l.value),
      color: links.map(() => "rgba(59, 130, 246, 0.3)")
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
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Analysis:</strong> Shows ETH flow from top 5 senders to the target wallet.</p>
              <p>Larger flows may indicate significant funding sources or suspicious activity.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}