import { useState } from "react";
import "@/styles/globals.css";
import Sidenav from "../../component/SideNav";
import { Sidebar } from "lucide-react";
export default function App({ Component, pageProps }) {

  return (
    <div>
      <Sidenav/>
      <main className="p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
