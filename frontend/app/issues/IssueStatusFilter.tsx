"use client";

import { Box, Flex, Select, Text } from "@radix-ui/themes";
import { Status } from "@/app/entities/Issue";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "Filter"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status && status !== "All") params.append("status", status);
        if (status && status === "All") params.delete("status");
        if (searchParams.get("ordering"))
          params.append("ordering", searchParams.get("ordering")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/" + query);
      }}
    >
      <Select.Trigger className="filter-trigger">
        <Flex align="center">
          <FiFilter className="mr-2" />

          <span>{searchParams.get("status") || "Filter"}</span>
        </Flex>
      </Select.Trigger>
      <Select.Content position="popper">
        <Text size="2" weight="bold">
          By status
        </Text>
        <hr className="h-px bg-bl-300 my-2" />
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value ?? "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueStatusFilter;
