import React from "react";
import styled from "styled-components";
import { Flex } from "@chakra-ui/react";
import { WrapperProps } from "../../types";

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <CenterWrapper>{children}</CenterWrapper>;
};
export default Wrapper;
const CenterWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  /* position: absolute; */
  justify-content: center;
  align-items: center;
`;
