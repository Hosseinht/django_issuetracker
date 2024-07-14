"use client";
import { Button, TextField } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("http://127.0.0.1:8000/api/issue/create/", data);
        router.push("/issues");
      })}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title", { required: true })}
      />

      <Controller
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
        name="description"
        control={control}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
