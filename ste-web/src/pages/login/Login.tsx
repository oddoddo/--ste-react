import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import HDivider from "../../components/etc/HDivider";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../../components/common/Routers";
import { useAppDispatch } from "../../store/configureStore";
import fetch_signin from "../../store/apis/users/API_SignIn";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { stateSignInFetching } from "../../store/reducers/authReducer";
import { RES_CD } from "../../types/InterfaceTypes";
import fetch_my from "../../store/apis/users/API_My";
import styled from "styled-components";
import Phrase from "components/common/Phrase";
import GoBackButton from "components/common/GoBackButton";
import { RegisterWrapper } from "components/common/BoxWrap";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const isSignInFetching = useSelector(stateSignInFetching);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);
  const handleFocusId = () => setIsIdFocused(true);
  const handleBlurId = () => setIsIdFocused(false);
  const handleFocusPw = () => setIsPwFocused(true);
  const handleBlurPw = () => setIsPwFocused(false);
  const onChangeId = (e: { target: { value: React.SetStateAction<string> } }) =>
    setId(e.target.value);
  const onChangePw = (e: { target: { value: React.SetStateAction<string> } }) =>
    setPw(e.target.value);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fetchSignIn();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") fetchSignIn();
  };

  const fetchSignIn = async () => {
    try {
      const resAction = await dispatch(fetch_signin({ id: id, password: pw }));
      const res = unwrapResult(resAction);
      if (res.code !== RES_CD.R0000) {
        setErrorMsg(t("api_error." + res.code));
      } else {
        setErrorMsg(undefined);
        dispatch(fetch_my());
        const to = state?.beforePath ? state.beforePath : RoutePath.HOME;
        navigate(to === RoutePath.REGISTER ? RoutePath.HOME : to);
      }
    } catch (e) {
      console.log("error: ", e);
      setErrorMsg(t("api_error.R9999"));
    }
  };

  return (
    <RegisterWrapper>
      <Heading as="h2" variant={{ base: "hd285", lg: "hd325" }}>
        {t("login.login")}
      </Heading>
      <form id="login">
        <FormControl mt={"42px"}>
          <FormLabel visibility={isIdFocused || id ? "visible" : "hidden"}>
            {t("login.id")}
          </FormLabel>
          <Input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            required
            title="id"
            w="100%"
            placeholder={t("login.id")}
            py="30px"
            mb="30px"
            value={id}
            onChange={onChangeId}
            maxLength={20}
            minLength={5}
            variant={"underline"}
            onFocus={handleFocusId}
            onBlur={handleBlurId}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            style={{ visibility: isPwFocused || pw ? "visible" : "hidden" }}
          >
            {t("login.pw")}
          </FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            title="pw"
            autoComplete="current-password"
            required
            w="100%"
            placeholder={t("login.pw")}
            py="30px"
            mb="30px"
            value={pw}
            minLength={8}
            maxLength={50}
            onChange={onChangePw}
            onKeyDown={onKeyDown}
            variant={"underline"}
            onFocus={handleFocusPw}
            onBlur={handleBlurPw}
          />
          {errorMsg && <Text variant={"error"}>{errorMsg}</Text>}
        </FormControl>

        <Button
          variant="register"
          onClick={onClickHandler}
          isLoading={isSignInFetching}
          mt={"30px"}
        >
          {t("login.login")}
        </Button>
      </form>
      <Flex alignItems="center" justifyContent="center" pt="50px">
        <Button
          variant="ghostSm"
          onClick={() => {
            navigate(RoutePath.FIND_ID);
          }}
        >
          {t("login.findId")}
        </Button>
        <HDivider />
        <Button
          variant="ghostSm"
          onClick={() => {
            navigate(RoutePath.RESET_PASSWORD);
          }}
        >
          {t("login.resetPw")}
        </Button>
        <HDivider />
        <Button
          variant="ghostSm"
          onClick={() => {
            navigate(RoutePath.REGISTER);
          }}
        >
          {t("login.register")}
        </Button>
      </Flex>
    </RegisterWrapper>
  );
};

export default Login;
