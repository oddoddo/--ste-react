import styled from "styled-components";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { stateMenuColor } from "../../store/reducers/extraReducer";

const Language = () => {
  const { i18n } = useTranslation();
  const isWhiteHeader = useSelector(stateMenuColor);

  return (
    <LangsWrap className={isWhiteHeader ? "white-header" : ""}>
      <Button
        onClick={() => {
          i18n.changeLanguage("ko");
        }}
        className={i18n.language === "ko" ? "on" : ""}
      >
        KO
      </Button>
      <Button
        onClick={() => {
          i18n.changeLanguage("en");
        }}
        className={i18n.language === "en" ? "on" : ""}
      >
        EN
      </Button>
    </LangsWrap>
  );
};

const LangsWrap = styled.nav`
  display: flex;
  margin-left: 0.5rem;
  button {
    display: flex;
    position: relative;
    min-width: 0;
    padding: 1rem 0.6rem;
    white-space: nowrap;
    color: ${({ theme: { colors } }) => colors.primary_1};
    font-size: 0.6875rem;
    font-weight: 500;
    background-color: transparent;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-46%);
      width: 1px;
      height: 12px;
      background: ${(props) => props.theme.colors.primary_2};
    }
    &:first-of-type::before {
      display: none;
    }
    &:hover {
      color: ${({ theme: { colors } }) => colors.white};
      background: transparent;
    }
    &.on {
      color: ${({ theme: { colors } }) => colors.white};
    }
  }
  &.white-header {
    button {
      color: ${({ theme: { colors } }) => colors.langWhiteColor};
      &:hover {
        color: ${({ theme: { colors } }) => colors.primary};
      }
      &.on {
        color: ${({ theme: { colors } }) => colors.primary};
      }
    }
  }
`;

export default React.memo(Language);
