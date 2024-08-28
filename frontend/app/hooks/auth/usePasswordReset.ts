import AuthClient from "@/app/services/authClient";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/app/entities/User";
import { toast } from "react-toastify";

const authClient = new AuthClient<User>("/users/reset_password/");

const usePasswordReset = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: User) => authClient.post(data),
    onSuccess: () => {
      toast.success("Request sent, check your email for reset link");
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });
  return { mutate, isPending };
};

export default usePasswordReset;
