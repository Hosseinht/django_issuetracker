import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({
  itemCount,
  pageSize,
  currentPage,

  setPage,
}: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap="2" justify="center" mt="5">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button onClick={() => setPage(1)} disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        onClick={() => setPage(pageCount)}
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
