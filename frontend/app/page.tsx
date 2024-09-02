"use client";
import LatestIssue from "@/app/LatestIssue";
import IssueSummary from "@/app/IssueSummary";
import useIssueStatusCount from "@/app/hooks/issues/useIssueStatusCount";
import IssueChart from "@/app/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LoadingDashboardPage from "@/app/loading";

export default function Home() {
  const { data: status, isLoading } = useIssueStatusCount();

  if (isLoading) {
    return <LoadingDashboardPage />;
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      {status && (
        <Flex direction="column" gap="6">
          <IssueSummary
            open={status.OPEN}
            inProgress={status.IN_PROGRESS}
            closed={status.CLOSED}
          />
          <IssueChart
            open={status.OPEN}
            inProgress={status.IN_PROGRESS}
            closed={status.CLOSED}
          />
        </Flex>
      )}
      <LatestIssue />
    </Grid>
  );
}
