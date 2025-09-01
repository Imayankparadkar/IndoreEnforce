import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Map, 
  Brain, 
  Network, 
  Users, 
  ShieldQuestion,
  Coins
} from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: BarChart3 },
  { path: "/vajra", label: "Trinetra", icon: Map },
  { path: "/kautilya", label: "Chanakya", icon: Brain },
  // { path: "/mayajaal", label: "Netrajal", icon: Network },
  { path: "/cryptotrace", label: "CryptoTrace", icon: Coins },
  { path: "/brahmanet", label: "BrahmaNet", icon: Users },
  { path: "/officer", label: "Officer Login", icon: ShieldQuestion },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 py-4 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors whitespace-nowrap ${
                    isActive ? "bg-blue-700 text-white" : "text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
