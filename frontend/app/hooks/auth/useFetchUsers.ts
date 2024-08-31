import AuthClient from "@/app/services/authClient";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/entities/User";
import ms from "ms";

const authClient = new AuthClient<User>("/users/");

const useFetchUsers = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => authClient.getAll(),
    staleTime: ms("5m"),
    retry: 3,
    select: (result) => {
      return result.results;
    },
  });
  return { data, error, isPending };
};

export default useFetchUsers;
