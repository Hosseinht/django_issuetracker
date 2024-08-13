import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";

interface CreateUser {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  re_password: string;
}

export interface ErrorData {
  [key: string]: string[] | string;
}

const authClient = new AuthClient<CreateUser>("/users/");

const useCreateUser = () => {
  const router = useRouter();
  const [errorData, setErrorData] = useState<ErrorData | null>(null);

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: CreateUser) => authClient.post(data),
    onSuccess: () => {
      toast.success("Please check email to verify account");
      router.push("/issues");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setErrorData({ error: ["An unexpected error occurred."] });
        } else {
          setErrorData(error.response?.data as ErrorData);
        }
      }
    },
  });
  const createUser = (data: CreateUser) => {
    mutate(data);
  };
  return {
    createUser,
    isPending,
    error,
    errorData,
  };
};

export default useCreateUser;
