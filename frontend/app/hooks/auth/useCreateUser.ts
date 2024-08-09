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

const authClient = new AuthClient<CreateUser>("/users/");

const useCreateUser = () => {
  const router = useRouter();
  const [errorData, setErrorData] = useState(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateUser) => authClient.post(data),
    onSuccess: () => {
      toast.success("Please check email to verify account");
      router.push("/issues");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data;
        setErrorData(errorData);
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
