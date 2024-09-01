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
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const statuses = Object.values(["OPEN", "IN_PROGRESS", "CLOSED"]);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";

  const { data: issues, isLoading } = useIssues(
    page,
    status,
    searchParams.ordering,
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
          pageSize={pageSize}
          currentPage={page}
        />
      )}
    </Flex>
  );
};

export default IssuesPage;
