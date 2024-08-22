"use client";
import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingEditIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" className="mb-10" />
      <Skeleton width="6rem" height="2rem" className="mb-2" />
      <Skeleton width="8rem" height="2rem" />
    </Box>
  );
};

export default LoadingEditIssuePage;
