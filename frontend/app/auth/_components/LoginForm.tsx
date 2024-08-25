"use client";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import ErrorMessage from "../../components/ErrorMessage";
import Link from "../../components/Link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/validationSchemas";
import { z } from "zod";
import useLogin from "@/app/hooks/auth/useLogin";
import { Spinner } from "@/app/components";

import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useGoogle } from "@/app/utils";

type LoginFormData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { mutate, error, errorData, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const googleAuth = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    await useGoogle();
    setLoading(false);
  };

  const onSubmit = handleSubmit((data: LoginFormData) => {
    mutate(data);
  });

  return (
    <Flex height="60vh" justify="center" align="center" direction="column">
      <form className="space-y-3 ">
        <Box mb="60px">
          <Heading mb="2" className="text-center">
            Log In
          </Heading>
          <Text>Enter your email and password to access your account.</Text>
        </Box>

        <ErrorMessage>{errorData}</ErrorMessage>
        {error && !errorData && (
          <ErrorMessage>An unexpected error occurred.</ErrorMessage>
        )}

        <TextField.Root placeholder="Email" {...register("email")} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <TextField.Root
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Button
          onClick={onSubmit}
          className="wide-button"
          disabled={isPending}
          loading={isPending}
        >
          Log In
          {isPending && <Spinner />}
        </Button>

        <Button onClick={googleAuth} color="red" className="wide-button">
          <FaGoogle />
          Google
          {isLoading && <Spinner />}
        </Button>

        <Flex direction="column" gap="2" className="marginTop">
          <Link href="/auth/password-reset">Forgot password? </Link>
          <Text>
            Don't have an account? <Link href="/auth/signup"> Register</Link>{" "}
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default LoginForm;
