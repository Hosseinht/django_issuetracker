import { Box, Button, TextField } from "@radix-ui/themes";

import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Link from "@/app/components/Link";
import useCreateUser from "@/app/hooks/auth/useCreateUser";
import Spinner from "@/app/components/Spinner";
import { AxiosError } from "axios";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { createUser, isPending, error } = useCreateUser();

  const onSubmit = handleSubmit((data: SignupFormData) => {
    createUser(data);
  });

  return (
    <div className="max-w-xl">
      <ErrorMessage>
        {error && (
          <>
            {(() => {
              const errorData = (error as AxiosError)?.response?.data as {
                [key: string]: string[];
              };
              return Object.keys(errorData).map((field: string) => (
                <ul className="mb-3">
                  {errorData[field].map(
                    (errorMessage: string, index: number) => (
                      <li key={index}>{errorMessage}</li>
                    ),
                  )}
                </ul>
              ));
            })()}
          </>
        )}
      </ErrorMessage>

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Email" {...register("email")} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextField.Root placeholder="First Name" {...register("first_name")} />
        <TextField.Root placeholder="Last Name" {...register("last_name")} />
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
        <Button disabled={isPending}>
          Sign Up
          {isPending && <Spinner />}
        </Button>
        <Box>
          Already have an account? <Link href="/auth/login">Log In</Link>
        </Box>
      </form>
    </div>
  );
};

export default SignupForm;
