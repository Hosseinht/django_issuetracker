import React, { PropsWithChildren } from "react";
import { Flex } from "@radix-ui/themes";

const ActivationErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Flex justify="center" direction="column" align="center" height="50vh">
      {children}
    </Flex>
  );
};

export default ActivationErrorMessage;
