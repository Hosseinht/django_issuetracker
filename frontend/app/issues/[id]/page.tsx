"use client";

import useIssue from "@/app/hooks/useIssue";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import LoadingIssueDetailPage from "@/app/issues/[id]/loading";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";

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
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
