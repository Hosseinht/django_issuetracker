"use client";

import useIssue from "@/app/hooks/useIssue";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = ({ params }: Props) => {
  const id = parseInt(params.id);

  const { data: issue, error, isLoading } = useIssue(id);
  if (isLoading) return <div>Loading...</div>;

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <div>{issue?.title}</div>
      <div>{issue?.description}</div>
      <div>{issue?.status}</div>
      <div>{issue?.created_at}</div>
    </div>
  );
};

export default IssueDetailPage;
