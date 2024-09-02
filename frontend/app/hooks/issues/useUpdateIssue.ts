import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/app/services/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CACHE_KEY_ISSUES } from "@/app/hooks/constatnt";

export interface UpdateIssue {
  user?: null | string;
  title?: string;
  description?: string;
  status?: string;
}

const apiClient = new ApiClient<UpdateIssue>("/issue");

const useUpdateIssue = (id: number) => {
  const client = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateIssue) => apiClient.update(id, data),

    onSuccess: async () => {
      router.push(`/issues/${id}/`);
      await client.invalidateQueries({ queryKey: [CACHE_KEY_ISSUES] });
      await client.invalidateQueries({ queryKey: ["issue", id] });
    },
    onError: () => {
      setError("An unexpected error occurred");
    },
  });
  const updateIssue = (data: UpdateIssue) => {
    mutate(data);
  };
  return {
    updateIssue,
    error,
    isPending,
  };
};

export default useUpdateIssue;
