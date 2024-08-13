import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";
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
  const router = useRouter();
  const [errorData, setErrorData] = useState(null);
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: LoginUser) => authClient.post(data),
    onSuccess: () => {
      toast.success("Logged in");
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
