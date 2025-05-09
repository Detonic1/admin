"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  DollarSign,
  Users,
  RefreshCw,
  CreditCard,
  KeyRound,
  FileText,
  AlertTriangle,
  Shield,
  HelpCircle,
  Bell,
  Settings,
  LogOut,
  Landmark,
  BarChart4,
} from "lucide-react";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const NavLink = ({ href, icon, children }) => (
    <Link
      href={href}
      className={`flex items-center py-3 px-4 rounded-md transition ${
        isDarkMode
          ? "text-gray-300 hover:bg-gray-700"
          : "text-gray-700 hover:bg-gray-200"
      } ${isSidebarOpen ? "justify-start" : "justify-center"}`}
    >
      {icon}
      {isSidebarOpen && <span className="ml-3">{children}</span>}
    </Link>
  );

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-blue-600"
        } text-white shadow-lg sticky top-0 z-20`}
      >
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-white hover:text-gray-300 lg:hidden"
            >
              {isSidebarOpen ? (
                <ChevronLeft size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </button>
            <h1 className="text-xl font-bold tracking-tight">
              Fintech Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hover:text-yellow-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hover:text-yellow-300">
              <Bell size={20} />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-yellow-300"
              >
                <UserCircle size={28} />
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border"
                  }`}
                >
                  <Link
                    href="/settings"
                    className={`block px-4 py-2 text-sm ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/loan"
                    className={`block px-4 py-2 text-sm ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    Loan
                  </Link>
                  <Link
                    href="/logout"
                    className={`block px-4 py-2 text-sm ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          } ${
            isDarkMode ? "bg-gray-800" : "bg-white border-r"
          } flex-shrink-0 overflow-y-auto h-screen sticky top-0`}
        >
          <div className="p-4">
            <nav className="space-y-1">
              <NavLink href="/" icon={<BarChart4 size={20} />}>
                Dashboard
              </NavLink>
              <NavLink href="/adminlog" icon={<Users size={20} />}>
                Admin Log
              </NavLink>
              <NavLink href="/apikeys" icon={<KeyRound size={20} />}>
                API Keys
              </NavLink>
              <NavLink href="/exchangerates" icon={<RefreshCw size={20} />}>
                Exchange Rates
              </NavLink>
              <NavLink href="/formaA" icon={<CreditCard size={20} />}>
                Form A
              </NavLink>
              <NavLink href="/identityverification" icon={<Shield size={20} />}>
                Identity Verification
              </NavLink>
              <NavLink href="/loan" icon={<Landmark size={20} />}>
                Loan
              </NavLink>
              <NavLink href="/notifications" icon={<Bell size={20} />}>
                Notifications
              </NavLink>
              <NavLink href="/paymentspayouts" icon={<DollarSign size={20} />}>
                Payments & Payouts
              </NavLink>
              <NavLink href="/reports" icon={<FileText size={20} />}>
                Reports
              </NavLink>
              <NavLink href="/riskfraud" icon={<AlertTriangle size={20} />}>
                Risk & Fraud
              </NavLink>
              <NavLink href="/settings" icon={<Settings size={20} />}>
                Settings
              </NavLink>
              <NavLink href="/supportdisputes" icon={<HelpCircle size={20} />}>
                Support & Disputes
              </NavLink>
              <NavLink href="/transactions" icon={<RefreshCw size={20} />}>
                Transactions
              </NavLink>
              <NavLink href="/users" icon={<Users size={20} />}>
                Users
              </NavLink>
              <NavLink href="/virtualaccounts" icon={<CreditCard size={20} />}>
                Virtual Accounts
              </NavLink>
              <NavLink href="/walletsandbalances" icon={<DollarSign size={20} />}>
                Wallets & Balances
              </NavLink>
              <NavLink href="/logout" icon={<LogOut size={20} />}>
                Logout
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                Welcome to Your Fintech Dashboard
              </h2>
              <p className="text-lg mb-8">
                Select a section from the sidebar to manage your operations.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
