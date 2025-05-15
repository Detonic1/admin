import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
const AuthHOC = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token"); // Remove expired token
        router.replace("/login");
      }
    }
  }, []);

  return children;
};

export default AuthHOC;
