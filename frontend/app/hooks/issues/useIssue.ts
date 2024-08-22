import APIClient from "@/app/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/app/entities/Issue";

const apiClient = new APIClient<Issue>("/issue");

const useIssue = (id: number) => {
  const { data, isPending } = useQuery({
    queryKey: ["issue", id],
    queryFn: () => apiClient.getOne(id),
    staleTime: 60 * 1000,
    retry: 3,
  });

  return { data, isPending };
};

export default useIssue;
