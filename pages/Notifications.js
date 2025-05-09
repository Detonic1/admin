import "../styles/nav.css";
import DashboardLayout from "../component/DashboardLayout";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-lg mb-8">This is the Notifications page content.</p>
      </div>
    </DashboardLayout>
  );
}
