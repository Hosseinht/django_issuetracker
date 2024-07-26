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
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (data: CreateIssue) => apiClient.create(data),
    onSuccess: async () => {
      router.push("/issues");
      await client.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: (error) => {
      setError("An unexpected error occurred.");
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const createIssue = (data: CreateIssue) => {
    mutate(data);
  };

  return {
    createIssue,
    error,
    isLoading,
  };
};

export default useCreateIssue;
