import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";

import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Link from "@/app/components/Link";
import useCreateUser from "@/app/hooks/auth/useCreateUser";
import Spinner from "@/app/components/Spinner";
import SignupError from "@/app/auth/_components/SignupError";
import React from "react";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { createUser, isPending, error, errorData } = useCreateUser();

  const onSubmit = handleSubmit((data: SignupFormData) => {
    createUser(data);
  });

  return (
    <Flex height="50vh" justify="center" align="center" direction="column">
      <form className="space-y-3" onSubmit={onSubmit}>
        <Box mb="40px" className="text-center">
          <Heading mb="2">Signup</Heading>
          <Text>Create a new account to get started.</Text>
        </Box>

        <SignupError error={error} errorData={errorData} />

        <TextField.Root placeholder="Email" {...register("email")} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <Grid columns="2" gap="2">
          <TextField.Root
            placeholder="First Name"
            {...register("first_name")}
          />
          <TextField.Root placeholder="Last Name" {...register("last_name")} />
        </Grid>

        <TextField.Root
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <TextField.Root
          type="password"
          placeholder="Confirm Password"
          {...register("re_password")}
        />
        <ErrorMessage>{errors.re_password?.message}</ErrorMessage>

        <Button className="wide-button" disabled={isPending}>
          Sign Up
          {isPending && <Spinner />}
        </Button>
        <Box>
          Already have an account? <Link href="/auth/login">Log In</Link>
        </Box>
      </form>
    </Flex>
  );
};

export default SignupForm;
