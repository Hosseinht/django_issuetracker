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

  const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";

  const priorities = ["HIGH", "MEDIUM", "LOW"];
  const priority = priorities.includes(searchParams.priority)
    ? searchParams.priority
    : "";
  // It ensures that only recognized priority values are used. If searchParams.priority contains a value like
  // "HIGH", "MEDIUM", or "LOW", that value is used; otherwise, priority is set to an empty string,
  // effectively meaning "no priority filter" or "all priorities".

  const { data: issues, isLoading } = useIssues(
    parseInt(limit),
    offset,
    searchParams.ordering,
    status,
    priority,
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
