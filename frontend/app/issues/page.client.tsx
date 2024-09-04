"use client";
import useIssues from "@/app/hooks/issues/useIssues";
import LoadingIssuesPage from "@/app/issues/loading";
import IssueActions from "@/app/issues/IssueActions";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery } from "@/app/issues/IssueTable";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPageClient = ({ searchParams }: Props) => {
  const [limit, setLimit] = useState("10");
  const offset = parseInt(searchParams.offset) || 0;

  const statuses = Object.values(["OPEN", "IN_PROGRESS", "CLOSED"]);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";

  const { data: issues, isLoading } = useIssues(
    parseInt(limit),
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
        <>
          <Pagination
            itemCount={issues.count}
            next={issues.next}
            previous={issues.previous}
            limit={limit}
            setLimit={setLimit}
            offset={offset}
          />
        </>
      )}
    </Flex>
  );
};

export default IssuesPageClient;
