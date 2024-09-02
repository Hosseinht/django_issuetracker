"use client";
import useIssues from "@/app/hooks/issues/useIssues";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

const LatestIssue = () => {
  const { data: issues } = useIssues(5, "", "created_at");

  return (
    <Card>
      <Heading size="4" mb="4" ml="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues?.results.map((issue) => (
            <Table.Row>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.user ? String(issue.user) : "Unassigned"}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
