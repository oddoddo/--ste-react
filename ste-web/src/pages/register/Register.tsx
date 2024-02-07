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
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import fetch_idcheck from "../../store/apis/users/API_IDCheck";
import { useAppDispatch } from "../../store/configureStore";
import Wrapper from "../../components/container/Wrapper";
import { RES_CD } from "../../types/InterfaceTypes";
import fetch_signup from "../../store/apis/users/API_SignUp";
import RegisterContextProvider, {
  useRegister,
} from "../../components/register/RegisterProvider";
import TermsCheckboxes from "../../components/register/terms/TermsCheckbox";
import { RotateLoader } from "react-spinners";
import { RoutePath } from "../../components/common/Routers";
import { useNavigate } from "react-router-dom";
import VerificationProvider, {
  useVerification,
  VERIFICATION_USAGE,
} from "../../components/verification/VerificationProvider";
import { RegisterWrapper } from "../../components/common/BoxWrap";

const Screen1: React.FC = () => {
  const { onNextScreen, onSetScreenNumber } = useRegister();
  return (
    <RegisterWrapper>
      <Box mb={"35px"}>
        <VisuallyHidden>회원가입</VisuallyHidden>
        <Heading
          as={"h2"}
          variant={{ base: "hd385", lg: "hd435" }}
          w={{ base: "220px", lg: "auto" }}
          color="primary"
        >
          한국ST거래에 오신 것을 환영합니다!
        </Heading>
        <Text variant={{ base: "txt224", lg: "txt244" }} mt={"20px"}>
          지금 바로{" "}
          <Text as="span" display={{ base: "block", lg: "inline" }}>
            토큰증권 거래를 시작해 보세요.
          </Text>
        </Text>
      </Box>
      <Button
        variant="register"
        onClick={onNextScreen}
        mt={{ base: "auto", lg: "57px" }}
      >
        회원가입
      </Button>
    </RegisterWrapper>
  );
};

