import "../styles/nav.css";
import DashboardLayout from "../component/DashboardLayout";

export default function WalletsBalancesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Wallets & Balances</h2>
        <p className="text-lg mb-8">This is the Wallets & Balances page content.</p>
      </div>
    </DashboardLayout>
  );
}
