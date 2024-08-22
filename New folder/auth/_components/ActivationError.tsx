import { AxiosError } from "axios";
import { Heading, Text } from "@radix-ui/themes";
import { Link } from "@/app/components";
import ActivationErrorMessage from "@/app/auth/_components/ActivationErrorMessage";

interface Props {
  error: AxiosError | Error | null;
  isPending: boolean;
  isSuccess: boolean;
}

const ActivationError = ({ error, isPending, isSuccess }: Props) => {
  if (isPending) {
    return (
      <ActivationErrorMessage>
        <Heading mb="3">Activating Account...</Heading>
        <Text>Please wait a moment.</Text>
      </ActivationErrorMessage>
    );
  }

  if (error instanceof AxiosError && error.response) {
    const errorData = error.response.data.detail;

    if (errorData[0] === "User is already active") {
      return (
        <ActivationErrorMessage>
          <Heading mb="3">Account Already Active</Heading>
          <Text>
            Your account is already activated. You can proceed to{" "}
            <Link href="/auth/login">log in.</Link>
          </Text>
        </ActivationErrorMessage>
      );
    }
    return (
      <ActivationErrorMessage>
        <Heading mb="3">Activation Failed</Heading>
        <Text>{errorData}</Text>{" "}
        <Link href="/auth/resend-activation-link">Resend activation link.</Link>
      </ActivationErrorMessage>
    );
  }

  if (error) {
    return (
      <ActivationErrorMessage>
        <Heading mb="3">Activation Failed</Heading>
        <Text>Something went wrong. Please try again.</Text>
      </ActivationErrorMessage>
    );
  }

  if (isSuccess) {
    return (
      <ActivationErrorMessage>
        <Heading mb="3">Account Activated!</Heading>
        <Text>
          Congratulations! Your account has been successfully activated. proceed
          to <Link href="/auth/login">log in.</Link>
        </Text>
      </ActivationErrorMessage>
    );
  }
};

export default ActivationError;
