"use client";
import { Box, Button, Text, TextField } from "@radix-ui/themes";

import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Link from "@/app/components/Link";

type signupData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit((data: signupData) => {
    console.log(data);
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Email" {...register("email")} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextField.Root placeholder="Name" {...register("name")} />
        <TextField.Root
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <TextField.Root
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        <Button>Sign Up</Button>
        <Box>
          Already have an account? <Link href="/login">Log In</Link>
        </Box>
      </form>
    </div>
  );
};

export default SignupForm;
