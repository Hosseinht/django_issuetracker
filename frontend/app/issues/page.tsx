"use client";
import { Table } from "@radix-ui/themes";
import useIssues from "@/app/hooks/issues/useIssues";
import LoadingIssuesPage from "@/app/issues/loading";
import IssueActions from "@/app/issues/IssueActions";
import { IssueStatusBadge, Link } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import { Issue, Status } from "@/app/entities/Issue";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; page: string; ordering: keyof Issue };
}

const IssuesPage = ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const statuses = Object.values(["OPEN", "IN_PROGRESS", "CLOSED"]);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "created_at",
      className: "hidden md:table-cell",
    },
  ];

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";

  const toggleOrdering = (value: keyof Issue) => {
    if (searchParams.ordering === value) {
      return `-${value}`;
    } else if (searchParams.ordering === `-${value}`) {
      return value;
    } else {
      return value;
    }
  };

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
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      ordering: toggleOrdering(column.value),
                    },
                  }}
                >
                  {column.value === searchParams.ordering && (
                    <ChevronUpIcon className="inline" />
                  )}
                  {searchParams.ordering === `-${column.value}` && (
                    <ChevronDownIcon className="inline" />
                  )}
                  {column.label}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues?.results?.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.created_at}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {issues && (
        <Pagination
          itemCount={issues.count}
          pageSize={pageSize}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default IssuesPage;
