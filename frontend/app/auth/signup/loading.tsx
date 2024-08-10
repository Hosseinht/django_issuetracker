import { Flex, Grid } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingCreateUserPage = () => {
  return (
    <Flex gap="1" direction="column" className="max-w-xl">
      <Skeleton height="2rem" />
      <Grid columns="2" gap="2">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Grid>
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" width="4rem" />
      <Skeleton height="1rem" width="16rem" />
    </Flex>
  );
};

export default LoadingCreateUserPage;
