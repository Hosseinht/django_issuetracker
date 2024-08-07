import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateUser) => authClient.post(data),
    onSuccess: () => {
      toast.success("Please check email to verify account");
      router.push("/issues");
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
