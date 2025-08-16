import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, ExternalLink, Filter, Download } from "lucide-react";
import { useState } from "react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  blockNumber: number;
  gasUsed?: number;
  gasPrice?: number;
  isIncoming: boolean;
  methodId?: string;
  status?: string;
  type?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenDecimal?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  internalTransactions?: Transaction[];
  tokenTransactions?: Transaction[];
}

export default function TransactionTable({ transactions, internalTransactions = [], tokenTransactions = [] }: TransactionTableProps) {
  const [filterType, setFilterType] = useState<'all' | 'in' | 'out'>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'value' | 'block'>('timestamp');
  const formatAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatValue = (value: string, decimals?: string) => {
    const num = parseFloat(value);
    if (decimals) {
      return (num / Math.pow(10, parseInt(decimals))).toFixed(6);
    }
    return num.toFixed(6);
  };

  const formatGas = (gasUsed: number, gasPrice: number) => {
    return ((gasUsed * gasPrice) / 1e18).toFixed(8);
  };

  const filterTransactions = (txs: Transaction[]) => {
    let filtered = txs;
    if (filterType === 'in') {
      filtered = txs.filter(tx => tx.isIncoming);
    } else if (filterType === 'out') {
      filtered = txs.filter(tx => !tx.isIncoming);
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === 'timestamp') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortBy === 'value') {
        return parseFloat(b.value) - parseFloat(a.value);
      } else {
        return b.blockNumber - a.blockNumber;
      }
    });
  };

  const exportToCSV = (txs: Transaction[], type: string) => {
    const headers = ['Hash', 'From', 'To', 'Value', 'Timestamp', 'Block', 'Type'];
    const csvContent = [
      headers.join(','),
      ...txs.map(tx => [
        tx.hash,
        tx.from,
        tx.to,
        tx.value,
        tx.timestamp,
        tx.blockNumber,
        tx.isIncoming ? 'IN' : 'OUT'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_transactions.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderTransactionTable = (txs: Transaction[], type: string) => {
    const filteredTxs = filterTransactions(txs);
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button 
              variant={filterType === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button 
              variant={filterType === 'in' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterType('in')}
            >
              Incoming
            </Button>
            <Button 
              variant={filterType === 'out' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterType('out')}
            >
              Outgoing
            </Button>
          </div>
          <div className="flex gap-2">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="timestamp">Sort by Time</option>
              <option value="value">Sort by Value</option>
              <option value="block">Sort by Block</option>
            </select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportToCSV(filteredTxs, type)}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        {filteredTxs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No {type} transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">From/To</th>
                  <th className="text-right py-2">Value</th>
                  {type === 'regular' && <th className="text-right py-2">Gas Fee</th>}
                  <th className="text-left py-2">Time</th>
                  <th className="text-left py-2">Block</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Hash</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxs.map((tx, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <Badge 
                        variant={tx.isIncoming ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {tx.isIncoming ? "IN" : "OUT"}
                      </Badge>
                      {tx.type === 'token' && (
                        <Badge variant="outline" className="text-xs ml-1">
                          {tx.tokenSymbol}
                        </Badge>
                      )}
                    </td>
                    <td className="py-2">
                      <code className="text-xs">
                        {formatAddress(tx.isIncoming ? tx.from : tx.to)}
                      </code>
                    </td>
                    <td className="py-2 text-right font-mono">
                      <span className={tx.isIncoming ? "text-green-600" : "text-red-600"}>
                        {tx.isIncoming ? "+" : "-"}
                        {tx.type === 'token' ? 
                          `${formatValue(tx.value, tx.tokenDecimal)} ${tx.tokenSymbol}` :
                          `${formatValue(tx.value)} ETH`
                        }
                      </span>
                    </td>
                    {type === 'regular' && (
                      <td className="py-2 text-right font-mono text-xs">
                        {tx.gasUsed && tx.gasPrice ? 
                          `${formatGas(tx.gasUsed, tx.gasPrice)} ETH` : 'N/A'
                        }
                      </td>
                    )}
                    <td className="py-2 text-xs">
                      {formatTimestamp(tx.timestamp)}
                    </td>
                    <td className="py-2 text-xs">
                      {tx.blockNumber}
                    </td>
                    <td className="py-2">
                      <Badge 
                        variant={tx.status === 'success' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {tx.status || 'success'}
                      </Badge>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center">
                        <code className="text-xs mr-2">
                          {formatAddress(tx.hash)}
                        </code>
                        <button 
                          onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowUpDown className="mr-2 h-5 w-5" />
          Advanced Transaction Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="regular" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="regular">Regular ({transactions.length})</TabsTrigger>
            <TabsTrigger value="internal">Internal ({internalTransactions.length})</TabsTrigger>
            <TabsTrigger value="tokens">Tokens ({tokenTransactions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regular">
            {renderTransactionTable(transactions, 'regular')}
          </TabsContent>
          
          <TabsContent value="internal">
            {renderTransactionTable(internalTransactions, 'internal')}
          </TabsContent>
          
          <TabsContent value="tokens">
            {renderTransactionTable(tokenTransactions, 'tokens')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}