import AuthClient from "@/app/services/auth-client";
import { useMutation } from "@tanstack/react-query";

interface ResendActivation {
  email: string;
}
const authClient = new AuthClient<ResendActivation>(
  "/users/resend_activation/",
);

const useResetActivationLink = () => {
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (email: ResendActivation) => authClient.post(email),
  });
  return {
    mutate,
    isSuccess,
    isPending,
    error,
  };
};

export default useResetActivationLink;
