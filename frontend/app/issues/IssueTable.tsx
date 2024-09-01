import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@/app/entities/Issue";
import { FetchResponse } from "@/app/services/apiClient";
import { useSearchParams } from "next/navigation";

export interface IssueQuery {
  status: Status;
  offset: string;
  ordering: keyof Issue;
}

interface Props {
  searchParams: IssueQuery;
  issues: FetchResponse<Issue> | undefined;
}
const IssueTable = ({ searchParams, issues }: Props) => {
  const toggleOrdering = (value: keyof Issue) => {
    if (searchParams.ordering === value) {
      return `-${value}`;
    } else if (searchParams.ordering === `-${value}`) {
      return null;
    } else {
      return value;
    }
  };
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "created_at",
      className: "hidden md:table-cell",
    },
    { label: "Assigned To", value: "user", className: "hidden md:table-cell" },
  ];
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
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
            <Table.Cell className="hidden md:table-cell">
              {issue.user ? String(issue.user) : "Unassigned"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
