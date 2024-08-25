"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import ErrorMessage from "../../../../components/ErrorMessage";
import Spinner from "../../../../components/Spinner";
import usePasswordResetConfirm from "@/app/hooks/auth/usePasswordResetConfirm";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}
type PasswordResetSchemaType = z.infer<typeof passwordResetSchema>;
const PasswordResetConfirmPage = ({ params }: Props) => {
  const { uid, token } = params;
  const { mutate, isPending, error } = usePasswordResetConfirm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = handleSubmit(
    ({ new_password, re_new_password }: PasswordResetSchemaType) => {
      mutate({ uid, token, new_password, re_new_password });
    },
  );

  return (
    <div>
      <Flex height="60vh" justify="center" align="center" direction="column">
        <form className="space-y-3 max-w-xl" onSubmit={onSubmit}>
          <Box mb="60px">
            <Heading mb="2" className="text-center">
              Reset Password
            </Heading>
            <Text>Enter your email to reset your password.</Text>
          </Box>
          <TextField.Root
            type="password"
            placeholder="Password"
            {...register("new_password")}
          />
          <TextField.Root
            type="password"
            placeholder="Confirm Password"
            {...register("re_new_password")}
          />
          <ErrorMessage>{errors.re_new_password?.message}</ErrorMessage>

          <Button className="wide-button" disabled={isPending}>
            Submit
            {isPending && <Spinner />}
          </Button>
        </form>
      </Flex>
    </div>
  );
};

export default PasswordResetConfirmPage;
