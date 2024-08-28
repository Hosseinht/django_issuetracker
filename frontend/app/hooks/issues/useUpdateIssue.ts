import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/app/services/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@/app/entities/User";

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

    onSuccess: async (data) => {
      console.log(data);
      router.push(`/issues/${id}/`);
      await client.invalidateQueries({ queryKey: ["issue", id] });
      await client.invalidateQueries({ queryKey: ["issues"] });
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
