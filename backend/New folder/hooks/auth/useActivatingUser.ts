import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";

interface UserActivation {
  uid: string;
  token: string;
}

const authClient = new AuthClient<UserActivation>("/users/activation/");

const useActivatingUser = () => {
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: (data: UserActivation) => authClient.post(data),
  });
  return { mutate, error, isPending, isSuccess };
};

export default useActivatingUser;
