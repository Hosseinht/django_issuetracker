import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "@/app/services/api-client";
import useCreateIssue from "@/app/hooks/issues/useCreateIssue";
import { useRouter } from "next/navigation";
import { parseMaybeAssign } from "sucrase/dist/types/parser/traverser/expression";
import { useState } from "react";

interface updateIssue {
  title?: string;
  description?: string;
  status?: string;
}

const apiClient = new APIClient<updateIssue>("/issue");

const useUpdateIssue = (id: number) => {
  const client = useQueryClient();
  const router = useRouter();
  const [error, setError] = useState("");
  // const [isLoading, setLoading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: updateIssue) => apiClient.update(id, data),
    onSuccess: async () => {
      router.push(`/issues/${id}/`);
      await client.invalidateQueries({ queryKey: ["issue", id] });
      await client.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: () => {
      setError("An unexpected error occurred");
    },
  });
  const updateIssue = (data: updateIssue) => {
    mutate(data);
  };
  return {
    updateIssue,
    error,
    isPending,
  };
};

export default useUpdateIssue;
