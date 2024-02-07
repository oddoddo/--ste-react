import React, { useEffect, useState } from "react";
import { useRegister } from "../../components/register/RegisterProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Phrase from "../../components/common/Phrase";
import { RoutePath } from "../../components/common/Routers";
import { RegisterWrapper } from "../../components/common/BoxWrap";

import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { saveJWT, useUserInfo } from "../../store/reducers/authReducer";
import fetch_my from "../../store/apis/users/API_My";
import { useAppDispatch } from "../../store/configureStore";

const SignUpCompleted: React.FC = () => {
  const { state } = useLocation();
  const { onNextScreen, userNm } = useRegister();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name } = useUserInfo();

  useEffect(() => {
    // 회원가입 완료후 엑세스 토큰 전달시 로그인
    if (state?.token) {
      dispatch(saveJWT(state?.token));
      dispatch(fetch_my());
    } else {
      navigate(RoutePath.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <RegisterWrapper onPrevScreen={() => {}}>
      <Heading
        as="h2"
        variant={{ base: "hd385", lg: "hd435" }}
        color={"primary"}
        w={{ base: "265px", lg: "auto" }}
      >
        {name} 님, <br />
        한국ST거래 회원이 되신 것을
        <br /> 축하드립니다!
      </Heading>
      <Text
        variant={"txt244"}
        color="regiTxt1"
        mt="20px"
        letterSpacing={"-0.05rem"}
      >
        지금 바로 토큰증권 거래를 시작하세요.
      </Text>

      <Box
        w={{ base: "100%", lg: "500px" }}
        pt={"26px"}
        pb={"34px"}
        px={"22px"}
        bg={"#eee"}
        borderRadius={"8px"}
        mt={"25px"}
      >
        <Text
          as="strong"
          display={"block"}
          variant={{ base: "txt225", lg: "txt245" }}
          color="regiTxt1"
        >
          [실명 확인 인증 추가 안내]
        </Text>
        <Text
          variant={{ base: "txt184", lg: "txt214" }}
          mt={"12px"}
          lineHeight={"1.4"}
          color={"gray7"}
        >
          금융위원회의 가이드라인에 따라 투자자보호를 위하여 실명 확인 인증
          단계를 추가할 예정 입니다.
        </Text>
        <UnorderedList mt={"28px"} spacing={"6px"}>
          <ListItem>
            <Text variant={{ base: "txt194", lg: "txt214" }} color={"regiTxt1"}>
              인증 추가 일정: 2024년 2월 1일 (예정)
            </Text>
          </ListItem>
          <ListItem>
            <Text variant={{ base: "txt194", lg: "txt214" }} color={"regiTxt1"}>
              인증 관련 자세한 안내는 추후 별도 공지사항을 통해 안내드릴
              예정입니다.
            </Text>
          </ListItem>
        </UnorderedList>
      </Box>

      <Button
        variant="register"
        mt={{ base: "auto", lg: "70px" }}
        onClick={() => navigate(RoutePath.ACCOUNTS)}
      >
        입금하기
      </Button>
      <Button
        variant={"outlineLg"}
        mt={"15px"}
        onClick={() => navigate(RoutePath.EXCHANGE)}
      >
        토큰증권 거래 시작하기
      </Button>
    </RegisterWrapper>
  );
};
export default SignUpCompleted;
