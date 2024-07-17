import APIClient from "@/app/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/app/entities/Issue";

const apiClient = new APIClient<Issue[]>("/issue/");

const useIssues = () => {
  return useQuery({
    queryKey: ["issues"],
    queryFn: apiClient.getAll,
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default useIssues;
