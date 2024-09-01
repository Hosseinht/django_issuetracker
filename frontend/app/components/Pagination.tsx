import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  limit: number;
  offset: number | 0;
  next: string | null;
  previous: string | null;
}

const Pagination = ({ itemCount, limit, offset, next, previous }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / limit);
  const lastPage = Math.floor(itemCount / limit) * limit;

  if (pageCount <= 1) return null;

  const changePage = (offset: number | 0) => {
    const params = new URLSearchParams(searchParams);
    if (offset) params.set("offset", offset.toString());
    if (offset === 0) params.delete("offset");

    router.push("?" + params.toString());
  };
  return (
    <Flex align="center" gap="2" justify="center" mt="5">
      <Text>
        Page {offset / limit + 1} of {pageCount}
      </Text>
      <Button onClick={() => changePage(0)} disabled={previous === null}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(offset - 10)}
        disabled={previous === null}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        // onClick={() => setPage(offset + 1)}
        onClick={() => changePage(offset + 10)}
        disabled={next === null}
      >
        <ChevronRightIcon />
      </Button>

      <Button onClick={() => changePage(lastPage)} disabled={next === null}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
