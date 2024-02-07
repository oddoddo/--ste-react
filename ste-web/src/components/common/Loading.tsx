import React from "react";
import "../../theme/scss/loading.scss";
import { Flex } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Flex
      backgroundColor="loading"
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      pos="fixed"
      top={0}
      left={0}
      zIndex={999}
    >
      <span className="loader" />
    </Flex>
  );
};

export default Loading;
