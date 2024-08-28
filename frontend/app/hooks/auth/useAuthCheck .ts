"use client";
import { useEffect } from "react";
import useAuthStore from "@/app/store";
import userService from "@/app/services/userService";

const useAuthCheck = () => {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await userService.get();

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
