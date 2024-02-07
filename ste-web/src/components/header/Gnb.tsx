import React, { useMemo } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { stateMenuColor } from "../../store/reducers/extraReducer";
import { Box, Text } from "@chakra-ui/react";
import { RoutePath } from "../common/Routers";

const Gnb: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const selectedMenu = useMemo(() => {
    return pathname.split("/")[1];
  }, [pathname]);

  const isWhiteHeader = useSelector(stateMenuColor);

  return (
    <GnbWrap className={isWhiteHeader ? "white-header" : ""}>
      <ul>
        <li className={selectedMenu === "exchange" ? "active" : ""}>
          {selectedMenu === "exchange" ? (
            <Text>{t("common.exchange")}</Text>
          ) : (
            <Link to={RoutePath.EXCHANGE}>{t("common.exchange")}</Link>
          )}
        </li>
        <li className={selectedMenu === "accounts" ? "active" : ""}>
          {selectedMenu === "deposit" ? (
            <Text>{t("common.deposit")}</Text>
          ) : (
            <Link to={RoutePath.ACCOUNTS}>{t("common.deposit")}</Link>
          )}
        </li>
        <li className={selectedMenu === "tradehistory" ? "active" : ""}>
          {selectedMenu === "tradehistory" ? (
            <Text>{t("common.trade_history")}</Text>
          ) : (
            <Link to={RoutePath.TRADE_HISTORY}>
              {t("common.trade_history")}
            </Link>
          )}
        </li>
        <li className={selectedMenu === "support" ? "active" : ""}>
          {selectedMenu === "support" ? (
            <Text>{t("common.support")}</Text>
          ) : (
            <Link to={RoutePath.SUPPORT}>{t("common.support")}</Link>
          )}
        </li>
      </ul>
    </GnbWrap>
  );
};

const GnbWrap = styled(Box)`
  margin-left: 1rem;
  ul {
    display: flex;
    word-break: keep-all;
    list-style: none;
    li {
      list-style: none;
      margin-left: 1.3rem;
      &.active {
        a,
        p {
          font-weight: 500;
          color: ${({ theme: { colors } }) => colors.white};
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: ${(props) => props.theme.colors.white};
          }
        }
      }
      a,
      p {
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        height: 60px;
        padding: 0 0.7rem;
        font-size: 1rem;
        color: ${({ theme: { colors } }) => colors.S_Light};
        &:hover {
          color: ${({ theme: { colors } }) => colors.gnbHoverColor};
        }
      }
    }
  }
  &.white-header {
    ul {
      li {
        a,
        p {
          color: ${({ theme: { colors } }) => colors.Typo_Sub_3A};
        }
      }
    }
  }
`;

export default React.memo(Gnb);
