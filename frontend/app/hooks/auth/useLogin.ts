import AuthClient from "@/app/services/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store";

interface LoginUser {
  email: string;
  password: string;
}

interface UserEmail {
  email: string;
}
const authClient = new AuthClient<LoginUser>("/jwt/create/");
const authUser = new AuthClient<UserEmail>("/users/me/");

const useLogin = () => {
  const login = useAuthStore((s) => s.login);
  const client = useQueryClient();
  const router = useRouter();

  const [errorData, setErrorData] = useState(null);
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: LoginUser) => authClient.post(data),
    onSuccess: async () => {
      toast.success("Logged in");
      const userData = await authUser.getUser();
      login(userData);
      await client.invalidateQueries({ queryKey: ["user"] });

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
