import AuthClient from "@/app/services/authClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/store";

interface PasswordRest {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

const authClient = new AuthClient<PasswordRest>(
  "/users/reset_password_confirm/",
);
const logoutClient = new AuthClient<{}>("/logout/");

const usePasswordResetConfirm = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: PasswordRest) => authClient.post(data),
    onSuccess: async () => {
      toast.success("You have changed your password. Please log in again.");
      await logoutClient.post();
      logout();
      router.push("/auth/login");
    },
    onError: () => {
      toast.error("Error changing password");
    },
  });
  return {
    mutate,
    isPending,
  };
};

export default usePasswordResetConfirm;
