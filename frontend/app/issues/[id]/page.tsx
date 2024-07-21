"use client";

import useIssue from "@/app/hooks/useIssue";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

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
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" align="center" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.created_at}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
