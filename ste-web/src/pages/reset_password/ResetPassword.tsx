import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterWrapper } from "components/common/BoxWrap";
import fetch_idcheck from "../../store/apis/users/API_IDCheck";
import { RES_CD } from "../../types/InterfaceTypes";
import { useAppDispatch } from "../../store/configureStore";
import { useTranslation } from "react-i18next";
import VerificationProvider, {
  useVerification,
  VERIFICATION_USAGE,
} from "../../components/verification/VerificationProvider";
import fetch_resetPw from "../../store/apis/users/API_ResetPw";
import DefaultModal from "../../components/modals/DefaultModal";
import { RoutePath } from "../../components/common/Routers";

const ResetPasswordInner: React.FC = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onVerification, idenToken, errorCode } = useVerification();
  const [inputId, setInputId] = useState("");
  const [inputIdValid, setInputIdValid] = useState(true);
  const [inputPw, setInputPw] = useState("");
  const [duplicateValid, setDuplicateValid] = useState(true);
  const [duplicateStatus, setDuplicateStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [isPwValid, setPwValid] = useState<boolean>(false);
  const input_password = useRef<HTMLInputElement | null>(null);
  const input_id = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const completeDisclosure = useDisclosure({
    onClose: () => {
      navigate(RoutePath.LOGIN);
    },
  });

  useEffect(() => {
    if (input_id.current) {
      input_id.current.focus();
    }
  }, []);

  useEffect(() => {
    if (idenToken) {
      setCurrentStep(3);
    }
  }, [idenToken]);

  useEffect(() => {
    if (state?.id) {
      setInputId(state.id);
    }
  }, [state, setInputId]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") checkIDHandler();
  };

  const checkIDHandler = () => {
    const idRegex = /^[a-z][a-z0-9]{4,19}$/g;
    const flag = idRegex.test(inputId);
    if (flag) {
      fetchIDCheck(inputId);
    } else {
      setInputIdValid(flag);
      setErrorMsg("영문 소문자와 숫자만 사용 (5 ~ 20자리)");
    }
  };

  const fetchIDCheck = useCallback(
    (id: string) => {
      dispatch(
        fetch_idcheck({
          id,
          usage: "FINDID",
        })
      )
        .unwrap()
        .then((res: any) => {
          if (res.code !== RES_CD.R0000) {
            setErrorMsg("입력하신 아이디를 찾을 수 없습니다.");
            setInputIdValid(false);
          } else {
            setErrorMsg(undefined);
            setCurrentStep(2);
          }
        })
        .catch((e) => {
          console.log("error: ", e);
          setDuplicateValid(false);
          setErrorMsg(t("api_error.R9999"));
        });
    },
    [dispatch, t]
  );

  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: any) => {
    const newConfirmPassword = e.target.value;
    setInputPw(newConfirmPassword);
  };

  const arePasswordsEqual = useMemo(() => {
    return password === inputPw;
  }, [password, inputPw]);

  const [currentStep, setCurrentStep] = useState(1);

  const verification = useCallback(() => {
    onVerification(VERIFICATION_USAGE.RESET_PW);
  }, [onVerification]);

  const onblurPwHandler = () => {
    const passwordRegex =
      /^.*(?=^.{8,50}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    setPwValid(!passwordRegex.test(password));
  };

  const isNext = useMemo(() => {
    return password !== "" && inputPw !== "" && !isPwValid && arePasswordsEqual;
  }, [isPwValid, password, inputPw, arePasswordsEqual]);

  const fetchResetPasswordHandler = () => {
    dispatch(
      fetch_resetPw({
        id: inputId,
        idenToken,
        password: password,
      })
    )
      .unwrap()
      .then((res: any) => {
        if (res.code !== RES_CD.R0000) {
          console.log("ERROR", res);
          //TODO : 비밀번호 변경 에러 처리
        } else {
          completeDisclosure.onOpen();
        }
      })
      .catch((reason: any) => {
        console.log("PW RESET ERROR", reason);
      });
  };

  return (
    <RegisterWrapper>
      <Heading
        as="h2"
        variant={{ base: "hd285", lg: "hd325" }}
        color={"primary"}
      >
        비밀번호 재설정
      </Heading>
      {currentStep === 1 && (
        <>
          <Text variant={"txt194"} color="regiTxt1" mt="20px">
            <Box as={"span"} display={{ base: "block", lg: "inline" }}>
              비밀번호를 재설정 하고자 하는
            </Box>{" "}
            아이디를 입력해주세요.
          </Text>
          <FormControl mt="68px" isInvalid={!inputIdValid}>
            <FormLabel>아이디</FormLabel>
            <Input
              ref={input_id}
              variant={"underline"}
              value={inputId}
              maxLength={20}
              isInvalid={!inputIdValid}
              required
              onKeyDown={onKeyDown}
              onChange={(v) => setInputId(v.target.value)}
            />
            {inputIdValid ? (
              <FormHelperText></FormHelperText>
            ) : (
              <FormErrorMessage variant={"error"}>{errorMsg}</FormErrorMessage>
            )}
          </FormControl>

          <Stack mt={"50px"} direction={"column"} spacing="15px">
            <Button variant="register" onClick={checkIDHandler}>
              다음
            </Button>
            <HStack
              spacing={"12px"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={"32px"}
            >
              <Text variant={"txt185"} color={"Typo_Secondary_666"}>
                아이디가 기억나지 않는다면?
              </Text>
              <Button
                onClick={() => navigate(RoutePath.FIND_ID)}
                variant={"underline"}
              >
                아이디 찾기
              </Button>
            </HStack>
          </Stack>
        </>
      )}

      {currentStep === 2 && (
        <>
          <Text variant={"txt194"} color="regiTxt1" mt="20px">
            <Box as={"span"} display={{ base: "block", lg: "inline" }}>
              회원정보에 등록한
            </Box>{" "}
            휴대폰번호로 본인인증을 해야 합니다.
          </Text>

          <Stack
            mt={"72px"}
            direction={{ base: "column", lg: "row" }}
            spacing="15px"
          >
            <Button variant="register" onClick={verification}>
              휴대폰 본인 확인
            </Button>
          </Stack>
        </>
      )}

      {currentStep === 3 && (
        <>
          <Text variant={"txt194"} color="regiTxt1" mt="20px">
            <Box as={"span"} display={{ base: "block", lg: "inline" }}>
              사용한적 없는
            </Box>{" "}
            안전한 비밀번호로 변경해 주세요.
          </Text>

          <form id="reset">
            <VStack spacing={"39px"} mt={"70px"} alignItems={"stretch"}>
              <FormControl>
                <FormLabel>아이디</FormLabel>
                <Input
                  id="username"
                  variant={"underline"}
                  autoComplete="username"
                  value={inputId}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>새 비밀번호</FormLabel>
                <Input
                  variant={"underline"}
                  ref={input_password}
                  type="password"
                  maxLength={50}
                  placeholder="영문, 숫자, 특수문자 8자리 이상 조합"
                  autoComplete="new-password"
                  value={password}
                  isInvalid={isPwValid}
                  onChange={handlePasswordChange}
                  required
                  fontFamily={"verdana"}
                  fontSize={"16px"}
                  onBlur={onblurPwHandler}
                />
                {isPwValid && password !== "" && (
                  <FormHelperText color={"Dark_Red"}>
                    영문, 숫자, 특수문자 8자리 이상 조합
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>새 비밀번호 확인</FormLabel>
                <Input
                  variant={"underline"}
                  type="password"
                  minLength={8}
                  maxLength={50}
                  placeholder="새 비밀번호 확인"
                  autoComplete="new-password"
                  value={inputPw}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {!arePasswordsEqual && inputPw !== "" && (
                  <FormHelperText color="Dark_Red">
                    비밀번호를 다시 확인해주세요.
                  </FormHelperText>
                )}
              </FormControl>
            </VStack>
          </form>

          <Stack
            mt={"50px"}
            direction={{ base: "column", lg: "row" }}
            spacing="15px"
          >
            <Button
              variant="register"
              onClick={fetchResetPasswordHandler}
              isDisabled={!isNext}
            >
              확인
            </Button>
          </Stack>
          <DefaultModal disclosure={completeDisclosure}>
            <Text>비밀번호가 변경되었습니다.</Text>
            <Text>새롭게 로그인 하세요.</Text>
          </DefaultModal>
        </>
      )}
    </RegisterWrapper>
  );
};

const ResetPassword: React.FC = () => {
  return (
    <VerificationProvider>
      <ResetPasswordInner />
    </VerificationProvider>
  );
};

export default ResetPassword;
