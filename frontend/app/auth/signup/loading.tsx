import { Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingCreateUserPage = () => {
  return (
    <Flex gap="1" direction="column" className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" width="4rem" />
      <Skeleton height="1rem" />
    </Flex>
  );
};

export default LoadingCreateUserPage;
