import React from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import { Status } from "@/app/entities/Issue";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    color: "red" | "violet" | "green";
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN", color: "red" },
    {
      label: "In-progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "violet",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      color: "green",
    },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" color={container.color} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
