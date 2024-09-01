import ApiClient from "@/app/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Issue, Status } from "@/app/entities/Issue";
import { CACHE_KEY_ISSUES } from "@/app/hooks/constatnt";
import ms from "ms";

const apiClient = new ApiClient<Issue>("/issue/");
const useIssues = (
  limit?: number | "",
  offset?: number | "",
  ordering?: string | "",
  status?: Status | "",
) => {
  const { data, isLoading } = useQuery({
    queryKey: [CACHE_KEY_ISSUES, limit, offset, status, ordering],
    queryFn: () =>
      apiClient.getAll({
        params: { limit, offset, ordering, status },
      }),
    staleTime: ms("1m"),
    retry: 3,
  });

  return { data, isLoading };
};

export default useIssues;
