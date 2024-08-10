import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingCreateUserPage = () => {
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
        <Skeleton width="15rem" />
      </Box>
      <Skeleton height="2rem" />
      <Grid columns="2" gap="2">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Grid>
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" className="max-w-md" />
      <Skeleton height="1rem" width="16rem" />
    </Flex>
  );
};

export default LoadingCreateUserPage;
