import ApiClient from "@/app/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/app/entities/Issue";
import ms from "ms";

const apiClient = new ApiClient<Issue>("/issue");

const useIssue = (id: number) => {
  const { data, isPending } = useQuery({
    queryKey: ["issue", id],
    queryFn: () => apiClient.getOne(id),
    staleTime: ms("1m"),
    retry: 3,
  });

  return { data, isPending };
};

export default useIssue;
