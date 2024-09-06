import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@/app/entities/Issue";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "amber" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "amber" },
  CLOSED: { label: "Closed", color: "green" },
};
// Record is one of the utility types in TypeScript that allows us to define key, value pairs where keys and values
// have a particular type
interface IssueStatusProps {
  status: Status;
}
const IssueStatusBadge = ({ status }: IssueStatusProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
