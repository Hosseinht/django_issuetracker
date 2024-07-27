import APIClient from "@/app/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const apiClient = new APIClient("/issue");

const useDeleteIssue = (id: number) => {
  const client = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => apiClient.delete(id),
    onSuccess: async () => {
      router.push("/issues");
      await client.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};

export default useDeleteIssue;
