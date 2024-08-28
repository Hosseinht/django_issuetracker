import AuthClient from "@/app/services/authClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store";
import userService from "@/app/services/userService";
import { CACHE_KEY_USER } from "@/app/hooks/constatnt";

interface LoginUser {
  email: string;
  password: string;
}

const authClient = new AuthClient<LoginUser>("/jwt/create/");

const useLogin = () => {
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const client = useQueryClient();
  const router = useRouter();

  const [errorData, setErrorData] = useState(null);
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: LoginUser) => authClient.post(data),
    onSuccess: async () => {
      toast.success("Logged in");

      const response = await userService.get();
      if (response.isAuthenticated) {
        login(response.user);
      } else {
        logout();
      }
      await client.invalidateQueries({ queryKey: CACHE_KEY_USER });

      router.push("/issues");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data.detail;
        setErrorData(errorData);
      }
    },
  });
  return {
    mutate,
    error,
    isPending,
    errorData,
  };
};

export default useLogin;
