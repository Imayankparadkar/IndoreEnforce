import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Shield, AlertTriangle } from "lucide-react";

interface OSINTResultsProps {
  extractedData?: {
    walletAddresses: { type: 'BTC' | 'ETH'; address: string; }[];
    aliases: string[];
    emails: string[];
    ips: string[];
    domains: string[];
  };
}

export default function OSINTResults({ extractedData }: OSINTResultsProps) {
  // Mock OSINT data - in real implementation, this would come from API calls
  const mockOSINTData = {
    abuseIPDB: [
      {
        ip: "192.168.1.100",
        abuseConfidence: 85,
        countryCode: "RU",
        reports: 45,
        lastReported: "2024-01-15"
      }
    ],
    urlScan: [
      {
        domain: "suspicious-crypto.com",
        verdict: "malicious",
        screenshot: "available",
        engines: { malicious: 8, suspicious: 2, clean: 1 }
      }
    ],
    threatIntel: [
      {
        indicator: "crypto@tempmail.com",
        type: "email",
        sources: ["VirusTotal", "ThreatFox"],
        confidence: "high",
        tags: ["ransomware", "cryptolocker"]
      }
    ]
  };

  if (!extractedData) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No OSINT data available</p>
          <p className="text-sm text-gray-400">Extract data from ransom note first</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AbuseIPDB Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            AbuseIPDB Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          {extractedData.ips.length === 0 ? (
            <p className="text-gray-500 text-sm">No IP addresses found in ransom note</p>
          ) : (
            <div className="space-y-4">
              {mockOSINTData.abuseIPDB.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="font-mono text-sm">{result.ip}</code>
                    <Badge 
                      variant={result.abuseConfidence >= 75 ? "destructive" : "secondary"}
                    >
                      {result.abuseConfidence}% Confidence
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Country:</span> {result.countryCode}
                    </div>
                    <div>
                      <span className="font-medium">Reports:</span> {result.reports}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      Last reported: {result.lastReported}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`https://www.abuseipdb.com/check/${result.ip}`, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* URLScan Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            URLScan.io Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {extractedData.domains.length === 0 ? (
            <p className="text-gray-500 text-sm">No domains found in ransom note</p>
          ) : (
            <div className="space-y-4">
              {mockOSINTData.urlScan.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="font-mono text-sm">{result.domain}</code>
                    <Badge 
                      variant={result.verdict === "malicious" ? "destructive" : "secondary"}
                    >
                      {result.verdict}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div className="text-center">
                      <div className="text-red-600 font-semibold">{result.engines.malicious}</div>
                      <div className="text-xs text-gray-500">Malicious</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-600 font-semibold">{result.engines.suspicious}</div>
                      <div className="text-xs text-gray-500">Suspicious</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-semibold">{result.engines.clean}</div>
                      <div className="text-xs text-gray-500">Clean</div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`https://urlscan.io/search/#domain:${result.domain}`, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Scan
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Threat Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Threat Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOSINTData.threatIntel.map((threat, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="font-mono text-sm">{threat.indicator}</code>
                  <div className="flex space-x-2">
                    <Badge variant="outline">{threat.type}</Badge>
                    <Badge 
                      variant={threat.confidence === "high" ? "destructive" : "secondary"}
                    >
                      {threat.confidence} confidence
                    </Badge>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-sm font-medium">Sources: </span>
                  <span className="text-sm">{threat.sources.join(", ")}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {threat.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* OSINT Summary */}
      <Card>
        <CardHeader>
          <CardTitle>OSINT Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-red-800 font-semibold">High Risk Indicators</div>
              <div className="text-red-600">2 found</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-orange-800 font-semibold">Suspicious Activity</div>
              <div className="text-orange-600">1 found</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-800 font-semibold">Intelligence Sources</div>
              <div className="text-blue-600">4 queried</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm"><strong>Recommendation:</strong></p>
            <p className="text-sm text-gray-600">
              The extracted indicators show high-confidence threat intelligence matches. 
              This appears to be related to known ransomware operations. 
              Recommend immediate investigation and evidence preservation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}