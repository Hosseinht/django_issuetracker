import AuthClient from "@/app/services/authClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import userService from "@/app/services/userService";
import useAuthStore from "@/app/store";
import { CACHE_KEY_USER } from "@/app/hooks/constatnt";

const authClient = new AuthClient("/o/google-oauth2/");

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
      const response = await userService.get();
      if (response.isAuthenticated) {
        login(response.user);
      } else {
        logout();
      }
      await client.invalidateQueries({ queryKey: CACHE_KEY_USER });
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
