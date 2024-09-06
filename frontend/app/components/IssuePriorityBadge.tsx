import React from "react";
import { Badge } from "@radix-ui/themes";
import { Priority } from "@/app/entities/Issue";

const priorityMap: Record<
  Priority,
  { label: string; color: "red" | "amber" | "green" }
> = {
  HIGH: { label: "High", color: "red" },
  MEDIUM: { label: "Medium", color: "amber" },
  LOW: { label: "Low", color: "green" },
};

interface IssuePriorityProps {
  priority: Priority;
}
const IssuePriorityBadge = ({ priority }: IssuePriorityProps) => {
  return (
    <Badge color={priorityMap[priority].color}>
      {priorityMap[priority].label}
    </Badge>
  );
};

export default IssuePriorityBadge;
