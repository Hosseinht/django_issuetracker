import React from "react";
import { Flex, Grid } from "@radix-ui/themes";

import Skeleton from "@/app/components/Skeleton";

const LoadingDashboardPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="6">
        <Flex gap="2">
          <Skeleton width="7rem" height="5rem" />
          <Skeleton width="9rem" height="5rem" />
          <Skeleton width="8rem" height="5rem" />
        </Flex>
        <Skeleton height="19rem" />
      </Flex>

      <Skeleton height="26rem" />
    </Grid>
  );
};

export default LoadingDashboardPage;
