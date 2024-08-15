import AuthClient from "@/app/services/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/app/store";

interface User {
  email: string;
}

const authClient = new AuthClient<User>("/users/me/");

const useFetchUser = () => {
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const client = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const userData = await authClient.getUser();
        login(userData);
        return userData;
      } catch (error) {
        // Handle the case when the user is not logged in
        return null;
      }
    },
    retry: 0, // Disable retries if the request fails
    enabled: !isAuthenticated, // Disable retries if the request fails
  });

  return { data, error, isLoading };
};

export default useFetchUser;
