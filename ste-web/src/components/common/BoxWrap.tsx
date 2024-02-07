import React from "react";
import { Box, Container, HStack } from "@chakra-ui/react";
import GoBackButton from "components/common/GoBackButton";
import Phrase from "./Phrase";
import styled from "styled-components";

interface RegisterWrapperProps {
  children: React.ReactNode;
  onPrevScreen?: () => void;
}
interface BoxWrapperProps {
  children: React.ReactNode;
}

export const RegisterWrapper: React.FC<RegisterWrapperProps> = ({
  children,
  onPrevScreen,
}) => {
  return (
    <SignUpWrapper gap={0} alignItems="stretch" width="100%">
      <Phrase />
      <Container className="column">
        {onPrevScreen && <GoBackButton onPrevScreen={onPrevScreen} />}
        <Box className="col-right">{children}</Box>
      </Container>
    </SignUpWrapper>
  );
};

export const SignUpWrapper = styled(HStack)`
  gap: 0;
  align-items: stretch;
  width: 100%;
  /* min-height: calc(100vh - 60px); */
  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .col-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    width: 100%;
    padding-top: 78px;
    .title-small {
      font-weight: 500;
      font-size: 28px;
      color: ${({ theme: { colors } }) => colors.primary};
    }
  }
  @media screen and (min-width: 1400px) {
    .column {
      width: 50%;
      align-items: center;
    }
    .col-right {
      width: 500px;
    }
    .title-small {
      font-size: 38px;
    }
  }
`;

const BoxWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 1400px;
  min-height: 750px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 6px 6px 12px 0px rgba(0, 0, 0, 0.02);
  @media screen and (min-width: 1400px) {
    margin-top: 48px;
  }
  .acc_cont {
    flex-grow: 1;
    padding: 20px 30px;
    border-left: 1px solid;
    border-color: ${({ theme: { colors } }) => colors.Line_Gray_e9};
    .acc_cont_title {
      font-weight: 500;
      font-size: 28px;
      color: ${({ theme: { colors } }) => colors.primary};
    }
  }
`;

export default BoxWrapper;
