// src/pages/_app.js
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidenav from "../../component/SideNav";
import { useRouter } from "next/router";
import withAuth from "../../component/WithAuth";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isPublic = ["/login", "/register"].includes(router.pathname); // Add any public pages here
  const ProtectedComponent = isPublic ? Component : withAuth(Component);

  return (
    <AuthProvider>
      <div className="flex">
        {!isPublic && <Sidenav />} {/* ✅ Only show nav if not on public page */}
        <main className="p-4 w-full">
          <ProtectedComponent {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
}
