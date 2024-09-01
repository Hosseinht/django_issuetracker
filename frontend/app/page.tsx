"use client";
import LatestIssue from "@/app/LatestIssue";
import IssueSummary from "@/app/IssueSummary";
import useIssueStatusCount from "@/app/hooks/issues/useIssueStatusCount";
import IssueChart from "@/app/IssueChart";

export default function Home() {
  const { data: status } = useIssueStatusCount();

  return (
    <>
      <LatestIssue />
      {status && (
        <IssueChart
          open={status.OPEN}
          inProgress={status.IN_PROGRESS}
          closed={status.CLOSED}
        />
      )}
    </>
  );
}
