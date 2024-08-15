import { useEffect } from "react";
import useAuthStore from "@/app/store";
import AuthClient from "@/app/services/auth-client";

interface User {
  email: string;
}

const authClient = new AuthClient<User>("/check/");

const useAuthCheck = () => {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await authClient.getUser();

        if (response.isAuthenticated) {
          login(response.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      } finally {
        // This block runs whether the promise resolves or rejects
        // However, we've already handled this in login and logout methods
        // but for clarity or if you decide to change how login/logout work:
        setLoading(false);
      }
    })();
  }, [login, logout]);
};
export default useAuthCheck;
