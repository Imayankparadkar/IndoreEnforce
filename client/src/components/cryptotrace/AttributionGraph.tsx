import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

// Register the dagre layout
cytoscape.use(dagre);

interface AttributionGraphProps {
  walletAddress: string;
}

export default function AttributionGraph({ walletAddress }: AttributionGraphProps) {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    // Sample attribution data - in real implementation, this would come from the API
    const elements = [
      // Nodes
      { data: { id: 'wallet', label: 'Target Wallet', type: 'wallet' } },
      { data: { id: 'alias1', label: 'CryptoKing99', type: 'alias' } },
      { data: { id: 'alias2', label: 'RansomMaster', type: 'alias' } },
      { data: { id: 'email1', label: 'crypto@tempmail.com', type: 'email' } },
      { data: { id: 'ip1', label: '192.168.1.100', type: 'ip' } },
      { data: { id: 'ransomware', label: 'Ryuk Family', type: 'ransomware' } },
      
      // Edges
      { data: { id: 'e1', source: 'wallet', target: 'alias1', label: 'associated-with' } },
      { data: { id: 'e2', source: 'alias1', target: 'email1', label: 'uses' } },
      { data: { id: 'e3', source: 'alias1', target: 'alias2', label: 'same-entity' } },
      { data: { id: 'e4', source: 'alias2', target: 'ransomware', label: 'operates' } },
      { data: { id: 'e5', source: 'email1', target: 'ip1', label: 'accessed-from' } }
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#3b82f6',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#ffffff',
            'font-size': '12px',
            'width': '60px',
            'height': '60px',
            'text-wrap': 'wrap',
            'text-max-width': '80px'
          }
        },
        {
          selector: 'node[type="wallet"]',
          style: {
            'background-color': '#ef4444'
          }
        },
        {
          selector: 'node[type="alias"]',
          style: {
            'background-color': '#f59e0b'
          }
        },
        {
          selector: 'node[type="email"]',
          style: {
            'background-color': '#10b981'
          }
        },
        {
          selector: 'node[type="ip"]',
          style: {
            'background-color': '#8b5cf6'
          }
        },
        {
          selector: 'node[type="ransomware"]',
          style: {
            'background-color': '#dc2626'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '10px',
            'text-rotation': 'autorotate',
            'text-margin-y': -10
          }
        }
      ],
      layout: {
        name: 'dagre',
        directed: true,
        padding: 20,
        spacingFactor: 1.5
      } as any
    });

    cyInstance.current = cy;

    // Add interactivity
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      console.log('Clicked node:', node.data());
    });

    return () => {
      if (cyInstance.current) {
        cyInstance.current.destroy();
      }
    };
  }, [walletAddress]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Network className="mr-2 h-5 w-5" />
          Attribution Graph
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={cyRef}
          className="w-full h-96 border border-gray-200 rounded-lg bg-gray-50"
        />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Target Wallet</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span>Aliases</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Email Addresses</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span>IP Addresses</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
            <span>Ransomware Family</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Interactive attribution graph showing relationships between entities. 
          Click on nodes to explore connections and gather intelligence.
        </p>
      </CardContent>
    </Card>
  );
}