import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { stateMenuColor } from "../../store/reducers/extraReducer";
import { RoutePath } from "../common/Routers";
import { useAuthState } from "../../hooks/useAuth";
import { Button, Box } from "@chakra-ui/react";
import { useAppDispatch } from "../../store/configureStore";
import { logout } from "../../store/reducers/authReducer";

const Auth = () => {
  const { t } = useTranslation();
  const isWhiteHeader = useSelector(stateMenuColor);
  const isLogin = useAuthState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickHandler = useCallback(() => {
    dispatch(logout());
    navigate(RoutePath.HOME);
  }, [dispatch, navigate]);

  return (
    <UtilWrap
      className={isWhiteHeader ? "white-header" : ""}
      display={{ base: "none", lg: "flex" }}
    >
      <li>
        {isLogin ? (
          <Button onClick={onClickHandler}>{t("common.logout")}</Button>
        ) : (
          <Link to={RoutePath.LOGIN} state={{ beforePath: pathname }}>
            {t("common.login")}
          </Link>
        )}
      </li>
      <li>
        {!isLogin ? (
          <Link to={RoutePath.REGISTER}>{t("common.register")}</Link>
        ) : (
          <Link to={RoutePath.MY}>{t("common.my")}</Link>
        )}
      </li>
    </UtilWrap>
  );
};

const UtilWrap = styled(Box)`
  display: flex;
  list-style: none;
  li {
    margin-left: 5px;
    list-style: none;
    a,
    button {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 0.8rem;
      border-radius: 45px;
      background: ${(props) => props.theme.colors.primary_light};
      color: ${({ theme: { colors } }) => colors.white};
      white-space: nowrap;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: -0.24px;
      &:hover {
        color: ${({ theme: { colors } }) => colors.gnbHoverColor};
      }
    }
  }
  &.white-header {
    li {
      a,
      button {
        background: ${(props) => props.theme.colors.whiteHeaderButton};
      }
    }
  }
`;

export default React.memo(Auth);
