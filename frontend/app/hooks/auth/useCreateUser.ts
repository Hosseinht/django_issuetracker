import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateUser {
  email: string;
  name?: string;
  password: string;
}

const authClient = new AuthClient<CreateUser>("/users/");

const useCreateUser = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateUser) => authClient.post(data),
    onSuccess: () => {
      router.push("/issues");
    },
    onError: () => {
      setError("An unexpected error occurred");
    },
  });
  const createUser = (data: CreateUser) => {
    mutate(data);
  };
  return {
    createUser,
    isPending,
    error,
  };
};

export default useCreateUser;
