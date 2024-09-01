import ApiClient from "@/app/services/apiClient";
import { Status } from "@/app/entities/Issue";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<{ [key: string]: number }>(
  "/issue/status-count/",
);

const useIssueStatusCount = () => {
  const { data } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => apiClient.getStatuses(),
  });

  return { data };
};

export default useIssueStatusCount;
