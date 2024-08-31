"use client";
import { Table } from "@radix-ui/themes";
import useIssues from "@/app/hooks/issues/useIssues";
import LoadingIssuesPage from "@/app/issues/loading";
import IssueActions from "@/app/issues/IssueActions";
import { IssueStatusBadge, Link } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/entities/Issue";

interface Props {
  searchParams: { status: Status; page: string };
}

const IssuesPage = ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 3;
  const statuses = Object.values(["OPEN", "IN_PROGRESS", "CLOSED"]);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";

  const { data: issues, isLoading } = useIssues(page, status);

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
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
