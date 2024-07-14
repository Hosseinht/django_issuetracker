"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchemas } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
type IssueForm = z.infer<typeof createIssueSchemas>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchemas),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("http://127.0.0.1:8000/api/issue/create/", data);
            router.push("/issues");
          } catch (error) {
            // console.log(error.response.data);
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage color="red" as="p">
          {errors.title?.message}
        </ErrorMessage>

        <Controller
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
          name="description"
          control={control}
        />

        <ErrorMessage color="red" as="p">
          {errors.description?.message}
        </ErrorMessage>

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
