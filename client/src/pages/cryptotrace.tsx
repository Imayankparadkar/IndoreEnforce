import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Coins, FileText, AlertTriangle, Download, Network } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import WalletAnalysis from "@/components/cryptotrace/WalletAnalysis";
import TransactionTable from "@/components/cryptotrace/TransactionTable";
import AttributionGraph from "@/components/cryptotrace/AttributionGraph";
import SankeyDiagram from "@/components/cryptotrace/SankeyDiagram";
import OSINTResults from "@/components/cryptotrace/OSINTResults";

interface ExtractedData {
  walletAddresses: {
    type: 'BTC' | 'ETH';
    address: string;
  }[];
  aliases: string[];
  emails: string[];
  ips: string[];
  domains: string[];
}

interface WalletAnalysisResult {
  address: string;
  type: 'BTC' | 'ETH';
  balance: string;
  transactions: any[];
  riskScore: number;
  riskFactors: string[];
  lastActivity: string;
}

export default function CryptoTrace() {
  const [ransomNote, setRansomNote] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const queryClient = useQueryClient();

  // Extract wallet addresses and entities from ransom note
  const extractDataMutation = useMutation({
    mutationFn: async (note: string) => {
      return apiRequest('/api/cryptotrace/extract', 'POST', { ransomNote: note });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cryptotrace/extracted'] });
    }
  });

  // Analyze specific wallet
  const analyzeWalletMutation = useMutation({
    mutationFn: async (address: string) => {
      setAnalysisProgress(0);
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      try {
        const result = await apiRequest('/api/cryptotrace/analyze-wallet', 'POST', { address });
        clearInterval(progressInterval);
        setAnalysisProgress(100);
        return result;
      } catch (error) {
        clearInterval(progressInterval);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cryptotrace/wallet-analysis'] });
    }
  });

  // Generate intelligence report
  const generateReportMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/cryptotrace/generate-report', 'POST', {});
    }
  });

  // Get extracted data
  const { data: extractedData } = useQuery<ExtractedData>({
    queryKey: ['/api/cryptotrace/extracted'],
    enabled: false
  });

  // Get wallet analysis results
  const { data: walletAnalysis } = useQuery<WalletAnalysisResult[]>({
    queryKey: ['/api/cryptotrace/wallet-analysis'],
    enabled: false
  });

  const handleExtractData = () => {
    if (ransomNote.trim()) {
      extractDataMutation.mutate(ransomNote);
    }
  };

  const handleAnalyzeWallet = (address: string) => {
    setSelectedWallet(address);
    analyzeWalletMutation.mutate(address);
  };

  const handleGenerateReport = () => {
    generateReportMutation.mutate();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold text-white mb-2 flex items-center bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Coins className="text-white mr-3" />
          CRYPTOTRACE - Crypto Wallet Intelligence
        </motion.h1>
        <p className="text-gray-600">
          Analyze ransom notes, trace cryptocurrency wallets, and generate intelligence reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Input and Extraction */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Ransom Note Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Ransom Note Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste ransom note text here..."
                value={ransomNote}
                onChange={(e) => setRansomNote(e.target.value)}
                className="min-h-[200px] mb-4"
              />
              <Button
                onClick={handleExtractData}
                disabled={!ransomNote.trim() || extractDataMutation.isPending}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {extractDataMutation.isPending ? 'Extracting...' : 'Extract Crypto Addresses'}
              </Button>
            </CardContent>
          </Card>

          {/* Extracted Data */}
          {extractedData && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Wallet Addresses */}
                  {extractedData.walletAddresses.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Wallet Addresses:</h4>
                      <div className="space-y-2">
                        {extractedData.walletAddresses.map((wallet, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <Badge variant="outline" className="mr-2">{wallet.type}</Badge>
                              <code className="text-xs">{wallet.address.substring(0, 20)}...</code>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAnalyzeWallet(wallet.address)}
                              disabled={analyzeWalletMutation.isPending}
                            >
                              Analyze
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other extracted entities */}
                  {extractedData.aliases.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Aliases:</h4>
                      <div className="flex flex-wrap gap-1">
                        {extractedData.aliases.map((alias, index) => (
                          <Badge key={index} variant="secondary">{alias}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {(extractedData.emails.length > 0 || extractedData.ips.length > 0 || extractedData.domains.length > 0) && (
                    <div>
                      <h4 className="font-semibold mb-2">OSINT Indicators:</h4>
                      <div className="text-sm space-y-1">
                        {extractedData.emails.length > 0 && (
                          <p><strong>Emails:</strong> {extractedData.emails.join(', ')}</p>
                        )}
                        {extractedData.ips.length > 0 && (
                          <p><strong>IPs:</strong> {extractedData.ips.join(', ')}</p>
                        )}
                        {extractedData.domains.length > 0 && (
                          <p><strong>Domains:</strong> {extractedData.domains.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Right Panel - Analysis Results */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {analyzeWalletMutation.isPending && (
            <Card>
              <CardHeader>
                <CardTitle>Analyzing Wallet...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={analysisProgress} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Fetching transactions and computing risk factors...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {walletAnalysis && selectedWallet && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="flow">Flow Analysis</TabsTrigger>
                <TabsTrigger value="attribution">Attribution</TabsTrigger>
                <TabsTrigger value="osint">OSINT</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <WalletAnalysis analysis={walletAnalysis.find(w => w.address === selectedWallet)} />
              </TabsContent>
              
              <TabsContent value="transactions">
                <TransactionTable 
                  transactions={walletAnalysis.find(w => w.address === selectedWallet)?.transactions || []} 
                />
              </TabsContent>
              
              <TabsContent value="flow">
                <SankeyDiagram 
                  transactions={walletAnalysis.find(w => w.address === selectedWallet)?.transactions || []} 
                />
              </TabsContent>
              
              <TabsContent value="attribution">
                <AttributionGraph walletAddress={selectedWallet} />
              </TabsContent>
              
              <TabsContent value="osint">
                <OSINTResults extractedData={extractedData} />
              </TabsContent>
            </Tabs>
          )}

          {/* Generate Report */}
          {walletAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Intelligence Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Generate a comprehensive intelligence report with all analysis results, 
                  OSINT findings, and evidence log with SHA-256 hash chain.
                </p>
                <Button
                  onClick={handleGenerateReport}
                  disabled={generateReportMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {generateReportMutation.isPending ? 'Generating...' : 'Export Intel Pack (PDF)'}
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}