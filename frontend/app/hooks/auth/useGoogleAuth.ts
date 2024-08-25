import AuthClient from "@/app/services/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserEmail } from "@/app/entities/User";
import useAuthStore from "@/app/store";

const authClient = new AuthClient("/o/google-oauth2/");
const checkUserClient = new AuthClient<UserEmail>("/check/");
const useGoogleAuth = () => {
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const client = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { state: string; code: string }) =>
      authClient.oauth({ params: data }),
    onSuccess: async () => {
      toast.success("You are logged in");
      const response = await checkUserClient.get();
      if (response.isAuthenticated) {
        login(response.user);
      } else {
        logout();
      }
      await client.invalidateQueries({ queryKey: ["user"] });
      router.push("/issues");
    },
    onError: () => {
      toast.error("Log in failed");
      router.push("/auth/login");
    },
  });
  return {
    mutate,
    isPending,
  };
};

export default useGoogleAuth;
