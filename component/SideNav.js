import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const Sidenav = () => {
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="flex">
      <div className="hidden w-1/5 md:absolute h-[94%] md:flex md:flex-col bg-green-400 absolute bottom-0 ">
        <aside
          className={`sidebar-container transition-all duration-300 h-[100%] ${
            isSidebarOpen ? "w-64" : "w-16"
          } ${isDarkMode ? "bg-gray-800" : "bg-white border-r"} flex-shrink-0`}
        >
          <div className="p-4 h-[100%] ">
            <nav className="space-y-1 flex flex-col overflow-x-auto h-[99%] pt-5">
              <NavLink href="/" icon={<BarChart4 size={20} />}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard" icon={<Users size={20} />}>
                Admin Log
              </NavLink>
              <NavLink href="/apikeys" icon={<KeyRound size={20} />}>
                API Keys
              </NavLink>
              <NavLink href="/exchangerates" icon={<RefreshCw size={20} />}>
                Exchange Rates
              </NavLink>
              <NavLink href="/forms" icon={<CreditCard size={20} />}>
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
              <NavLink
                href="/walletsandbalances"
                icon={<DollarSign size={20} />}
              >
                Wallets & Balances
              </NavLink>
              <NavLink href="/logout" icon={<LogOut size={20} />}>
                Logout
              </NavLink>
            </nav>
          </div>
        </aside>
      </div>

      <nav className="md:w-full md:absolute  w-[100%] bg-amber-900">
        <div className="flex item-center justify-around bg-white">
          <div className="md:w-auto w-full flex justify-between">
            <div className="md:hidden">
              <p>Good day</p>
              <div className="md:cursor-pointer ">Sage</div>
            </div>
            <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
              =
            </div>
          </div>
          <ul className="md:flex hidden items-center  md:justify-between w-full bg-white ">
            <header
              className={`w-full ${
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

            {/* <div className=" md:w-2/3 justify-around flex text-[#000000] text-sm font-bold">
              <Link href="./" to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
              <Link href="./deposit" to="/" className="py-7 px-3 inline-block">
                Deposit
              </Link>
              <Link href="" to="/" className="py-7 px-3 inline-block">
                Withdraw
              </Link>
              <Link href="" to="/" className="py-7 px-3 inline-block">
                History
              </Link>
              <Link href="" to="/" className="py-7 px-3 inline-block">
                Developer
              </Link>
              <Link href="./deposit" to="/" className="py-7 px-3 inline-block">
                Deposit
              </Link>
              <Link
                href="./transactions"
                to="/"
                className="py-7 px-3 inline-block"
              >
                Transactions
              </Link>
            </div> */}
          </ul>

          {/* Moblie nav */}

          <ul
            className={`
                md:hidden text-white absolute wfull h-full bottom-0  w-3/5 justify-center flex  flex-col
                duration-500 ${open ? "left-0 " : "left-[-100%]"}
               ${isDarkMode ? "bg-gray-800" : "bg-white border-r"} `}
          >
            <div className="flex flex-col justify-around m-auto h-[90%] overflow-x-auto">
              <aside
                className={`sidebar-container transition-all duration-300 ${
                  isSidebarOpen ? "w-64" : "w-16"
                } ${
                  isDarkMode ? "bg-gray-800" : "bg-white border-r"
                } flex-shrink-0`}
              >
                <div className="p-4">
                  <nav className="space-y-1">
                    <NavLink href="/" icon={<BarChart4 size={20} />}>
                      Dashboard
                    </NavLink>
                    <NavLink href="/dashboard" icon={<Users size={20} />}>
                      Admin Log
                    </NavLink>
                    <NavLink href="/apikeys" icon={<KeyRound size={20} />}>
                      API Keys
                    </NavLink>
                    <NavLink
                      href="/exchangerates"
                      icon={<RefreshCw size={20} />}
                    >
                      Exchange Rates
                    </NavLink>
                    <NavLink href="/forms" icon={<CreditCard size={20} />}>
                      Form A
                    </NavLink>
                    <NavLink
                      href="/identityverification"
                      icon={<Shield size={20} />}
                    >
                      Identity Verification
                    </NavLink>
                    <NavLink href="/loan" icon={<Landmark size={20} />}>
                      Loan
                    </NavLink>
                    <NavLink href="/notifications" icon={<Bell size={20} />}>
                      Notifications
                    </NavLink>
                    <NavLink
                      href="/paymentspayouts"
                      icon={<DollarSign size={20} />}
                    >
                      Payments & Payouts
                    </NavLink>
                    <NavLink href="/reports" icon={<FileText size={20} />}>
                      Reports
                    </NavLink>
                    <NavLink
                      href="/riskfraud"
                      icon={<AlertTriangle size={20} />}
                    >
                      Risk & Fraud
                    </NavLink>
                    <NavLink href="/settings" icon={<Settings size={20} />}>
                      Settings
                    </NavLink>
                    <NavLink
                      href="/supportdisputes"
                      icon={<HelpCircle size={20} />}
                    >
                      Support & Disputes
                    </NavLink>
                    <NavLink
                      href="/transactions"
                      icon={<RefreshCw size={20} />}
                    >
                      Transactions
                    </NavLink>
                    <NavLink href="/users" icon={<Users size={20} />}>
                      Users
                    </NavLink>
                    <NavLink
                      href="/virtualaccounts"
                      icon={<CreditCard size={20} />}
                    >
                      Virtual Accounts
                    </NavLink>
                    <NavLink
                      href="/walletsandbalances"
                      icon={<DollarSign size={20} />}
                    >
                      Wallets & Balances
                    </NavLink>
                    <NavLink href="/logout" icon={<LogOut size={20} />}>
                      Logout
                    </NavLink>
                  </nav>
                </div>
              </aside>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidenav;
