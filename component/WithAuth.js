// src/utils/withAuth.js
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login"); // redirect if not logged in
      }
    }, [user]);

    if (!user) return null; // Or show a loading spinner

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
