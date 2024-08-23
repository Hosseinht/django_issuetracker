import { Box, Flex } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const LoadingPasswordResetPage = () => {
  return (
    <Flex
      height="60vh"
      justify="center"
      align="center"
      direction="column"
      className="max-w-md"
      mx="auto"
    >
      <Box mb="40px" className="text-center">
        <Skeleton width="10rem" />
        <Skeleton width="20rem" />
      </Box>
      <Skeleton height="2rem" width="20rem" className="mb-2" />
      <Skeleton height="2rem" width="20rem" />
    </Flex>
  );
};

export default LoadingPasswordResetPage;
