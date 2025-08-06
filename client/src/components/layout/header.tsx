import { Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b-4 border-orange-500 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                <Shield className="text-white text-xl" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-blue-800">PRAHAAR 360</h1>
                <p className="text-sm text-gray-600">Unified Cyber Enforcement Suite</p>
              </div>
            </div>
            <div className="hidden md:block ml-8">
              <div className="flex items-center space-x-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                <i className="fas fa-map-marker-alt"></i>
                <span>Indore, Madhya Pradesh</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="text-blue-600" />
              <span>Emergency: 1930</span>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Report Fraud
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
