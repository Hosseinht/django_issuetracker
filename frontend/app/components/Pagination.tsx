import React from "react";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  limit: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  offset: number | 0;
  next: string | null;
  previous: string | null;
}

const Pagination = ({
  itemCount,
  limit,
  setLimit,
  offset,
  next,
  previous,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numLimit = parseInt(limit);
  // stupid radix ui Select component need string not a number :/

  const pageCount = Math.ceil(itemCount / numLimit);
  const lastPageOffset = Math.floor((itemCount - 1) / numLimit) * numLimit;
  // Ensure that offset doesn't go where there are no items to show

  if (pageCount <= 1) return null;

  const changePage = (offset: number) => {
    const params = new URLSearchParams(searchParams);
    if (offset) params.set("offset", offset.toString());
    if (offset === 0) params.delete("offset");

    router.push("?" + params.toString());
  };

  const rows: { label: string; value: number }[] = [
    { label: "Show 5", value: 5 },
    { label: "Show 10", value: 10 },
    { label: "Show 15", value: 15 },
    { label: "Show 20", value: 20 },
  ];

  return (
    <Flex justify="between" mt="5">
      <Flex align="center" gap="2" justify="center">
        <Text>
          Page {Math.floor(offset / numLimit) + 1} of {pageCount}
        </Text>
        <Select.Root
          defaultValue={String(limit)}
          onValueChange={(value) => setLimit(value)}
        >
          <Select.Trigger />
          <Select.Content className="ml-5">
            {rows.map((row) => (
              <Select.Item value={String(row.value)}>{row.label}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Flex align="center" gap="2" justify="center">
        <Button onClick={() => changePage(0)} disabled={previous === null}>
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          onClick={() => changePage(Math.max(0, offset - numLimit))}
          disabled={previous === null}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          onClick={() =>
            changePage(Math.min(lastPageOffset, offset + numLimit))
          }
          disabled={next === null}
        >
          <ChevronRightIcon />
        </Button>

        <Button
          onClick={() => changePage(lastPageOffset)}
          disabled={next === null}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
