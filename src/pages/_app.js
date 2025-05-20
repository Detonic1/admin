
import "@/styles/globals.css";
import Sidenav from "../../component/SideNav";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Sidenav />
      <AuthProvider>

      <main className="p-4">
        <Component {...pageProps} />
      </main>
      </AuthProvider>
    </div>
  );
}
