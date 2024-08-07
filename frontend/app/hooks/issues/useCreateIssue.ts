import APIClient from "@/app/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateIssue {
  title: string;
  description: string;
}
const apiClient = new APIClient<CreateIssue>("/issue/create/");
const useCreateIssue = () => {
  const client = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateIssue) => apiClient.post(data),
    onSuccess: async () => {
      router.push("/issues");
      await client.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: (error) => {
      setError("An unexpected error occurred.");
    },
  });

  const createIssue = (data: CreateIssue) => {
    mutate(data);
  };

  return {
    createIssue,
    error,
    isPending,
  };
};

export default useCreateIssue;
