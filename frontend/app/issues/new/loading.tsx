"use client";
import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = () => {
  return (
    <>
      <Box className="max-w-xl mb-10">
        <Skeleton height="2rem" className="mb-2" />
        <Skeleton height="20rem" />
      </Box>

      <Skeleton height="2rem" width="10rem" />
    </>
  );
};

export default LoadingNewIssuePage;
