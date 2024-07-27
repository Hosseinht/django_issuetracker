import APIClient from "@/app/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const apiClient = new APIClient("/issue");

const useDeleteIssue = (id: number) => {
  const client = useQueryClient();
  const router = useRouter();

  const { mutateAsync, error } = useMutation({
    mutationFn: () => apiClient.delete(id),
    onSuccess: async () => {
      router.push("/issues");
      await client.invalidateQueries({ queryKey: ["issues"] });
    },
  });
  return {
    mutateAsync,
  };
};

export default useDeleteIssue;