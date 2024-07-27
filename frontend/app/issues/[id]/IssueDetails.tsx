import React from "react";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Issue } from "@/app/entities/Issue";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" align="center" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.created_at}</Text>
      </Flex>
      <Card className="prose max-w-full mt-4">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
