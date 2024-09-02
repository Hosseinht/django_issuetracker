import AuthClient from "@/app/services/authClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CACHE_KEY_USER } from "@/app/hooks/constatnt";

const authClient = new AuthClient<{}>("/logout/");

const useLogout = () => {
  const router = useRouter();
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => authClient.post(),
    onSuccess: async () => {
      router.push("/");
      client.setQueryData([CACHE_KEY_USER], null);
    },
  });
};

export default useLogout;
