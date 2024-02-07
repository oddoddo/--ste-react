import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import GoBackButton from "components/common/GoBackButton";
import Phrase from "components/common/Phrase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import VerificationProvider, {
  useVerification,
  VERIFICATION_USAGE,
} from "../../components/verification/VerificationProvider";
import { useAppDispatch } from "../../store/configureStore";
import fetch_findId from "../../store/apis/users/API_FindID";
import { RoutePath } from "../../components/common/Routers";
import { useTranslation } from "react-i18next";
import { RegisterWrapper } from "components/common/BoxWrap";

const FindIdInner: React.FC = () => {
  const navigate = useNavigate();
  const { onVerification, idenToken, errorCode } = useVerification();
  const [errorMsg, setErrorMsg] = useState("");
  const [foundID, setFoundID] = useState<string | undefined | null>(undefined);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
    if (!idenToken) return;
    dispatch(fetch_findId({ idenToken }))
      .unwrap()
      .then((res: any) => {
        setFoundID(res?.id);
        setErrorMsg("");
        setStep(1);
      });
  }, [idenToken, dispatch]);

  useEffect(() => {
    if (!errorCode) return;
    if (errorCode === "2000") {
      setErrorMsg("");
    } else {
      setStep(1);
      setErrorMsg(
        t(`verifyError.${errorCode}`, {
          defaultValue: "An error occurred during service processing",
        })
      );
    }
  }, [errorCode, t]);

  const verification = useCallback(() => {
    onVerification(VERIFICATION_USAGE.FIND_ID);
  }, [onVerification]);

  return (
    <RegisterWrapper>
      <Heading
        as="h2"
        variant={{ base: "hd285", lg: "hd325" }}
        color={"primary"}
      >
        아이디 찾기
      </Heading>
      <Box>
        {step === 0 ? (
          <>
            <Text variant={"txt194"} color="regiTxt1" mt="20px">
              <Box as={"span"} display={{ base: "block", lg: "inline" }}>
                회원정보에 등록한
              </Box>{" "}
              휴대폰번호로 본인인증을 해야 합니다.
            </Text>
            <Button
              variant="register"
              onClick={verification}
              mt={{ base: "auto", lg: "70px" }}
            >
              휴대폰 본인인증
            </Button>
          </>
        ) : (
          <>
            <Box display={{ base: "display", lg: "inline" }}>
              <Text variant={"txt194"} color="regiTxt1" mt="20px">
                고객님의 정보와 일치하는 아이디입니다.
              </Text>
              {foundID ? (
                <Flex
                  flexDirection="column"
                  h={{ base: "auto", lg: "150px" }}
                  my="30px"
                  bg={"f7"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexGrow={{ base: 1, lg: 0 }}
                >
                  <Text
                    fontSize={"28px"}
                    fontWeight={"500"}
                    color={"primary_b"}
                    opacity={"0.8"}
                  >
                    {foundID}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  h={"auto"}
                  my="30px"
                  py={{ base: "auto", lg: "58px" }}
                  bg={"f7"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexGrow={{ base: 1, lg: 0 }}
                >
                  {errorMsg ? (
                    <Text
                      variant={"txt305"}
                      color={"primary_b"}
                      opacity={"0.8"}
                    >
                      {errorMsg}
                    </Text>
                  ) : (
                    <>
                      <Text
                        variant={"txt305"}
                        color={"primary_b"}
                        opacity={"0.8"}
                      >
                        입력한 정보와 일치하는 아이디가 존재하지 않습니다.
                      </Text>
                      <Text variant={"txt165"} color="Typo_Secondary_666">
                        휴대폰 본인인증으로 간편하게 한국ST거래에 가입하세요
                      </Text>
                    </>
                  )}
                </Flex>
              )}
            </Box>
            <Stack direction={{ base: "column", lg: "row" }} spacing="15px">
              {errorMsg ? (
                <Button
                  variant="register"
                  mt={{ base: "auto", lg: "0" }}
                  onClick={() => setStep(0)}
                >
                  이전
                </Button>
              ) : (
                <Button
                  variant="register"
                  mt={{ base: "auto", lg: "0" }}
                  onClick={() => navigate(RoutePath.LOGIN)}
                >
                  로그인하기
                </Button>
              )}

              {foundID ? (
                <Button
                  variant="outlineLg"
                  onClick={() =>
                    navigate(RoutePath.RESET_PASSWORD, {
                      state: { id: foundID },
                    })
                  }
                >
                  비밀번호 찾기
                </Button>
              ) : (
                <Button
                  variant="outlineLg"
                  onClick={() => navigate(RoutePath.REGISTER)}
                >
                  회원가입
                </Button>
              )}
            </Stack>
          </>
        )}
      </Box>
    </RegisterWrapper>
  );
};

const Wrapper = styled(HStack)`
  gap: 0;
  align-items: stretch;
  width: 100%;
  .column {
    flex-direction: column;
    align-items: flex-start;
  }
  .col-right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
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

const FindId: React.FC = () => {
  return (
    <VerificationProvider>
      <FindIdInner />
    </VerificationProvider>
  );
};
export default FindId;
