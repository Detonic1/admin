import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav-container">
      <ul>
        <li><Link href="/adminlog">Admin Log</Link></li>
        <li><Link href="/apikeys">API Keys</Link></li>
        <li><Link href="/exchangerates">Exchange Rates</Link></li>
        <li><Link href="/formaA">Form A</Link></li>
        <li><Link href="/identityverification">Identity Verification</Link></li>
        <li><Link href="/loan">loan</Link></li>
        <li><Link href="/notifications">Notifications</Link></li>
        <li><Link href="/paymentspayouts">Payments & Payouts</Link></li>
        <li><Link href="/reports">Reports</Link></li>
        <li><Link href="/riskfraud">Risk & Fraud</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        <li><Link href="/supportdisputes">Support & Disputes</Link></li>
        <li><Link href="/transactions">Transactions</Link></li>
        <li><Link href="/users">Users</Link></li>
        <li><Link href="/virtualaccounts">Virtual Accounts</Link></li>
        <li><Link href="/walletsandbalances">Wallets & Balances</Link></li>
      </ul>
    </nav>
  );
}
