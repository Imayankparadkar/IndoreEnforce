import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Search, Filter } from "lucide-react";
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

// Register the dagre layout
cytoscape.use(dagre);

interface AttributionData {
  walletClusters: any[];
  exchangeConnections: any[];
  deFiProtocols: any[];
  suspiciousPatterns: any[];
  knownAddresses: any[];
}

interface AttributionGraphProps {
  walletAddress: string;
  attributionData?: AttributionData;
  extractedData?: any;
}

export default function AttributionGraph({ walletAddress, attributionData, extractedData }: AttributionGraphProps) {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [layoutType, setLayoutType] = useState<'dagre' | 'circle' | 'grid'>('dagre');

  const buildGraphElements = () => {
    const nodes: any[] = [
      // Always include the target wallet
      { data: { 
        id: 'wallet', 
        label: `Target Wallet\n${walletAddress.substring(0, 8)}...`, 
        type: 'wallet'
      } }
    ];
    
    const edges: any[] = [];
    let nodeIndex = 1;
    
    // Add extracted aliases
    if (extractedData?.aliases) {
      extractedData.aliases.forEach((alias: string) => {
        const aliasId = `alias${nodeIndex++}`;
        nodes.push({
          data: { id: aliasId, label: alias, type: 'alias' }
        });
        edges.push({
          data: { id: `e_wallet_${aliasId}`, source: 'wallet', target: aliasId, label: 'uses-alias' }
        });
      });
    }
    
    // Add extracted emails
    if (extractedData?.emails) {
      extractedData.emails.forEach((email: string) => {
        const emailId = `email${nodeIndex++}`;
        nodes.push({
          data: { id: emailId, label: email, type: 'email' }
        });
        edges.push({
          data: { id: `e_wallet_${emailId}`, source: 'wallet', target: emailId, label: 'uses-email' }
        });
      });
    }
    
    // Add extracted IPs
    if (extractedData?.ips) {
      extractedData.ips.forEach((ip: string) => {
        const ipId = `ip${nodeIndex++}`;
        nodes.push({
          data: { id: ipId, label: ip, type: 'ip' }
        });
        edges.push({
          data: { id: `e_wallet_${ipId}`, source: 'wallet', target: ipId, label: 'accessed-from' }
        });
      });
    }
    
    // Add extracted domains
    if (extractedData?.domains) {
      extractedData.domains.forEach((domain: string) => {
        const domainId = `domain${nodeIndex++}`;
        nodes.push({
          data: { id: domainId, label: domain, type: 'domain' }
        });
        edges.push({
          data: { id: `e_wallet_${domainId}`, source: 'wallet', target: domainId, label: 'communicates-with' }
        });
      });
    }
    
    // Add wallet clusters from attribution data
    if (attributionData?.walletClusters) {
      attributionData.walletClusters.forEach((cluster: any) => {
        const clusterId = `cluster${nodeIndex++}`;
        nodes.push({
          data: { 
            id: clusterId, 
            label: `${cluster.type}\n${cluster.address.substring(0, 8)}...\n(${cluster.interactionCount} txs)`, 
            type: cluster.type === 'exchange' ? 'exchange' : 'cluster',
            interactions: cluster.interactionCount
          }
        });
        edges.push({
          data: { 
            id: `e_wallet_${clusterId}`, 
            source: 'wallet', 
            target: clusterId, 
            label: `${cluster.interactionCount} interactions`,
            weight: cluster.interactionCount
          }
        });
      });
    }
    
    // Add exchange connections
    if (attributionData?.exchangeConnections) {
      attributionData.exchangeConnections.slice(0, 3).forEach((exchange: any) => {
        const exchangeId = `exchange${nodeIndex++}`;
        nodes.push({
          data: { 
            id: exchangeId, 
            label: `Exchange\n${exchange.exchange.substring(0, 8)}...\n${exchange.amount} ETH`, 
            type: 'exchange'
          }
        });
        edges.push({
          data: { 
            id: `e_wallet_${exchangeId}`, 
            source: 'wallet', 
            target: exchangeId, 
            label: 'exchange-tx'
          }
        });
      });
    }
    
    return [...nodes, ...edges];
  };
  
  useEffect(() => {
    if (!cyRef.current) return;

    const elements = buildGraphElements();

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
          selector: 'node[type="domain"]',
          style: {
            'background-color': '#6366f1'
          }
        },
        {
          selector: 'node[type="exchange"]',
          style: {
            'background-color': '#0891b2'
          }
        },
        {
          selector: 'node[type="cluster"]',
          style: {
            'background-color': '#dc2626'
          }
        },
        {
          selector: 'node.highlighted',
          style: {
            'border-width': '3px',
            'border-color': '#fbbf24',
            'overlay-opacity': 0.2,
            'overlay-color': '#fbbf24'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 'mapData(weight, 1, 10, 1, 4)',
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '9px',
            'text-rotation': 'autorotate',
            'text-margin-y': -8,
            'opacity': 0.8
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'line-color': '#fbbf24',
            'target-arrow-color': '#fbbf24',
            'width': 3,
            'opacity': 1
          }
        }
      ],
      layout: {
        name: layoutType,
        directed: true,
        padding: 30,
        spacingFactor: layoutType === 'dagre' ? 1.5 : 2,
        animate: true,
        animationDuration: 500
      } as any
    });

    cyInstance.current = cy;

    // Add interactivity
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      setSelectedNode(node.data());
      
      // Highlight connected nodes
      cy.elements().removeClass('highlighted');
      node.addClass('highlighted');
      node.connectedEdges().addClass('highlighted');
      node.connectedEdges().connectedNodes().addClass('highlighted');
    });
    
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        cy.elements().removeClass('highlighted');
        setSelectedNode(null);
      }
    });

    return () => {
      if (cyInstance.current) {
        cyInstance.current.destroy();
      }
    };
  }, [walletAddress, attributionData, extractedData, layoutType]);
  
  const changeLayout = (newLayout: 'dagre' | 'circle' | 'grid') => {
    setLayoutType(newLayout);
    if (cyInstance.current) {
      cyInstance.current.layout({
        name: newLayout,
        directed: true,
        padding: 30,
        spacingFactor: newLayout === 'dagre' ? 1.5 : 2,
        animate: true,
        animationDuration: 500
      } as any).run();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Network className="mr-2 h-5 w-5" />
              Dynamic Attribution Graph
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={layoutType === 'dagre' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLayout('dagre')}
              >
                Hierarchical
              </Button>
              <Button 
                variant={layoutType === 'circle' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLayout('circle')}
              >
                Circular
              </Button>
              <Button 
                variant={layoutType === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => changeLayout('grid')}
              >
                Grid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            ref={cyRef}
            className="w-full h-96 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer"
          />
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
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
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span>Domains</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-600 mr-2"></div>
              <span>Exchanges</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            Interactive attribution graph with real extracted data. 
            Click on nodes to highlight connections and view details.
          </p>
        </CardContent>
      </Card>
      
      {selectedNode && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Node Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedNode.type}</Badge>
                <span className="font-medium">{selectedNode.label}</span>
              </div>
              {selectedNode.address && (
                <p><strong>Address:</strong> <code className="text-xs">{selectedNode.address}</code></p>
              )}
              {selectedNode.interactions && (
                <p><strong>Interactions:</strong> {selectedNode.interactions}</p>
              )}
              <div className="text-sm text-gray-600">
                Click elsewhere to deselect.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}