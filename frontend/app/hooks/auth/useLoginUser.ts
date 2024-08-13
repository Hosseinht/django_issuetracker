import AuthClient from "@/app/services/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface LoginUser {
  email: string;
  password: string;
}

const authClient = new AuthClient<LoginUser>("/jwt/create/");

const useLoginUser = () => {
  const client = useQueryClient();
  const router = useRouter();
  const [errorData, setErrorData] = useState(null);
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: LoginUser) => authClient.post(data),
    onSuccess: async () => {
      toast.success("Logged in");
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

export default useLoginUser;
