"use client";

import { Box, Flex, Select, Text } from "@radix-ui/themes";
import { Priority, Status } from "@/app/entities/Issue";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";
import { useEffect } from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const priorities: { label: string; value?: Priority }[] = [
  { label: "All" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push("/issues/" + query);
  }, [searchParams, router]);

  const handleChange = (type: "status" | "priority", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(type);
    } else {
      params.set(type, value);
    }

    if (searchParams.get("ordering"))
      params.append("ordering", searchParams.get("ordering")!);

    const query = params.toString() ? `?${params.toString()}` : "";
    router.push("/issues/" + query);
  };

  return (
    <div>
      <Select.Root
        value={searchParams.get("status") || "Filter"}
        onValueChange={(value) => handleChange("status", value)}
      >
        <Select.Trigger>
          <Flex align="center">
            <FiFilter className="mr-2" />

            <span>Filter</span>
          </Flex>
        </Select.Trigger>
        <Select.Content position="popper">
          <Flex direction="row" gap="3" width="300px">
            <Box width="100%">
              <Text size="2" weight="bold">
                By status
              </Text>
              <hr className="h-px bg-bl-300 my-2" />
              {statuses.map((status) => (
                <Select.Item key={status.value} value={status.value ?? "All"}>
                  {status.label}
                </Select.Item>
              ))}
            </Box>

            <Box width="100%">
              <Text size="2" weight="bold">
                By priority
              </Text>
              <hr className="h-px bg-bl-300 my-2" />
              <Select.Root
                value={searchParams.get("priority") || "Filter"}
                onValueChange={(value) => handleChange("priority", value)}
              >
                {priorities.map((priority) => (
                  <Select.Item
                    key={priority.value}
                    value={priority.value ?? "All"}
                  >
                    {priority.label}
                  </Select.Item>
                ))}
              </Select.Root>
            </Box>
          </Flex>
        </Select.Content>
      </Select.Root>
    </div>
  );
};
export default IssueStatusFilter;
