"use client";
import { useState } from "react";
import useResetActivationLink from "@/app/hooks/auth/useResetActivationLink";
import { z } from "zod";
import { emailSchema } from "@/app/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../components/ErrorMessage";
import { AxiosError } from "axios";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import Spinner from "../../components/Spinner";

type EmailSchemaType = z.infer<typeof emailSchema>;

const ResendActivationLink = () => {
  const [errorData, setErrorData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
  });

  const { mutate, isSuccess, isPending, error } = useResetActivationLink();

  const onSubmit = handleSubmit((data: EmailSchemaType) => {
    mutate(data);
  });

  if (error instanceof AxiosError && error.response) {
    const errorData = error.response.data.detail;
    setErrorData(errorData);
  }

  return (
    <div className="max-w-xl">
      {isSuccess ? (
        <Text>
          An email has been sent to the provided address. If the email address
          is associated with an account, you will receive a new activation link.{" "}
        </Text>
      ) : (
        <>
          {errorData && <ErrorMessage>{errorData}</ErrorMessage>}
          <Flex direction="column">
            <Text className="text-lg font-bold mb-4">
              Resend Activation Link
            </Text>{" "}
            <Text className="mb-4">
              If you didn't receive an activation link or it's no longer
              working, enter your email address below to receive a new one.
            </Text>
          </Flex>
          <form className="space-y-3" onSubmit={onSubmit}>
            <TextField.Root placeholder="Email" {...register("email")} />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>

            <Button disabled={isPending}>
              Resend Link
              {isPending && <Spinner />}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ResendActivationLink;
