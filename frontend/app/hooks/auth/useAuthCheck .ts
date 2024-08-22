"use client";
import { useEffect } from "react";
import useAuthStore from "@/app/store";
import AuthClient from "@/app/services/auth-client";
import { UserEmail } from "@/app/entities/User";
import { getCookie } from "cookies-next";

const authClient = new AuthClient<UserEmail>("/check/");

const useAuthCheck = () => {
  const { login, logout, setLoading } = useAuthStore();
  // getCookie();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await authClient.get();

        if (response.isAuthenticated) {
          login(response.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      } finally {
        setLoading(false);
      }
    })();
  }, [login, logout]);
};
export default useAuthCheck;
