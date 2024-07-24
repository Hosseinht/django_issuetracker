"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchemas } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import useCreateIssue from "@/app/hooks/useCreateIssue";

type IssueForm = z.infer<typeof createIssueSchemas>;

const NewIssuePage = () => {
  const router = useRouter();
  const { createIssue, error, isLoading } = useCreateIssue();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchemas),
  });

  // const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit((data: IssueForm) => {
    createIssue(data);
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          defaultValue=""
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isLoading}>
          Submit New Issue {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
