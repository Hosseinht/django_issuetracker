"use client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import useCreateIssue from "@/app/hooks/issues/useCreateIssue";
import { Issue } from "@/app/entities/Issue";
import useUpdateIssue from "@/app/hooks/issues/useUpdateIssue";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const id = issue?.id;
  const {
    createIssue,
    error: createError,
    isLoading: createLoading,
  } = useCreateIssue();
  const {
    updateIssue,
    error: updateError,
    isLoading: updateLoading,
  } = useUpdateIssue(id ?? 0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title,
      description: issue?.description || "",
      status: issue?.status,
    },
  });

  const onSubmit = handleSubmit((data: IssueFormData) => {
    if (issue) {
      updateIssue(data);
    } else {
      createIssue(data);
    }
    // console.log(data);
  });

  return (
    <div className="max-w-xl">
      {(createError || updateError) && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{createError || updateError}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {issue && (
          <div className="block">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger />

                  <Select.Content>
                    <Select.Item value="OPEN">Open</Select.Item>
                    <Select.Item value="CLOSED">Closed</Select.Item>
                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
          </div>
        )}

        <Button disabled={createLoading || updateLoading}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {createLoading || (updateLoading && <Spinner />)}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
