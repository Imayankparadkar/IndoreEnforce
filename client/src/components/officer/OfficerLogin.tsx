import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface OfficerLoginProps {
  onLogin: (officerId: string, name: string, rank: string) => void;
}

export function OfficerLogin({ onLogin }: OfficerLoginProps) {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [isLoading, setIsLoading] = useState(false);

  // Demo officer credentials
  const demoOfficers = [
    { id: "IND001", name: "Inspector Arjun Sharma", rank: "Inspector", password: "demo123" },
    { id: "IND002", name: "SI Priya Patel", rank: "Sub Inspector", password: "demo123" },
    { id: "IND003", name: "ASI Rahul Gupta", rank: "Asst Sub Inspector", password: "demo123" }
  ];

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const officer = demoOfficers.find(o => o.id === officerId && o.password === password);
    if (officer) {
      setStep('otp');
    } else {
      alert('Invalid credentials. Try: IND001 / demo123');
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otp === '123456') {
      const officer = demoOfficers.find(o => o.id === officerId)!;
      onLogin(officer.id, officer.name, officer.rank);
    } else {
      alert('Invalid OTP. Use: 123456');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Prahaar 360 Officer Portal
            </CardTitle>
            <CardDescription className="text-gray-600">
              {step === 'credentials' ? 'Secure Authentication Required' : 'Two-Factor Authentication'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 'credentials' ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Officer ID
                  </label>
                  <Input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder="Enter your Officer ID"
                    className="h-12"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Secure Login
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Enter the 6-digit OTP sent to your registered mobile device
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    One-Time Password
                  </label>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="h-12 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={() => setStep('credentials')}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </div>
                    ) : (
                      'Verify & Login'
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center mb-3">Demo Credentials:</div>
              <div className="grid gap-2">
                {demoOfficers.map((officer) => (
                  <div key={officer.id} className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="text-xs">
                      {officer.id}
                    </Badge>
                    <span className="text-gray-600">{officer.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      demo123
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="text-xs text-center text-gray-500 mt-2">
                OTP: 123456 (for demo)
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}