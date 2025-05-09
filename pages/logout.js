import "../styles/nav.css";
import DashboardLayout from "../component/DashboardLayout";

export default function LogoutPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p className="text-lg mb-8">You have been logged out.</p>
      </div>
    </DashboardLayout>
  );
}
