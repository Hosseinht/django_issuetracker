"use client";
import { useEffect } from "react";
import useAuthStore from "@/app/store";
import AuthClient from "@/app/services/auth-client";
import { UserEmail } from "@/app/entities/User";
import { getCookie } from "cookies-next";

const authClient = new AuthClient<UserEmail>("/check/");

const PersistAuth = () => {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const isLoggedIn = getCookie("logged_in") === "true";
    if (isLoggedIn) {
      const checkAuth = async () => {
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
        }
      };

      void checkAuth();
    }
  }, [login, logout]);
  return null;
};

export default PersistAuth;
