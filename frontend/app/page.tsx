"use client";
import LatestIssue from "@/app/dashboard/LatestIssue";
import IssueSummary from "@/app/dashboard/IssueSummary";
import useIssueStatusCount from "@/app/hooks/issues/useIssueStatusCount";
import IssueChart from "@/app/dashboard/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LoadingDashboardPage from "@/app/dashboard/LoadingDashboard";

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
