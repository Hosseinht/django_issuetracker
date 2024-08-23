import React from "react";
import { Box, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingLoginPage = () => {
  return (
    <Flex
      gap="1"
      direction="column"
      justify="center"
      mx="auto"
      height="50vh"
      className="max-w-md"
    >
      <Box mb="40px" className="text-center">
        <Skeleton width="5rem" />
        <Skeleton />
      </Box>

      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />

      <Flex direction="column" gap="2" className="marginTop">
        <Skeleton width="10rem" />
        <Skeleton width="18rem" />
      </Flex>
    </Flex>
  );
};

export default LoadingLoginPage;
