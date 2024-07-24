"use client";

import useIssue from "@/app/hooks/useIssue";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import LoadingIssueDetailPage from "@/app/issues/[id]/loading";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const IssueDetailPage = ({ params }: Props) => {
  const id = parseInt(params.id);

  const { data: issue, isLoading } = useIssue(id);

  if (isLoading) return <LoadingIssueDetailPage />;

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap="3" align="center" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue?.created_at}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
