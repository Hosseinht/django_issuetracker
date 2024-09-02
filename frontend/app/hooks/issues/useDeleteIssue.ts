import ApiClient from "@/app/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CACHE_KEY_ISSUES } from "@/app/hooks/constatnt";

const apiClient = new ApiClient("/issue");

const useDeleteIssue = (id: number) => {
  const client = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: () => apiClient.delete(id),
    onSuccess: async () => {
      router.push("/issues");
      await client.invalidateQueries({ queryKey: [CACHE_KEY_ISSUES] });
    },
  });
  return {
    mutateAsync,
  };
};

export default useDeleteIssue;
