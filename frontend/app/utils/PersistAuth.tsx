"use client";
import { useEffect } from "react";
import useAuthStore from "@/app/store";
import AuthClient from "@/app/services/auth-client";
import { UserEmail } from "@/app/entities/User";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";

const checkUserClient = new AuthClient<UserEmail>("/check/");
const refreshTokenClient = new AuthClient<string>("/jwt/refresh/");

// PersistAuth component: Checks and maintains user authentication state
const PersistAuth = () => {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const isLoggedIn = getCookie("logged_in") === "true";
    if (isLoggedIn) {
      void checkAuth();
    }
  }, [login, logout]);

  const checkAuth = async () => {
    try {
      const response = await checkUserClient.get();
      if (response.isAuthenticated) {
        login(response.user);
      } else {
        logout();
      }
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.status === 401) {
        try {
          await refreshTokenClient.post();
          await checkAuth();
        } catch (refreshError) {
          logout();
        }
      } else {
        logout();
      }
    }
  };

  return null;
};

export default PersistAuth;
