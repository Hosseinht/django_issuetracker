import ApiClient from "@/app/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<{ [key: string]: number }>(
  "/issue/status-count/",
);

const useIssueStatusCount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => apiClient.getStatuses(),
    staleTime: ms("5m"),
    retry: 3,
  });

  return { data, isLoading };
};

export default useIssueStatusCount;