const Screen2: React.FC = () => {
  const { t } = useTranslation();
  const { onNextScreen, onPrevScreen, inputId, setInputId } = useRegister();
  const [inputIdValid, setInputIdValid] = useState(true);
  const [duplicateValid, setDuplicateValid] = useState(true);
  const [duplicateStatus, setDuplicateStatus] = useState("");
  const dispatch = useAppDispatch();
  const input_id = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const handleInputChange = (e: any) => {
    const newValue = e.target.value.replace(/[^a-z0-9]/g, "");
    setInputId(newValue.substring(0, 20));
    setDuplicateValid(true);
  };

  const idInputCompleted = () => {
    dispatch(
      fetch_idcheck({
        id: inputId,
      })
    )
      .unwrap()
      .then((res: any) => {
        if (res.code !== RES_CD.R0000) {
          setErrorMsg(t("api_error." + res.code));
          setDuplicateStatus(res.code);
          setDuplicateValid(false);
        } else {
          setErrorMsg(undefined);
          setDuplicateStatus(res.code);
          setDuplicateValid(true);
          setInputId(inputId);
          onNextScreen();
        }
      })
      .catch((e) => {
        console.log("error: ", e);
        setDuplicateValid(false);
        setErrorMsg(t("api_error.R9999"));
      });
  };

  useEffect(() => {
    const idRegex = /^[a-z][a-z0-9]{4,19}$/g;
    setInputIdValid(!idRegex.test(inputId));
  }, [inputId]);

  useEffect(() => {
    if (input_id.current) {
      input_id.current.focus();
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      !inputIdValid && idInputCompleted();
    }
  };

  return (
    <RegisterWrapper onPrevScreen={onPrevScreen}>
      <Box mb={"35px"}>
        <Heading
          as="h2"
          variant={{ base: "hd285", lg: "hd325" }}
          color={"primary"}
        >
          회원가입
        </Heading>
        <VStack spacing={"39px"} mt={{ base: "40px", lg: "55px" }}>
          <FormControl isInvalid={!duplicateValid}>
            <FormLabel>아이디</FormLabel>
            <Input
              variant={"underline"}
              ref={input_id}
              maxLength={20}
              required
              value={inputId}
              isInvalid={!duplicateValid}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
            />
            {duplicateValid ? (
              <FormHelperText>
                영문 소문자와 숫자만 사용 (5 ~ 20자리)
              </FormHelperText>
            ) : (
              <FormErrorMessage variant={"error"}>{errorMsg}</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </Box>
      <Button
        variant="register"
        onClick={idInputCompleted}
        isDisabled={inputIdValid}
        mt={{ base: "auto", lg: "57px" }}
      >
        다음
      </Button>
    </RegisterWrapper>
  );
};

const Screen3: React.FC = () => {
  const {
    onNextScreen,
    onPrevScreen,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    isTermRequiredChecked,
  } = useRegister();
  const [duplicateValid, setDuplicateValid] = useState(true);
  const input_id = useRef<HTMLInputElement | null>(null);
  const [termNext, setTermNext] = useState(false);

  const [password, setPassword] = useState("");
  const [isPwValid, setPwValid] = useState<boolean>(false);
  const input_password = useRef<HTMLInputElement | null>(null);
  const input_confirmPassword = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: any) => {
    const newValue = e.target.value.replace(/[^a-z0-9]/g, "");
    setInputId(newValue.substring(0, 20));
    setDuplicateValid(true);
  };

  useEffect(() => {
    if (input_id.current) {
      input_id.current.focus();
    }
  }, []);

  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: any) => {
    const newConfirmPassword = e.target.value;
    setInputPw(newConfirmPassword);
  };

  // 약관표시
  const handleSetTermNext = (e: any) => {
    setTermNext(true);
  };

  const arePasswordsEqual = password === inputPw;

  useEffect(() => {
    setInputPw("");
    if (input_password.current) {
      input_password.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isNext = useMemo(() => {
    return password !== "" && inputPw !== "" && !isPwValid && arePasswordsEqual;
  }, [isPwValid, password, inputPw, arePasswordsEqual]);

  const onblurPwHandler = () => {
    const passwordRegex =
      /^.*(?=^.{8,50}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    setPwValid(!passwordRegex.test(password));
  };

  return (
    <RegisterWrapper onPrevScreen={onPrevScreen}>
      <Heading
        as="h2"
        variant={{ base: "hd285", lg: "hd385" }}
        color={"primary"}
      >
        회원가입
      </Heading>
      <form id="joinus">
        <VStack
          spacing={"39px"}
          mt={{ base: "40px", lg: "55px" }}
          alignItems={"stretch"}
        >
          <FormLabel>아이디</FormLabel>
          <Input
            variant={"underline"}
            ref={input_id}
            maxLength={20}
            autoComplete="username"
            readOnly
            value={inputId}
            isInvalid={!duplicateValid}
            onChange={handleInputChange}
          />

          <FormControl isInvalid={isPwValid}>
            <FormLabel>비밀번호</FormLabel>
            <Input
              variant={"underline"}
              ref={input_password}
              type="password"
              maxLength={50}
              autoComplete="new-password"
              value={password}
              isInvalid={isPwValid}
              onChange={handlePasswordChange}
              required
              fontFamily={"verdana"}
              fontSize={"16px"}
              onBlur={onblurPwHandler}
            />
            {!isPwValid ? (
              <FormHelperText>
                영문, 숫자, 특수문자 8자리 이상 조합
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                영문, 숫자, 특수문자 8자리 이상 조합
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={inputPw !== "" && !arePasswordsEqual}>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              variant={"underline"}
              ref={input_confirmPassword}
              type="password"
              minLength={8}
              maxLength={50}
              placeholder="비밀번호 확인"
              autoComplete="new-password"
              value={inputPw}
              onChange={handleConfirmPasswordChange}
              required
            />
            {inputPw !== "" && !arePasswordsEqual && (
              <FormErrorMessage>비밀번호를 다시 확인해주세요.</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </form>
      <Box>{termNext && <TermsCheckboxes />}</Box>
      {termNext ? (
        <Button
          variant="register"
          mt={"34px"}
          onClick={onNextScreen}
          isDisabled={!isNext || !isTermRequiredChecked}
        >
          다음
        </Button>
      ) : (
        <Button
          variant="register"
          mt={"34px"}
          onClick={handleSetTermNext}
          isDisabled={!isNext}
        >
          다음
        </Button>
      )}
    </RegisterWrapper>
  );
};

const Screen4: React.FC = () => {
  const { onNextScreen, onPrevScreen, onSetScreenNumber, inputId, inputPw } =
    useRegister();
  const { t } = useTranslation();
  const { terms } = useRegister();
  const dispatch = useAppDispatch();
  const [signUpErrorMsg, setSignUpErrorMsg] = useState("");
  const [signUpVerification, setSignUpVerification] = useState(false);
  const resultRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { onVerification, idenToken, errorCode, errorMsg } = useVerification();

  useEffect(() => {
    if (idenToken) {
      // 회원가입
      joinus(idenToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idenToken]);

  useEffect(() => {
    if (errorMsg) {
      console.log("인증에러 : ", errorMsg);
      // 본인인증 표준창 인증 실패
      onSetScreenNumber(9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg]);

  const verification = useCallback(() => {
    onVerification(VERIFICATION_USAGE.SIGN_UP);
  }, [onVerification]);

  const joinus = (token: string) => {
    setSignUpVerification(true);
    // Loading...
    onNextScreen();
    const term = terms.map((t, idx) => {
      return { ["term" + (idx + 1).toString()]: t.checked ? "Y" : "N" };
    });
    const termAssign = Object.assign({}, ...term);
    dispatch(
      fetch_signup({
        id: inputId,
        password: inputPw,
        idenToken: token,
        ...termAssign,
      })
    )
      .unwrap()
      .then((res: any) => {
        if (res.code !== RES_CD.R0000) {
          setSignUpVerification(false);
          setSignUpErrorMsg(t("api_error." + res.code));
          if (res.code === RES_CD.R0303) {
            onSetScreenNumber(8);
          } else if (res.code === RES_CD.R0301 || res.code === RES_CD.R0302) {
            onSetScreenNumber(7);
          } else {
            onSetScreenNumber(9);
          }
        } else {
          // 회원가입 정상 완료
          navigate(RoutePath.SIGNUP_COMPLETED, {
            state: { token: res?.data?.token },
          });
        }
      })
      .catch((e) => {
        setSignUpVerification(false);
        setSignUpErrorMsg(t("api_error.R9999"));
        onSetScreenNumber(9);
      });
  };

  return (
    <RegisterWrapper onPrevScreen={onPrevScreen}>
      <Heading
        as="h2"
        variant={{ base: "hd325", lg: "hd355" }}
        color={"primary"}
      >
        휴대폰 본인인증
      </Heading>
      <Flex mt={"35px"}>
        <Text w={"20px"} fontSize={"30px"} lineHeight={"32px"}>
          •
        </Text>
        <Text variant={"txt244"} color="regiTxt1">
          회원가입 마지막 단계입니다. <br /> 본인인증을 완료하세요.
        </Text>
      </Flex>
      <Flex mt={"12px"}>
        <Text w={"20px"} fontSize={"30px"} lineHeight={"32px"}>
          •
        </Text>
        <Text
          variant={"txt244"}
          w={{ base: "calc(100% - 30px)", lg: "520px" }}
          color="regiTxt1"
        >
          안전한 금융거래를 위해 30분 안에 인증하지 않을 경우 작성한 아이디와
          비밀번호는 유효하지 않습니다.
        </Text>
      </Flex>

      <Button
        variant="register"
        onClick={verification}
        isDisabled={signUpVerification}
        mt={{ base: "auto", lg: "70px" }}
      >
        휴대폰 본인인증
      </Button>
      <Input display={"none"} type="text" id={"result"} ref={resultRef} />
    </RegisterWrapper>
  );
};

const Screen5: React.FC = () => {
  return (
    <RegisterWrapper>
      <Heading
        as="h2"
        variant={{ base: "hd325", lg: "hd355" }}
        color={"primary"}
        textAlign="center"
      >
        계좌를 개설하고 있어요.
      </Heading>
      <Text
        variant={"txt194"}
        color="regiTxt1"
        mt="20px"
        mb={"100px"}
        textAlign="center"
      >
        창을 닫지 말고 잠시 기다려주세요.
      </Text>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <RotateLoader color={"#120E46"} />
      </Flex>
    </RegisterWrapper>
  );
};

const Screen7: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RegisterWrapper>
      <Heading
        as="h2"
        variant={{ base: "hd325", lg: "hd355" }}
        color={"primary"}
      >
        중복된 ID로 인하여 회원가입이 되지 않았어요.
      </Heading>
      <Text variant={"txt194"} color="regiTxt1" mt="20px">
        다시 회원가입을 시작해보세요.
      </Text>

      <Button
        variant="register"
        onClick={() => navigate(RoutePath.REGISTER)}
        mt={{ base: "auto", lg: "70px" }}
      >
        회원가입 시작하기
      </Button>
    </RegisterWrapper>
  );
};

const Screen8: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RegisterWrapper>
      <Heading
        as="h2"
        variant={{ base: "hd325", lg: "hd355" }}
        color={"primary"}
      >
        <Box as="span" display={{ base: "block", lg: "inline" }}>
          이미
        </Box>{" "}
        가입 된 회원입니다.
      </Heading>
      <Text variant={"txt194"} color="regiTxt1" mt="20px">
        로그인을 진행해보세요. <br /> 비밀번호가 생각나지 않으시면
        <br />
        비밀번호를 재설정 후 로그인하세요.
      </Text>

      <Button
        variant="register"
        onClick={() => navigate(RoutePath.LOGIN)}
        mt={{ base: "auto", lg: "70px" }}
      >
        로그인
      </Button>
      <Button
        variant={"outlineLg"}
        mt={"15px"}
        onClick={() => navigate(RoutePath.RESET_PASSWORD)}
      >
        비밀번호 재설정
      </Button>
    </RegisterWrapper>
  );
};

const Screen9: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RegisterWrapper>
      <Heading
        as="h2"
        variant={{ base: "hd325", lg: "hd355" }}
        color={"primary"}
      >
        회원가입 진행중 오류가 발생하였어요.
      </Heading>
      <Text variant={"txt194"} color="regiTxt1" mt="20px">
        다시 회원가입을 시작해보세요.
      </Text>

      <Button
        variant="register"
        mt={{ base: "auto", lg: "70px" }}
        onClick={() => navigate(RoutePath.REGISTER)}
      >
        회원가입 시작하기
      </Button>
    </RegisterWrapper>
  );
};

const ScreenStep = () => {
  const { currentScreen } = useRegister();
  return (
    <>
      {currentScreen === 1 && <Screen1 />}
      {currentScreen === 2 && <Screen2 />}
      {currentScreen === 3 && <Screen3 />}
      {currentScreen === 4 && <Screen4 />}
      {currentScreen === 5 && <Screen5 />}
      {/*{currentScreen === 6 && <Screen6 />}*/}
      {currentScreen === 7 && <Screen7 />}
      {currentScreen === 8 && <Screen8 />}
      {currentScreen === 9 && <Screen9 />}
    </>
  );
};

const Register: React.FC = () => {
  return (
    <Wrapper>
      <RegisterContextProvider>
        <VerificationProvider>
          <ScreenStep />
        </VerificationProvider>
      </RegisterContextProvider>
    </Wrapper>
  );
};

export default Register;
