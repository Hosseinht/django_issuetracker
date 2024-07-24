import APIClient from "@/app/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface createIssue {
  title: string;
  description: string;
}
const apiClient = new APIClient<createIssue>("/issue/create/");
const useCreateIssue = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: () => {
      router.push("/issues");
    },
    onError: (error) => {
      setError("An unexpected error occurred.");
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const createIssue = (data: createIssue) => {
    mutate(data);
  };

  return {
    createIssue,
    error,
    isLoading,
  };
};

export default useCreateIssue;
