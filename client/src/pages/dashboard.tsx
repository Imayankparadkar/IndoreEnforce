import { EnhancedDashboard } from "@/components/dashboard/EnhancedDashboard";
import { FirebaseStatus } from "@/components/dashboard/FirebaseStatus";
import { StorageTest } from "@/components/dashboard/StorageTest";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <EnhancedDashboard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <FirebaseStatus />
        <StorageTest /> */}
      </div>
    </div>
  );
}