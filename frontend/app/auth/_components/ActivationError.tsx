import { AxiosError } from "axios";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "@/app/components";
interface Props {
  error: AxiosError | Error | null;
  isPending: boolean;
  isSuccess: boolean;
}

const ActivationError = ({ error, isPending, isSuccess }: Props) => {
  if (isPending) {
    return (
      <Flex justify="center" direction="column" align="center" height="50vh">
        <Heading mb="3">Activating Account...</Heading>
        <Text>Please wait a moment.</Text>
      </Flex>
    );
  }

  if (error instanceof AxiosError && error.response) {
    const errorData = error.response.data.detail;

    if (errorData[0] === "User is already active") {
      return (
        <Flex justify="center" direction="column" align="center" height="50vh">
          <Heading mb="3">Account Already Active</Heading>
          <Text>
            Your account is already activated. You can proceed to{" "}
            <Link href="/auth/login">log in.</Link>
          </Text>
        </Flex>
      );
    }
    return (
      <Flex justify="center" direction="column" align="center" height="50vh">
        <Heading mb="3">Activation Failed</Heading>
        <Text>{errorData}</Text>{" "}
        <Link href="/auth/resend-activation-link">Resend activation link.</Link>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Heading mb="3">Activation Failed</Heading>
        <Text>Something went wrong. Please try again.</Text>
      </Flex>
    );
  }

  if (isSuccess) {
    return (
      <Flex justify="center" direction="column" align="center" height="50vh">
        <Heading mb="3">Account Activated!</Heading>
        <Text>
          Congratulations! Your account has been successfully activated. proceed
          to <Link href="/auth/login">log in.</Link>
        </Text>
      </Flex>
    );
  }
};

export default ActivationError;
