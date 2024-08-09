import React, { PropsWithChildren } from "react";
import { Flex, Heading, Text } from "@radix-ui/themes";

const ActivationErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Flex justify="center" direction="column" align="center" height="50vh">
      {children}
    </Flex>
  );
};

export default ActivationErrorMessage;
