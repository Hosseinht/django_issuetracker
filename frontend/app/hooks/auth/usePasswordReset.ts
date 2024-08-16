import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";
import { UserEmail } from "@/app/entities/User";
import { toast } from "react-toastify";

const authClient = new AuthClient<UserEmail>("/users/reset_password/");

const usePasswordReset = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserEmail) => authClient.post(data),
    onSuccess: () => {
      toast.success("Please check email to reset your password");
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });
  return { mutate, isPending };
};

export default usePasswordReset;
