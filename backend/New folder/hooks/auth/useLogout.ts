import AuthClient from "@/app/services/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const authClient = new AuthClient("/logout/");

const useLogout = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => authClient.post(),
    onSuccess: async () => {
      router.push("/");
      client.setQueryData(["user"], null);
    },
  });
};

export default useLogout;
