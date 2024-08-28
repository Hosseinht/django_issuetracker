import ApiClient from "@/app/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/app/entities/Issue";
import { CACHE_KEY_ISSUES } from "@/app/hooks/constatnt";
import ms from "ms";

const apiClient = new ApiClient<Issue>("/issue/");

const useIssues = () => {
  const { data, isLoading } = useQuery({
    queryKey: CACHE_KEY_ISSUES,
    queryFn: apiClient.getAll,
    staleTime: ms("1m"),
    retry: 3,
  });
  return { data, isLoading };
};

export default useIssues;
