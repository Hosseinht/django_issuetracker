"use client";
import { z } from "zod";
import { emailSchema } from "@/app/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePasswordReset from "@/app/hooks/auth/usePasswordReset";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

type EmailSchemaType = z.infer<typeof emailSchema>;

const PasswordResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
  });

  const { mutate, isPending } = usePasswordReset();

  const onSubmit = handleSubmit((data: EmailSchemaType) => {
    mutate(data);
  });

  return (
    <Flex height="60vh" justify="center" align="center" direction="column">
      <form className="space-y-3 max-w-xl" onSubmit={onSubmit}>
        <Box mb="60px">
          <Heading mb="2" className="text-center">
            Reset Password
          </Heading>
          <Text>Enter your email to reset your password.</Text>
        </Box>
        <TextField.Root placeholder="Email" {...register("email")} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <Button className="wide-button" disabled={isPending}>
          Submit
          {isPending && <Spinner />}
        </Button>
      </form>
    </Flex>
  );
};

export default PasswordResetForm;
