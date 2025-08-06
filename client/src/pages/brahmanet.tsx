import { useState } from "react";
import HygieneChecker from "@/components/brahmanet/hygiene-checker";
import ReportForm from "@/components/brahmanet/report-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Vote, Lock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function BrahmaNet() {
  const [verificationItems] = useState([
    { 
      identifier: "+91 9876543210", 
      type: "Phone Number", 
      upvotes: 15, 
      downvotes: 3,
      isScam: true 
    },
    { 
      identifier: "scammer@paytm", 
      type: "UPI ID", 
      upvotes: 22, 
      downvotes: 1,
      isScam: true 
    },
    { 
      identifier: "+91 8765432109", 
      type: "Phone Number", 
      upvotes: 8, 
      downvotes: 12,
      isScam: false 
    },
  ]);

  const handleVote = (index: number, isUpvote: boolean) => {
    // In a real app, this would make an API call
    console.log(`Voted ${isUpvote ? 'up' : 'down'} on item ${index}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Users className="text-blue-600 mr-3" />
          BRAHMANET - Citizen Portal
        </h1>
        <p className="text-gray-600">
          Engage citizens in cybercrime awareness and reporting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Cyber Hygiene Checker */}
        <HygieneChecker />

        {/* Report Form */}
        <ReportForm />
      </div>

      {/* Community Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Community Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Vote className="text-blue-600 mr-2" />
              Community Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Help verify suspicious UPI IDs and phone numbers
            </p>
            <div className="space-y-3">
              {verificationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-mono text-sm">{item.identifier}</p>
                    <p className="text-xs text-gray-600">{item.type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVote(index, true)}
                      className="bg-green-50 hover:bg-green-100 text-green-800 border-green-200"
                    >
                      👍 {item.upvotes}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVote(index, false)}
                      className="bg-red-50 hover:bg-red-100 text-red-800 border-red-200"
                    >
                      👎 {item.downvotes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cyber Vault */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="text-blue-600 mr-2" />
              Cyber Evidence Vault
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Secure storage for cybercrime evidence
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Drop sensitive evidence files here</p>
              <p className="text-sm text-gray-500 mb-4">
                Files are encrypted and stored securely
              </p>
              <input type="file" multiple className="hidden" id="vaultUpload" />
              <Button
                onClick={() => document.getElementById('vaultUpload')?.click()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Upload to Vault
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
