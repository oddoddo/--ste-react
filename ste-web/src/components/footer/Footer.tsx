import React from "react";
import { Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import LOGO from "../../assets/images/common/footer_logo.svg";
import styled from "styled-components";
import HDivider from "../etc/HDivider";

const Footer = () => {
  return (
    <Wrapper>
      <HStack gap="100px">
        <Image src={LOGO} />
        <Stack gap="1px" direction="column">
          <RowBox color="Typo_Secondary_666">
            <Text>
              한국ST거래(주) <HDivider /> 사업자 번호 657-87-02902
              <HDivider /> 대표명 정상준 <HDivider />
              사업장 주소 (07321) 서울특별시 영등포구 의사당대로 82, 19층
            </Text>
          </RowBox>
          <RowBox>
            <Text>
              대표 전화 010-5474-8217 <HDivider /> 대표 이메일 ste@krste.co.kr
            </Text>
          </RowBox>
          <Flex
            color="Typo_929292"
            pt="20px"
            fontSize="12px"
            letterSpacing="-0.3px"
          >
            Copyright @ 2023 Korea ST Exchange Inc. All rights reserved.
          </Flex>
        </Stack>
      </HStack>
    </Wrapper>
  );
};
export default React.memo(Footer);

const Wrapper = styled.footer`
  position: relative;
  overflow: hidden;
  bottom: 0;
  height: 140px;
  width: 100%;
  background: ${(props) => props.theme.colors.back_bg};
  word-break: keep-all;
  > div {
    letter-spacing: -0.5px;
    font-size: 14px;
    position: absolute;
    height: 100%;
    left: 15%;
    padding: 30px 0;
    justify-content: center;
    align-items: start;
  }
`;

const VDivider = styled.span`
  color: ${(props) => props.theme.colors.Line_Gray_BT_DD};
  padding: 0 5px;
`;

const RowBox = styled(Box)`
  color: ${(props) => props.theme.colors.Typo_Secondary_666};
`;
