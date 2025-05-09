import "../styles/nav.css"; // Adjust the path based on your file structure
import DashboardLayout from "../component/DashboardLayout";

export default function AdminLogPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Log</h2>
        <p className="text-lg mb-8">This is the Admin Log page content.</p>
      </div>
    </DashboardLayout>
  );
}