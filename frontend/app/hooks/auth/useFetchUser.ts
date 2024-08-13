import AuthClient from "@/app/services/auth-client";
import { useQuery } from "@tanstack/react-query";

interface User {
  email: string;
}

const authClient = new AuthClient<User>("/users/me/");

const useFetchUser = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => authClient.getUser(),
  });
  return {
    data,
    isPending,
    error,
  };
};

export default useFetchUser;
