import { useTranslation } from "react-i18next";
import DynamicDashboard from "@/components/enhanced/dynamic-dashboard";

export default function Dashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <DynamicDashboard />
    </div>
  );
}