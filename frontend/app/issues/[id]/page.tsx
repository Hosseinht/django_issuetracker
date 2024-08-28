"use client";

import useIssue from "@/app/hooks/issues/useIssue";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import LoadingIssueDetailPage from "@/app/issues/[id]/loading";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import useAuthStore from "@/app/store";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = ({ params }: Props) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const id = parseInt(params.id);

  const { data: issue, isPending } = useIssue(id);

  if (isPending) return <LoadingIssueDetailPage />;

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {isAuthenticated && (
        <Box mt="4">
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
