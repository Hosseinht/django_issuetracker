"use client";
import useIssues from "@/app/hooks/issues/useIssues";
import LoadingIssuesPage from "@/app/issues/loading";
import IssueActions from "@/app/issues/IssueActions";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery } from "@/app/issues/IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = ({ searchParams }: Props) => {
  const offset = parseInt(searchParams.offset) || 0;
  const limit = 10;
  const statuses = Object.values(["OPEN", "IN_PROGRESS", "CLOSED"]);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";

  const { data: issues, isLoading } = useIssues(
    limit,
    offset,
    searchParams.ordering,
    status,
  );

  if (isLoading)
    return (
      <div>
        <LoadingIssuesPage />
      </div>
    );

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      {issues && (
        <Pagination
          itemCount={issues.count}
          next={issues.next}
          previous={issues.previous}
          limit={limit}
          offset={offset}
        />
      )}
    </Flex>
  );
};

export default IssuesPage;
