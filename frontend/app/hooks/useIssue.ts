import APIClient from "@/app/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/app/entities/Issue";

const apiClient = new APIClient<Issue>("/issue");

const useIssue = (id: number) => {
  // console.log(id);
  return useQuery({
    queryKey: ["issue", id],
    queryFn: () => apiClient.getOne(id),
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default useIssue;
