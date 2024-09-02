import ApiClient from "@/app/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CACHE_KEY_ISSUES } from "@/app/hooks/constatnt";

interface CreateIssue {
  title: string;
  description: string;
}
const apiClient = new ApiClient<CreateIssue>("/issue/create/");
const useCreateIssue = () => {
  const client = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateIssue) => apiClient.post(data),
    onSuccess: async () => {
      router.push("/issues");
      await client.invalidateQueries({ queryKey: [CACHE_KEY_ISSUES] });
    },
    onError: () => {
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
