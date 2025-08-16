import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ExternalLink } from "lucide-react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  blockNumber: number;
  isIncoming: boolean;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const formatAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatValue = (value: string) => {
    return parseFloat(value).toFixed(6);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowUpDown className="mr-2 h-5 w-5" />
          Transaction History (Last 20)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">From/To</th>
                  <th className="text-right py-2">Value (ETH)</th>
                  <th className="text-left py-2">Time</th>
                  <th className="text-left py-2">Block</th>
                  <th className="text-left py-2">Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <Badge 
                        variant={tx.isIncoming ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {tx.isIncoming ? "IN" : "OUT"}
                      </Badge>
                    </td>
                    <td className="py-2">
                      <code className="text-xs">
                        {formatAddress(tx.isIncoming ? tx.from : tx.to)}
                      </code>
                    </td>
                    <td className="py-2 text-right font-mono">
                      <span className={tx.isIncoming ? "text-green-600" : "text-red-600"}>
                        {tx.isIncoming ? "+" : "-"}{formatValue(tx.value)}
                      </span>
                    </td>
                    <td className="py-2 text-xs">
                      {formatTimestamp(tx.timestamp)}
                    </td>
                    <td className="py-2 text-xs">
                      {tx.blockNumber}
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
      </CardContent>
    </Card>
  );
}