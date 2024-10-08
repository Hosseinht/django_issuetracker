import ApiClient from "@/app/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Issue, Priority, Status } from "@/app/entities/Issue";
import ms from "ms";

const apiClient = new ApiClient<Issue>("/issue/");
const useIssues = (
  limit?: number | "",
  offset?: number | "",
  ordering?: string | "",
  status?: Status | "",
  priority?: Priority | "",
  search?: any | "",
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["issues", limit, offset, ordering, status, priority, search],

    queryFn: () =>
      apiClient.getAll({
        params: { limit, offset, ordering, status, priority, search },
      }),
    staleTime: ms("1m"),
    retry: 3,
  });

  return { data, isLoading };
};

export default useIssues;
