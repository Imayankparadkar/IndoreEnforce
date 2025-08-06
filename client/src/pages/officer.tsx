import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldQuestion, Plus, Search, FileText, Link } from "lucide-react";

export default function Officer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentOfficer, setCurrentOfficer] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    otp: "",
  });

  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const response = await apiRequest("POST", "/api/auth/officer-login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentOfficer(data.user);
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: `Welcome, ${data.user.username}`,
      });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const { data: assignedCases } = useQuery({
    queryKey: ["/api/case-investigations"],
    enabled: !!isLoggedIn && !!currentOfficer?.id,
  });

  const { data: officerActions } = useQuery({
    queryKey: ["/api/officer-actions"],
    enabled: !!isLoggedIn && !!currentOfficer?.id,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  if (!isLoggedIn) {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <ShieldQuestion className="text-blue-600 mr-3" />
            PRAHAAR ZONE - Officer Portal
          </h1>
          <p className="text-gray-600">Law Enforcement Access Panel</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Secure Officer Login
                </h3>
                <p className="text-gray-600">Zero-Trust Authentication Required</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Officer ID</Label>
                  <Input
                    id="username"
                    placeholder="Enter your officer ID"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm((prev) => ({ ...prev, username: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="otp">2FA Code</Label>
                  <Input
                    id="otp"
                    placeholder="Enter OTP (demo: any value)"
                    value={loginForm.otp}
                    onChange={(e) =>
                      setLoginForm((prev) => ({ ...prev, otp: e.target.value }))
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Authenticating..." : "Secure Login"}
                </Button>
              </form>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                <p><strong>Demo Credentials:</strong></p>
                <p>Username: officer.sharma</p>
                <p>Password: demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <ShieldQuestion className="text-blue-600 mr-3" />
          Officer Dashboard
        </h1>
        <p className="text-gray-600">Welcome, {currentOfficer?.username}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assigned Cases */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.isArray(assignedCases) && assignedCases.length > 0 ? (
                  assignedCases.slice(0, 5).map((case_: any) => (
                    <div
                      key={case_.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">Case #{case_.id.slice(0, 8)}</h4>
                          <p className="text-sm text-gray-600">
                            {case_.priority} Priority • {new Date(case_.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              case_.priority === "high"
                                ? "destructive"
                                : case_.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {case_.priority}
                          </Badge>
                          <Badge variant="outline">{case_.status}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="mx-auto h-12 w-12 mb-4" />
                    <p>No assigned cases</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Case
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search Cases
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Immutable Action Chain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="text-blue-600 mr-2" />
            Immutable Action Chain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.isArray(officerActions) && officerActions.length > 0 ? (
              officerActions.slice(0, 8).map((action: any, index: number) => (
                <div
                  key={action.id}
                  className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{action.action}</p>
                    <p className="text-xs text-gray-600">
                      {currentOfficer?.username} • {new Date(action.timestamp).toLocaleString()}
                    </p>
                    <p className="text-xs font-mono text-gray-500">
                      Hash: {action.immutableHash.slice(0, 16)}...
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Link className="mx-auto h-12 w-12 mb-4" />
                <p>No actions recorded yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
